import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Spinner } from "../../common/Spinner";
import {
  deletePropertyAPI,
  getAllPropertyAPI,
  getPropertyAPI,
} from "../../APIServices/propertyAPI/propertyAPI";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import TableList from "../../common/TableList";
import { useSelector } from "react-redux";

const PropertiesLists = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["getAllProperty", page, limit, search],
    queryFn: () => getAllPropertyAPI(page, limit, search),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-property"],
    mutationFn: deletePropertyAPI,
    onSuccess: () => {
      refetch();
    },
  });

  const handleEdit = async (id) => {
    if (user?.role) {
      const property = await getPropertyAPI(id);
      if (user?._id === property?.property?.createdByUser?._id) {
        navigate(`/${user?.role?.toLowerCase()}-dashboard/properties/edit`, {
          state: { id },
        });
      } else {
        toast.error(`${user?.role} can only Edit their own Properties`);
      }
    } else {
      navigate("/admin-dashboard/properties/edit", { state: { id } });
    }
  };

  const handleView = async (id) => {
    try {
      const property = await getPropertyAPI(id);
      setSelectedProperty(property.property);
      setModalOpen(true);
      toast.success("property view opened");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    const property = await getPropertyAPI(id);
    const deleteProperty = (deleteMutation, id) => {
      const loadingToastId = toast.loading("deleting...", {
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
          console.log(res);
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
          console.log(err);
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
      if (user?._id !== property?.property?.createdByUser?._id) {
        toast.error(`${user?.role} can only Delete their own Properties`);
      } else {
        deleteProperty(deleteMutation, id);
      }
    } else {
      deleteProperty(deleteMutation, id);
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

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const properties = data?.properties || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  const TableHeader = [
    {
      name: "Properties Name",
    },
    {
      name: "Location",
    },
    {
      name: "Project Name",
    },
    {
      name: "Actions",
    },
  ];

  return (
    <>
      <TableList
        name={"property"}
        search={search}
        handleInputChange={handleInputChange}
        buttonName={"Add Properties"}
        buttonLink={"properties/add"}
        TableHeader={TableHeader}
        TableData={properties}
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
        ModelData={selectedProperty}
        user={user}
      />
    </>
  );
};

export default PropertiesLists;
