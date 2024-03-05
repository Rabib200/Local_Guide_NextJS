"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Navbar from "../components/common/Navbar";

export interface Wish {
  id: true;
  email: string;
  plan: string;
  num_people: string;
  guide_name: string;
  cost: string;
}
export interface Guide {
  id: true;
  type: string;
  title: string;
  area: string;
  image: string;
}

export interface WishList {
  wishData: Wish[];
}
export interface GuidesList {
  guidesData: Guide[];
}

export default function Wish() {
  const [wish, setWish] = useState<Wish[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [planImages, setPlanImages] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  useEffect(() => {
    const fetchWishPlans = async () => {
      try {
        const response = await fetch(`/api/plans/wishPlan?email=${email}`);
        const data = await response.json();
        setWish(data);

        // Fetch images for plans
        const planImageRequests = data.map((item) => {
          return fetch(`/api/plans/plans?plan=${item.plan}`)
            .then((response) => response.json())
            .then((imageData) => ({ [item.plan]: imageData.image }));
        });

        Promise.all(planImageRequests)
          .then((planImagesData) => {
            const images = Object.assign({}, ...planImagesData);
            setPlanImages(images);
          })
          .catch((error) => {
            console.error("Error fetching plan images:", error);
          });
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchWishPlans();
  }, [email]);

  // Calculate total cost for each item
  const calculateTotalCost = (item: Wish) => {
    return (parseFloat(item.cost) * parseInt(item.num_people)).toFixed(2);
  };

  return (
    <div>
      <Navbar email={email} />
      <div>
        <h5 className="volkhov text-[3.125rem] text-title font-[700] flex justify-center mt-6">
          Your Wish List of Tour Plans
        </h5>
      </div>
      <div className="flex gap-8 justify-center mt-10 border-blue-700 flex-wrap">
        {wish.map((item) => (
          <Card
            key={item.id}
            sx={{
              width: "345px",
              height: "180px",
              backgroundColor: "lightgray",
              marginBottom: "20px",
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="volkov font-[500] text-[1.2rem]"
                  style={{ marginBottom: "10px" }}
                >
                  {item.plan}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginBottom: "5px" }}
                >
                  {item.num_people} people
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginBottom: "5px" }}
                >
                  Guide: {item.guide_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginBottom: "5px" }}
                >
                  Cost per person: ${item.cost}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginBottom: "5px" }}
                >
                  Total Cost: ${calculateTotalCost(item)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
