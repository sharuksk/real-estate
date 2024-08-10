import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { addClientsAPI } from "../../APIServices/mastersAPI/clientsAPI";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getleadSourceAPI } from "../../APIServices/leadsAPI/leadsAPI";
import { Spinner } from "../../common/Spinner";
export const Clients = () => {
  const { user, admin } = useSelector((state) => state.user);
  const naviagete = useNavigate();

  const clientMutation = useMutation({
    mutationKey: ["add-client"],
    mutationFn: addClientsAPI,
    onSuccess: () => {
      toast.success("Client Created Successfully");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
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

  const sources = sourcesResponse.sources || [];

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      dob: "",
      state: "",
      pinCode: "",
      preferredLanguage: "",
      address: "",
      city: "",
      email: "",
      qatarId: "",
      occupation: "",
      designation: "",
      organization: "",
      source: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string().required("Contact is required"),
      dob: Yup.date().required("Date of Birth is required"),
      state: Yup.string().required("State is required"),
      pinCode: Yup.string().required("Pin Code is required"),
      preferredLanguage: Yup.string().required(
        "Preferred Language is required"
      ),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      qatarId: Yup.string().required("Qatr Id is required"),
      occupation: Yup.string().required("Occupation is required"),
      designation: Yup.string().required("Designation is required"),
      organization: Yup.string().required("Organization is required"),
      source: Yup.string().required("Source is required"),
    }),
    onSubmit: (values) => {
      // toast.success("Client Created Successfully");

      values.createdById = user?._id ? user?._id : admin?._id;
      values.createdByType = user?._id ? "User" : "Admin";

      clientMutation
        .mutateAsync(values)
        .then(() => {
          naviagete(
            `/${
              user?.role ? user?.role?.toLowerCase() : "admin"
            }-dashboard/clientlist`
          );
        })
        .catch((err) => console.log(err));
      formik.resetForm();
    },
    // onReset:()=>{
    //     onReset && onReset();
    //     console.log('Form reset');
    // }
  });

  if (sourcesLoading) return <Spinner />;

  if (sourcesError)
    return <div>Error fetching sources: {sourcesError.message}</div>;

  return (
    <div className="w-full h-full p-9 bg-gray-300 rounded-xl ">
      <div className="flex justify-between bg-white rounded-2xl p-4 mb-4">
        <div>Add Client</div>
        <Link
          to={`/${
            user?.role === "Agent" ? user?.role.toLowerCase() : "admin"
          }-dashboard/clientlist`}
          className="hover:bg-red-400"
        >
          <div>Client List</div>
        </Link>
      </div>
      <form className="mt-6 h-full max-w-fit" onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          <div className=" md:grid md:grid-cols-2 md:gap-6 sm:grid sm:grid-cols-1 sm:gap-6">
            {[
              {
                id: "name",
                label: "Client Name",
                type: "text",
                placeholder: "Client Name",
              },
              {
                id: "contact",
                label: "Contact",
                type: "text",
                placeholder: "Client Contact",
              },
              {
                id: "qatarId",
                label: "Qatar ID",
                type: "text",
                placeholder: "Qatar Id",
              },
              { id: "dob", label: "DOB", type: "date", placeholder: "DOB" },
              {
                id: "state",
                label: "State",
                type: "text",
                placeholder: "State",
              },
              {
                id: "pinCode",
                label: "Pin Code",
                type: "number",
                placeholder: "Pin Code",
              },
              {
                id: "preferredLanguage",
                label: "Preferred Language",
                type: "text",
                placeholder: "Preferred Language",
              },
              {
                id: "address",
                label: "Address",
                type: "text",
                placeholder: "Address",
              },
              { id: "city", label: "City", type: "text", placeholder: "City" },
              {
                id: "email",
                label: "Email",
                type: "email",
                placeholder: "Client Mail",
              },
              {
                id: "occupation",
                label: "Occupation",
                type: "text",
                placeholder: "Occupation",
              },
              {
                id: "designation",
                label: "Designation",
                type: "text",
                placeholder: "Designation",
              },
              {
                id: "organization",
                label: "Organization",
                type: "text",
                placeholder: "Organization",
              },
              {
                id: "source",
                label: "Source",
                type: "text",
                placeholder: "Source",
              },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex items-center gap-6">
                {id === "source" ? (
                  <>
                    <label
                      htmlFor={id}
                      className="w-36 font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <select
                      className="p-2 h-9 border border-gray-300 rounded-xl flex-1"
                      {...formik.getFieldProps(id)}
                    >
                      <option value="">Select Source</option>
                      {sources.map((source) => (
                        <option key={source._id} value={source._id}>
                          {source.sourcename}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor={id}
                      className="w-36 font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      {...formik.getFieldProps(id)}
                      className="p-2 h-9 border border-gray-300 rounded-xl flex-1"
                    />
                  </>
                )}

                {formik.touched[id] && formik.errors[id] ? (
                  <div className="text-red-500 text-sm ml-2">
                    {formik.errors[id]}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-44">
          <button
            type="submit"
            disabled={clientMutation.isLoading}
            className="px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36"
          >
            {clientMutation.isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 w-36"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
