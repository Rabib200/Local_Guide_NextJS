import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const packagename = req.query.packagename?.toString();

    const select = {
      id: true,
      type: true,
      title: true,
      cost: true,
      duration: true,
      package_name: true,
      transportation: true,
      image: true,
    };

    if (!packagename) {
      console.log("Doesn't exists in plans");
      return await prisma.plans.findMany({ select });
    }

    const Qplans = await prisma.plans.findMany({
      where: {
        package_name: {
          contains: packagename.toLowerCase(),
          mode: "insensitive",
        },
      },
      select,
    });
    res.json(Qplans);
  } catch (error) {
    console.error("Error Fetching plans by packagename: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
