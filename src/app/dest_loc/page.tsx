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

export interface PlansList {
  plansData: Plan[];
}

const prisma = new PrismaClient();

export default function Page() {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await prisma.plans.findMany({
          select: {
            type: true,
            title: true,
            cost: true,
            duration: true,
            package_name: true,
            transportation: true,
            image: true,
          },
        });

        setPlans(plansData);
        console.log("passed through here");
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
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
            <Guides />
            <Guides />
            <Guides />
            <Guides />
            <Guides />
          </div>
        </div>
      )}
    </section>
  );
}
