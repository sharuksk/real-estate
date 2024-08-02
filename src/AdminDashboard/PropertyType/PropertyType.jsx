import React from 'react'
import * as Yup from 'yup';
import { addPropertyTypeAPI } from '../../APIServices/mastersAPI/propertyTypeAPI';
import FormComponent from '../../common/FormComponent';
import { PropertyTypeList } from './PropertyTypeList';
export const PropertyType = () => {
    const initialValues={
        propertyTypeName:'',
    };
    const validationSchema=Yup.object({
        propertyTypeName:Yup.string().required('Name is Required')
    });
    const handleSubmit=async (values)=>{
        await addPropertyTypeAPI(values)
    }
  return (
    <>
        <div className='justify-center flex w-full bg-gray-300 '>
     <FormComponent initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    submitButtonText='Submit'
    resetButtonText='Reset'
    successMessage='Property Type Name Added Successfully'
    fields={[
        {
            id:'propertyTypeName',
            label:'PropertyType',
            type:'text',
            name:'propertyTypeName',
            placeholder:'Property Type'
        },
       
    ]}
    
    
    />
    </div>
    <PropertyTypeList/>
    </>
   
  )
}
