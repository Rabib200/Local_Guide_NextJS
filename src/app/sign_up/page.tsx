"use client";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage);
      }
      const userData = await response.json();
      console.log(userData); // Handle successful response
      router.push("/");
    } catch (error) {
      console.error("Error:", error.message); // Handle error
    }
  };

  return (
    <div>
      <div className="flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6">
        <form
          autoComplete="off"
          className="flex flex-col justify-center mt-11 "
          onSubmit={handleSubmit}
        >
          <h2 className="volkov font-[500] text-[2rem] flex justify-center mb-5 text-lightBlue-400">
            Sign UP
          </h2>

          <TextField
            name="firstName"
            label="First Name"
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3, width: 500 }}
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            label="Last Name"
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3, width: 500 }}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3, width: 500 }}
            onChange={handleChange}
          />
          <TextField
            name="city"
            label="City"
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3, width: 500 }}
            onChange={handleChange}
          />
          <TextField
            name="phone"
            label="Phone"
            required
            variant="outlined"
            color="secondary"
            type="tel"
            sx={{ mb: 3, width: 500 }}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            required
            variant="outlined"
            color="secondary"
            type="password"
            sx={{ mb: 3, width: 500 }}
            onChange={handleChange}
          />

          <Button variant="outlined" color="secondary" type="submit">
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}
