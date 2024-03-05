import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PrismaClient } from "@prisma/client";
import Header from "../components/searchCom/Header";

const prisma = new PrismaClient();
const fetchPlansByPackageName = async (packagename: string | undefined) => {
  const select = {
    id: true,
    type: true,
    title: true,
    cost: true,
    duration: true,
    package_name: true,
    transportation: true,
    image: true,
  };

  if (!packagename) {
    console.log("no");
    return await prisma.plans.findMany({ select });
  }
  const Qplans = await prisma.plans.findMany({
    where: {
      package_name: {
        contains: packagename.toLowerCase(),
        mode: "insensitive",
      },
    },
    select,
  });
  return Qplans;
};

export default async function Search({
  searchParams: { packagename },
}: {
  searchParams: { packagename: string | undefined };
}) {
  const Qplans = await fetchPlansByPackageName(packagename);
  console.log(Qplans);

  return (
    <>
      <section>
        {/* <Navbar /> */}
        <div className="text-left text-lg py-3 m-auto flex justify-center">
          <Header />
        </div>
        <div className="flex flex-wrap justify-start gap-20 mt-20 ml-20">
          {Qplans.map((item) => (
            <Card sx={{ width: 345, backgroundColor: "lightgray" }}>
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
                    {item.title}
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
                      <img src="/images/profile.png" alt="" />{" "}
                      {item.package_name}
                    </div>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
