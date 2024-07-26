import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const FormComponent = ({ 
  initialValues, 
  validationSchema, 
  onSubmit, 
  onReset, 
  fields, 
  submitButtonText, 
  resetButtonText, 
  successMessage 
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      toast.success(successMessage);
      formik.resetForm();
    },
    onReset: () => {
      onReset && onReset();
      console.log('Form reset');
    },
  });

  return (
    <div className='w-96 p-9 bg-gray-300 justify-center rounded-2xl'>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        {fields.map((field, index) => (
          <div key={index} className='flex flex-row gap-9'>
            <label htmlFor={field.id} className='block gap-6 text-black font-semibold'>
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              {...formik.getFieldProps(field.name)}
              className='p-0 text-center w-full h-8 rounded-3xl focus:ring-indigo-500'
              placeholder={field.placeholder}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className='text-red-500'>{formik.errors[field.name]}</div>
            )}
          </div>
        ))}
        <div className='flex flex-row items-center mt-9 m-auto gap-8'>
          <button
            type='submit'
            className='py-2 px-4 w-36 border border-transparent rounded-2xl font-bold shadow-sm text-sm text-white bg-green-400'
          >
            {submitButtonText}
          </button>
          <button
            type='reset'
            className='py-2 px-4 w-36 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-gray-400'
          >
            {resetButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
