"use client";

import AuthContext from "@/context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {

  const { user, error, clearErrors, loading, updateProfile } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/images/default.png")

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
          setAvatarPreview(res.url.toString());
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      toast("Please select an image in JPEG/JPG or PNG format only!")
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    postDetails(selectedFile);
  };


  useEffect(() => {
    if (user) {
      setName(user?.name)
      setEmail(user?.email)
    }

    if (error) {
      toast.error(error)
      clearErrors()
    }
  }, [error, user])

  // submit handler //
  const submitHandler = (e) => {
    e.preventDefault()
    const userData = { name, email, avatar }
    updateProfile(user?._id, userData)
  }


  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">
            Update Profile
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-semibold"> Full Name: </label>
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
            <label className="block mb-1 font-semibold"> Email: </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label className="block font-semibold"> Profile Picture: </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 cursor-pointer md:w-1/5 lg:w-1/4">
                <img
                  className="w-14 h-14 rounded-full"
                  src={avatarPreview}
                />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  accept='image/*'
                  name="avatar"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Choose file in JPEG/JPG or PNG format only
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading ? true : false}
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            {loading ? (
              <div>
                <i className="fa-solid fa-spinner mr-5"></i>
                Updating...
              </div>
            ) :
              "Update"
            }
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
