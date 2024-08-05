import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Spinner } from "../../common/Spinner";
import {
  deletePropertyAPI,
  getAllPropertyAPI,
  getPropertyAPI,
} from "../../APIServices/propertyAPI/propertyAPI";
import { useState } from "react";
import { PropertyModal } from "./PropertyModal";

const PropertiesLists = () => {
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

  const handleEdit = (id) => {
    navigate("/admin-dashboard/properties/edit", { state: { id } });
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

  const handleDelete = (id) => {
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

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const properties = data?.properties || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <div className="min-h-full w-full p-9 bg-[#d8d8d8] rounded-2xl">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between rounded-2xl p-4 mb-4 font-semibold">
          <div>
            <p className="text-lg">
              <span className="bg-white p-2 text-2xl">10</span> Records per page
            </p>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex rounded-3xl p-2 focus:outline-none placeholder-black text-center"
            placeholder="Search here"
          />
          <Link to={`/admin-dashboard/properties/add`}>
            <button className="bg-[#58ac3b] p-2 rounded-full">
              Add Properties
            </button>
          </Link>
        </div>
        <div className="w-full h-full bg-white text-xl rounded-2xl p-3">
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            <thead>
              <tr className="w-full font-light">
                <th className="py-2 px-4 text-left w-1/4"> Properties Name</th>
                <th className="py-2 px-4 text-left w-1/4">Location</th>
                <th className="py-2 px-4 text-left w-1/4">Project Name</th>
                <th className="py-2 px-4 text-left w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length ? (
                properties.map((property, index) => (
                  <tr key={index}>
                    <td colSpan="4">
                      <div className="bg-[#d8d8d8] rounded-xl flex items-center p-2 justify-between">
                        <div className="py-2 w-1/4">
                          {property?.propertyName}
                        </div>
                        <div className="py-2 w-1/4">{property?.city}</div>
                        <div className="py-2 w-1/4">
                          {property?.project?.projectName}
                        </div>
                        <div className="w-1/4 flex space-x-2">
                          <button
                            onClick={() => handleView(property._id)}
                            className="text-black hover:text-blue-700"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => handleEdit(property._id)}
                            className="text-black hover:text-yellow-700"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            className="text-black hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center text-black">
                    No Properties Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center mx-auto mt-3 gap-4 space-x-2 text-xl font-medium">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="hover:cursor-pointer"
          >
            &lt;&lt; Prev
          </button>
          <button
            onClick={() =>
              setPage((old) => (page < totalPages ? old + 1 : old))
            }
            disabled={page === totalPages}
            className="hover:cursor-pointer"
          >
            Next &gt;&gt;
          </button>
        </div>
        <div className="p-4 font-medium mt-10">
          <span>
            Showing {currentPage} to {totalPages} of {limit} entries
          </span>
        </div>
      </div>
      {isModalOpen && (
        <PropertyModal
          isOpen={isModalOpen}
          property={selectedProperty}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PropertiesLists;
