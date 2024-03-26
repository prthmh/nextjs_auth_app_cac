"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout Success::", response.data);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in logging out.", error.message);
      toast.error("Couldn't logout");
    }
  };

  const getUserDetails = async () => {
    const res = await axios("/api/users/me");
    setData(res.data.user._id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1>Profile</h1>
        <p>Profile Page</p>
        <h2 className=" bg-amber-700 p-3 rounded">
          {data === "nothing" ? (
            "No User"
          ) : (
            <Link href={`/profile/${data}`}> Go to profile page of user </Link>
          )}
        </h2>
        <button
          onClick={onLogout}
          className=" text-white bg-red-600 px-5 py-2 font-semibold text-xl rounded-md mt-3 hover:bg-red-800"
        >
          Log out
        </button>
        <button
          onClick={getUserDetails}
          className=" text-white bg-green-600 px-5 py-2 font-semibold text-xl rounded-md mt-3 hover:bg-green-800"
        >
          Get User
        </button>
      </div>
    </div>
  );
}
