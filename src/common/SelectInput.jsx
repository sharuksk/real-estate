import React from "react";

const SelectInput = ({ title, value, setValue, id }) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="text-sm font-medium text-gray-700 block mb-2"
      >
        {title}
      </label>
      <select
        id={id}
        onChange={setValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
      >
        {value.map((data) => (
          <option
            key={data.id ? data.id : data._id}
            value={data.type ? data.type : data._id}
          >
            {data.type ? data.type : data.sourcename}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
