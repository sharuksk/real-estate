import React from 'react'
import { FaTimes } from 'react-icons/fa';
export const OwnerModal = ({isOpen,owner,onClose}) => {
    if(!isOpen) return null;
    const formattedDob = owner?.dob
        ? new Date(owner.dob).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '';
    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-green-300 p-6 rounded-lg w-1/2'>
          <button 
                    onClick={onClose} 
                    className=' mt-3 mr-12 text-red-500'
                    aria-label="Close modal"
                >
                    <FaTimes size={20} />
                </button>
            <h2 className='text-2xl mb-4'>Owner Details</h2>
           
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Name:</strong> {owner?.name}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Contact:</strong> {owner?.contact}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Address:</strong> {owner?.address}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Email:</strong> {owner?.email}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Qatar Id:</strong> {owner?.qatarId}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>State:</strong> {owner?.state}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Date of Birth:</strong> {formattedDob }</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Preferred Language:</strong> {owner?.preferredLanguage}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Pin Code:</strong> {owner?.pinCode}</p>
           
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>City:</strong> {owner?.city}</p>
          </div>
        </div>
      );
};
