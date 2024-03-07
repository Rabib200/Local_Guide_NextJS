import { GuidesList } from "@/app/dest_loc/page";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
export default function Guides(props: GuidesList & { getEmail: string }) {
  const router = useRouter();
  const handleGuideClick = (id: string, email: string) => {
    router.push(`/guide_details?id=${id}&email=${email}`);
  };

  return (
    <>
      {props.guidesData.map((item) => (
        <Card
          sx={{ width: 345, backgroundColor: "lightgray" }}
          onClick={() => handleGuideClick(item.id, props.getEmail)}
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
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.type}
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
                  <img src="/images/car.png" alt="" /> {item.area}
                  <img src="/images/profile.png" alt="" /> {item.package_name}
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
}
