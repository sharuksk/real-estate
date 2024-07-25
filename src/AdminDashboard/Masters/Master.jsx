import React from 'react'
import { Amenity } from './Amenty/Amenity'
import { AmentyList } from './Amenty/AmentyList'

export const Master = () => {
  return (
    <div className='flex flex-row'><Amenity/><AmentyList/></div>
  )
}
