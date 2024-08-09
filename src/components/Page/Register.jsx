import React, { useEffect, useState } from "react";
import Input from "../../common/Input";
import { Link, useNavigate } from "react-router-dom";
import SelectInput from "../../common/SelectInput";
import { useMutation } from "@tanstack/react-query";
import {
  AdminRegisterAPI,
  RegisterAPI,
} from "../../APIServices/usersAPI/usersAPI";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  console.log(formData);
  console.log(formData?.role);

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: RegisterAPI,
  });

  const AdminRegisterMutation = useMutation({
    mutationKey: ["register-admin"],
    mutationFn: AdminRegisterAPI,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      role: "Admin",
    });
  }, []);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData?.name) {
      return toast.error("Name is required");
    } else if (!formData?.email) {
      return toast.error("Email is required");
    } else if (!formData?.contact) {
      return toast.error("Contact is required");
    }

    const loadingToastId = toast.loading("Registering...", {
      style: {
        backgroundColor: "#4a90e2",
        color: "white",
        borderRadius: "0.375rem",
        padding: "0.75rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: "bold",
      },
    });

    if (formData?.role === "Admin") {
      AdminRegisterMutation.mutateAsync(formData)
        .then(() => {
          toast.success("Admin Register Successfully", {
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
          navigate("/admin-dashboard");
        })
        .catch((err) => {
          toast.error("Admin Register Error: " + err.message, {
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
    } else {
      registerMutation
        .mutateAsync(formData)
        .then((res) => {
          toast.success(`${formData?.role} Register Successfully`, {
            style: {
              backgroundColor: "#34d399",
              color: "white",
              borderRadius: "0.375rem",
              padding: "0.75rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: "bold",
            },
          });
          dispatch(setUser(res.user));
          toast.dismiss(loadingToastId);
          navigate("/onboarding");
        })
        .catch((err) => {
          toast.error(`${formData?.role} Register Error: ` + err.message, {
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
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Register to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type={"text"}
            title={"Name"}
            id={"name"}
            setValue={handleChange}
          />
          <Input
            type={"email"}
            title={"Email"}
            id={"email"}
            setValue={handleChange}
          />
          <Input
            type={"password"}
            title={"Password"}
            id={"password"}
            setValue={handleChange}
          />
          <SelectInput
            title={"Role"}
            id={"role"}
            value={Roles}
            setValue={handleChange}
          />
          <Input
            type={"text"}
            title={"Contact"}
            id={"contact"}
            setValue={handleChange}
          />

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Do you have an account? Login
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

export default Register;
