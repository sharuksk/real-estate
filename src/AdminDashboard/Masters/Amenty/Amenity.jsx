import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { addAmenityAPI } from '../../../APIServices/mastersAPI/amenityAPI';
export const Amenity = () => {
  const formik = useFormik({
    initialValues: {
      amenityname: '',
    },
    validationSchema: Yup.object({
      amenityname: Yup.string().required('Amenity Name is Required'),
    }),
    onSubmit: async (values) => {
  
        const response = await addAmenityAPI(values);
       
          toast.success('Amenity Added Successfully');
          formik.resetForm(); 
      
    
    },
    onReset: () => {
      console.log('Form reset');
    },
  });

  return (
    <div className='w-96 p-9 bg-gray-300 justify-center rounded-2xl'>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className='flex flex-row gap-9'>
          <label htmlFor='amenityname' className='block gap-6 text-black font-semibold'>
            Amenity
          </label>
          <input
            id='amenityname'
            type='text'
            {...formik.getFieldProps('amenityname')}
            className='p-0 text-center w-full h-8 rounded-3xl focus:ring-indigo-500'
            placeholder='Amenity'
          />
          {formik.touched.amenityname && formik.errors.amenityname && (
            <div className='text-red-500'>{formik.errors.amenityname}</div>
          )}
        </div>
        <div className='flex flex-row items-center mt-9 m-auto gap-8'>
          <button
            type='submit'
            className='py-2 px-4 w-36 border border-transparent rounded-2xl font-bold shadow-sm text-sm text-white bg-green-400'
          >
            Submit
          </button>
          <button
            type='reset'
            className='py-2 px-4 w-36 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-gray-400'
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};