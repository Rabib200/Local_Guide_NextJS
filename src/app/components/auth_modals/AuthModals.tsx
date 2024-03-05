"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AuthModalInputs from "./AuthModalInputs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal(SingIn: { isSingIng: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       SingIn.isSingIng ? "/api/auth/signin" : "/api/auth/signup",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(inputs),
  //       }
  //     );
  //     const data = await response.json();
  //     // Handle response data as needed (e.g., show error messages, redirect user)
  //     console.log(data);
  //     handleClose(); // Close modal after successful submission
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        SingIn.isSingIng ? "/api/auth/signin" : "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to authenticate or sign up.");
      }
      const data = await response.json();
      // Handle response data as needed (e.g., show success message, redirect user)
      console.log(data);
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display error message to the user
    }
  };

  const renderContent = (singinContent: string, singupContent: string) => {
    {
      // console.log("singin", isSingIn);
      // console.log("content", singupContent);
      return SingIn.isSingIng ? singinContent : singupContent;
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> assingment #1 */}
      <button
        //   className={`${isSingIn? "bg-blue-400 text-white":""} border p-1 px-4 rounded mr-3`} //Assingment#2
        className={`${renderContent(
          "hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-0",
          "hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2"
        )}border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {/* {isSingIn? "Sign in":"Sing Up"} */}
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className="p-4 h-[500px]">
            <div className="uppercase front-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">
                {renderContent("Sign In", "Create Account")}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent("Log Into Your Account", "Create Account")}
              </h2>
              <form onSubmit={handleSubmit}>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSingin={SingIn.isSingIng}
                />
                <button
                  type="submit"
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
