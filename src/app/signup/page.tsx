"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success::", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Signup Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-blue-300 text-blue-950 p-7 rounded-3xl w-80">
        <h1 className="text-3xl text-center font-bold">
          {isLoading ? "Processsing..." : "Signup"}
        </h1>
        <label
          htmlFor="username"
          className=" mt-3 mb-1 self-start font-semibold"
        >
          Username
        </label>
        <input
          className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-blue-950 w-full"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />

        <label htmlFor="email" className="mb-1 self-start font-semibold">
          Email
        </label>
        <input
          className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-blue-950  w-full"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label htmlFor="password" className="mb-1 self-start font-semibold">
          Password
        </label>
        <input
          className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-blue-950  w-full"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <button
          onClick={onSignup}
          className={`text-lg bg-blue-700 text-blue-100 px-4 py-2 rounded-lg w-fit hover:bg-blue-900 ease-in-out duration-500 ${
            buttonDisabled && " bg-slate-400 hover:bg-slate-600"
          }`}
        >
          Signup Here
        </button>
        {buttonDisabled && (
          <span className=" text-sm text-red-700">
            *Fill all the fields to signup
          </span>
        )}
        <Link href="/login">
          <div className=" text-blue-900 underline text-lg mt-2">
            Visit Login Page
          </div>
        </Link>
      </div>
    </div>
  );
}
