"use client";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const main = useRef<HTMLDivElement | null>(null);
  const bigCircleRef = useRef<HTMLImageElement | null>(null); // Ref for big-circle
  const cubicsRef = useRef<HTMLVideoElement | null>(null); // Ref for cubics
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [currIndex, setCurrIndex] = useState<number>(0);

  const springTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 20,
  };

  useEffect(() => {
    if (!main.current) return;
    let isScrolling = false;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (isScrolling) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      let newIndex = sectionIndex + direction;

      // Ensure new index is within range
      if (newIndex >= 0 && newIndex < 10) {
        isScrolling = true;
        setCurrIndex(newIndex);

        // Animate both circle and cubics based on direction and section
        if (newIndex < 8) {
          animateBigCircle(newIndex); // Circle for sections 2-7
        } else if (newIndex >= 8) {
          animateCubics(newIndex); // Cubics for sections 8-10
        }

        // Animate section transition
        animateSectionTransition(newIndex, direction);
      }
    };

    // Function to animate sections
    const animateSectionTransition = (newIndex: number, direction: number) => {
      if (sectionIndex === 0 && newIndex === 1) {
        setSectionIndex(1);
      }
      if (newIndex === 8) {
        setSectionIndex(8);
      }
      gsap.to(main, {
        opacity: 0,
        y: direction === 1 ? "-100%" : "100%", // Slide up or down
        duration: 0,
        onComplete: () => {
          setSectionIndex(newIndex); // Update section index
          isScrolling = false; // Allow scrolling again after animation
        },
      });
    };

    // Updated animateBigCircle function
    const animateBigCircle = (newIndex: number) => {
      // Set the direction for the horizontal movement
      const horizontalPosition = newIndex % 2 === 1 ? "-35vw" : "70vw";
      const topPosition = newIndex === 1 ? "70vh" : "0vh";
      const blur = newIndex < 6 ? 20 : 30;
      const size = newIndex < 2 ? 405 : 960;

      // Animate the big circle with appropriate position, size, and blur
      gsap.to(bigCircleRef.current, {
        left: newIndex === 1 ? 0 : horizontalPosition,
        top: topPosition,
        width: size,
        height: size,
        filter: `blur(${newIndex === 1 ? 0 : blur}px)`,
        duration: 1,
        ease: "power2.inOut",
      });
    };

    // Updated animateCubics function
    const animateCubics = (newIndex: number) => {
      const horizontalPosition = newIndex === 8 ? "5vw" : "43vw";
      const size = newIndex === 8 ? 330 : 220;
      const topPosition = newIndex === 8 ? "10vh" : "5vh";

      gsap.to(cubicsRef.current, {
        right: horizontalPosition,
        width: size,
        height: size,
        top: topPosition,
        duration: 1,
        scale: newIndex === 8 ? 1 : 0.7,
        ease: "power2.inOut",
        opacity: 1,
      });
    };

    // Add the scroll event listener
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll); // Clean up the event listener on unmount
    };
  });

  return (
    <div
      ref={main}
      className="relative flex flex-col"
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      {/* big circle */}
      {currIndex > 0 && currIndex < 8 && (
        <motion.img
          ref={bigCircleRef}
          id="big-circle"
          className={`absolute  ${
            currIndex < 2
              ? "w-[405px] h-[405px] top-[70vh] opacity-0"
              : "w-[960px] h-[960px] left-[-35vw] blur-[30px]"
          }`}
          src="images/big-circle.png"
          alt="big circle"
          initial={{ opacity: 0 }} // Ensure rotate starts from 0
          whileInView={{
            opacity: currIndex > 2 ? 0.5 : 1,
            rotate: 180,
          }} // Rotate to -45deg when shows up
          transition={springTransition}
        />
      )}
      {/* cubics */}
      {currIndex >= 8 && (
        <motion.video
          className='absolute w-[330px] h-[330px] top-[10vh] right-[5vw]'
          loop
          muted
          autoPlay
          src="videos/cubics.mp4"
          ref={cubicsRef}
          initial={{ opacity: 1 }} // Ensure opacity starts from 0
          whileInView={{
            opacity: 1,
          }} // Opacity is to 1 when shows up
          transition={springTransition}
        />
      )}

      {/* 1st section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 0 && (
          <motion.div
            id="section1"
            className="section relative m-auto mt-6 h-[100vh] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ y: "-100vh" }}
            transition={springTransition}
          >
            <motion.div
              id="section-one-texts"
              className="absolute top-6 flex flex-col gap-12 z-10 bg-transparent max-w-[600px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ y: "-100vh" }}
            >
              <div className="text-[56px] font-normal leading-[56px] tracking-[0.02em] flex flex-col flex-wrap font-jeko-bold">
                <p>A design and development agency in Nepal </p>
              </div>
              <button className="bg-orange w-[150px] h-[40px] px-[18px] py-[12px] rounded-[8px] text-[16px] font-normal leading-[16px] text-center text-black">
                Start a project
              </button>
            </motion.div>
            <div className="relative h-[780px] [clip-path:polygon(_98.684%_0%,48.947%_0%,48.947%_0%,48.734%_0.031%,48.531%_0.122%,48.343%_0.267%,48.17%_0.461%,48.017%_0.7%,47.885%_0.979%,47.778%_1.293%,47.699%_1.636%,47.649%_2.004%,47.632%_2.392%,47.632%_16.895%,47.632%_16.895%,47.614%_17.283%,47.565%_17.651%,47.485%_17.995%,47.378%_18.309%,47.246%_18.588%,47.093%_18.828%,46.92%_19.023%,46.732%_19.169%,46.529%_19.26%,46.316%_19.291%,21.217%_19.291%,21.217%_19.291%,21.004%_19.322%,20.801%_19.413%,20.612%_19.558%,20.44%_19.753%,20.287%_19.992%,20.155%_20.271%,20.048%_20.584%,19.968%_20.927%,19.919%_21.295%,19.901%_21.683%,19.901%_26.345%,19.901%_26.345%,19.884%_26.733%,19.834%_27.101%,19.754%_27.444%,19.647%_27.758%,19.516%_28.037%,19.363%_28.276%,19.19%_28.47%,19.001%_28.615%,18.799%_28.706%,18.586%_28.737%,13.125%_28.737%,13.125%_28.737%,12.912%_28.769%,12.709%_28.859%,12.52%_29.004%,12.348%_29.199%,12.195%_29.438%,12.063%_29.717%,11.956%_30.03%,11.876%_30.373%,11.826%_30.742%,11.809%_31.13%,11.809%_34.749%,11.809%_34.749%,11.792%_35.137%,11.742%_35.505%,11.662%_35.848%,11.555%_36.162%,11.424%_36.44%,11.271%_36.68%,11.098%_36.874%,10.909%_37.019%,10.707%_37.11%,10.493%_37.141%,1.316%_37.141%,1.316%_37.141%,1.102%_37.172%,0.9%_37.263%,0.711%_37.408%,0.539%_37.603%,0.385%_37.842%,0.254%_38.121%,0.147%_38.434%,0.067%_38.777%,0.017%_39.145%,0%_39.533%,0%_97.608%,0%_97.608%,0.017%_97.996%,0.067%_98.364%,0.147%_98.707%,0.254%_99.021%,0.385%_99.299%,0.539%_99.538%,0.711%_99.733%,0.9%_99.878%,1.102%_99.969%,1.316%_100%,94.572%_100%,94.572%_100%,94.786%_99.969%,94.988%_99.878%,95.177%_99.733%,95.35%_99.538%,95.503%_99.299%,95.634%_99.021%,95.741%_98.707%,95.821%_98.364%,95.871%_97.996%,95.888%_97.608%,95.888%_94.438%,95.888%_94.438%,95.905%_94.05%,95.955%_93.682%,96.035%_93.338%,96.142%_93.025%,96.273%_92.746%,96.427%_92.507%,96.599%_92.312%,96.788%_92.167%,96.99%_92.077%,97.204%_92.045%,98.684%_92.045%,98.684%_92.045%,98.898%_92.014%,99.1%_91.923%,99.289%_91.778%,99.461%_91.584%,99.615%_91.345%,99.746%_91.066%,99.853%_90.753%,99.933%_90.409%,99.983%_90.041%,100%_89.653%,100%_2.392%,100%_2.392%,99.983%_2.004%,99.933%_1.636%,99.853%_1.293%,99.746%_0.979%,99.615%_0.701%,99.461%_0.462%,99.289%_0.267%,99.1%_0.122%,98.898%_0.031%,98.684%_0%_)]">
              <video
                className="w-[1354px] h-[835px] rounded-[24px]"
                loop
                muted
                autoPlay
                src="/videos/intro.mp4"
              />
            </div>
            <div className="absolute right-0 bottom-[19.5%] w-[48px] h-[48px] rounded-[50%] flex justify-center items-center bg-orange">
              <img
                className="w-[16px]"
                src="images/arrow-down.png"
                alt="arrow down"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 2nd section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 1 && (
          <motion.div
            id="section2"
            className="section relative flex h-[100vh] px-[45px] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              transition={springTransition}
              id="section2-first-div"
              className="w-[65%] m-auto"
            >
              <div className="flex flex-col w-[640px] gap-6 ">
                <p className="font-jeko-regular text-[20px] font-normal leading-[24px] tracking-[0.01em] text-left text-orange">
                  Our Expertise
                </p>
                <p className="w-[555px] font-jeko-bold text-[48px] font-normal leading-[48px] text-left text-neutral">
                  Expert designers and developers who offer a bespoke and
                  professional service.
                </p>
                <p className="w-[363px] font-jeko-regular text-[16px] font-normal leading-[20px] tracking-[0.02em] text-left text-[#FFFFFFCC]">
                  We are a digital marketing agency with expertise, and we're on
                  a mission to help you take the next step in your business.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: "100%" }}
              whileInView={{ x: 0 }}
              transition={springTransition}
              id="section2-second-div"
              className="flex flex-col m-auto gap-7 font-jeko-bold text-[32px] font-normal leading-[40px] text-left text-neutral underline"
            >
              <p>Custom Software Development</p>
              <p>Web Development</p>
              <p>Mobile App Development</p>
              <p>UI/UX Design</p>
              <p>Cloud Services</p>
              <p>Q/A Testing & Automation</p>
              <p>SEO & Digital Marketing</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3rd section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 2 && (
          <motion.div
            id="section3"
            className="section flex h-[100vh] px-[45px] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={springTransition}
          >
            <div className="w-[60%] m-auto">
              <div className="w-[511px] flex flex-col gap-6">
                <p className="font-jeko-bold text-[42px] font-normal leading-[52.5px] text-left text-neutral">
                  Custom Software Development
                </p>
                <p className="font-jeko-regular text-[20px] font-normal leading-[29px] tracking-[0.02em] text-left">
                  We are a digital marketing agency with expertise, and we're on
                  a mission to help you take the next step in your business.
                </p>
                <div className="flex flex-wrap gap-3 text-neutral">
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    UI/UX Design
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Wordpress
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Ecommerce
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    SaaS
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Shopify
                  </button>
                </div>
                <button className="w-fit mt-5 px-[12px] py-[8px] rounded-[47px] border-[1px] border-orange text-orange text-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="m-auto">
              <video
                className="w-[519px] h-[519px] rounded-[20px] [box-shadow:0px_36px_74.2px_11px_#F4BF4FC2]"
                loop
                muted
                autoPlay
                src="videos/create-capture-curate.mp4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 4th section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 3 && (
          <motion.div
            id="section4"
            className="section flex h-[100vh] px-[45px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={springTransition}
          >
            <div className="w-[60%] m-auto z-10">
              <video
                className="w-[519px] h-[519px] rounded-[20px] [box-shadow:0px_36px_74.2px_11px_#F4BF4FC2]"
                loop
                muted
                autoPlay
                src="videos/effects.mp4"
              />
            </div>
            <div className="m-auto">
              <div className="w-[511px] flex flex-col gap-6">
                <p className="font-jeko-bold text-[42px] font-normal leading-[52.5px] text-left text-neutral">
                  Website Design & Development
                </p>
                <p className="font-jeko-regular text-[20px] font-normal leading-[29px] tracking-[0.02em] text-left">
                  Crafting digital experiences where beauty meets ROI, turning
                  heads and unlocking revenue potential with every click.
                </p>
                <div className="flex flex-wrap gap-3 text-neutral">
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    UI/UX Design
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Wordpress
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Ecommerce
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    SaaS
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Shopify
                  </button>
                </div>
                <button className="w-fit mt-5 px-[12px] py-[8px] rounded-[47px] border-[1px] border-orange text-orange text-center">
                  View Our Work
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 5h section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 4 && (
          <motion.div
            id="section5"
            className="section flex h-[100vh] px-[45px] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={springTransition}
          >
            <div className="w-[60%] m-auto">
              <div className="w-[511px] flex flex-col gap-6">
                <p className="font-jeko-bold text-[42px] font-normal leading-[52.5px] text-left text-neutral">
                  Search Engine Optimization
                </p>
                <p className="font-jeko-regular text-[20px] font-normal leading-[29px] tracking-[0.02em] text-left">
                  Crafting digital experiences where beauty meets ROI, turning
                  heads and unlocking revenue potential with every click.
                </p>
                <div className="flex flex-wrap gap-3 text-neutral">
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    UI/UX Design
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Wordpress
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Ecommerce
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    SaaS
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Shopify
                  </button>
                </div>
                <button className="w-fit mt-5 px-[12px] py-[8px] rounded-[47px] border-[1px] border-orange text-orange text-center">
                  View Our Work
                </button>
              </div>
            </div>
            <div className="m-auto">
              <video
                className="w-[519px] h-[519px] rounded-[20px] [box-shadow:0px_36px_74.2px_11px_#F4BF4FC2]"
                loop
                muted
                autoPlay
                src="videos/create-capture-curate.mp4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 6th section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 5 && (
          <motion.div
            id="section6"
            className="section flex h-[100vh] px-[45px] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={springTransition}
          >
            <div className="w-[60%] m-auto">
              <video
                className="w-[519px] h-[519px] rounded-[20px] [box-shadow:0px_36px_74.2px_11px_#F4BF4FC2]"
                loop
                muted
                autoPlay
                src="videos/ig-posts.webm"
              />
            </div>
            <div className="m-auto">
              <div className="w-[511px] flex flex-col gap-6">
                <p className="font-jeko-bold text-[42px] font-normal leading-[52.5px] text-left text-neutral">
                  Digital Marketing
                </p>
                <p className="font-jeko-regular text-[20px] font-normal leading-[29px] tracking-[0.02em] text-left">
                  Delivering eye-catching motion graphics and campaigns that
                  earn attention, spark emotion and increase conversions.
                </p>
                <div className="flex flex-wrap gap-3 text-neutral">
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    UI/UX Design
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Wordpress
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Ecommerce
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    SaaS
                  </button>
                  <button className="px-[12px] w-100 py-[8px] rounded-[47px] border-[1px] border-neutral-200 text-center">
                    Shopify
                  </button>
                </div>
                <button className="w-fit mt-5 px-[12px] py-[8px] rounded-[47px] border-[1px] border-orange text-orange text-center">
                  View Our Work
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 7th section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 6 && (
          <motion.div
            id="section7"
            className="section flex flex-col justify-center gap-12 h-[100vh] pl-[55px] mx-auto z-10"
            initial={{ x: "100%" }}
            whileInView={{ x: 0 }}
            transition={springTransition}
            exit={{x: '-10vw'}}
          >
            <div>
              <motion.div
                id="section7-texts"
                className=" w-[378px] flex flex-col text-neutral"
                exit={{ opacity: 0 }}
                transition={springTransition}
              >
                <p className="font-jeko-bold text-[56px] font-normal leading-[56px] text-left">
                  Our Works
                </p>
                <p className="font-jeko-regular text-[16px] font-normal leading-[20px] tracking-[0.02em] text-left">
                  Delivering eye-catching motion graphics and campaigns that
                  earn attention, spark emotion and increase conversions.
                </p>
              </motion.div>
            </div>
            <motion.div
              id="section7-images"
              className="flex flex-col gap-6"
              exit={{ x: "-100%" }}
              transition={springTransition}
            >
              <div className="relative flex gap-6 h-[480px]">
                <div className="relative w-[720px] h-[480px]">
                  <img
                    className="absolute"
                    src="/images/our-works-1.png"
                    alt="our work 1"
                  />
                  {/* little card */}
                  <div className="absolute bottom-0 flex gap-3 items-center bg-orange rounded-[16px] w-[360px] h-[107px] justify-center">
                    <div className="flex flex-col gap-3 w-[250px]">
                      <p className="font-jeko-bold text-[20px] font-normal leading-[25px] tracking-[0.02em] text-left text-black">
                        Healthcare App
                      </p>
                      <p className="font-jeko-regular text-[16px] font-normal leading-[20px] tracking-[0.02em] text-left text-[#141039]">
                        We don't do cookie-cutter solutions Delivering
                      </p>
                    </div>
                    <div className="bg-blue-950 rounded-[50%] w-[44px] h-[44px] flex justify-center text-center items-center">
                      <img
                        className="w-[14px] h-[14px]"
                        src="images/arrow-top-right.png"
                        alt="arrow top right"
                      />
                    </div>
                  </div>
                </div>
                <img src="/images/our-works-2.png" alt="our work 2" />
                <img src="/images/our-works-3.png" alt=" our work 3" />
              </div>
              <div className="flex justify-between items-center text-center">
                <img
                  className="w-[72px] h-[8px]"
                  src="images/slider-dots.png"
                  alt="slider dots"
                />
                <div className="px-[45px] flex gap-3">
                  <div className="rounded-[50%] border-[1px] p-[12px] border-orange">
                    <img
                      className="w-[16px] h-[16px]"
                      src="images/arrow-left.png"
                      alt="arrow left"
                    />
                  </div>
                  <div className="rounded-[50%] border-[1px] p-[12px] border-orange">
                    <img
                      className="w-[16px] h-[16px]"
                      src="images/arrow-right.png"
                      alt="arrow right"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 9th section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 8 && (
          <motion.div
            id="section9"
            className="section flex flex-col justify-center gap-8 text-neutral h-[100vh] px-[45px] z-10"
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            <div className="flex justify-between items-center px-[30px] h-[330px]">
              <p className="font-jeko-bold text-[56px] font-normal leading-[56px] text-left w-[360px] h-[110px]">
                Customer Testimonial
              </p>
            </div>
            <div className="flex flex-col gap-6 pl-[30px]">
              <div className="flex gap-6 justify-start items-center">
                <div className="flex items-center bg-[var(--Bg-Secondary,_#141414)] rounded-[20px] w-[360px] h-[320px]">
                  <div className="flex flex-col mx-auto justify-center gap-6 ">
                    <div className="flex">
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                    </div>
                    <p className="font-jeko-bold text-[16px] font-normal leading-[24px] text-left w-[295px]">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique. Duis
                      cursus, mi quis viverra ornare."
                    </p>
                    <div className="flex gap-4">
                      <img src="images/avatar.png" alt="default avatar" />
                      <div>
                        <p>Name Surname</p>
                        <p>Position, Company name</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-[var(--Bg-Secondary,_#141414)] rounded-[20px] w-[360px] h-[320px]">
                  <div className="flex flex-col mx-auto justify-center gap-6 ">
                    <div className="flex">
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                    </div>
                    <p className="font-jeko-bold text-[16px] font-normal leading-[24px] text-left w-[295px]">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique. Duis
                      cursus, mi quis viverra ornare."
                    </p>
                    <div className="flex gap-4">
                      <img src="images/avatar.png" alt="default avatar" />
                      <div>
                        <p>Name Surname</p>
                        <p>Position, Company name</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-[var(--Bg-Secondary,_#141414)] rounded-[20px] w-[360px] h-[320px]">
                  <div className="flex flex-col mx-auto justify-center gap-6 ">
                    <div className="flex">
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                      <img src="images/star.png" alt="star" />
                    </div>
                    <p className="font-jeko-bold text-[16px] font-normal leading-[24px] text-neutral text-left w-[295px]">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique. Duis
                      cursus, mi quis viverra ornare."
                    </p>
                    <div className="flex gap-4">
                      <img src="images/avatar.png" alt="default avatar" />
                      <div>
                        <p>Name Surname</p>
                        <p>Position, Company name</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              id="section9-slider"
              className="flex justify-between items-center text-center px-[30px]"
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={springTransition}
            >
              <img
                className="w-[72px] h-[8px]"
                src="images/slider-dots.png"
                alt="slider dots"
              />
              <div className="flex gap-3">
                <div className="rounded-[50%] border-[1px] p-[12px] border-orange">
                  <img
                    className="w-[16px] h-[16px]"
                    src="images/arrow-left.png"
                    alt="arrow left"
                  />
                </div>
                <div className="rounded-[50%] border-[1px] p-[12px] border-orange">
                  <img
                    className="w-[16px] h-[16px]"
                    src="images/arrow-right.png"
                    alt="arrow right"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 8th section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 7 && (
          <motion.div
            id="section8"
            className="section flex justify-center gap-6 text-neutral h-[100vh] px-[30px] z-10"
            initial={{ opacity: 0, y: "-100%" }}
            whileInView={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            {/* Our results */}
            <div className="flex flex-col justify-center gap-6 items-center ">
              <div className="flex flex-col justify-center items-center gap-6 w-[405px] h-[320px]">
                <p className="font-jeko-bold text-[56px] font-normal leading-[56px] text-left">
                  Our Results
                </p>
                <p className="font-jeko-regular text-[16px] font-normal leading-[20px] tracking-[0.02em] text-left w-[315px]">
                  Solid Strategy aligned with business needs and robust data
                  analysis are fundamental ingredients to extract actionable
                  insights
                </p>
              </div>
              <div className="flex justify-center items-center gap-6 w-[405px] h-[320px] rounded-[21px] bg-[var(--Bg-Secondary,_#141414)]">
                <div className="flex flex-col gap-3 w-[185px]">
                  <p className="font-jeko-bold text-[32px] font-normal leading-[38.4px] text-left">
                    +10
                  </p>
                  <p className="font-jeko-regular text-[16px] font-normal leading-[24px] text-left">
                    Solid Strategy aligned with business needs and robust.
                  </p>
                </div>
                <img src="images/163.png" alt="decor" />
              </div>
            </div>
            {/* Second results */}
            <div className="flex flex-col justify-center gap-6 items-center ">
              <div className="flex gap-6">
                {/* 100k */}
                <div className="flex justify-center items-center gap-6 w-[405px] h-[320px] rounded-[21px] bg-[var(--Bg-Secondary,_#141414)]">
                  <div className="flex flex-col gap-3 w-[185px]">
                    <p className="font-jeko-bold text-[32px] font-normal leading-[38.4px] text-left">
                      100K
                    </p>
                    <p className="font-jeko-regular text-[16px] font-normal leading-[24px] text-left">
                      Solid Strategy aligned with business needs and robust.
                    </p>
                  </div>
                  <img src="images/162.png" alt="decor" />
                </div>
                {/* +10 */}
                <div className="flex justify-center items-center gap-6 w-[405px] h-[320px] rounded-[21px] bg-[var(--Bg-Secondary,_#141414)]">
                  <div className="flex flex-col gap-3 w-[185px]">
                    <p className="font-jeko-bold text-[32px] font-normal leading-[38.4px] text-left">
                      +10
                    </p>
                    <p className="font-jeko-regular text-[16px] font-normal leading-[24px] text-left">
                      Solid Strategy aligned with business needs and robust.
                    </p>
                  </div>
                  <img src="images/165.png" alt="decor" />
                </div>
              </div>
              {/* long +10 */}
              <div className="flex justify-evenly items-center gap-6 w-[830px] h-[320px] rounded-[21px] bg-[var(--Bg-Secondary,_#141414)]">
                <div className="flex flex-col gap-3 w-[610px] h-[24px]">
                  <p className="font-jeko-bold text-[32px] font-normal leading-[38.4px] text-left">
                    +10
                  </p>
                  <p className="font-jeko-regular text-[16px] font-normal leading-[24px] text-left">
                    Solid Strategy aligned with business needs and robust.
                  </p>
                </div>
                <img src="images/166.png" alt="decor" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 10th section */}
      <AnimatePresence mode="popLayout">
        {currIndex === 9 && (
          <motion.div
            id="section10"
            className="section flex flex-col gap-6 justify-end items-center px-[45px] h-[43vh] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springTransition}
          >
            <p className="font-jeko-bold text-[28px] font-normal leading-[33.6px] text-center w-[480px] h-[70px]">
              Trusted by the world's best companies
            </p>
            <Marquee autoFill pauseOnHover play className="flex">
              <div className="flex gap-6">
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/rel-logo.png"
                  alt="relume"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/web-logo-2.png"
                  alt="webflow"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/rel-logo.png"
                  alt="relume"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/web-logo-2.png"
                  alt="webflow"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/rel-logo.png"
                  alt="relume"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/web-logo-2.png"
                  alt="webflow"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/rel-logo.png"
                  alt="relume"
                />
                <img
                  className="object-contain w-[140px] h-[56px]"
                  src="images/web-logo-2.png"
                  alt="webflow"
                />
              </div>
            </Marquee>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
