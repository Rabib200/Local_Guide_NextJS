import ServicesCards from "../cards/ServicesCards";

export default function ServicesSection() {
  return (
    <>
      <section className="flex justify-center items-center px-2 mt-16 md:z-[0]  gap-[4.69rem] ">
        <div className="pt-32 md:pt-4 gap-[7.69rem] ">
          <div className="flex items-center">
            <div className="flex flex-col mr-50 space-x-50 ">
              {/* <div className="volkhov font-[600] text-[0rem] md:text-[2.73756rem] leading-large inline-flex text-lightBlue"> */}
              <div className="text-[1.65rem] font-[700] text-primary uppercase mb-4 tracking-widest">
                Services
              </div>
              <div className="flex flex-col">
                <div className="volkhov font-[500] text-[3rem] md:text-[3.73756rem] leading-large inline-flex text-lightBlue">
                  View Our Amazing
                </div>
                <div className="volkhov font-[500] text-[3rem] md:text-[3.73756rem] leading-large inline-flex text-yellow-400">
                  Categories
                </div>
                <div className="volkhov font-[500] text-[3rem] md:text-[3.73756rem] leading-large inline-flex text-lightBlue">
                  for you!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-row pt-4 px-2
        "
        >
          <div className="flex flex-col w-5/6">
            <ServicesCards />
          </div>

          <div className="flex flex-col w-5/6">
            <ServicesCards />
          </div>
          <div className="flex flex-col w-5/6">
            <ServicesCards />
          </div>
        </div>
      </section>
    </>
  );
}
