"use client";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="h-60 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
        <div className="text-center mt-20">
          <h1 className="text-white text-5xl font-bold mb-2">
            Find Your Guide Anywhere
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
