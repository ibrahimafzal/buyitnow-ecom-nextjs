"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/authContext";
import { toast } from "react-toastify";


const Register = () => {

  const { error, registerUser, clearErrors } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/images/default.png")
  const [show, setShow] = useState(false)

  const postDetails = (pic) => {
    if (pic === undefined) {
      toast("Please select an image!")
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const formData = new FormData()
      formData.append('file', pic)
      formData.append('upload_preset', 'upload')
      formData.append('cloud_name', 'cloudinaryphoto')
      fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
        method: 'post',
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          setAvatar(res.url.toString())
          setAvatarPreview(res.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      toast("Please select an image in JPEG/JPG or PNG format only!")
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearErrors()
    }
  }, [error])

  const submitHandler = (e) => {
    e.preventDefault()
    registerUser({ name, email, password, avatar })
  }

  const togglePasswordVisibility = () => {
    setShow(!show)
  }



  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            type={show ? 'text' : 'password'}
            id="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          {!show ?
            <p id="visibleIcon" className="absolute top-[2.4rem] right-3 cursor-pointer" onClick={togglePasswordVisibility}>
              <i className="fa-regular fa-eye mr-2 text-slate-500"></i>
            </p> :
            <p id="visibleIcon" className="absolute top-[2.4rem] right-[1.2rem] cursor-pointer" onClick={togglePasswordVisibility}>
              <i className="fa-regular fa-eye-slash text-slate-500"></i>
            </p>
          }
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Upload your Picture </label>
          <div className="flex gap-2">
            <img
              className="w-14 h-14 rounded-full"
              src={avatarPreview}
              alt="avatar"
            />
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="file"
              accept='image/*'
              onChange={(e) => postDetails(e.target.files[0])}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Register
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-blue-500 underline ml-1">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
