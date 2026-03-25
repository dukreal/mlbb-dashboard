import asyncio
import json
import os
from playwright.async_api import async_playwright

# ---------------------------------------------------------------------------
# CONFIG — UPDATED FOR YOUR STRUCTURE
# ---------------------------------------------------------------------------

# Point to your actual source data
HEROES_FILE = "../src/data/heroes_data.json"
# Output directly to your data folder
OUTPUT_FILE = "../src/data/hero_matchups.json" 

API_FRAGMENT   = "2777391"
CAMP_COUNTERS  = "0"
CAMP_TEAMMATES = "1"


# ---------------------------------------------------------------------------
# Parse the intercepted API response into a clean sorted list
# ---------------------------------------------------------------------------

def parse(raw: dict, id_to_name: dict) -> list:
    entries = []
    for record in raw.get("data", {}).get("records", []):
        for sub in record.get("data", {}).get("sub_hero", []):
            heroid = sub.get("heroid")
            if heroid is None:
                continue
            # Logic: Match heroid to your local JSON hero_name
            entries.append({
                "heroid":            heroid,
                "hero_name":         id_to_name.get(int(heroid), f"Unknown({heroid})"),
                "hero_win_rate":     round(sub["hero_win_rate"]     * 100, 4) if sub.get("hero_win_rate")     is not None else None,
                "increase_win_rate": round(sub["increase_win_rate"] * 100, 4) if sub.get("increase_win_rate") is not None else None,
            })

    # Sort by increase_win_rate descending — highest = best counter/teammate
    entries.sort(key=lambda x: x["increase_win_rate"] or 0, reverse=True)

    # Assign rank after sorting
    for i, entry in enumerate(entries):
        entry["rank"] = i + 1

    return entries


# ---------------------------------------------------------------------------
# Main — opens one browser, walks through every hero, intercepts both calls
# ---------------------------------------------------------------------------

async def main():
    # Load heroes from your actual JSON
    if not os.path.exists(HEROES_FILE):
        print(f"Error: {HEROES_FILE} not found. Are you in the /scripts folder?")
        return

    with open(HEROES_FILE, "r", encoding="utf-8") as f:
        raw_heroes = json.load(f)

    # FILTER: Ignore the "none" hero and ensure we only process real heroes
    heroes = [h for h in raw_heroes if h["id"] != "none" and "hero_name" in h]

    heroes      = sorted(heroes, key=lambda h: int(h["key"]))
    # FIX: Changed h["name"] to h["hero_name"] to match your JSON
    id_to_name  = {int(h["key"]): h["hero_name"] for h in heroes}
    total       = len(heroes)
    results     = []

    print(f"Fetching data for {total} heroes → {OUTPUT_FILE}")
    print("Do NOT close the browser window.\n")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, args=["--start-maximized"])
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36",
            no_viewport=True,
        )
        page = await context.new_page()

        for idx, hero in enumerate(heroes, start=1):
            hero_id   = int(hero["key"])
            hero_name = hero["hero_name"] # FIX: Changed from hero["name"]
            print(f"[{idx}/{total}] {hero_name} (ID: {hero_id})")

            counters:  list = []
            teammates: list = []
            captured:  int  = 0

            async def handle(response):
                nonlocal captured, counters, teammates
                if API_FRAGMENT not in response.url or response.request.method != "POST":
                    return
                try:
                    body = response.request.post_data
                    if not body:
                        return
                    
                    post_data = json.loads(body)
                    camp = str(next(
                        (f["value"] for f in post_data.get("filters", [])
                         if f["field"] == "camp_type"), ""
                    ))
                    
                    raw    = await response.json()
                    parsed = parse(raw, id_to_name)

                    if camp == CAMP_COUNTERS and not counters:
                        counters  = parsed
                        captured += 1
                        print(f"  counters:  {len(parsed)}")
                    elif camp == CAMP_TEAMMATES and not teammates:
                        teammates = parsed
                        captured += 1
                        print(f"  teammates: {len(parsed)}")
                except Exception as e:
                    # Silently handle parsing errors
                    pass

            page.on("response", handle)

            # Navigate to the Academy guide detail
            await page.goto(
                f"https://www.mobilelegends.com/academy/guide/detailrank?heroid={hero_id}",
                timeout=60_000,
            )
            
            # Small scroll to trigger lazy elements
            await page.mouse.wheel(0, 500)
            await asyncio.sleep(2)

            # Trigger "Best Counters" tab
            try:
                await page.get_by_text("Best Counters", exact=True).first.click()
                await asyncio.sleep(1.5)
            except: pass

            # Trigger "Best Teammate" tab
            try:
                await page.get_by_text("Best Teammate", exact=True).first.click()
                await asyncio.sleep(1.5)
            except: pass

            # Wait up to 10s for both responses
            for _ in range(20):
                if captured >= 2:
                    break
                await asyncio.sleep(0.5)

            page.remove_listener("response", handle)

            results.append({
                "hero_id":        hero_id,
                "hero_name":      hero_name,
                "hero_key":       hero["id"],
                "best_counters":  counters,
                "best_teammates": teammates,
            })

            # Save after every hero — safe to interrupt and resume
            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

            print(f"  [✓] Saved.\n")

        await browser.close()

    print(f"✅ Complete! {len(results)} heroes saved to '{OUTPUT_FILE}'")


if __name__ == "__main__":
    asyncio.run(main())