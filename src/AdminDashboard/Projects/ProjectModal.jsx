import React from "react";
import { FaTimes } from "react-icons/fa";
export const ProjectModal = ({ isOpen, project, onClose }) => {
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
        <h2 className="text-2xl mb-4">Project Details</h2>

        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Name:</strong> {project?.projectName}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Description:</strong>{" "}
          {project?.description}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Project Location:</strong>{" "}
          {project?.location}
        </p>
        <p className="border-b p-3 bg-white">
          <strong className="bg-gray-300">Project Area:</strong> {project?.area}
        </p>
        <div className="flex border-b p-3 bg-white gap-4 items-center">
          <strong className="bg-gray-300">Image:</strong>
          <img
            src={project?.coverImage}
            alt="coverImage"
            className="h-20 w-20 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
