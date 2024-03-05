import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, plan, num_people, guide_name, cost } = req.body;
      console.log(email);
      const createWishListItem = await prisma.wish.create({
        data: {
          email,
          plan,
          num_people: parseInt(num_people),
          guide_name,
          cost: parseFloat(cost),
        },
      });
      //   res.status(201).json(createWishListItem);
      return res.redirect(302, `/dest_loc?email=${email}`);
    } catch (error) {
      console.error("Error Adding to wish: ", error);
      res.status(500).json({ error: "Failed to add to wish" });
    }
    return res.redirect(302, `/wish`);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
