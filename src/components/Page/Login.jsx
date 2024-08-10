import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../APIServices/usersAPI/usersAPI";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAdmin, setUser } from "../../redux/slices/userSlice";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMutation = useMutation({
    mutationKey: ["user-login"],
    mutationFn: loginAPI,
  });

  const Roles = [
    {
      id: 1,
      type: "Admin",
    },
    {
      id: 2,
      type: "Client",
    },
    {
      id: 3,
      type: "Owner",
    },
    {
      id: 4,
      type: "Agent",
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "Admin",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Enter your email"),
      password: Yup.string().required("Enter your password"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      const loadingToastId = toast.loading("Logging in...", {
        style: {
          backgroundColor: "#4a90e2",
          color: "white",
          borderRadius: "0.375rem",
          padding: "0.75rem 1.25rem",
          fontSize: "0.875rem",
          fontWeight: "bold",
        },
      });

      userMutation
        .mutateAsync(values)
        .then((res) => {
          toast.success("Login Successful", {
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
          if (res?.user?.role !== "Admin") {
            dispatch(setUser(res?.user));
            navigate(`/${res?.user?.role?.toLowerCase()}-dashboard`);
          } else {
            dispatch(setAdmin(res?.user));
            navigate("/admin-dashboard");
          }
        })
        .catch((err) => {
          toast.error("Login Error: " + err.message, {
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
          console.log(err);
        });
    },
  });

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login to Your Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          {userMutation.isLoading && <div>Loading, please wait...</div>}
          {userMutation.isError && (
            <div className="text-red-500">
              Error: {userMutation.error.message}
            </div>
          )}
          {userMutation.isSuccess && (
            <div className="text-green-500">Login successful!</div>
          )}

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Role
            </label>
            <select
              id="role"
              {...formik.getFieldProps("role")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            >
              {Roles.map((role) => (
                <option key={role.id} value={role.type}>
                  {role.type}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 mt-1">{formik.errors.role}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Register
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
