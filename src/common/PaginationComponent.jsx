import React from 'react';
const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };
    return (
        <div className='flex justify-between items-center px-6 pt-4 border-t'>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='py-2 px-4 border border-gray-300 rounded'
            >
                Previous
            </button>
            <div className='text-sm'>
                Page {currentPage} of {totalPages}
            </div>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='py-2 px-4 border border-gray-300 rounded'
            >
                Next
            </button>
        </div>
    );
};

export default PaginationComponent;
