import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const LeadModal = ({ isOpen, lead, onClose }) => {
    if (!isOpen) return null;
    const leadData = lead || {};

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-green-300 p-6 rounded-lg w-1/2'>
                <button 
                    onClick={onClose} 
                    className='mt-3 mr-12 text-red-500'
                    aria-label="Close modal"
                >
                    <FaTimes size={20} />
                </button>
                <h2 className='text-2xl mb-4'>Lead Details</h2>
               
                <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Name:</strong> {leadData.leadName}</p>
                <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Contact:</strong> {leadData.contact}</p>
                <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Location:</strong> {leadData.location }</p>
                <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Email:</strong> {leadData.email }</p>
                <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Source:</strong> {leadData.source?.sourcename}</p>
                <p className='border-b p-3 bg-white'><strong className='bg-gray-300'>Property Type:</strong> {leadData.propertyType?.propertyTypeName}</p>
            </div>
        </div>
    );
};
