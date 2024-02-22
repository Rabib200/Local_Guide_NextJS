import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/singin",
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      console.log("error", error);

      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const singup = async () => {};
  const signout = () => {
    // removeCookies("jwt");
    deleteCookie("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };
  return {
    signin,
    signout,
    //signup
  };
};
export default useAuth;
