interface IProps {
  imageUrl: string;
  title: string;
  amount: string;
  duration: string;
  highlighted: boolean;
}

export default function TopDestination() {
// {
//   imageUrl,
//   title,
//   amount,
//   duration,
//   highlighted,
// }: IProps
  return (
    <div className="flex relative flex-col justify-between  pb-[2.63rem] ">
      <div className="  object-fill ">
        <img
          src="/images/coxs.png"
          alt="destination image"
          className="w-[314px] h-[20.43rem]  object-cover rounded-t-[1.5rem]"
        />
      </div>

      <div className="flex justify-between bg-white w-[314px] mt-[1.69rem] px-[1.62rem]  group-hover:shadow-md pb-[2rem] group-hover:rounded-[1.5rem]">
        <div className="flex-col  text-lightGray text-[1.125rem] font-bold">
          <p>Coxs Bazar </p>
        </div>
        <div className="flex-col  text-lightGray text-[1.125rem] font-bold">
          <p>6000 BDT</p>
        </div>
      </div>
      <div className="flex-col">
        <div className=" text-lightGray text-[1.125rem] font-bold ml-6  w-[300px]">
          Rabib Haque
        </div>
        <div className="text-lightGray text-[1.125rem] font-[400] ml-6  w-[250px]">
          Explore the world’s largest unbroken sea beach with it’s native
          resident!
        </div>
      </div>
    </div>
  );
}
