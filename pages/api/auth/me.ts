import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["Authorization"] as string;

  if (!bearerToken) {
    res.status(401).json({
      errorMessage: "Unauthorized token (null bearer token)",
    });
  }

  const token = bearerToken.split(" ")[1];
  if (!token) {
    res.status(401).json({
      errorMessage: "Unauthorized Token",
    });
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    res.status(401).json({
      errorMessage: "unauthorized Token (Token not verified)",
    });
  }

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    res.status(401).json({
      errorMessage: "Email Not Found",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  return res.json(user);
}
