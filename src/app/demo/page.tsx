'use client'; // Add this at the very top

import dynamic from 'next/dynamic';

const LoadingBottle = dynamic(() => import('@/components/ui/loading-bottle'), { 
  ssr: false 
});

export default function DemoPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <LoadingBottle />
    </div>
  );
}