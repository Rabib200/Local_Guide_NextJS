import ServicesCards from "../cards/ServicesCards";

export default function ServicesSection() {
  return (
    <>
      <section className="flex justify-center items-center mt-16 md:z-[9999]">
        <div className="pt-32 md:pt-4">
          <div className="flex items-center">
            <div className="flex flex-col mr-50">
              <div className="volkhov font-[600] text-[0rem] md:text-[2.73756rem] leading-large inline-flex text-lightBlue">
                Services
              </div>
              <div className="flex flex-col">
                <div className="volkhov font-[500] text-[3rem] md:text-[3.73756rem] leading-large inline-flex text-lightBlue">
                  Our Top Value
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
          className="flex
          flex-row pt-4
        "
        >
          <ServicesCards />
          <ServicesCards />
          <ServicesCards />
        </div>
      </section>
    </>
  );
}
