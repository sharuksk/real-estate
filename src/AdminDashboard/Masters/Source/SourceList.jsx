import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteSourceTypeAPI, getSourceAPI } from '../../../APIServices/mastersAPI/sourceAPI';

export const SourceList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const limit = 3;
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['source', page, limit, search],
        queryFn: () => getSourceAPI(page, limit, search),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
    const sourceMutation = useMutation({
        mutationKey: ['delete-source'],
        mutationFn: deleteSourceTypeAPI,
        onSuccess: () => {
            toast.success("Source Deleted Successfully");
            refetch();
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });


    const deleteHandler = (id) => {
        sourceMutation .mutateAsync(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const source = data?.source || [];
    const totalPages = data?.totalPages || 1;
    const currentPage = data?.currentPage || 1;

    return (
        <section className='py-8'>
            <div className='container px-4 mx-auto'>
                <div className='flex flex-col space-y-4'>
                    <div className='flex justify-between items-center px-6 pb-4 border-b'>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search amenities'
                            className='p-2 border rounded-2xl'
                        />
                        <div className='flex gap-4'>
                            <button
                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                disabled={page === 1}
                                className='py-2 px-4 border border-gray-300 rounded'
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage((old) => (currentPage < totalPages ? old + 1 : old))}
                                disabled={page === totalPages}
                                className='py-2 px-4 border border-gray-300 rounded'
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className='px-6 pb-4'>
                        <div className='overflow-x-auto'>
                            <table className='table-auto w-full'>
                                <thead>
                                    <tr className='text-xs text-gray-500 text-left'>
                                        <th className="pb-3 text-black font-medium">Source </th>
                                        <th className="pb-3 text-black font-medium">Created By</th>
                                        <th className="pb-3 text-black font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {source.length ? (
                                        source.map((sources) => (
                                            <tr key={sources._id} className="text-xs bg-gray-50">
                                                <td className="py-4 px-6 font-medium">
                                                    {sources.sourcename}
                                                </td>
                                                <td className="py-4 px-6 font-medium">
                                                    {sources.createdBy}
                                                </td>
                                                <td className="py-4 px-6 font-medium text-center">
                                                    <button 
                                                        onClick={() => deleteHandler(sources._id)}
                                                        className="bg-red-500 h-9 w-full rounded-xl text-white cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">No Source found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className='bg-gray-100 text-sm'>Showing {currentPage} of {totalPages} pages</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};