import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  deleteClientsAPI,
  getClientById,
  listClientsAPI,
} from "../../APIServices/mastersAPI/clientsAPI";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { ClientModal } from "./ClientModal";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../common/Spinner";
import { useSelector } from "react-redux";

export const ClientsList = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 3;

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["clients", page, limit, search],
    queryFn: () => listClientsAPI(page, limit, search),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const clientMutation = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: deleteClientsAPI,
    onSuccess: () => {
      toast.success("Client Deleted Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const deleteHandler = (id) => {
    clientMutation.mutateAsync(id);
  };

  const viewClientHandler = async (id) => {
    try {
      const client = await getClientById(id);
      setSelectedClient(client);
      setModalOpen(true);
      toast.success("Client View Opened");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEditClick = (id) => {
    // navigate(`/admin-dashboard/update-client/${id}`);
    navigate(
      `/${
        user?.role === "Agent" ? user?.role.toLowerCase() : "admin"
      }-dashboard/update-client/${id}`
    );
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const listClient = data?.clients || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  const maskContactNumber = (contact) => {
    if (!contact) return "";
    const firstFour = contact.slice(0, 4);
    const maskedPart = "*".repeat(contact.length - 4);
    return `${firstFour}${maskedPart}`;
  };

  return (
    <section className="py-8 bg-gray-300 rounded-3xl">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center pb-4 border-b bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="text-xl bg-white p-4 w-24 text-center">10</span>
              <span className="text-sm sm:text-base">Records Per Page</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Here"
              className="p-2 border rounded-3xl w-full sm:w-72 md:w-96 lg:w-1/2 xl:w-1/3"
            />
            <Link
              to={`/${
                user?.role === "Agent" ? user?.role.toLowerCase() : "admin"
              }-dashboard/clients`}
            >
              <button className="bg-[#58ac3b] p-2 rounded-full mt-2  mr-4 sm:mt-0">
                Add Client
              </button>
            </Link>
            {/* <div className='border-black bg-slate-50 text-black p-2 rounded-lg mb-4 md:mb-0'>
              <Link to='/admin-dashboard/clients'>Add Client</Link>
            </div> */}
            <div className="w-full md:w-auto"></div>
          </div>
          <div className="bg-white border-b rounded-2xl">
            <div className="pb-4">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="pb-3 text-black font-medium text-left p-3">
                        Client Name
                      </th>
                      <th className="pb-3 text-black font-medium text-left p-3">
                        Contact
                      </th>
                      <th className="pb-3 text-black font-medium text-left p-3">
                        Address
                      </th>
                      <th className="pb-3 text-black font-medium text-left p-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listClient.length ? (
                      listClient.map((client, index) => (
                        <tr
                          key={client._id}
                          className={`rounded-2xl ${
                            index % 2 === 0 ? "bg-gray-200" : "bg-white"
                          } mb-4`}
                        >
                          <td className="py-2 px-4 text-black">
                            {client?.name}
                          </td>
                          <td className="py-2 px-4 text-black">
                            {maskContactNumber(client?.contact)}
                          </td>
                          <td className="py-2 px-4 text-black">
                            {client?.address}
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex gap-2">
                              <FaEye
                                onClick={() => viewClientHandler(client._id)}
                                className="text-blue-500 cursor-pointer"
                              />
                              <FaPencilAlt
                                onClick={() => handleEditClick(client._id)}
                                className="text-yellow-500 cursor-pointer"
                              />
                              <FaRegTrashAlt
                                onClick={() => deleteHandler(client._id)}
                                className="text-red-500 cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-2 px-4 text-center text-black"
                        >
                          No Clients Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex gap-4 justify-center mt-5">
                  <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                    className="py-2 px-4 rounded cursor-pointer hover:cursor-pointer"
                  >
                    &lt;&lt; Prev
                  </button>
                  <button
                    onClick={() =>
                      setPage((old) =>
                        currentPage < totalPages ? old + 1 : old
                      )
                    }
                    disabled={page === totalPages}
                    className="py-2 px-4 cursor-pointer rounded  hover:cursor-pointer"
                  >
                    Next &gt;&gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            Showing {currentPage} to {totalPages} of {limit} entries
          </div>
        </div>
      </div>
      {isModalOpen && selectedClient && (
        <ClientModal
          isOpen={isModalOpen}
          client={selectedClient}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};
