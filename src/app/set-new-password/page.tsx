"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SetNewPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfimrPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onPasswordSubmit = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password should be same", {
          duration: 5000,
        });
        return;
      }
      const response = await axios.post("/api/users/set-new-password", {
        newPassword,
        token,
      });
      if (response.data.success) {
        toast.success(response.data.message, {
          duration: 5000,
        });
        console.log(response.data.message);
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Error in email submit::", error.response.data);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-blue-300 text-blue-950 p-6 rounded-3xl w-80">
        <label
          htmlFor="password"
          className="mb-1 self-start font-semibold text-lg"
        >
          New Password
        </label>
        <input
          className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-blue-950  w-full"
          id="password"
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter New Password"
        />
        <label
          htmlFor="confirmPassword"
          className="mb-1 self-start font-semibold text-lg"
        >
          Confirm Password
        </label>
        <input
          className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-blue-950  w-full"
          id="confirmPassword"
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfimrPassword(e.target.value)}
          placeholder="Enter New Password"
        />
        <button
          onClick={onPasswordSubmit}
          className="text-lg bg-blue-700 text-blue-100 px-3 py-1 rounded-lg w-fit hover:bg-blue-900 ease-in-out duration-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
