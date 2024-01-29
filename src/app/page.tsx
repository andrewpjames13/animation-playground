"use client";

import { easeIn, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Horizontal Scroll scrolls y axis
    window.addEventListener("wheel", (e) => {
      let delta = 0;
      // Only use when trying to scroll horizontally
      if (e.deltaX !== delta) {
        // higher number = slower scroll
        const scrollSpeed = 3;
        window.scrollTo(0, window.scrollY + e.deltaX / scrollSpeed);
        delta = e.deltaX;
      }
    });

    return () => {
      window.removeEventListener("wheel", () => {});
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const section = document.getElementById("scroll-section");
    const offsetTop = ref.current?.parentElement?.offsetTop;

    const scrollPositionInPixels = window.scrollY;
    // same thing but this uses the latest value passed in by framer
    // const scrollHeight = document.body.scrollHeight - document.documentElement.clientHeight
    // const scrollPositionInPixels = scrollHeight * latest

    // its Sticky when this equals 0
    const stickyTop = scrollPositionInPixels - offsetTop!;
    let percent = (stickyTop / window.innerHeight) * 100;

    // 300 because we are doing 400vw bellow and then scrolling stops when it stops being sticky
    // if you want it to animate still when its not sticky anymore, change 300 to 400
    percent = percent < 0 ? 0 : percent > 300 ? 300 : percent;
    if (section) {
      section.style.transform = `translateX(-${percent}vw)`;
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <svg
        id="progress"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="fixed top-6 right-6"
      >
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
      <div className="h-[500vh] w-full">
        <div className="w-full h-[100vh] px-24 flex justify-center items-center">
          <h1 className="text-9xl text-center">
            Horizontal Scroll When Sticky
          </h1>
        </div>
        <div className="w-full h-[400vh]">
          <div ref={ref} className="sticky top-0 overflow-hidden h-[100vh] ">
            <div
              id="scroll-section"
              className="h-full w-[400vw] will-change-transform flex justify-between items-center px-[5vw] absolute top-0"
            >
              <Link
                className="flex items-end text-8xl p-6 w-[12%] h-[80%] bg-white text-black font-bold leading-[80px] tracking-tighter"
                href="/threejs"
              >
                Threejs Scroll & Mouse Events
              </Link>
              <Link
                className="flex items-end text-8xl p-6 w-[12%] h-[80%] bg-white text-black font-bold leading-[80px] tracking-tighter"
                href="/threejs/fiber"
              >
                React Three Fiber Scroll & Mouse Events
              </Link>
              <Link
                className="flex items-end text-8xl p-6 w-[12%] h-[80%] bg-white text-black font-bold leading-[80px] tracking-tighter"
                href="/threejs/blobs"
              >
                Threejs Blobs Background
              </Link>
              <Link
                className="flex items-end text-8xl p-6 w-[12%] h-[80%] bg-white text-black font-bold leading-[80px] tracking-tighter pointer-events-none opacity-25"
                href="/threejs/fiber"
              ></Link>
              <Link
                className="flex items-end text-8xl p-6 w-[12%] h-[80%] bg-white text-black font-bold leading-[80px] tracking-tighter pointer-events-none opacity-25"
                href="/threejs/fiber"
              ></Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[100vh] px-24 flex justify-center items-center">
          <h1 className="text-9xl text-center">That was cool</h1>
        </div>
      </div>
    </main>
  );
}
