"use client";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Header from "../components/searchCom/Header";

export interface Plan {
  id: true;
  type: string;
  title: string;
  cost: string;
  duration: string;
  package_name: string;
  transportation: string;
  location: string;
  image: string;
}

export interface PlansList {
  plansData: Plan[];
}

export default function Search({
  searchParams: { packagename },
}: {
  searchParams: { packagename: string | undefined };
}) {
  const [Qplans, setQplan] = useState<Plan[]>([]);
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const router = useRouter();

  useEffect(() => {
    const fetchPlansByPackageName = async () => {
      try {
        const response = await fetch(
          `/api/search_query/search_query?packagename=${packagename}`
        );
        const data = await response.json();
        setQplan(data);
      } catch (error: any) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlansByPackageName();
  }, [packagename]);

  const handleSearchClick = (id: string, email: string) => {
    router.push(`/plan_details?id=${id}&email=${email}`);
  };

  return (
    <>
      <section>
        <Navbar email={email} />
        <div className="text-left text-lg py-3 m-auto flex justify-center">
          <Header email={email} />
        </div>
        <div className="flex flex-wrap justify-start gap-20 mt-20 ml-20">
          {Qplans.map((item) => (
            <Card
              sx={{ width: 345, backgroundColor: "lightgray" }}
              onClick={() => handleSearchClick(item.id, email)}
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
