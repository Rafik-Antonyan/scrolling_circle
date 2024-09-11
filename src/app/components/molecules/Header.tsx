"use client";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
      ${isScrolled ? "px-[60px] sticky top-0" : "static"} 
      z-50 transition-all duration-300 h-[80px] pt-5`}
    >
      <div
        className={`
        ${
          isScrolled
            ? "px-[15px] bg-[#0000004D] backdrop-blur-lg sticky"
            : "px-[20px] bg-transparent static"
        }
      } flex transition-all duration-300 justify-between h-[74px] left-[44px] py-[16px] rounded-[24px] font-jeko-bold`}
      >
        <a href="#">
          <img
            className="w-[141px] h-[42px]"
            src="/images/logo.png"
            alt="uplift"
          />
        </a>
        <div className="flex gap-3 text-neutral items-center">
          <a href="#">Services</a>
          <a href="#">Our Works</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>
        <button className="bg-orange w-[152px] h-[40px] px-[18px] py-[12px] rounded-[16px] text-[16px] font-normal leading-[16px] text-center text-black">
          Start a project
        </button>
      </div>
    </div>
  );
};

export default Header;
