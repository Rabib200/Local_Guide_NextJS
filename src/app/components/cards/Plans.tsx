import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
export default function Plans() {
  return (
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
    <Card sx={{ maxWidth: 345, backgroundColor: "lightgray" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/images/rome.png"
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
            Trekking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Walk at London Bridge
          </Typography>
          <Typography variant="body2" color="text.secondary">
            35 $ per person
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-7">
            {/* 2 hours | Family Plan | BUS */}
            <div className="flex gap-2">
              <img src="/images/clock.png" alt="" /> 2 hours
              <img src="/images/car.png" alt="" /> BUS
              <img src="/images/profile.png" alt="" /> Family Plan
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
