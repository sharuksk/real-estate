import React from "react";

const Input = ({ type, title, setValue, id }) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="text-sm font-medium text-gray-700 block mb-2"
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        onChange={setValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default Input;
