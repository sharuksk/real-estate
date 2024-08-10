import React from "react";
import { Amenity } from "./Amenty/Amenity";
import { AmentyList } from "./Amenty/AmentyList";
import { PropertyType } from "../PropertyType/PropertyType";
import { PropertyTypeList } from "../PropertyType/PropertyTypeList";
import { Source } from "./Source/Source";
import { SourceList } from "./Source/SourceList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const Master = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-300 w-full h-full rounded-2xl">
      {/* <div className='bg-green-500 rounded-2xl text-4xl text-center  text-white p-3'>
          <h1>Amenity</h1>
        </div> */}
      <div className=" rounded-2xl flex flex-row gap-11 justify-center">
        <Link
          to={`/${
            user?.role ? user?.role?.toLowerCase() : "admin"
          }-dashboard/addamenity`}
        >
          <button className="bg-green-200 rounded-lg p-5 mt-4">
            Add Amenity
          </button>
        </Link>
      </div>
      {/* <div className='bg-green-500 rounded-2xl text-4xl text-center  text-white p-3'>
          <h1>Source</h1>
        </div> */}
      <div className=" rounded-2xl flex flex-row gap-11 justify-center">
        <Link
          to={`/${
            user?.role ? user?.role?.toLowerCase() : "admin"
          }-dashboard/addsource`}
        >
          <button className="bg-green-200 rounded-lg p-5 mt-4">
            Add Source
          </button>
        </Link>
      </div>
      <div className=" rounded-2xl flex flex-row gap-11 justify-center">
        <Link
          to={`/${
            user?.role ? user?.role?.toLowerCase() : "admin"
          }-dashboard/addtype`}
        >
          <button className="bg-green-200 rounded-lg p-5 mt-4">
            Add PropertyType
          </button>
        </Link>
      </div>
    </div>
  );
};

// return (
//   <div className='flex flex-col gap-6 p-6'>
//     <div className='flex flex-row gap-6'>
//       <div className='flex-1'>
//         <Amenity />
//       </div>
//       <div className='flex-2'>
//         <AmentyList />
//       </div>
//     </div>

//     <div className='flex flex-row gap-6'>
//       <div className='flex-1'>
//   <PropertyType/>
//       </div>
//       <div className='flex-1'>
//       <PropertyTypeList/>
//       </div>
//     </div>
//     <div className='flex flex-row gap-6'>
//       <div className='flex-1'>
//   <Source/>
//       </div>
//       <div className='flex-1'>
//    <SourceList/>
//       </div>
//     </div>
//   </div>
// );
