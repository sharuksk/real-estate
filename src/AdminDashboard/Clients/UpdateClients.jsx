import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  updateClientAPI,
  getClientById,
} from "../../APIServices/mastersAPI/clientsAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const validationSchema = Yup.object({
  name: Yup.string().notRequired(),
  contact: Yup.string().notRequired(),
  dob: Yup.date().notRequired(),
  state: Yup.string().notRequired(),
  pinCode: Yup.string().notRequired(),
  preferredLanguage: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  city: Yup.string().notRequired(),
  email: Yup.string().email("Invalid email").notRequired(),
  qatarId: Yup.string().notRequired(),
  occupation: Yup.string().notRequired(),
  designation: Yup.string().notRequired(),
  organization: Yup.string().notRequired(),
  source: Yup.string().notRequired(),
});

export const UpdateClient = () => {
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
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
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateClientAPI(id, values);
        toast.success("Client updated successfully");
        navigate(
          `/${
            user?.role === "Agent" ? user?.role.toLowerCase() : "admin"
          }-dashboard/clientlist`
        );
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const client = await getClientById(id);
        setInitialValues(client);
        formik.setValues(client);
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchClientData();
  }, []);

  return (
    <div className="w-full h-full p-9 bg-gray-300 rounded-xl">
      <div className="flex justify-between bg-white rounded-2xl p-4 mb-4">
        <div>Update Client</div>
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
          <div className="grid grid-cols-2 gap-6">
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
                placeholder: "Qatar ID",
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
                placeholder: "Client Email",
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
                <label htmlFor={id} className="w-36 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...formik.getFieldProps(id)}
                  className="p-2 h-9 border border-gray-300 rounded-xl flex-1"
                />
                {formik.touched[id] && formik.errors[id] ? (
                  <div className="text-red-500 text-sm ml-2">
                    {formik.errors[id]}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-44">
            <button
              type="submit"
              // disabled={clientMutation.isLoading}
              className="px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36"
            >
              Submit
            </button>
            <Link
              to={`/${
                user?.role ? user?.role?.toLowerCase() : "admin"
              }-dashboard/clientlist`}
            >
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 w-36"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
