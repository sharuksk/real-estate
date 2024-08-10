import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  deleteleadAPI,
  getAllLeadsAPI,
  getLeadById,
} from "../../APIServices/leadsAPI/leadsAPI";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { LeadModal } from "./LeadModel";
import { Spinner } from "../../common/Spinner";
import { useSelector } from "react-redux";

export const LeadList = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["leads", page, limit, search],
    queryFn: () => getAllLeadsAPI(page, limit, search),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const leadMutation = useMutation({
    mutationKey: ["delete-lead"],
    mutationFn: deleteleadAPI,
    onSuccess: () => {
      toast.success("Lead Deleted Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error : ${error.message}`);
    },
  });

  const deleteHandler = (id) => {
    leadMutation.mutateAsync(id);
  };

  const viewLeadHandler = async (id) => {
    try {
      const response = await getLeadById(id);
      console.log("Lead fetched:", response);
      setSelectedLead(response.lead);
      setModalOpen(true);
      toast.success("Lead View Opened");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  const handleEditClick = async (id) => {
    navigate(
      `/${
        user?.role ? user?.role?.toLowerCase() : "admin"
      }-dashboard/update-lead/${id}`
    );
  };

  const leads = data?.leads || [];
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
              to={
                user?.role === "Agent"
                  ? "/agent-dashboard/leads"
                  : `/admin-dashboard/leads`
              }
            >
              <button className="bg-[#58ac3b] p-2 rounded-full mt-2  mr-4 sm:mt-0">
                Add Lead
              </button>
            </Link>
            {/* <Link to="/admin-dashboard/leads" className='border-black bg-slate-50 text-black p-2 rounded-lg'>
              Add Lead
            </Link> */}
          </div>
          <div className="bg-white border-b rounded-2xl overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="pb-3 text-black font-medium text-left p-3">
                    Lead
                  </th>
                  <th className="pb-3 text-black font-medium text-left p-3">
                    Location
                  </th>
                  <th className="pb-3 text-black font-medium text-left p-3">
                    Contact
                  </th>
                  <th className="pb-3 text-black font-medium text-left p-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.length ? (
                  leads.map((lead, index) => (
                    <tr
                      key={lead._id}
                      className={`rounded-2xl ${
                        index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                      } mb-4`}
                    >
                      <td className="py-2 px-4 text-black">{lead?.leadName}</td>
                      <td className="py-2 px-4 text-black">{lead?.location}</td>
                      <td className="py-2 px-4 text-black">
                        {maskContactNumber(lead?.contact)}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          <FaEye
                            onClick={() => viewLeadHandler(lead._id)}
                            className="text-blue-500 cursor-pointer hover:text-blue-700"
                          />
                          <FaPencilAlt
                            onClick={() => handleEditClick(lead._id)}
                            className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                          />
                          <FaRegTrashAlt
                            onClick={() => deleteHandler(lead._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
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
                      No Leads Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex gap-4 justify-center mt-5">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="py-2 px-4  hover:cursor-pointer"
              >
                &lt;&lt; Prev
              </button>
              <button
                onClick={() =>
                  setPage((old) => (page < totalPages ? old + 1 : old))
                }
                disabled={page === totalPages}
                className="py-2 px-4  hover:cursor-pointer"
              >
                Next &gt;&gt;
              </button>
            </div>
          </div>
          <div className="p-4 font-medium">
            Showing {currentPage} to {totalPages} of {limit} entries
          </div>
        </div>
      </div>
      {isModalOpen && selectedLead && (
        <LeadModal
          isOpen={isModalOpen}
          lead={selectedLead}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};
