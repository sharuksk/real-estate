import React from 'react';
import * as Yup from 'yup';
import { addAmenityAPI } from '../../../APIServices/mastersAPI/amenityAPI';
import FormComponent from '../../../common/FormComponent';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../../common/Spinner';
import { AmentyList } from './AmentyList';
export const Amenity = () => {
  const { isLoading, isError, error, refetch } = useQuery({
    keepPreviousData: true,
    refetchOnWindowFocus: false,
});
  const initialValues = {
    amenityname: '',
  };

  const validationSchema = Yup.object({
    amenityname: Yup.string().required('Amenity Name is Required'),
  });

  const handleSubmit = async (values) => {
    await addAmenityAPI(values);
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
      successMessage='Amenity Added Successfully'
      fields={[
        {
          id: 'amenityname',
          label: 'Amenity',
          type: 'text',
          name: 'amenityname',
          placeholder: 'Amenity',
        },
      ]}
    />
    
</div>
<AmentyList/>
   
        </>
  );
};
