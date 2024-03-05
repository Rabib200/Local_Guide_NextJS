import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not Allowed" });
  }

  const guideLocation = req.query.location;
  console.log("LOC:", guideLocation);

  try {
    const select = {
      id: true,
      type: true,
      title: true,
      cost: true,
      duration: true,
      package_name: true,
      area: true,
      image: true,
    };

    const Qguides = await prisma.guides.findMany({
      where: {
        area: guideLocation,
      },
      select,
    });

    if (!Qguides) {
      return res
        .status(404)
        .json({ message: "No guides found for the specified location" });
    }
    console.log(Qguides);
    return res.json(Qguides);
  } catch (error) {
    console.error("Error fetching guides: ", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
