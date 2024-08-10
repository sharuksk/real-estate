import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addLead,
  getAgentsAPI,
  getleadpropertytTypeAPI,
  getleadSourceAPI,
} from "../../APIServices/leadsAPI/leadsAPI";
import toast from "react-hot-toast";
import { Spinner } from "../../common/Spinner";
import { useSelector } from "react-redux";

export const Lead = () => {
  const { user, admin } = useSelector((state) => state.user);

  // Fetch property types
  const {
    data: propertyTypesResponse = {},
    isLoading: propertyTypesLoading,
    error: propertyTypesError,
  } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: getleadpropertytTypeAPI,
    onSuccess: (data) => console.log("Fetched Property Types:", data),
    onError: (error) => console.error("Error fetching property types:", error),
  });

  // Fetch sources
  const {
    data: sourcesResponse = {},
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useQuery({
    queryKey: ["sources"],
    queryFn: getleadSourceAPI,
    onSuccess: (data) => console.log("Fetched Sources:", data),
    onError: (error) => console.error("Error fetching sources:", error),
  });

  // Fetch agents
  const {
    data: response = {},
    isLoading: agentsLoading,
    error: agentsError,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgentsAPI,
    onSuccess: (data) => console.log("Fetched Agents:", data),
    onError: (error) => console.error("Error fetching agents:", error),
  });

  // Extract data from responses
  const propertyTypes = propertyTypesResponse.propertyTypes || [];
  const sources = sourcesResponse.sources || [];
  const agents =
    response.agents && Array.isArray(response.agents) ? response.agents : [];

  // Mutation for adding a lead
  const mutation = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      toast.success("Lead Added Successfully");
      formik.resetForm();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      leadName: "",
      contact: "",
      location: "",
      email: "",
      propertyType: "",
      source: "",
      agentName: "",
    },
    validationSchema: Yup.object({
      leadName: Yup.string().required("Lead Name is required"),
      contact: Yup.string().required("Contact is required"),
      location: Yup.string().required("Location is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      propertyType: Yup.string().required("Property Type is required"),
      source: Yup.string().required("Source is required"),
      agentName: Yup.string().required("Agent Name is required"),
    }),
    onSubmit: (values) => {
      values.createdById = user?._id ? user?._id : admin?._id;
      values.createdByType = user?._id ? "User" : "Admin";

      mutation.mutate(values);
    },
  });
  // if( isLoading){
  //   <div>
  //     Loading..
  //   </div>
  // }

  if (agentsLoading || propertyTypesLoading || sourcesLoading)
    return <Spinner />;
  if (agentsError)
    return <div>Error fetching agents: {agentsError.message}</div>;
  if (propertyTypesError)
    return (
      <div>Error fetching property types: {propertyTypesError.message}</div>
    );
  if (sourcesError)
    return <div>Error fetching sources: {sourcesError.message}</div>;

  return (
    <div className="w-full h-full p-9 bg-gray-300 rounded-xl">
      <div className="flex justify-between bg-white rounded-2xl p-4 mb-2">
        <div>Add New Leads</div>
        <Link
          to={
            user?.role === "Agent"
              ? "/agent-dashboard/leadlist"
              : "/admin-dashboard/leadlist"
          }
          className="bg-green-400 h-full px-6 rounded-lg hover:bg-red-400"
        >
          <div>Lead List</div>
        </Link>
      </div>

      <form className="mt-6 h-full max-w-sm" onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <label
              htmlFor="leadName"
              className="font-medium text-gray-700 w-32"
            >
              Lead Name
            </label>
            <input
              id="leadName"
              type="text"
              {...formik.getFieldProps("leadName")}
              placeholder="Lead Name"
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            />
          </div>
          {formik.touched.leadName && formik.errors.leadName && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.leadName}
            </div>
          )}

          <div className="flex items-center gap-6">
            <label htmlFor="contact" className="font-medium text-gray-700 w-32">
              Contact
            </label>
            <input
              id="contact"
              type="text"
              {...formik.getFieldProps("contact")}
              placeholder="Contact"
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            />
          </div>
          {formik.touched.contact && formik.errors.contact && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.contact}
            </div>
          )}

          <div className="flex items-center gap-6">
            <label
              htmlFor="location"
              className="font-medium text-gray-700 w-32"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              {...formik.getFieldProps("location")}
              placeholder="Location"
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            />
          </div>
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.location}
            </div>
          )}

          <div className="flex items-center gap-6">
            <label htmlFor="email" className="font-medium text-gray-700 w-32">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Email"
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.email}
            </div>
          )}

          <div className="flex items-center gap-6">
            <label
              htmlFor="propertyType"
              className="font-medium text-gray-700 w-32"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              {...formik.getFieldProps("propertyType")}
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            >
              <option value="">Select Property Type</option>
              {propertyTypes.length > 0 ? (
                propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.propertyTypeName}
                  </option>
                ))
              ) : (
                <option disabled>No property types available</option>
              )}
            </select>
          </div>
          {formik.touched.propertyType && formik.errors.propertyType && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.propertyType}
            </div>
          )}

          <div className="flex items-center gap-6">
            <label htmlFor="source" className="font-medium text-gray-700 w-32">
              Source
            </label>
            <select
              id="source"
              {...formik.getFieldProps("source")}
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            >
              <option value="">Select Source</option>
              {sources.length > 0 ? (
                sources.map((source) => (
                  <option key={source._id} value={source._id}>
                    {source.sourcename}
                  </option>
                ))
              ) : (
                <option disabled>No sources available</option>
              )}
            </select>
          </div>
          {formik.touched.source && formik.errors.source && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.source}
            </div>
          )}

          <div className="flex items-center gap-6">
            <label
              htmlFor="agentName"
              className="font-medium text-gray-700 w-32"
            >
              Agent Name
            </label>
            <select
              id="agentName"
              {...formik.getFieldProps("agentName")}
              className="flex-1 p-2 h-9 border border-gray-300 rounded-xl"
            >
              <option value="">Select Agent</option>
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))
              ) : (
                <option disabled>No agents available</option>
              )}
            </select>
          </div>
          {formik.touched.agentName && formik.errors.agentName && (
            <div className="text-red-500 text-sm ml-32">
              {formik.errors.agentName}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36"
            >
              {mutation.isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={formik.handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 w-36"
            >
              Reset
            </button>
          </div>

          {mutation.isError && (
            <div className="text-red-500 mt-2">
              Error: {mutation.error.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
