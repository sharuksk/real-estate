import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PropertyModal } from "../AdminDashboard/Properties/PropertyModal";
import { ProjectModal } from "../AdminDashboard/Projects/ProjectModal";

const TableList = ({
  name,
  search,
  handleInputChange,
  buttonName,
  buttonLink,
  TableHeader,
  TableData,
  handleView,
  handleEdit,
  handleDelete,
  page,
  setPage,
  totalPages,
  currentPage,
  limit,
  isModalOpen,
  setModalOpen,
  ModelData,
  user,
}) => {
  return (
    <section className="py-8 bg-gray-300 rounded-3xl">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center pb-4 border-b bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="text-xl bg-white p-4 w-24 text-center">10</span>
              <span className="text-sm sm:text-base">Records Per Page</span>
            </div>
            <form className="w-full sm:w-72 md:w-96 lg:w-1/2 xl:w-1/3">
              <input
                type="text"
                defaultValue={search}
                onChange={handleInputChange}
                placeholder="Search Here"
                className="p-2 border rounded-3xl w-full text-center"
              />
            </form>
            <Link
              to={`/${
                user?.role ? user?.role.toLowerCase() : "admin"
              }-dashboard/${buttonLink}`}
            >
              <button className="bg-[#58ac3b] p-2 rounded-full mt-2  mr-4 sm:mt-0">
                {buttonName}
              </button>
            </Link>
          </div>

          <div className="bg-white border-b rounded-2xl overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {TableHeader.map((header, index) => (
                    <th
                      key={index}
                      className="pb-3 text-black font-medium text-left p-3"
                    >
                      {header.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TableData.length ? (
                  TableData.map((data, index) => (
                    <tr
                      key={index}
                      className={`rounded-2xl ${
                        index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                      } mb-4`}
                    >
                      <td className="py-2 px-4 text-black">
                        {name === "property"
                          ? data?.propertyName
                          : data?.projectName}
                      </td>
                      <td className="py-2 px-4 text-black">
                        {name === "property" ? data?.city : data?.location}
                      </td>
                      <td className="py-2 px-4 text-black">
                        {name === "property"
                          ? data?.project?.projectName
                          : data?.propertyCount}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(data._id)}
                            className="text-black hover:text-blue-700"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => handleEdit(data._id)}
                            className="text-black hover:text-yellow-700"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(data._id)}
                            className="text-black hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
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
                      No {name === "property" ? "Properties" : "Projects"} Found
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
      {isModalOpen && name === "property" && (
        <PropertyModal
          isOpen={isModalOpen}
          property={ModelData}
          onClose={() => setModalOpen(false)}
        />
      )}
      {isModalOpen && name === "project" && (
        <ProjectModal
          isOpen={isModalOpen}
          project={ModelData}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};

export default TableList;
