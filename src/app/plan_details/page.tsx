/* eslint-disable @next/next/no-img-element */
"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PrismaClient } from "@prisma/client";
import { useSearchParams } from "next/dist/client/components/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";

const prisma = new PrismaClient();

// export interface Plan {
//   id: true;
//   type: string;
//   title: string;
//   cost: string;
//   duration: string;
//   package_name: string;
//   transportation: string;
//   image: string;
// }
export interface Guide {
  id: true;
  type: string;
  title: string;
  cost: string;
  duration: string;
  package_name: string;
  area: string;
  image: string;
}
export interface GuidesList {
  guidesDataList: Guide[];
}

// eslint-disable-next-line @next/next/no-async-client-component
export default function Details() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const getEmail = searchParams?.get("email");
  // console.log("id: ", userId);
  const [planData, setPlanData] = useState("");

  const [guidesData, setGuidesData] = useState<Guide[]>([]);

  useEffect(() => {
    fetch(`/api/details/details?id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          console.log("ERROR fetching");
        }
        return response.json();
      })
      .then((data) => {
        setPlanData(data);
      })
      .catch((error) => {
        console.log("Error :", error.message);
      });
  }, [userId]);
  const prop = planData.location;
  // console.log(prop);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          `/api/guide_loc/guide_loc?location=${prop}`
        );
        const data = await response.json();
        setGuidesData(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchGuides();
  }, [prop]);

  // useEffect(() => {
  //   fetch(`/api/guide_loc/guide_loc?location=${prop}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.log("ERROR fetching");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setGuidesData(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error :", error.message);
  //     });
  // }, [planData.location]);

  if (!planData) {
    return <div>Loading......</div>;
  }

  return (
    <div>
      <Navbar email={getEmail} />
      <div className="flex justify-center">
        <Card sx={{ width: 600, backgroundColor: "lightgray" }}>
          <CardMedia
            component="img"
            height="140"
            image={`/images/${planData.image}`}
            alt="rome"
            className="h-[400px] w-[345px] relative rounded object-cover z-[1] mq700:flex-1 "
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="volkov font-[500] text-[1.2rem]"
            >
              {planData.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {planData.title} , {planData.location}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="mt-5 flex justify-end"
            >
              {planData.cost} $ per person
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-7">
              {/* 2 hours | Family Plan | BUS */}
              <div className="flex gap-3 mt-5">
                <img src="/images/clock.png" alt="" /> {planData.duration} hrs
                <img src="/images/car.png" alt="" /> {planData.transportation}
                <img src="/images/profile.png" alt="" />
                {planData.package_name}
              </div>
              <Link
                href={`/plan_form/?key=${prop}&planID=${planData.id}&email=${getEmail}&title=${planData.title}`}
              >
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-10">
                  Register
                </button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
