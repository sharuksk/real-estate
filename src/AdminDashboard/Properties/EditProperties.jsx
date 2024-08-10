import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AllProjectsAPI } from "../../APIServices/projectAPI/projectAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  EditPropertyAPI,
  getPropertyAPI,
} from "../../APIServices/propertyAPI/propertyAPI";
import { AllAgentAPI } from "../../APIServices/usersAPI/usersAPI";
import { getleadpropertytTypeAPI } from "../../APIServices/leadsAPI/leadsAPI";
import { Spinner } from "../../common/Spinner";
import { getAllAmenityAPI } from "../../APIServices/mastersAPI/amenityAPI";
import { handleFileUpload } from "../../hooks/handleFileUploadFirebase";
import { useSelector } from "react-redux";

const EditProperties = () => {
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [imageUploadError, setImageUploadError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-property"],
    queryFn: () => getPropertyAPI(location?.state?.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && data?.property) {
      setFormData({
        id: data?.property?._id,
        propertyName: data?.property?.propertyName,
        project: data?.property?.project?._id,
        projectArea: data?.property?.projectArea,
        referenceAgent: data?.property?.referenceAgent?._id,
        price: data?.property?.price,
        amenities: data?.property?.amenities?.map((amenty) => amenty._id),
        propertyType: data?.property?.propertyType?._id,
        propertyAge: data?.property?.propertyAge,
        city: data?.property?.city,
        loan: data?.property?.loan,
        coverImage: data?.property?.coverImage,
        description: data?.property?.description,
      });
    }
  }, [data]);

  //Fetch project
  const {
    data: ProjectData,
    isLoading: ProjectLoading,
    error: ProjectError,
  } = useQuery({
    queryKey: ["get-project"],
    queryFn: AllProjectsAPI,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  //Fetch agent
  const {
    data: AgentData,
    isLoading: agentsLoading,
    error: agentsError,
  } = useQuery({
    queryKey: ["agent"],
    queryFn: AllAgentAPI,
    onSuccess: (data) => console.log("Fetched Agents:", data),
    onError: (error) => console.error("Error fetching agents:", error),
  });

  // Fetch property types
  const {
    data: propertyTypesData,
    isLoading: propertyTypesLoading,
    error: propertyTypesError,
  } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: getleadpropertytTypeAPI,
    onSuccess: (data) => console.log("Fetched Property Types:", data),
    onError: (error) => console.error("Error fetching property types:", error),
  });

  // Fetch amenties data

  const {
    data: AmentiesData,
    isLoading: AmentiesLoading,
    error: AmentiesError,
  } = useQuery({
    queryKey: ["amenities"],
    queryFn: getAllAmenityAPI,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => console.log("Fetched amenties Types:", data),
    onError: (error) => console.error("Error fetching amenties types:", error),
  });

  const updatePropertyMutation = useMutation({
    mutationKey: ["update-project"],
    mutationFn: EditPropertyAPI,
  });

  const handleChange = (e) => {
    const { id, value, files, selectedOptions } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [id]: files,
      });
    } else if (selectedOptions && id === "amenities") {
      const valuesArray = Array.from(selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        [id]: valuesArray,
      });
    } else if (id === "propertyAge" || id === "price") {
      setFormData({
        ...formData,
        [id]: Number(value),
      });
    } else if (id === "loan") {
      setFormData({
        ...formData,
        [id]: value === "true",
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
    const loadingToastId = toast.loading("Updating...", {
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

    updatePropertyMutation
      .mutateAsync(data)
      .then((res) => {
        console.log(res);
        toast.success("Property Updated successfully", {
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
          }-dashboard/properties`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Edit Property Error: " + err.message, {
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

  if (
    isLoading ||
    ProjectLoading ||
    agentsLoading ||
    propertyTypesLoading ||
    AmentiesLoading
  )
    return <Spinner />;
  if (ProjectError)
    return <div>Error fetching projects: {ProjectError.message}</div>;
  if (agentsError)
    return <div>Error fetching agents: {agentsError.message}</div>;
  if (AmentiesError)
    return <div>Error fetching amenties: {AmentiesError.message}</div>;
  if (propertyTypesError)
    return (
      <div>Error fetching property types: {propertyTypesError.message}</div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-full w-full p-9 bg-[#d8d8d8] rounded-2xl ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between bg-white rounded-2xl p-4 mb-4 font-semibold text-2xl">
          <div>Edit Properties</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-3 items-start md:items-center">
            <label className="font-semibold text-lg">Property Name</label>
            <input
              type="text"
              className="flex w-[65%] rounded-3xl p-2 focus:outline-none"
              placeholder="Property Name"
              id="propertyName"
              value={formData?.propertyName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-1 md:gap-36">
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row w-full gap-7 items-start md:items-center">
                <label className="font-semibold text-lg">Select Project</label>
                <select
                  id="project"
                  value={formData?.project}
                  onChange={handleChange}
                  className="flex w-1/2 rounded-3xl p-2"
                >
                  <option aria-disabled>Select Project</option>
                  {ProjectData?.projects?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-9 items-start md:items-center">
                <label className="font-semibold text-lg">Project Area</label>
                <input
                  type="text"
                  className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                  placeholder=" Project Area (Sq.Ft)"
                  id="projectArea"
                  value={formData?.projectArea}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-1 items-start md:items-center">
                <label className="font-semibold text-lg">Reference Agent</label>
                <select
                  id="referenceAgent"
                  value={formData?.referenceAgent}
                  onChange={handleChange}
                  className="flex w-1/2 rounded-3xl p-2"
                >
                  <option aria-disabled>Reference Agent</option>
                  {AgentData?.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-1 md:gap-24 items-start md:items-center">
                <label className="font-semibold text-lg">Price</label>
                <input
                  type="text"
                  className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                  placeholder=" Price in USD"
                  id="price"
                  value={formData?.price}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-1 md:gap-14 items-start md:items-center">
                <label className="font-semibold text-lg">Amenties</label>
                <select
                  multiple
                  id="amenities"
                  value={formData?.amenities}
                  onChange={handleChange}
                  className="flex w-1/2 rounded-3xl p-2"
                >
                  <option aria-disabled>Amenties</option>
                  {AmentiesData?.amenities?.map((amenty) => (
                    <option key={amenty._id} value={amenty._id}>
                      {amenty.amenityname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row w-full gap-5 items-start md:items-center">
                <label className="font-semibold text-lg">Property Type</label>
                <select
                  id="propertyType"
                  value={formData?.propertyType}
                  onChange={handleChange}
                  className="flex w-1/2 rounded-3xl p-2"
                >
                  <option aria-disabled> Property Type</option>
                  {propertyTypesData?.propertyTypes?.map((property) => (
                    <option key={property._id} value={property._id}>
                      {property.propertyTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-7 items-start md:items-center">
                <label className="font-semibold text-lg">Property Age</label>
                <input
                  type="text"
                  className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                  placeholder=" Property Age"
                  id="propertyAge"
                  value={formData?.propertyAge}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-[32%] items-start md:items-center">
                <label className="font-semibold text-lg">City</label>
                <input
                  type="text"
                  className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                  placeholder=" City"
                  id="city"
                  value={formData?.city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-1 items-start md:items-center">
                <label className="font-semibold text-lg">
                  Loan Availability
                </label>
                <select
                  id="loan"
                  value={formData?.loan}
                  onChange={handleChange}
                  className="flex w-1/2 rounded-3xl p-2"
                >
                  <option aria-disabled> Loan Availability</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-2 md:gap-20">
                <label className="font-semibold text-lg mt-2">Images</label>
                <label className=" bg-white w-1/2 text-[#808080] p-2 rounded-[300px] text-center cursor-pointer">
                  <input
                    type="file"
                    className="w-full h-full hidden"
                    id="coverImage"
                    onChange={handleChange}
                  />
                  <p>Images</p>
                </label>
              </div>
              {imageUploadError && (
                <p className="text-red-700">Image upload error</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-0">
            <label className="font-semibold text-lg w-full md:w-[14%]">
              Property Description
            </label>
            <textarea
              type="text"
              className="flex w-[65%] h-[100px] rounded-3xl p-2 focus:outline-none"
              placeholder=" Property Description"
              id="description"
              value={formData?.description}
              onChange={handleChange}
            />
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

export default EditProperties;
