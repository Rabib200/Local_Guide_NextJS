export default function ServicesCards() {
  return (
    <div className="w-[350px] rounded-13xl bg-white h-[414px] flex flex-col items-center justify-start p-16 box-border gap-[64px_0px] text-center text-[28px] text-black font-ibm-plex-sans">
      <img
        className="w-16 relative h-16 object-cover"
        alt=""
        src="/images/globe.png"
      />
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
