"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
    } catch (error: any) {
      console.log(error.reponse.data);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {isVerified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">
            <div className=" text-xl bg-blue-700 rounded px-3 py-2 w-fit">
              Login
            </div>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}