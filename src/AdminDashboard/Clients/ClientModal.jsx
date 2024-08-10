import React from "react";
import { FaTimes } from "react-icons/fa";
export const ClientModal = ({ isOpen, client, onClose }) => {
  if (!isOpen) return null;
  const formattedDob = client?.dob
    ? new Date(client.dob).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-green-300 p-6 rounded-lg w-1/2">
        <button
          onClick={onClose}
          className=" mt-3 mr-12 text-red-500"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl mb-4">client Details</h2>

        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Name:</strong> {client?.name}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Contact:</strong> {client?.contact}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Address:</strong> {client?.address}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Email:</strong> {client?.email}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Qatar Id:</strong> {client?.qatarId}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">State:</strong> {client?.state}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Date of Birth:</strong> {formattedDob}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Preferred Language:</strong>{" "}
          {client?.preferredLanguage}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Pin Code:</strong> {client?.pinCode}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">City:</strong> {client?.city}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Occupation:</strong>{" "}
          {client?.occupation}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Designation:</strong>{" "}
          {client?.designation}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Organization:</strong>{" "}
          {client?.organization}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">source:</strong>{" "}
          {client?.source?.sourcename}
        </p>
      </div>
    </div>
  );
};
