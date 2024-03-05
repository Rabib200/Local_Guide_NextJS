"use client";

import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const prisma = new PrismaClient();
const fetchPlansByPackageName = async (packagename: string | undefined) => {
  if (!packagename) return await prisma.plans.findMany();
  const plans = await prisma.plans.findMany({
    where: {
      package_name: {
        equals: packagename,
      },
    },
  });
  return plans;
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SearchPanel({
  searchParams,
}: {
  searchParams: { packagename: string | undefined };
}) {
  const router = useRouter();
  const [packagename, setPackagename] = useState("");
  const plans = await fetchPlansByPackageName(searchParams.packagename);
  console.log("plans:", plans);

  return (
    <>
      <div className="text-left text-lg py-3 m-auto flex justify-center">
        <input
          className="rounded  mr-3 p-2 w-[450px]"
          type="text"
          placeholder="State, city or town"
          value={packagename}
          onChange={(e) => setPackagename(e.target.value)}
        />
        <button
          className="rounded bg-red-600 px-9 py-2 text-white"
          onClick={() => {
            if (packagename === "") return;
            router.push(`/search?package=${packagename}`);
            setPackagename("");
          }}
        >
          GO
        </button>
      </div>
    </>
  );
}
