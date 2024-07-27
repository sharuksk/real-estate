import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { addOwnersAPI } from '../../APIServices/mastersAPI/ownersAPI'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
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
        <div className='w-full h-full p-9 bg-gray-300 rounded-xl'>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex justify-between bg-white rounded-2xl p-4 mb-4'>
                    <div>Add Owner</div>
                    <div>Owner List</div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-row gap-6'>
                        <label htmlFor='name' className='font-medium text-gray-700'>Owner Name</label>
                        <input
    id='name'
    type='text'
    placeholder='Owner Name'
    {...formik.getFieldProps('name')}
    className='p-2 h-9 border border-gray-300 rounded-xl'
/>

                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='contact' className='font-medium text-gray-700'>Contact</label>
                        <input
    id='contact'
    type='text'
    placeholder='Owner Contact'
    {...formik.getFieldProps('contact')}
    className='p-2 h-9 border border-gray-300 rounded-xl'
/>

                        {formik.touched.contact && formik.errors.contact ? (
                            <div className="text-red-500 text-sm">{formik.errors.contact}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='qatarId' className='font-medium text-gray-700'>Qatar ID</label>
                        <input
                            id='qatarId'
                            type='text'
                             placeholder='Qatar Id'
                            {...formik.getFieldProps('qatarId')}
                           className='p-2 h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.qatarId && formik.errors.qatarId ? (
                            <div className="text-red-500 text-sm">{formik.errors.qatarId}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='dob' className='font-medium text-gray-700'>DOB</label>
                        <input
                            id='dob'
                            type='date'
                             placeholder='DOB'
                            {...formik.getFieldProps('dob')}
                         className='p-2  ml-4  h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                            <div className="text-red-500 text-sm">{formik.errors.dob}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='state' className='font-medium text-gray-700'>State</label>
                        <input
                            id='state'
                            type='text'
                             placeholder='State'
                            {...formik.getFieldProps('state')}
                      className='p-2 ml-4 h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.state && formik.errors.state ? (
                            <div className="text-red-500 text-sm">{formik.errors.state}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='pinCode' className='font-medium text-gray-700'>Pin Code</label>
                        <input
                            id='pinCode'
                            type='text'
                               placeholder='Pin Code'
                            {...formik.getFieldProps('pinCode')}
           className='p-2  h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.pinCode && formik.errors.pinCode ? (
                            <div className="text-red-500 text-sm">{formik.errors.pinCode}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='preferredLanguage' className='font-medium text-gray-700'>Preferred <br/>Language</label>
                        <input
                            id='preferredLanguage'
                            type='text'
                             placeholder='Preferred Language'
                            {...formik.getFieldProps('preferredLanguage')}
                          className='p-2  h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.preferredLanguage && formik.errors.preferredLanguage ? (
                            <div className="text-red-500 text-sm">{formik.errors.preferredLanguage}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='address' className='font-medium text-gray-700'>Address</label>
                        <input
                            id='address'
                               placeholder='Address'
                            {...formik.getFieldProps('address')}
                        className='p-2  h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.address && formik.errors.address ? (
                            <div className="text-red-500 text-sm">{formik.errors.address}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='city' className='font-medium text-gray-700'>City</label>
                        <input
                            id='city'
                            type='text'
                            placeholder='City'
                            {...formik.getFieldProps('city')}
     className='p-2  h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.city && formik.errors.city ? (
                            <div className="text-red-500 text-sm">{formik.errors.city}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='email' className='font-medium text-gray-700'>Email</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Owner Mail'
                            {...formik.getFieldProps('email')}
                           className='p-2  h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>

                <div className='flex justify-center gap-4 mt-40 '>
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
                        className='px-4 py-2  bg-gray-600 text-white rounded-xl hover:bg-gray-600 w-36'
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

