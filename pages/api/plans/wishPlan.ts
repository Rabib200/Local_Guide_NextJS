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
  const email = req.query.email;
  try {
    const select = {
      id: true,
      email: true,
      plan: true,
      num_people: true,
      guide_name: true,
      cost: true,
    };

    const Qwish = await prisma.wish.findMany({
      where: {
        email: email,
      },
      select,
    });

    if (!Qwish) {
      return res
        .status(404)
        .json({ message: "No wishList found for the specified email" });
    }

    return res.json(Qwish);
  } catch (error) {
    console.error("Error fetching wish: ", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
