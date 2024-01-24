"use client"

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const section = document.getElementById('scroll-section')
    const offsetTop = ref.current?.parentElement?.offsetTop


    const scrollPositionInPixels = window.scrollY
    // same thing but this uses the latest value passed in by framer
    // const scrollHeight = document.body.scrollHeight - document.documentElement.clientHeight
    // const scrollPositionInPixels = scrollHeight * latest

    // its Sticky when this equals 0
    const stickyTop = scrollPositionInPixels - offsetTop!
    let percent = (stickyTop / window.innerHeight) * 100

    // 300 because we are doing 400vw bellow and then scrolling stops when it stops being sticky
    // if you want it to animate still when its not sticky anymore, change 300 to 400
    percent = percent < 0 ? 0 : percent > 300 ? 300 : percent
    if (section) {
      section.style.transform = `translateX(-${percent}vw)`
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <svg id="progress" width="100" height="100" viewBox="0 0 100 100" className='fixed top-6 right-6'>
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="indicator"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <div className='h-[500vh] w-full'>
        <div className='w-full h-[100vh] px-24 bg-red-300'></div>
        <div className='w-full h-[400vh]'>
          <div ref={ref} className='sticky top-0 overflow-hidden h-[100vh] '>
            <div id='scroll-section' className='h-full w-[400vw] will-change-transform flex justify-between items-center px-[5vw] absolute top-0'>
              <div className='w-[600px] h-[80%] bg-red-500' />
              <div className='w-[600px] h-[80%] bg-red-500' />
              <div className='w-[600px] h-[80%] bg-red-500' />
              <div className='w-[600px] h-[80%] bg-red-500' />
            </div>
          </div>
          {/* <ul ref={ref} className='sticky top-0'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul> */}
        </div>
        <div className='w-full h-[100vh] px-24 bg-red-500'></div>
        <div className='w-full h-[100vh] px-24 bg-red-600'></div>
        <div className='w-full h-[100vh] px-24 bg-red-700'></div>
        {/* <button onClick={() => lenis?.scrollTo(0, { immediate: false })}>Scroll to top</button> */}
        <Link href='/threejs'>Go to test</Link>
      </div>
    </main>
  );
}
