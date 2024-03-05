import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).json({ message: "Method not Allowed" });
  }

  const userId = req.query.id;

  try {
    const select = {
      id: true,
      type: true,
      title: true,
      cost: true,
      duration: true,
      package_name: true,
      transportation: true,
      location: true,
      image: true,
    };

    const Qplan = await prisma.plans.findUnique({
      where: {
        id: parseInt(userId),
      },
      select,
    });

    res.json(Qplan);
  } catch (error) {
    console.error("Error fetching plans: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
