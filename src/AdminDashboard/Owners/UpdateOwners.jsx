import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateOwnerAPI, getOwnerById } from '../../APIServices/mastersAPI/ownersAPI';
import toast from 'react-hot-toast';
const validationSchema = Yup.object({
    name: Yup.string().notRequired(),
    contact: Yup.string().notRequired(),
    dob: Yup.date().notRequired(), 
    state: Yup.string().notRequired(),
    pinCode: Yup.string().notRequired(),
    preferredLanguage: Yup.string().notRequired(),
    address: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    email: Yup.string().email("Invalid email").notRequired(),
    qatarId: Yup.string().notRequired(),
});

export const UpdateOwner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: '',
        contact: '',
        dob: '',
        state: '',
        pinCode: '',
        preferredLanguage: '',
        address: '',
        city: '',
        email: '',
        qatarId: '',
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await updateOwnerAPI(id, values);
                toast.success("Owner updated successfully");
                navigate('/admin-dashboard/ownerlist'); 
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        },
    });

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const owner = await getOwnerById(id); 
                setInitialValues(owner);
                formik.setValues(owner); 
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };

        fetchOwnerData();
    }, []);

    return (
        <div className='w-full h-full p-9 bg-gray-300 rounded-xl'>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex justify-between bg-white rounded-2xl p-4 mb-4'>
                    <div>Update Owner</div>
                    <Link to="/admin-dashboard/ownerlist" className="hover:bg-red-400">
                        <div>Owner List</div>
                    </Link>
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
                            className='p-2 ml-4 h-9 border border-gray-300 rounded-xl'
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
                            className='p-2 h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.pinCode && formik.errors.pinCode ? (
                            <div className="text-red-500 text-sm">{formik.errors.pinCode}</div>
                        ) : null}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <label htmlFor='preferredLanguage' className='font-medium text-gray-700'>Preferred <br />Language</label>
                        <input
                            id='preferredLanguage'
                            type='text'
                            placeholder='Preferred Language'
                            {...formik.getFieldProps('preferredLanguage')}
                            className='p-2 h-9 border border-gray-300 rounded-xl'
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
                            className='p-2 h-9 border border-gray-300 rounded-xl'
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
                            className='p-2 h-9 border border-gray-300 rounded-xl'
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
                            className='p-2 h-9 border border-gray-300 rounded-xl'
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div className='flex justify-center gap-4 mt-40 '>
                    <button
                        type="submit"
               
                        className='px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36'
                    >
    Submit
                    </button>
                      <Link to="/admin-dashboard/ownerlist">
                    <button
                        type="button"
                        // onClick={() => formik.resetForm()}
                        className='px-4 py-2  bg-gray-600 text-white rounded-xl hover:bg-gray-600 w-36'
                    >
                      Cancel
                    </button>
                    </Link>
                </div>

                {/* <div className='mt-4 flex gap-4'>
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
                        Save
                    </button>
                    <Link to="/admin-dashboard/ownerlist">
                        <button type='button' className='bg-gray-500 text-white p-2 rounded-md'>
                            Cancel
                        </button>
                    </Link>
                </div> */}
            </form>
        </div>
    );
};