import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddProjectAPI } from "../../APIServices/projectAPI/projectAPI";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const AddProjects = () => {
  const [formData, setFormData] = useState({});
  const [imageUploadError, setImageUploadError] = useState(false);
  const navigate = useNavigate();

  const projectMutation = useMutation({
    mutationKey: ["add-project"],
    mutationFn: AddProjectAPI,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [id]: files,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleFileUpload = (file, loadingToastId) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setImageUploadError(true);
          toast.dismiss(loadingToastId);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("creating...", {
      style: {
        backgroundColor: "#4a90e2",
        color: "white",
        borderRadius: "0.375rem",
        padding: "0.75rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: "bold",
      },
    });

    let data = { ...formData };

    if (formData.coverImage) {
      const downloadURL = await handleFileUpload(
        formData.coverImage[0],
        loadingToastId
      );
      data = {
        ...data,
        coverImage: downloadURL,
      };
    }

    projectMutation
      .mutateAsync(data)
      .then((res) => {
        console.log(res);
        toast.success(res.message, {
          style: {
            backgroundColor: "#34d399",
            color: "white",
            borderRadius: "0.375rem",
            padding: "0.75rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
          },
        });
        toast.dismiss(loadingToastId);
        navigate("/admin-dashboard/projects");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Add project Error: " + err.message, {
          style: {
            backgroundColor: "#ef4444",
            color: "white",
            borderRadius: "0.375rem",
            padding: "0.75rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
          },
        });
        toast.dismiss(loadingToastId);
      });
  };

  return (
    <div className="min-h-screen w-full p-9 bg-[#d8d8d8] rounded-2xl ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between bg-white rounded-2xl p-4 mb-4 font-semibold text-2xl">
          <div>Add Projects</div>
          <Link to={`/admin-dashboard/projects`}>
            <button className="bg-[#7ca7ac] px-4 rounded-xl hidden md:block">
              Projects List
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row w-full gap-14 items-start md:items-center">
            <label className="font-semibold text-lg">Project Name</label>
            <input
              type="text"
              className="flex w-1/2 rounded-3xl p-2 focus:outline-none"
              placeholder="Project Name"
              id="projectName"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full gap-9 items-start md:items-center">
              <label className="font-semibold text-lg">Project Location</label>
              <input
                type="text"
                className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                placeholder="Project Location"
                id="location"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-4 items-start md:items-center">
              <label className="font-semibold text-lg">Project Area</label>
              <input
                type="text"
                className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                placeholder="  Project Area (Sq.Ft)"
                id="area"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4 ">
            <label className="font-semibold text-lg">
              {" "}
              Project Description
            </label>
            <textarea
              type="text"
              className="flex w-1/4 h-[150px] rounded-3xl p-2 focus:outline-none"
              placeholder=" Project Description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-28">
            <label className="font-semibold text-lg mt-2">Images</label>
            <label className="bg-[#cfa8f6] p-3 rounded-[300px] cursor-pointer">
              <input
                type="file"
                className="w-full h-full hidden"
                id="coverImage"
                onChange={handleChange}
              />
              <p> Choose File</p>
            </label>
          </div>
          {imageUploadError && (
            <p className="text-red-700">Image upload error</p>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full gap-32 items-start md:items-center">
              <label className="font-semibold text-lg"> User</label>
              <input
                type="text"
                className="bg-[#9a98a7] rounded-3xl p-2 focus:outline-none placeholder-black"
                placeholder=" Current Admin Login"
                disabled
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-20 items-start md:items-center">
              <label className="font-semibold text-lg"> Time</label>
              <input
                type="text"
                className="bg-[#9a98a7] rounded-3xl p-2 focus:outline-none placeholder-black"
                placeholder="Current Time"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-auto gap-16">
            <button className="flex py-2 bg-[#58ac3b] rounded-full px-12 text-white">
              Submit
            </button>
            <button
              type="reset"
              className="flex py-2 bg-[#686868] rounded-full px-12 text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjects;
