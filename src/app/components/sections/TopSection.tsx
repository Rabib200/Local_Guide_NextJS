import Link from "next/link";
import MainButton from "../common/MainButton";

export default function TopSection() {
  return (
    <section className="flex justify-center items-center mt-16 md:z-[0]">
      <div className="pt-32 md:pt-4">
        <div className="flex items-center">
          <p className="text-[1.128rem] font-[700] text-primary uppercase mb-4">
            Explore the world!
            <img
              src="/images/bag.png"
              alt="bag"
              className="-mt-7 -mr-10 ml-auto z-0"
            />
          </p>
        </div>

        <div className="flex flex-col">
          <div className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            Travel
            <div className="flex flex-col">
              <span className="ml-8 z-10 text-yellow-400">the</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-yellow-400">
            beautiful world
          </p>
          <p className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            with the Locals
          </p>
        </div>

        <div className="flex flex-col">
          <p className="my-[0.6rem] font-bold leading-[1.692rem] text-lightGray text-[1rem]">
            Wherever you visit, find your localeader to guide you
          </p>
          <p className=" font-bold  text-lightGray ">
            in your enthralling journey!
          </p>
        </div>
        <div className="flex gap-6 items-center ">
          <Link href={"/dest_loc/"}>
            <div>
              <MainButton
                text="Get Started"
                classes="bg-secondary text-white font-[600] shadow-none rounded-[0.564rem] border-none hover:bg-secondary  w-[9.58788rem] h-[3rem]"
              />
            </div>
          </Link>

          <div className="flex items-center mt-6 hover:cursor-pointer">
            <img
              src="/images/play-shadow.png"
              alt="rounded play icon with shadow"
            />
            <p className="text-lightGrayAlt -mt-6 -ml-4 font-bold">
              Watch Demo
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src="/images/TopSecImages.png
          "
          alt="girl with phone with aircrafts on the background"
        />
      </div>
    </section>
  );
}
