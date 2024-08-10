import { FaTrashCan } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProjectAPI,
  EditProjectAPI,
} from "../../APIServices/projectAPI/projectAPI";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Spinner } from "../../common/Spinner";
import { handleFileUpload } from "../../hooks/handleFileUploadFirebase";
import { useSelector } from "react-redux";

const EditProjects = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({});
  const [imageUploadError, setImageUploadError] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-project"],
    queryFn: () => getProjectAPI(location?.state?.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const updateProjectMutation = useMutation({
    mutationKey: ["update-project"],
    mutationFn: EditProjectAPI,
  });

  useEffect(() => {
    if (data && data?.project) {
      setFormData({
        projectId: data?.project._id,
        projectName: data?.project?.projectName || "",
        location: data?.project?.location || "",
        area: data?.project?.area || "",
        description: data?.project?.description || "",
        coverImage: data?.project?.coverImage || "",
      });
    }
  }, [data]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Editing...", {
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

    if (formData.coverImage && typeof formData.coverImage === "object") {
      const downloadURL = await handleFileUpload(
        formData.coverImage[0],
        setImageUploadError,
        loadingToastId
      );
      data = {
        ...data,
        coverImage: downloadURL,
      };
    }

    updateProjectMutation
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
        navigate(
          `/${
            user?.role ? user?.role?.toLowerCase() : "admin"
          }-dashboard/projects`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Edit project Error: " + err.message, {
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

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen w-full p-9 bg-[#d8d8d8] rounded-2xl ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between bg-white rounded-2xl p-4 mb-4 font-semibold text-2xl">
          <div>Edit Projects</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-14 items-start md:items-center">
            <label className="font-semibold text-lg">Project Name</label>
            <input
              type="text"
              className="flex w-1/2 rounded-3xl p-2 focus:outline-none"
              placeholder="Project Name"
              id="projectName"
              value={formData?.projectName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-9 items-start md:items-center">
              <label className="font-semibold text-lg">Project Location</label>
              <input
                type="text"
                className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                placeholder="Project Location"
                id="location"
                value={formData?.location}
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
                value={formData?.area}
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
              className="flex w-1/2 md:w-1/4 h-[150px] rounded-3xl p-2 focus:outline-none"
              placeholder=" Project Description"
              id="description"
              value={formData?.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row w-full gap-4">
            <div className="flex gap-4 md:gap-28">
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
            <button>
              <FaTrashCan />
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-700">Image upload error</p>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-32 items-start md:items-center">
              <label className="font-semibold text-lg"> User</label>
              <input
                type="text"
                className="bg-[#9a98a7] rounded-3xl p-2 focus:outline-none placeholder-black"
                placeholder=" Current Admin Login"
                disabled
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-20 items-start md:items-center">
              <label className="font-semibold text-lg"> Time</label>
              <input
                type="text"
                className="bg-[#9a98a7] rounded-3xl p-2 focus:outline-none placeholder-black"
                placeholder="Current Time"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-auto gap-5 md:gap-16">
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

export default EditProjects;
