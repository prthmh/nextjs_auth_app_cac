"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success::", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Errror in login::", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-blue-300 text-blue-950 p-7 rounded-3xl w-80">
        <h1 className="text-3xl text-center font-bold">
          {isLoading ? "Processing..." : "Login"}
        </h1>

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
          onClick={onLogin}
          className={`text-lg bg-blue-700 text-blue-100 px-4 py-2 rounded-lg w-fit hover:bg-blue-900 ease-in-out duration-500 ${
            buttonDisabled && "bg-slate-400 hover:bg-slate-600"
          } `}
        >
          Login
        </button>
        {buttonDisabled && (
          <span className=" text-sm text-red-700">
            *Fill all the fields to Login
          </span>
        )}
        <Link href="/forget-password">
          <div className=" text-blue-950 font-semibold underline">
            Forget Password?
          </div>
        </Link>
        <Link href="/signup">
          <div className=" text-blue-900 underline text-lg mt-2">
            Visit Signup Page
          </div>
        </Link>
      </div>
    </div>
  );
}
