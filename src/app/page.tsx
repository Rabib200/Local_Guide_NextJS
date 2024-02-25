"use client";
import Navbar from "./components/common/Navbar";
import FooterSection from "./components/sections/FooterSection";
import LogoGroupSection from "./components/sections/LogoGroupSection";
import MidSection from "./components/sections/MidSection";
import ServicesSection from "./components/sections/ServicesSection";
import TopDestination from "./components/sections/TopDestination";
import TopSection from "./components/sections/TopSection";
const Home = () => {
  return (
    <>
      <main className="relative poppins  md:px-[9rem]">
        <Navbar />
        <div className="h-30 bg-transparent text-transparent">
          <p className="">sdasdasdasdasdadasdasd</p>
          <p>sdasdasdasdasdadasdasddsada</p>
        </div>
        <div className="px-4 flex flex-col">
          <TopSection />
          <div className="absolute top-0 right-0 -z-10">
            <img src="/images/blob-shape.png" alt="blob background shape" />
          </div>
          <div className="absolute top-0 left-0 -z-10">
            <img
              src="/images/top-left-gradient.png"
              alt="blob background shape"
            />
          </div>

          <div className=" flex flex-col justify-between h-24"></div>
          <LogoGroupSection />
          <div className=" flex flex-col justify-between ">
            <ServicesSection />
          </div>

          <div className=" flex flex-col justify-between h-48"></div>
          <div className="flex  relative top-0 left- -z-10 space-y-5 gap-y-7">
            <TopDestination />
          </div>
          <div className=" flex flex-col justify-between h-64"></div>
          <div className="relative flex  top-0 left-0 -z-0 gap-[7.69rem] space-y-0.5 h-48 ">
            <MidSection />
          </div>
          <div className=" flex flex-col justify-between h-72"></div>
          <div className="relative flex flex-col top-0 left-10 -z-0 h- ">
            <FooterSection />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
