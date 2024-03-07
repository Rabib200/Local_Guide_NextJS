"use client";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";

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

export default function Details() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const getEmail = searchParams?.get("email");

  const [guideData, setGuideData] = useState("");

  useEffect(() => {
    fetch(`api/details/guide_details?id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          console.log("ERROR fetching");
        }
        return response.json();
      })
      .then((data) => {
        setGuideData(data);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }, [userId]);

  if (!guideData) {
    return <div>Loading ....</div>;
  }

  return (
    <div>
      <div>
        <Navbar email={getEmail} />
        <div className="flex justify-center">
          <Card sx={{ width: 600, backgroundColor: "lightgray" }}>
            <CardMedia
              component="img"
              height="140"
              image={`/images/${guideData.image}`}
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
                {guideData.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {guideData.title} , {guideData.area}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-5 flex justify-end"
              >
                {guideData.cost} $ per person
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-7"
              >
                {/* 2 hours | Family Plan | BUS */}
                <div className="flex gap-3 mt-5">
                  <img src="/images/clock.png" alt="" /> {guideData.duration}{" "}
                  hrs
                  <img src="/images/profile.png" alt="" />
                  {guideData.package_name}
                </div>
                {/* <Link
                href={`/plan_form/?key=${prop}&planID=${planData.id}&email=${getEmail}&title=${planData.title}`}
              >
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-10">
                  Register
                </button>
              </Link> */}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
