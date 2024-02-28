import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";
import * as jose from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect} from "next/navigation";
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

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ errorMessage: "Email or password is invalid!!" });
    }

    

    //const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
     return res.status(401).json({errorMessage: "Email or password is invalid!"});
      }

      const alg = "HS256";

      const secert = new TextEncoder().encode(process.env.JWT_SECRET);

      const token = await new jose.SignJWT({email:user.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secert);

      setCookie("jwt",token,{req,res,maxAge: 60*6*24});
      
      redirect("/dest_loc");

      // return res.status(200).json({
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email:user.email,
      //   phone:user.phone,
      //   city:user.city,
      }

      //   .setProtectedHeader({ alg })
      //   .setExpirationTime("24h")
      //   .sign(secret);
      // console.log(token);
      // res.setHeader("Location", "/dest_loc");
      // res.statusCode = 302; // or 301 if you want a permanent redirect
      // res.end();
    
   
    } 
    
    
  //    return res.status(404).json( "Unkown Endpoint");
  // }

