import { FaTrashCan } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectAPI } from "../../APIServices/projectAPI/projectAPI";

const EditProjects = () => {
  const location = useLocation();
  console.log(location?.state?.id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-project"],
    queryFn: () => getProjectAPI(location?.state?.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  console.log(data?.project);

  return (
    <div className="min-h-screen w-full p-9 bg-[#d8d8d8] rounded-2xl ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between bg-white rounded-2xl p-4 mb-4 font-semibold text-2xl">
          <div>Edit Projects</div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row w-full gap-14 items-start md:items-center">
            <label className="font-semibold text-lg">Project Name</label>
            <input
              type="text"
              className="flex w-1/2 rounded-3xl p-2 focus:outline-none"
              placeholder="Project Name"
              value={data?.project?.projectName}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full gap-9 items-start md:items-center">
              <label className="font-semibold text-lg">Project Location</label>
              <input
                type="text"
                className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                placeholder="Project Location"
                value={data?.project?.location}
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-4 items-start md:items-center">
              <label className="font-semibold text-lg">Project Area</label>
              <input
                type="text"
                className=" w-1/2 rounded-3xl p-2 focus:outline-none"
                placeholder="  Project Area (Sq.Ft)"
                value={data?.project?.area}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4 ">
            <label className="font-semibold text-lg">
              {" "}
              Project Description
            </label>
            <textarea
              type="text"
              className="flex w-1/4 h-[150px] rounded-3xl p-2 focus:outline-none"
              placeholder=" Project Description"
              value={data?.project?.description}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex gap-28">
              <label className="font-semibold text-lg mt-2">Images</label>
              <label className="bg-[#cfa8f6] p-3 rounded-[300px] cursor-pointer">
                <input
                  type="file"
                  className="w-full h-full hidden"
                  // value={data?.project?.coverImage}
                />
                <p> Choose File</p>
              </label>
            </div>
            <button>
              <FaTrashCan />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full gap-32 items-start md:items-center">
              <label className="font-semibold text-lg"> User</label>
              <input
                type="text"
                className="bg-[#9a98a7] rounded-3xl p-2 focus:outline-none placeholder-black"
                placeholder=" Current Admin Login"
                disabled
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-20 items-start md:items-center">
              <label className="font-semibold text-lg"> Time</label>
              <input
                type="text"
                className="bg-[#9a98a7] rounded-3xl p-2 focus:outline-none placeholder-black"
                placeholder="Current Time"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-auto gap-16">
            <button className="flex py-2 bg-[#58ac3b] rounded-full px-12 text-white">
              Submit
            </button>
            <button className="flex py-2 bg-[#686868] rounded-full px-12 text-white">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjects;
