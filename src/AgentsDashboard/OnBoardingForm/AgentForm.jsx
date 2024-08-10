import React, { useState } from "react";
import Input from "../../common/Input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { OnBoardingAPI } from "../../APIServices/usersAPI/usersAPI";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AgentForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState([]);

  const onBoardingMutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: OnBoardingAPI,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "pinCode") {
      setFormData({
        ...formData,
        [id]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Submitting...", {
      style: {
        backgroundColor: "#4a90e2",
        color: "white",
        borderRadius: "0.375rem",
        padding: "0.75rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: "bold",
      },
    });

    onBoardingMutation
      .mutateAsync(formData)
      .then((res) => {
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
          `/${user?.role ? user?.role?.toLowerCase() : "admin"}-dashboard`
        );
      })
      .catch((err) => {
        toast.error(`onBoarding Error: ` + err.message, {
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
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Additional Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type={"date"}
            title={"Date Of Birth"}
            id={"dateOfBirth"}
            setValue={handleChange}
          />
          <Input
            type={"text"}
            title={"Address"}
            id={"address"}
            setValue={handleChange}
          />
          <Input
            type={"text"}
            title={"QatarId"}
            id={"qatarId"}
            setValue={handleChange}
          />

          <Input
            type={"text"}
            title={"Preferred Language"}
            id={"preferredLanguage"}
            setValue={handleChange}
          />
          <Input
            type={"text"}
            title={"PinCode"}
            id={"pinCode"}
            setValue={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentForm;
