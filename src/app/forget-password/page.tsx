"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onEmailSubmit = async () => {
    try {
      const response = await axios.post("/api/users/forget-password", {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Error in email submit::", error.response.data);
      toast.error(error.response.data.error);
      setEmail("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-blue-300 text-blue-950 p-6 rounded-3xl w-80">
        <label
          htmlFor="email"
          className="mb-1 self-start font-semibold text-lg"
        >
          Enter email
        </label>
        <input
          className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-blue-950  w-full"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email for forget password"
        />
        <button
          onClick={onEmailSubmit}
          className="text-lg bg-blue-700 text-blue-100 px-3 py-1 rounded-lg w-fit hover:bg-blue-900 ease-in-out duration-500 self-end"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
