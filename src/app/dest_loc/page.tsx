"use client";
import { PrismaClient } from "@prisma/client";
import { Switch } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Guides from "../components/cards/Guides";
import Plans from "../components/cards/Plans";
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
  plansData: Plan[];
}
export interface GuidesList {
  guidesData: Guide[];
}
const prisma = new PrismaClient();

export default function Page() {
  const searchParams = useSearchParams();
  const getEmail = searchParams.get("email");
  console.log(getEmail);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [packagename, setPackagename] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);

  // useEffect(() => {
  //   if (getEmail) {
  //     cookies().set("email", getEmail);
  //   }
  // }, [getEmail]);

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
      <Navbar email={getEmail} />
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
      <div>
        <Header email={getEmail} />
      </div>

      {switchChecked ? (
        <div>
          <h5 className="volkhov text-[3.125rem] text-title font-[700] flex justify-center mt-6">
            TOP DESTINATIONS
          </h5>
          <div className="flex flex-wrap justify-start gap-20 mt-20 ml-20">
            <Plans plansData={plans} getEmail={getEmail} />
          </div>
        </div>
      ) : (
        <div>
          <h5 className="volkhov text-[3.125rem] text-title font-[700] flex justify-center mt-6">
            TOP LOCAL GUIDES
          </h5>
          <div className="flex flex-wrap justify-start gap-20 mt-20 ml-20">
            <Guides guidesData={guides} getEmail={getEmail} />
          </div>
        </div>
      )}
    </section>
  );
}
