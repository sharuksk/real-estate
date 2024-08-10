import { useQuery, useMutation } from "@tanstack/react-query";
import {
  deleteProjectAPI,
  getAllProjectsAPI,
  getProjectAPI,
} from "../../APIServices/projectAPI/projectAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Spinner } from "../../common/Spinner";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import TableList from "../../common/TableList";
import { useSelector } from "react-redux";

const ProjectLists = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["getAllproject", page, limit, search],
    queryFn: () => getAllProjectsAPI(page, limit, search),
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

  const handleEdit = async (id) => {
    console.log(id);

    if (user?.role) {
      const project = await getProjectAPI(id);
      if (user?._id === project?.project?.createdByUser?._id) {
        navigate(`/${user?.role?.toLowerCase()}-dashboard/project/edit`, {
          state: { id },
        });
      } else {
        toast.error(`${user?.role} can only Edit their own Projects`);
      }
    } else {
      navigate("/admin-dashboard/project/edit", { state: { id } });
    }
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

  const handleDelete = async (id) => {
    const project = await getProjectAPI(id);

    const deleteproject = (deleteMutation, id) => {
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

    if (user?._id) {
      if (user?._id !== project?.project?.createdByUser?._id) {
        toast.error(`${user?.role} can only Delete their own Projects`);
      } else {
        deleteproject(deleteMutation, id);
      }
    } else {
      deleteproject(deleteMutation, id);
    }
  };

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 1000);

  const handleInputChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const TableHeader = [
    {
      name: "Project Name",
    },
    {
      name: "Location",
    },
    {
      name: "Available Properties Count",
    },
    {
      name: "Actions",
    },
  ];

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const projects = data?.projects || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <>
      <TableList
        name={"project"}
        search={search}
        handleInputChange={handleInputChange}
        buttonName={"Add Projects"}
        buttonLink={"project/add"}
        TableHeader={TableHeader}
        TableData={projects}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        ModelData={selectedProject}
        user={user}
      />
    </>
  );
};

export default ProjectLists;
