import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { addOwnersAPI } from '../../APIServices/mastersAPI/ownersAPI'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
export const Owners = () => {
    
    const ownerMutation = useMutation({
        mutationKey: ['add-owner'],
        mutationFn: addOwnersAPI,
        onSuccess: () => {
            toast.success("Owner Created Successfully");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            contact: "",
            dob: "",
            state: "",
            pinCode: "",
            preferredLanguage: "",
            address: "",
            city: "",
            email: "",
            qatarId:"",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            contact: Yup.string().required("Contact is required"),
            dob: Yup.date().required("Date of Birth is required"),
            state: Yup.string().required("State is required"),
            pinCode: Yup.string().required("Pin Code is required"),
            preferredLanguage: Yup.string().required("Preferred Language is required"),
            address: Yup.string().required("Address is required"),
            city: Yup.string().required("City is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            qatarId: Yup.string().required("Qatr Id is required"),
        }),
        onSubmit: (values) => {
            // toast.success("Owner Created Successfully");
            ownerMutation.mutateAsync(values);
            formik.resetForm();
        },
        // onReset:()=>{
        //     onReset && onReset();
        //     console.log('Form reset');
        // }
    });
    
    return (
        <div className='w-full h-full p-9 bg-gray-300 rounded-xl '>
            <div className='flex justify-between bg-white rounded-2xl p-4 mb-4'>
                <div>Add Owner</div>
                <Link to="/admin-dashboard/ownerlist" className="hover:bg-red-400">
                    <div>Owner List</div>
                </Link>
            </div>
            <form className='mt-6 h-full max-w-fit' onSubmit={formik.handleSubmit}>
                <div className='space-y-6'>
                    <div className=' md:grid md:grid-cols-2 md:gap-6 sm:grid sm:grid-cols-1 sm:gap-6'>
                        {[
                            { id: 'name', label: 'Owner Name', type: 'text', placeholder: 'Owner Name' },
                            { id: 'contact', label: 'Contact', type: 'text', placeholder: 'Owner Contact' },
                            { id: 'qatarId', label: 'Qatar ID', type: 'text', placeholder: 'Qatar Id' },
                            { id: 'dob', label: 'DOB', type: 'date', placeholder: 'DOB' },
                            { id: 'state', label: 'State', type: 'text', placeholder: 'State' },
                            { id: 'pinCode', label: 'Pin Code', type: 'text', placeholder: 'Pin Code' },
                            { id: 'preferredLanguage', label: 'Preferred Language', type: 'text', placeholder: 'Preferred Language' },
                            { id: 'address', label: 'Address', type: 'text', placeholder: 'Address' },
                            { id: 'city', label: 'City', type: 'text', placeholder: 'City' },
                            { id: 'email', label: 'Email', type: 'email', placeholder: 'Owner Mail' }
                        ].map(({ id, label, type, placeholder }) => (
                            <div key={id} className='flex items-center gap-6'>
                                <label htmlFor={id} className='w-36 font-medium text-gray-700'>{label}</label>
                                <input
                                    id={id}
                                    type={type}
                                    placeholder={placeholder}
                                    {...formik.getFieldProps(id)}
                                    className='p-2 h-9 border border-gray-300 rounded-xl flex-1'
                                />
                                {formik.touched[id] && formik.errors[id] ? (
                                    <div className="text-red-500 text-sm ml-2">{formik.errors[id]}</div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                  
                </div>
                <div className='flex justify-center gap-4 mt-44'>
                        <button
                            type="submit"
                            disabled={ownerMutation.isLoading}
                            className='px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36'
                        >
                            {ownerMutation.isLoading ? "Submitting..." : "Submit"}
                        </button>
                        <button
                            type="button"
                            onClick={() => formik.resetForm()}
                            className='px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 w-36'
                        >
                            Reset
                        </button>
                    </div>
            </form>
            
        </div>
    );
    
}

