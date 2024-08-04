import React from "react";
import { FaTimes } from "react-icons/fa";
export const PropertyModal = ({ isOpen, property, onClose }) => {
  if (!isOpen) return null;

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
        <h2 className="text-2xl mb-4">Property Details</h2>

        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Name:</strong>{" "}
          {property?.propertyName}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Description:</strong>{" "}
          {property?.description}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Project Name:</strong>{" "}
          {property?.project?.projectName}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Project Area:</strong>{" "}
          {property?.projectArea}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Reference Agent:</strong>{" "}
          {property?.referenceAgent?.name}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Price:</strong> {property?.price}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Amenties Name:</strong>{" "}
          {property?.amenities?.map((amenty) => amenty.amenityname + ", ")}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Property Type:</strong>{" "}
          {property?.propertyType?.propertyTypeName}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Property Age:</strong>{" "}
          {property?.propertyAge}
        </p>

        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">City:</strong> {property?.city}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Loan availability:</strong>{" "}
          {property?.loan && property?.loan === true ? "yes" : "No"}
        </p>
        <div className="flex border-b p-3 bg-white gap-4 items-center">
          <strong className="bg-gray-300">Image:</strong>
          <img
            src={property?.coverImage}
            alt="coverImage"
            className="h-20 w-20 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
