"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [packagename, setPackagename] = useState("");

  return (
    <>
      <div className="text-left text-lg py-3 m-auto flex justify-center">
        <input
          className="rounded  mr-3 p-2 w-[450px]"
          type="text"
          placeholder="Package Name"
          value={packagename}
          onChange={(e) => setPackagename(e.target.value)}
        />
        <button
          className="rounded bg-red-600 px-9 py-2 text-white"
          onClick={() => {
            if (packagename === "") return;
            router.push(`/search?packagename=${packagename}`);
            console.log(packagename);
            setPackagename("");
          }}
        >
          GO
        </button>
      </div>
    </>
  );
}
