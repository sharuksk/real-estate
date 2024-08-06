import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAgentAPI, getAgentById } from '../../APIServices/mastersAPI/agentsAPI';
import toast from 'react-hot-toast';
const validationSchema = Yup.object({
    name: Yup.string().notRequired(),
    contact: Yup.string().notRequired(),
    dob: Yup.date().notRequired(), 
    state: Yup.string().notRequired(),
    pinCode: Yup.string().notRequired(),
    address: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    email: Yup.string().email("Invalid email").notRequired(),
    qatarId: Yup.string().notRequired(),
    commissionInfo: Yup.string().notRequired(),
    licenseInfo: Yup.string().notRequired(),
    projects: Yup.string().notRequired(),
});

export const UpdateAgent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: '',
        contact: '',
        dob: '',
        state: '',
        pinCode: '',
        address: '',
        city: '',
        email: '',
        qatarId: '',
        commissionInfo: '',
        licenseInfo: '',
        projects: '',
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await updateAgentAPI(id, values);
                toast.success("Agent updated successfully");
                navigate('/admin-dashboard/agentlist'); 
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        },
    });

    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const agent = await getAgentById(id); 
                setInitialValues(agent);
                formik.setValues(agent); 
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };

        fetchAgentData();
    }, []);

    return (
        <div className='w-full h-full p-9 bg-gray-300 rounded-xl'>
            <div className='flex justify-between bg-white rounded-2xl p-4 mb-4'>
                <div>Update Agent</div>
                <Link to="/admin-dashboard/agentlist" className="hover:bg-red-400">
                    <div>Agent List</div>
                </Link>
            </div>
            <form className='mt-6 h-full max-w-fit' onSubmit={formik.handleSubmit}>
                <div className='space-y-6'>
                    <div className='grid grid-cols-2 gap-6'>
                        {[
                            { id: 'name', label: 'Agent Name', type: 'text', placeholder: 'Agent Name' },
                            { id: 'contact', label: 'Contact', type: 'text', placeholder: 'Agent Contact' },
                            { id: 'qatarId', label: 'Qatar ID', type: 'text', placeholder: 'Qatar ID' },
                            { id: 'dob', label: 'DOB', type: 'date', placeholder: 'DOB' },
                            { id: 'state', label: 'State', type: 'text', placeholder: 'State' },
                            { id: 'pinCode', label: 'Pin Code', type: 'text', placeholder: 'Pin Code' },
                            { id: 'address', label: 'Address', type: 'text', placeholder: 'Address' },
                            { id: 'city', label: 'City', type: 'text', placeholder: 'City' },
                            { id: 'email', label: 'Email', type: 'email', placeholder: 'Agent Email' },
                            { id: 'commissionInfo', label: 'Commission Info', type: 'text', placeholder: 'Commission' },
                            { id: 'licenseInfo', label: 'License Info', type: 'text', placeholder: 'License' },
                            { id: 'projects', label: 'Projects Info', type: 'text', placeholder: 'Projects' },
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
                    <div className='flex justify-center gap-4 mt-44'>
                        <button
                            type="submit"
                            // disabled={agentMutation.isLoading}
                            className='px-4 py-2 bg-green-400 text-white rounded-xl hover:bg-green-600 w-36'
                        >
                           Submit
                        </button>
                        <Link to="/admin-dashboard/agentlist">
                            <button
                                type="button"
                                className='px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 w-36'
                            >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
    
    
};