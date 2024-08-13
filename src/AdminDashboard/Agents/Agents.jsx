import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { addAgentsAPI } from "../../APIServices/mastersAPI/agentsAPI";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AllProjectsAPI } from "../../APIServices/projectAPI/projectAPI";
import Select from "react-select";
import { Spinner } from "../../common/Spinner";

export const Agents = () => {
  // Fetch projects
  const {
    data: projectData = {},
    isLoading: projectLoading,
    error: projectError,
  } = useQuery({
    queryKey: ["sources"],
    queryFn: AllProjectsAPI,
    onSuccess: (data) => console.log("Fetched Sources:", data),
    onError: (error) => console.error("Error fetching sources:", error),
  });

  const projects = projectData.projects || [];

  const projectOptions = projects.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));

  const agentMutation = useMutation({
    mutationKey: ["add-agent"],
    mutationFn: addAgentsAPI,
    onSuccess: () => {
      toast.success("Agent Created Successfully");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      dob: "",
      state: "",
      pinCode: "",
      address: "",
      city: "",
      email: "",
      qatarId: "",
      commissionInfo: "",
      licenseInfo: "",
      projects: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string().required("Contact is required"),
      dob: Yup.date().required("Date of Birth is required"),
      state: Yup.string().required("State is required"),
      pinCode: Yup.string().required("Pin Code is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      qatarId: Yup.string().required("Qatr Id is required"),
      commissionInfo: Yup.string().required("Commission Info is required"),
      licenseInfo: Yup.string().required("License Info is required"),
      projects: Yup.array().required("Projects is required"),
    }),
    onSubmit: (values) => {
      // toast.success("Agent Created Successfully");
      agentMutation.mutateAsync(values);
      formik.resetForm();
    },
    // onReset:()=>{
    //     onReset && onReset();
    //     console.log('Form reset');
    // }
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "0.5rem",
      borderRadius: "0.75rem",
      borderColor: "#d1d5db",
      boxShadow: "none",
    }),
    container: (provided) => ({
      ...provided,
      flex: 1,
    }),
  };

  if (projectLoading) return <Spinner />;

  if (projectError)
    return <div>Error fetching projects: {projectError.message}</div>;

  return (
    <div className="w-full h-full p-9 bg-gray-300 rounded-xl ">
      <div className="flex justify-between bg-white rounded-2xl p-4 mb-4">
        <div>Add Agent</div>
        <Link to="/admin-dashboard/agentlist" className="hover:bg-red-400">
          <div>Agent List</div>
        </Link>
      </div>
      <form className="mt-6 h-full max-w-full" onSubmit={formik.handleSubmit}>
        <div className="space-y-6">
          <div className=" md:grid md:grid-cols-2 md:gap-6 sm:grid sm:grid-cols-1 sm:gap-6">
            {[
              {
                id: "name",
                label: "Agent Name",
                type: "text",
                placeholder: "Agent Name",
              },
              {
                id: "contact",
                label: "Contact",
                type: "text",
                placeholder: "Agent Contact",
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
                type: "text",
                placeholder: "Pin Code",
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
                placeholder: "Agent Mail",
              },
              {
                id: "commissionInfo",
                label: "Commission Info",
                type: "text",
                placeholder: "Commission",
              },
              {
                id: "licenseInfo",
                label: "License Info",
                type: "text",
                placeholder: "License",
              },
              {
                id: "projects",
                label: "Projects Info",
                type: "text",
                placeholder: "Projects",
              },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex items-center gap-6">
                {id === "projects" ? (
                  <>
                    <label
                      htmlFor={id}
                      className="w-36 font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <Select
                      id={id}
                      styles={customStyles}
                      options={projectOptions}
                      isMulti={true}
                      value={projectOptions.filter((option) =>
                        formik.values.projects.includes(option.value)
                      )}
                      onChange={(selectOptions) =>
                        formik.setFieldValue(
                          "projects",
                          selectOptions
                            ? selectOptions.map((option) => option.value)
                            : []
                        )
                      }
                    />
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
            disabled={agentMutation.isLoading}
            className="px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36"
          >
            {agentMutation.isLoading ? "Submitting..." : "Submit"}
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
