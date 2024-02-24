import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("LOGGED IN");

    const errors: string[] = [];
    const { email, password } = req.body;
    console.log(req.body);

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
    if (errors.length) return res.status(400).json({ errorMessage: errors[0] });
    console.log(errors);

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userWithEmail) {
      return res.status(401).json({ errorMessage: "Email is invalid!!" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const isMatch = await bcrypt.compare(password, userWithEmail.password);

    if (isMatch) {
      const alg = "HS256";
      const token = await new jose.SignJWT({
        email: userWithEmail.email,
      })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);
      console.log(token);
      res.setHeader("Location", "/dest_loc");
      res.statusCode = 302; // or 301 if you want a permanent redirect
      res.end();

      return res.status(200).json({ Hello: token });
    } else return res.status(400).json({ Hello: "Error" });
  }
}
