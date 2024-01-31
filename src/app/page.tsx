"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const horRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    const offsetTop = horRef.current?.parentElement?.offsetTop;

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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const section = document.getElementById("zoom-section");
    const doorsSection = document.getElementById("doors-section");
    const zoomTitle = document.getElementById("zoom-title");
    const zoomSubTitle = document.getElementById("zoom-subtitle");
    const offsetTop = zoomRef.current?.parentElement?.offsetTop;

    const scrollPositionInPixels = window.scrollY;

    // its Sticky when this equals 0
    const stickyTop = scrollPositionInPixels - offsetTop!;
    let sharedPercent = (stickyTop / window.innerHeight) * 100;
    let percent = sharedPercent;
    let opacity = sharedPercent;
    let doorPercent = sharedPercent;

    // 300 because we are doing 400vw bellow and then scrolling stops when it stops being sticky
    // if you want it to animate still when its not sticky anymore, change 300 to 400
    percent = (percent < 3 ? 3 : percent > 300 ? 300 : percent) / 8;
    opacity = (opacity < 0 ? 0 : opacity > 300 ? 300 : opacity) / 2;
    doorPercent =
      (doorPercent < 0 ? 0 : doorPercent > 300 ? 300 : doorPercent) / 3;

    section!.style.transform = `scale(${percent})`;
    section!.style.opacity = `${opacity * 6}%`;

    const titleMove = doorPercent <= 10 ? 0 : doorPercent - 10;
    zoomTitle!.style.transform = `translateY(-${titleMove}vw)`;
    zoomSubTitle!.style.transform = `translateY(${titleMove}vw)`;

    const width = doorPercent - 50 <= 0 ? 0 : doorPercent - 50;
    doorsSection!.style.width = `${width * 2}vw`;
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const section = document.getElementById("videoContainer");
    const offsetTop = section?.offsetTop;
    const duration = videoRef.current?.duration;
    const scrollPositionInPixels = window.scrollY;

    // its Sticky when this equals 0
    const stickyTop = scrollPositionInPixels - offsetTop!;
    let percent = (stickyTop / window.innerHeight) * 100;

    // 500 because we are doing 600vw bellow and then scrolling stops when it stops being sticky
    // if you want it to animate still when its not sticky anymore, change 500 to 600
    percent = percent < 0 ? 0 : percent > 500 ? 500 : percent;

    videoRef.current!.currentTime = (percent / 500) * duration!;
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
          <div ref={horRef} className="sticky top-0 h-[100vh]">
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

        <div className="w-full h-[400vh]">
          <div
            ref={zoomRef}
            className="sticky top-0 h-[100vh] w-[100vw] flex justify-center items-center"
          >
            <div className="h-[100vh] w-[100vw] overflow-hidden relative">
              <div
                id="zoom-title"
                className="h-[100vh] w-[100vw] flex px-[5vw] absolute top-0 pt-10"
              >
                <h1 className="text-6xl text-center">ZOOM SCROLL</h1>
              </div>

              <div
                id="zoom-subtitle"
                className="h-[100vh] w-[100vw] flex px-[5vw] absolute top-0 pb-10 justify-end items-end"
              >
                <h1 className="text-6xl text-center">ZOOM SCROLL</h1>
              </div>

              <div
                id="zoom-section"
                className="h-[100vh] w-[100vw] flex justify-center items-center px-[5vw] absolute top-0 opacity-[10%]"
              >
                <h1 className="text-[19vh] text-center font-bold mr-[13px]">
                  ENTER
                </h1>
              </div>

              <div
                id="doors-section"
                className="h-[100vh] w-[0vw] flex justify-center items-center absolute top-0 left-1/2 translate-x-[-50%] bg-white"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[100vh] px-24 flex justify-center items-center bg-white">
          <h1 className="text-9xl text-center text-black">That was cool</h1>
        </div>

        <div id="videoContainer" className="w-full h-[600vh] bg-white">
          <div className="sticky top-0 h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="h-[100vh] w-[100vw] relative">
              <video
                ref={videoRef}
                controls={false}
                src="/Sequence03.mp4"
                autoPlay={false}
                loop={false}
                style={{
                  width: "80vw",
                  maxWidth: "1500px",
                  filter: "drop-shadow(5px 5px 10px #000)",
                  borderRadius: "10px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[100vh] px-24 flex justify-center items-center bg-white">
          <h1 className="text-9xl text-center text-black">That was cool</h1>
        </div>
      </div>
    </main>
  );
}
