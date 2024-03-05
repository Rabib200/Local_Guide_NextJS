"use client";
import { Button, MenuItem, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export interface PlansList {
  plansDataList: Plan[];
}
export interface GuidesList {
  guidesDataList: Guide[];
}

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const planID = searchParams.get("planID");
  const getEmail = searchParams?.get("email");
  const getPlan = searchParams?.get("title");

  const [guidesData, setGuidesData] = useState<Guide[]>([]);
  const [planData, setPlanData] = useState<Plan[]>([]);
  const [planName, setPlanNameData] = useState("");
  const [formData, setFormData] = useState({
    email: getEmail || "",
    plan: getPlan || "",
    num_people: "",
    guide_name: "",
    cost: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/addToWishlist/addToWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      console.log("Added to wishlist successfully");
      router.push(`/dest_loc?email=${formData.email}`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // console.log("plan:", planID);
  // console.log(key);

  useEffect(() => {
    fetch(`/api/details/details?id=${planID}`)
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
  }, [planID]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          `/api/guide_loc/guide_loc?location=${key}`
        );
        const data = await response.json();
        //guides data comes from here
        // console.log(data);
        setGuidesData(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchGuides();
  }, [key]);

  console.log("from planform:", guidesData);
  console.log("from planform plan details:", planData.title);

  return (
    <div className="flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6">
      <form
        autoComplete="off"
        className="flex flex-col justify-center mt-11"
        onSubmit={handleSubmit}
      >
        <h2 className="volkov font-[500] text-[2rem] flex justify-center mb-5 text-lightBlue-400">
          Fill your plan Form
        </h2>
        <TextField
          defaultValue={formData.email}
          variant="outlined"
          color="secondary"
          type="select"
          helperText="Email"
          onChange={handleChange}
          sx={{ mb: 3, width: 500 }}
        />
        <TextField
          defaultValue={formData.plan}
          // value={formData.plan}
          required
          variant="outlined"
          color="secondary"
          type="select"
          helperText="Tour Plan Name"
          onChange={handleChange}
          sx={{ mb: 3, width: 500 }}
        />
        <TextField
          label="Num of People"
          required
          variant="outlined"
          color="secondary"
          type="number"
          value={formData.num_people}
          onChange={handleChange}
          name="num_people"
          sx={{ mb: 3, width: 500 }}
        />

        <TextField
          select
          required
          label="Select your Available Guide"
          value={formData.guide_name}
          onChange={(e) => {
            handleChange(e);
            const selectedGuide = guidesData.find(
              (guide) => guide.title === e.target.value
            );
            setFormData((prevData) => ({
              ...prevData,
              cost: selectedGuide ? selectedGuide.cost : "",
            }));
          }}
          name="guide_name"
          sx={{ mb: 3, width: 500 }}
        >
          {guidesData.map((option) => (
            <MenuItem key={option.id} value={option.title}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={formData.cost}
          variant="outlined"
          color="secondary"
          type="text"
          helperText="Cost"
          onChange={handleChange}
          sx={{ mb: 3, width: 500 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Add to Wish List
        </Button>
      </form>
    </div>
  );
}
