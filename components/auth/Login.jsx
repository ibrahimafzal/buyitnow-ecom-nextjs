"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/helpers";
// import { getUserSession } from '@/lib/session'
import Image from "next/image";


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const session = useSession()

  const router = useRouter()
  const params = useSearchParams()
  const callBackUrl = params.get("callbackUrl")

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault()

    const data = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/"
    })

    console.log("dataaaa => ", data)

    if (data?.ok) {
      router.push("/")
      setTimeout(() => {
        toast.success("You are Sign In Successfully!")
      }, 1100)
    } else if (data?.error) {
      toast.error(data?.error)
    }
  }

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById('password');
    const visibleIcon = document.getElementById('visibleIcon');
    const hiddenIcon = document.getElementById('hiddenIcon');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      visibleIcon.classList.add('hidden');
      hiddenIcon.classList.remove('hidden');
    } else {
      passwordField.type = 'password';
      hiddenIcon.classList.add('hidden');
      visibleIcon.classList.remove('hidden');
    }
  }


  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <div className="flex justify-center items-center text-2xl font-semibold">
        Welcome to
        <img
          src="/images/shopy1.png"
          alt="logo"
          className="w-20 ml-1" />
      </div>
      <p className="text-center text-xs text-blue-500">Every Need, Every Style, One Place.</p>
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-xl font-semibold">Login</h2>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            id="password"
            placeholder="Type your password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p id="visibleIcon" className="absolute top-[2.4rem] right-3 cursor-pointer" onClick={togglePasswordVisibility}>
            <i className="fa-regular fa-eye mr-2 text-slate-500"></i>
          </p>
          <p id="hiddenIcon" className="absolute top-[2.4rem] right-[1.2rem] cursor-pointer hidden" onClick={togglePasswordVisibility}>
            <i className="fa-regular fa-eye-slash text-slate-500"></i>
          </p>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
        <div className="text-center mt-4">
          <p>Or sign up with</p>
          <button
            type="button"
            onClick={() => signIn('google')}
            className="btn btn-link btn-floating mx-1">
            <Image
              src="/images/google.jpg"
              height="20"
              width="230"
              alt="BuyItNow"
              className="mx-auto mt-3"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
