import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";

import * as jose from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is Invalid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is Invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid email or password" });
    }

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Generate JWT token
    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    // Set JWT token as a cookie
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    const Qemail = email;
    // Redirect to destination page
    return res.redirect(302, `/dest_loc?email=${Qemail}`);
  }

  // Handle unknown endpoints or other HTTP methods
  return res.status(404).json({ errorMessage: "Unknown Endpoint" });
}
