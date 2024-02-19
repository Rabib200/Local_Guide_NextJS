export default function MidSection() {
  return (
    <section className="flex justify-center items-center mt-16 md:z-[9999]">
      <div className="flex flex-col">
        <img src="/images/GirlSitting.png" alt="" />
      </div>
      <div className="flex flex-col">
        <div className="IBM text-lightGray text-[1.125rem] font-[600]">
          TRAVEL POINT
        </div>
        <div className="flex flex-col ">
          <p className="volkhov font-[700] text-[2rem] md:text-[2.73756rem] leading-large inline-flex text-lightBlue">
            We are here to help you
          </p>
          <p className="volkov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            Find the best
          </p>
          <span className="text-yellow-400 volkov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex">
            {" "}
            Local Leader
          </span>
          <p className="volkhov font-[700] text-[2rem] md:text-[2.73756rem] leading-large inline-flex text-lightBlue">
            {" "}
            for your tour
          </p>
        </div>
      </div>
    </section>
  );
}
