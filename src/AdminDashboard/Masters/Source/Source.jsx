import React from 'react';
import * as Yup from 'yup';
import FormComponent from '../../../common/FormComponent';
import { useQuery } from '@tanstack/react-query';
import { addSourceAPI } from '../../../APIServices/mastersAPI/sourceAPI';
import { SourceList } from './SourceList';
import { Spinner } from '../../../common/Spinner';
export const Source = () => {
  const { isLoading, isError, error, refetch } = useQuery({
    keepPreviousData: true,
    refetchOnWindowFocus: false,
});
  const initialValues = {
    sourcename: '',
  };
  const validationSchema = Yup.object({
    sourcename: Yup.string().required('Source Name is Required'),
  });

  const handleSubmit = async (values) => {
    await addSourceAPI(values);
    refetch();
  };
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <div className='justify-center flex w-full bg-gray-300 '>
    <FormComponent
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      submitButtonText='Submit'
      resetButtonText='Reset'
      successMessage='Source Added Successfully'
      fields={[
        {
          id: 'name',
          label: 'Source',
          type: 'text',
          name: 'sourcename',
          placeholder: 'Source',
        },
      ]}
    />
    </div>
   <SourceList/>
    </>
  );
};
