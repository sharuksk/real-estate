import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  AllProjectsAPI,
  deleteProjectAPI,
  getProjectAPI,
} from "../../APIServices/projectAPI/projectAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Spinner } from "../../common/Spinner";
import { useState } from "react";
import { ProjectModal } from "./ProjectModal";

const ProjectLists = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-project"],
    queryFn: AllProjectsAPI,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: deleteProjectAPI,
    onSuccess: () => {
      refetch();
    },
  });

  const handleEdit = (id) => {
    navigate("/admin-dashboard/project/edit", { state: { id } });
  };

  const handleView = async (id) => {
    try {
      const project = await getProjectAPI(id);
      setSelectedProject(project.project);
      setModalOpen(true);
      toast.success("project view opened");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = (id) => {
    const loadingToastId = toast.loading("Deleting...", {
      style: {
        backgroundColor: "#4a90e2",
        color: "white",
        borderRadius: "0.375rem",
        padding: "0.75rem 1.25rem",
        fontSize: "0.875rem",
        fontWeight: "bold",
      },
    });
    deleteMutation
      .mutateAsync(id)
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
      })
      .catch((err) => {
        toast.error("Delete project Error: " + err.message, {
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
      });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full p-4 bg-gray-300 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4 p-4 bg-white rounded-2xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-xl bg-white p-2 rounded text-center">10</span>
            <span className="text-sm sm:text-base">Records Per Page</span>
          </div>
          <input
            type="text"
            className="w-full sm:w-72 md:w-96 lg:w-1/2 xl:w-1/3 rounded-3xl p-2 focus:outline-none placeholder-black text-center"
            placeholder="Search here"
          />
          <Link to={`/admin-dashboard/project/add`}>
            <button className="bg-[#58ac3b] p-2 rounded-full mt-2 sm:mt-0">
              Add Projects
            </button>
          </Link>
        </div>
        <div className="w-full bg-white rounded-2xl p-3 overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="pb-3 text-black font-medium text-left p-3">
                  Project Name
                </th>
                <th className="pb-3 text-black font-medium text-left p-3">
                  Location
                </th>
                <th className="pb-3 text-black font-medium text-left p-3">
                  Available Properties Count
                </th>

                <th className="pb-3 text-black font-medium text-left p-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.projects?.map((project, index) => (
                <tr key={index}>
                  <td colSpan="4">
                    <div className="bg-[#d8d8d8] rounded-xl flex items-center p-2 justify-between">
                      <div className="py-2 w-1/4">{project.projectName}</div>
                      <div className="py-2 w-1/4">{project.location}</div>
                      <div className="py-2 w-1/4">43</div>
                      <div className="w-1/4 flex space-x-2">
                        <button
                          onClick={() => handleView(project._id)}
                          className="text-black hover:text-blue-700"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => handleEdit(project._id)}
                          className="text-black hover:text-yellow-700"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-black hover:text-red-700"
                        >
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
      {isModalOpen && (
        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectLists;
