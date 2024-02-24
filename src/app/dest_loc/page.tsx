"use client";
import { Switch } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design CSS
import { useState } from "react";
import Guides from "../components/cards/Guides";
import Plans from "../components/cards/Plans";
import Navbar from "../components/common/Navbar";

export default function Page() {
  const [switchChecked, setSwitchChecked] = useState(true);

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
            <Plans />
            <Plans />
            <Plans />
            <Plans />
            <Plans />
            <Plans />
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
