import {useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deleteOwnersAPI, getOwnerById, listOwnersAPI } from '../../APIServices/mastersAPI/ownersAPI';
import { FaEye, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { OwnerModal } from './OwnerModal';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../../common/Spinner';

export const OwnersList = () => {
  const navigate=useNavigate();
    const [page,setPage]=useState(1);
    const [selectedOwner,setSelectedOwner]=useState(null);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [search,setSearch]=useState('');
    const limit=3;
    const {data,isLoading,refetch,isError,error}=useQuery({
        queryKey:['owners',page,limit,search],
        queryFn:()=>listOwnersAPI(page,limit,search),
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    });
    const ownerMutation=useMutation({
        mutationKey:['delete-owner'],
        mutationFn:deleteOwnersAPI,
        onSuccess:()=>{
            toast.success("Owner Deleted Successfully");
            refetch();
        },
        onError:(error)=>{
            toast.error(`Error : ${error.message}`)
        }


    });
    const deleteHandler=(id)=>{
        ownerMutation.mutateAsync(id);
    }
const viewOwnerHandler=async(id)=>{
  try{
   const owner= await getOwnerById(id);
    setSelectedOwner(owner);
    setModalOpen(true);
    toast.success("Owner View Opened")
  }catch(error){
    toast.error(`Error: ${error.message}`);
  }
}
const handleEditClick = (id) => {
  navigate(`/admin-dashboard/update-owner/${id}`); 
}
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    const listOwner=data?.listOwner || [];
    const totalPages = data?.totalPages || 1;
    const currentPage = data?.currentPage || 1;
    const maskContactNumber = (contact) => {
        if (!contact) return '';
        const firstFour = contact.slice(0, 4);
        const maskedPart = '*'.repeat(contact.length - 4);
        return `${firstFour}${maskedPart}`;
      };
      if(isLoading){
        return <Spinner/>
      }
    return (
        <section className='py-8 bg-gray-300 rounded-3xl'>
          <div className='container px-4 mx-auto'>
            <div className='flex flex-col space-y-4'>
              <div className='flex justify-between items-center pb-4 border-b'>
                <div>
                  <span className='text-xl bg-white p-4 w-24 text-center'>10</span> Records Per page
                </div>
                <div className='border-black bg-slate-50 text-black p-2 h-full rounded-lg'>
                    <Link to="/admin-dashboard/owners">
                  Add Owner
                    </Link>
                </div>
                <div>
                  <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Here'
                    className='p-2 border rounded-3xl'
                  />
                </div>
              </div>
              <div className='bg-white border-b rounded-2xl'>
                <div className='pb-4'>
                  <div className='overflow-x-auto'>
                    <table className='table-auto w-full'>
                      <thead>
                        <tr>
                          <th className='pb-3 text-black font-medium text-left p-3'>Owner Name</th>
                          <th className='pb-3 text-black font-medium text-left p-3'>Contact</th>
                          <th className='pb-3 text-black font-medium text-left p-3'>Address</th>
                          <th className='pb-3 text-black font-medium text-left p-3'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listOwner.length ? (
                          listOwner.map((owner, index) => (
                            <tr
                            key={owner._id}
                            className={  ` rounded-2xl bg-gray-100 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white-300'} mb-4`}
                          >
                              <td className='py-2 px-4 text-black'>{owner?.name}</td>
                              <td className='py-2 px-4 text-black'>{maskContactNumber(owner?.contact)}</td>
                              <td className='py-2 px-4 text-black'>{owner?.address}</td>
                              <td className='py-2 px-4'>
                                <div className='flex gap-2'>
                                  <FaEye onClick={()=>viewOwnerHandler(owner._id)} className='text-blue-500 cursor-pointer' />
                               <FaPencilAlt onClick={() => handleEditClick(owner._id)} className='text-yellow-500 cursor-pointer' />
                                  <FaRegTrashAlt  onClick={() => deleteHandler(owner._id)} className='text-red-500 cursor-pointer' />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className='py-2 px-4 text-center text-black'>
                              No Owners Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div>
                    <div className='flex gap-4 justify-center mt-5 '>
                            <button
                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                disabled={page === 1}
                                className='py-2 px-4  rounded cursor-pointer'
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage((old) => (currentPage < totalPages ? old + 1 : old))}
                                disabled={page === totalPages}
                                className='py-2 px-4 cursor-pointer rounded'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div >Showing {currentPage} to  {totalPages} of {limit} entries </div>
            </div>
          </div>
          {
            isModalOpen && (
              <OwnerModal isOpen={isModalOpen} owner={selectedOwner}
              onClose={()=>setModalOpen(false)}/>
            )
          }
        </section>
        
      );
    };

