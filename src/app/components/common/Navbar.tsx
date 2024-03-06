import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ email }) {
  const [isLoggedIn, setLoggedIn] = useState(!!email);
  const router = useRouter();
  const handleLogout = () => {
    setLoggedIn(false);
    router.push("/");
  };
  console.log("from Navbar", email);
  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 bg-white">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in  p-4 ">
        <div className="flex justify-between items-center">
          <div>
            <img src="/images/MainLogo.png" alt="logo" />
          </div>
          <div className="flex gap-[25px] xl:gap-[50px] text-[16px] items-center select-none">
            <Link href={`/dest_loc?email=${email}`}>
              <p
                className={`hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2`}
              >
                Home
              </p>
            </Link>

            <Link href={`/wish_list?email=${email}`}>
              <p
                className={`hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2`}
              >
                Wish List
              </p>
            </Link>

            <p
              className={`hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2`}
            >
              Contact
            </p>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2 "
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/sign_in/"
                  className="hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2 "
                >
                  Login
                </Link>

                <Link
                  href="/sign_up/"
                  className="hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2 "
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
