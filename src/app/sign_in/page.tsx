"use client";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("/api/auth/signin", {
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

      router.push(`/dest_loc?email=${formData.email}`); // Redirect to destination page
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
            Sign IN
          </h2>

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
