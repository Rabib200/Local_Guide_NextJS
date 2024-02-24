"use client";
import { PrismaClient } from "@prisma/client";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import Guides from "../components/cards/Guides";
import Plans from "../components/cards/Plans";
import Navbar from "../components/common/Navbar";

export interface Plan {
  type: string;
  title: string;
  cost: string;
  duration: string;
  package_name: string;
  transportation: string;
  image: string;
}
export interface Guide {
  type: string;
  title: string;
  cost: string;
  duration: string;
  package_name: string;
  area: string;
  image: string;
}

export interface PlansList {
  plansData: Plan[];
}
export interface GuidesList {
  guidesData: Guide[];
}
const prisma = new PrismaClient();

export default function Page() {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/plans/plans");
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("/api/guides/guides");
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchGuides();
  }, []);

  const handleSwitchChange = (checked) => {
    setSwitchChecked(checked);
    console.log("work ", checked);
  };

  return (
    <section>
      <Navbar />
      <div className="flex justify-center mt-10">
        <Switch
          defaultChecked={true}
          onChange={handleSwitchChange}
          checkedChildren="Top Destinations"
          unCheckedChildren="Top Local Guides"
          autoFocus={true}
          style={{
            backgroundColor: "gray",
            width: "300px",
            fontFamily: "sans-serif",
          }}
        />
      </div>
      {switchChecked ? (
        <div>
          <h5 className="volkhov text-[3.125rem] text-title font-[700] flex justify-center mt-6">
            TOP DESTINATIONS
          </h5>
          <div className="flex flex-wrap justify-start gap-20 mt-20 ml-20">
            <Plans plansData={plans} />
          </div>
        </div>
      ) : (
        <div>
          <h5 className="volkhov text-[3.125rem] text-title font-[700] flex justify-center mt-6">
            TOP LOCAL GUIDES
          </h5>
          <div className="flex flex-wrap justify-start gap-20 mt-20 ml-20">
            <Guides guidesData={guides} />
          </div>
        </div>
      )}
    </section>
  );
}
