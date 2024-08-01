import { FaTrashCan } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProjectAPI,
  EditProjectAPI,
} from "../../APIServices/projectAPI/projectAPI";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const EditProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state?.id);

  const [formData, setFormData] = useState({});

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

  console.log(data?.project);

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

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

    const data = { ...formData };

    if (formData.coverImage && typeof formData.coverImage === "object") {
      data.coverImage = await fileToBase64(formData.coverImage[0]);
      console.log("yes");
    }

    const EditData = new FormData();
    EditData.append("projectId", data.projectId);
    EditData.append("projectName", data.projectName);
    EditData.append("location", data.location);
    EditData.append("area", data.area);
    EditData.append("description", data.description);
    EditData.append("coverImage", data.coverImage);

    updateProjectMutation
      .mutateAsync(EditData)
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen w-full p-9 bg-[#d8d8d8] rounded-2xl ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between bg-white rounded-2xl p-4 mb-4 font-semibold text-2xl">
          <div>Edit Projects</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row w-full gap-14 items-start md:items-center">
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
            <div className="flex flex-col md:flex-row w-full gap-9 items-start md:items-center">
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
              className="flex w-1/4 h-[150px] rounded-3xl p-2 focus:outline-none"
              placeholder=" Project Description"
              id="description"
              value={formData?.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex gap-28">
              <label className="font-semibold text-lg mt-2">Images</label>
              <label className="bg-[#cfa8f6] p-3 rounded-[300px] cursor-pointer">
                <input
                  type="file"
                  className="w-full h-full hidden"
                  id="coverImage"
                  // value={formData?.coverImage}
                  onChange={handleChange}
                />
                <p> Choose File</p>
              </label>
            </div>
            <button>
              <FaTrashCan />
            </button>
          </div>
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

export default EditProjects;
