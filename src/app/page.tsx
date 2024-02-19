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
        <div className="px-4 flex flex-col gap-[7.69rem]">
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

          <LogoGroupSection />
          <ServicesSection />
          <TopDestination />
          <MidSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
};

export default Home;
