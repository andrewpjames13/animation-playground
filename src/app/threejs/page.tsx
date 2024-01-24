"use client"
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='h-[500vh] w-full'>
        <div className='w-full h-[100vh] bg-red-300'>test</div>
        <div className='w-full h-[100vh] bg-red-400'></div>
        <div className='w-full h-[100vh] bg-red-500'></div>
        <div className='w-full h-[100vh] bg-red-600'></div>
        <div className='w-full h-[100vh] bg-red-700'></div>
      </div>
    </main>
  );
}
