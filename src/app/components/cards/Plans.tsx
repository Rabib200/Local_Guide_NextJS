import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { PlansList } from "../../dest_loc/page";

export default function Plans(props: PlansList & { getEmail: string }) {
  const router = useRouter();

  const handlePlanClick = (id: string, email: string) => {
    router.push(`/plan_details?id=${id}&email=${email}`);
    // <Details id={id} />;
  };
  return (
    <>
      {props.plansData.map((item) => (
        <Card
          sx={{ width: 345, backgroundColor: "lightgray" }}
          onClick={() => handlePlanClick(item.id, props.getEmail)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`/images/${item.image}`}
              alt="rome"
              className="h-[164.2px] w-[345px] relative rounded object-cover z-[1] mq700:flex-1 "
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="volkov font-[500] text-[1.2rem]"
              >
                {item.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.title}, {item.location}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-5 flex justify-end"
              >
                {item.cost} $ per person
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-7"
              >
                {/* 2 hours | Family Plan | BUS */}
                <div className="flex gap-3 mt-5">
                  <img src="/images/clock.png" alt="" /> {item.duration} hrs
                  <img src="/images/car.png" alt="" /> {item.transportation}
                  <img src="/images/profile.png" alt="" /> {item.package_name}
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
    // <div className="w-[350px] rounded-13xl bg-white h-[414px] flex  items-center justify-start p-16 box-border gap-[64px_0px] text-center text-[28px] text-black font-ibm-plex-sans">
    //   <img
    //     src="/images/rome.png"
    //     alt=""
    //     className="h-[164.2px] w-[215.9px] relative rounded object-cover z-[1] mq700:flex-1"
    //   />
    //   <div className="px-10 flex-col">
    //     <div className="volkov font-[500] text-[1.2rem] flex flex-col px-10 bg-blue-600 ml-5 rounded-normal text-white">
    //       Trekking
    //     </div>
    //     <div className="volkov font-[500] text-[2.2rem] flex flex-col px-10">
    //       dsad
    //     </div>
    //     <div className="volkov font-[500] text-[1.2rem] flex flex-col px-10">
    //       dsadasd
    //     </div>
    //   </div>
    // </div>
  );
}
