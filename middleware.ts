import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  //   const bearerToken = req.headers.get("cookie") as string;

  //   console.log(bearerToken);

  //   if (!bearerToken) {
  //     return new NextResponse(
  //       JSON.stringify({ errorMessage: "Unauthorized request bearer token" }),
  //       { status: 401 }
  //     );
  //   }
  //   const token = bearerToken.split(".")[2];
  //   console.log(token);

  //   if (!token) {
  //     return new NextResponse(
  //       JSON.stringify({ errorMessage: "Unauthorized Request token" }),
  //       { status: 401 }
  //     );
  //   }

  //   const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  //   try {
  //     await jose.jwtVerify(token, secret);
  //   } catch (error) {
  //     return (
  //       new NextResponse(
  //         JSON.stringify({ errorMessage: "Unauthorized request secret" })
  //       ),
  //       { status: 401 }
  //     );
  //   }
  // }
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Cookie not found" }),
      { status: 401 }
    );
  }

  // Parse the cookie header to extract the token
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  let token = null;
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name === "jwt") {
      token = decodeURIComponent(value); // Decode the cookie value
    }
  });

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "JWT token not found in cookie" }),
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  console.log(token);
  //   console.log(secret);
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    const email = payload.email;
    console.log(email);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request secret" }),
      { status: 401 }
    );
  }

  // if (token)
  //   return new NextResponse(null, {
  //     status: 302,
  //     headers: { Location: "/dest_loc/" },
  //   });
}
export const config = {
  matcher: ["/api/auth/me", "/dest_loc/"],
};
