import React from 'react'
import { FaTimes } from 'react-icons/fa';
export const AgentModal = ({isOpen,agent,onClose}) => {
    if(!isOpen) return null;
    const formattedDob = agent?.dob
        ? new Date(agent.dob).toLocaleDateString('en-US', {
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
            <h2 className='text-2xl mb-4'>agent Details</h2>
           
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Name:</strong> {agent?.name}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Contact:</strong> {agent?.contact}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Address:</strong> {agent?.address}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Email:</strong> {agent?.email}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Qatar Id:</strong> {agent?.qatarId}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>State:</strong> {agent?.state}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Date of Birth:</strong> {formattedDob }</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Pin Code:</strong> {agent?.pinCode}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>City:</strong> {agent?.city}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Commision Info:</strong> {agent?.commissionInfo}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>License Info:</strong> {agent?.licenseInfo}</p>
            <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Projects Info:</strong> {agent?.projects}</p>
          </div>
        </div>
      );
};
