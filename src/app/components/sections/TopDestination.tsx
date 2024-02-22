import TopDestinationCards from "../cards/TopDestinationCards";

export default function TopDestination() {
  return (
    <section className="flex justify-center items-center mt-16 md:z-[0]">
      <div className="pt-32 md:pt-4 flex -mt-20 ">
        <div className="flex items-center">
          <div className="flex flex-col mr-50 -mt-5">
            <div className="text-lightGray text-[1.125rem] font-[600] ">
              Top Destinations
            </div>
            <div className="flex flex-col">
              <div className="volkhov text-[3.125rem] text-title font-[700]">
                Explore <br /> Top Tours
              </div>
            </div>
            <div className="flex items-center mt-20 hover:cursor-pointer">
              <img
                src="/images/rightArrowBlue.png"
                alt="rounded play icon with shadow"
              />
            </div>
          </div>
        </div>
      </div>{" "}
      <div
        className="flex justify-between px-20
      "
      >
        {" "}
        <TopDestinationCards />
        <TopDestinationCards />
        <TopDestinationCards />
      </div>
    </section>
  );
}
{
  /* <div className="flex flex-col">
          <p className="text-lightGray text-[1.125rem] font-[600] text-center">
            Top Destinations
          </p>
          <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
            Explore Top Tours
          </p>
        </div>
        <div>dsadsadasd</div> */
}
