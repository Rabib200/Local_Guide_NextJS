export default function ServicesCards() {
  return (
    // <div className="w-[350px] rounded-13xl bg-white h-[414px] flex flex-col items-center justify-start p-16 box-border gap-[64px_0px] text-center text-[28px] text-black font-ibm-plex-sans">

    <div className="flex flex-col grow self-stretch px-12 py-12  w-5/6 text-center bg-white shadow shadow-yellow-500/35 rounded-[32px] max-md:px-5 max-md:mt-5">
      <img
        loading="lazy"
        src="/images/globe.png"
        className="self-center mt-3.5 w-16 aspect-square"
      />
      {/* <img
        className="w-16 relative h-16 object-cover"
        alt=""
        src="/images/globe.png"
      /> */}
      <div className="self-stretch flex flex-col items-center justify-start gap-[32px_0px]">
        <div className="self-stretch relative leading-[120%]">
          Best Local Tour Guide
        </div>
        <div className="self-stretch relative text-lg leading-[160%] font-body text-grey-scale-black-50">
          find the best local tour guide to visit a area
        </div>
      </div>
    </div>
  );
}
