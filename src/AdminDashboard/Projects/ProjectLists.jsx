import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AllProjectsAPI } from "../../APIServices/projectAPI/projectAPI";
import { useNavigate } from "react-router-dom";

const ProjectLists = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-project"],
    queryFn: AllProjectsAPI,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // [
  //   { name: "Project 1", location: "Doha, Qatar", count: 43 },
  //   { name: "Project 2", location: "Doha, Qatar", count: 56 },
  //   { name: "Project 3", location: "Doha, Qatar", count: 25 },
  //   { name: "Project 3", location: "Doha, Qatar", count: 25 },
  //   { name: "Project 3", location: "Doha, Qatar", count: 25 },
  // ]

  const handleEdit = (id) => {
    // console.log(id);
    navigate("/admin-dashboard/project/edit", { state: { id } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen w-full p-9 bg-[#d8d8d8] rounded-2xl">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between rounded-2xl p-4 mb-4 font-semibold">
          <div>
            <p className="text-lg">
              <span className="bg-white p-2 text-2xl">10</span> Records per page
            </p>
          </div>
          <input
            type="text"
            className="flex rounded-3xl p-2 focus:outline-none placeholder-black text-center"
            placeholder="Search here"
          />
          <Link to={`/admin-dashboard/project/add`}>
            <button className="bg-[#58ac3b] p-2 rounded-full">
              Add Projects
            </button>
          </Link>
        </div>
        <div className="w-full h-full bg-white text-xl rounded-2xl p-3">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="w-full font-light">
                <th className="py-2 px-4 text-left">Project Name</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">
                  Available Properties count
                </th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.projects?.map((project, index) => (
                <tr key={index}>
                  <td colSpan="4">
                    <div className="bg-[#d8d8d8] rounded-xl flex items-center p-2">
                      <div className="py-2 pr-52">{project.projectName}</div>
                      <div className="py-2 pr-52">{project.location}</div>
                      <div className="py-2 pr-52">43</div>
                      <div className="pl-32 flex space-x-2">
                        <button className="text-black hover:text-blue-700">
                          <FiEye />
                        </button>
                        {/* <Link to={`/admin-dashboard/project/edit`}> */}
                        <button
                          onClick={() => handleEdit(project._id)}
                          className="text-black hover:text-yellow-700"
                        >
                          <FiEdit2 />
                        </button>
                        {/* </Link> */}
                        <button className="text-black hover:text-red-700">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center mx-auto mt-3 gap-4 space-x-2 text-xl font-medium">
          <button>&lt;&lt; Prev</button>
          <button>Next &gt;&gt;</button>
        </div>
        <div className="p-4 font-medium mt-10">
          <span>Showing 3 to 10 of 3 entries</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectLists;
