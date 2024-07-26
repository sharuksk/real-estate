import React from 'react'
import * as Yup from 'yup';
import { addPropertyTypeAPI } from '../../APIServices/mastersAPI/propertyTypeAPI';
import FormComponent from '../../common/FormComponent';
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
  )
}
