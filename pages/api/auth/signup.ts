import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstname, lastname, email, password, phone, city } = req.body;
    console.log("API HIT");
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstname, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First Name is invalid",
      },
      {
        valid: validator.isLength(lastname, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "password is not Strong",
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

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const user = await prisma.user.create({
      data: {
        firstName: firstname,
        lastName: lastname,
        city: city,
        password: hashedPassword,
        email: email,
        phone: phone,
      },
    });

    return res.status(200).json({ Hello: user });
  }
}
