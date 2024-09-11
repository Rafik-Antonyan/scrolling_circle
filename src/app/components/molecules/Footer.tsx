"use client";

const Footer = () => {
  return (
    <div className="relative mt-[4rem] px-[45px]">
      <img
        className="absolute top-1 "
        src="/images/logo-short.png"
        alt="logo short"
      />
      <div className="relative h-[375px] bg-orange [clip-path:polygon(_0%_29.546%,0%_29.546%,0.02%_28.681%,0.077%_27.861%,0.17%_27.095%,0.293%_26.397%,0.445%_25.775%,0.622%_25.242%,0.821%_24.808%,1.039%_24.485%,1.272%_24.283%,1.519%_24.213%,4.974%_24.213%,4.974%_24.213%,5.221%_24.143%,5.454%_23.941%,5.672%_23.618%,5.871%_23.184%,6.048%_22.651%,6.2%_22.03%,6.323%_21.331%,6.416%_20.565%,6.473%_19.745%,6.493%_18.88%,6.493%_5.333%,6.493%_5.333%,6.513%_4.468%,6.57%_3.648%,6.662%_2.882%,6.786%_2.184%,6.938%_1.562%,7.115%_1.029%,7.314%_0.595%,7.532%_0.272%,7.765%_0.07%,8.012%_0%,98.481%_0%,98.481%_0%,98.729%_0.071%,98.964%_0.275%,99.183%_0.602%,99.383%_1.041%,99.56%_1.58%,99.712%_2.207%,99.835%_2.913%,99.926%_3.685%,99.982%_4.512%,100%_5.383%,99.8%_80.983%,99.8%_80.983%,99.778%_81.842%,99.719%_82.656%,99.626%_83.414%,99.503%_84.107%,99.351%_84.722%,99.174%_85.249%,98.976%_85.678%,98.759%_85.998%,98.526%_86.198%,98.281%_86.267%,72.6%_86.267%,72.6%_86.267%,72.353%_86.336%,72.12%_86.539%,71.902%_86.862%,71.703%_87.296%,71.526%_87.829%,71.374%_88.45%,71.25%_89.149%,71.158%_89.914%,71.101%_90.735%,71.081%_91.6%,71.081%_94.667%,71.081%_94.667%,71.061%_95.532%,71.003%_96.352%,70.911%_97.118%,70.788%_97.816%,70.636%_98.438%,70.459%_98.971%,70.26%_99.405%,70.042%_99.728%,69.808%_99.93%,69.562%_100%,1.519%_100%,1.519%_100%,1.272%_99.93%,1.039%_99.728%,0.821%_99.405%,0.622%_98.971%,0.445%_98.438%,0.293%_97.816%,0.17%_97.118%,0.077%_96.352%,0.02%_95.532%,0%_94.667%,0%_29.546%_)]">
        <div className="absolute flex w-[100%]">
          {/* Addresses */}
          <div className="ml-[7rem] mt-[2rem] flex flex-col gap-6 w-[50%]">
            <p className="font-jeko-bold text-[42px] font-normal leading-[52.5px] text-left text-black w-[440px]">
              Interested working with us ?
            </p>
            <p className="font-jeko-bold text-[24px] font-normal leading-[30px] text-left text-black w-[562px]">
              Drop us a line at{" "}
              <span className="underline">
                info@upliftsolutions.info or info@upliftsolutions.ae
              </span>
            </p>
            <div className="font-jeko-regular text-[16px] font-normal leading-[20px] tracking-[0.02em] text-left text-black w-[363px]">
              <p>Nepal Office : Thankot, Ward No.3 , Kathmandu,</p>
              <p>
                Nepal Dubai Office : Business Bay, Dubai, UAE Phone: +977
                9860361478
              </p>
            </div>
          </div>
          {/* Directions */}
          <div className="mt-auto flex gap-14 text-black">
            {/* Learn */}
            <div>
              <p className="font-jeko-bold text-[16px] font-normal leading-[28.96px] tracking-[0.02em] text-left">
                Learn
              </p>
              <div className="flex flex-col gap-2">
                <a href="#">About</a>
                <a href="#">Culture</a>
                <a href="#">Testimonals</a>
                <a href="#">Processes</a>
                <a href="#">FAQs</a>
                <a href="#">Branding</a>
                <a href="#">FAQs Blog</a>
              </div>
            </div>
            {/* Explore */}
            <div>
              <p className="font-jeko-bold text-[16px] font-normal leading-[28.96px] tracking-[0.02em] text-left">
                Explore
              </p>
              <div className="flex flex-col gap-2">
                <a href="#">Home</a>
                <a href="#">Work New</a>
                <a href="#">Services</a>
                <a href="#">Careers</a>
                <a href="#">Sectors Hex</a>
                <a href="#">Test Contact</a>
              </div>
            </div>
            {/* Social Media */}
            <div>
              <p className="font-jeko-bold text-[16px] font-normal leading-[28.96px] tracking-[0.02em] text-left">
                Follow
              </p>
              <div className="flex gap-3">
                <a href="#">
                  {" "}
                  <img
                    className="w-[20px] h-[20px]"
                    src="images/fb-logo.png"
                    alt="fb"
                  />{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    className="w-[20px] h-[20px]"
                    src="images/ig-logo.png"
                    alt="ig"
                  />{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    className="w-[20px] h-[20px]"
                    src="images/x-logo.png"
                    alt="x"
                  />{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    className="w-[20px] h-[20px]"
                    src="images/in-logo.png"
                    alt="in"
                  />{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    className="w-[20px] h-[20px]"
                    src="images/yt-logo.png"
                    alt="yt"
                  />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-10 flex gap-3 w-fit right-16 bottom-4">
        <a
          className="font-jeko-regular text-[14px] font-normal leading-[21px] text-left text-[#FFFFFFF2] underline"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="font-jeko-regular text-[14px] font-normal leading-[21px] text-lef text-[#FFFFFFF2] underline"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="font-jeko-regular text-[14px] font-normal leading-[21px] text-left text-[#FFFFFFF2] underline"
          href="#"
        >
          Cookies Settings
        </a>
      </div>
    </div>
  );
};

export default Footer;
