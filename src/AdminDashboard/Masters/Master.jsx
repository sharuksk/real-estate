import React from 'react';
import { Amenity } from './Amenty/Amenity';
import { AmentyList } from './Amenty/AmentyList';
import { PropertyType } from '../PropertyType/PropertyType';
import { PropertyTypeList } from '../PropertyType/PropertyTypeList';
import { Source } from './Source/Source';
import { SourceList } from './Source/SourceList';
export const Master = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
          <Amenity />
        </div>
        <div className='flex-2'>
          <AmentyList />
        </div>
      </div>

      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
    <PropertyType/>
        </div>
        <div className='flex-1'>
        <PropertyTypeList/>
        </div>
      </div>
      <div className='flex flex-row gap-6'>
        <div className='flex-1'>
    <Source/>
        </div>
        <div className='flex-1'>
     <SourceList/>
        </div>
      </div>
    </div>
  );
};
// import React from 'react';
// import { Amenity } from './Amenty/Amenity';
// import { AmentyList } from './Amenty/AmentyList';
// import { PropertyType } from '../PropertyType/PropertyType';

// export const Master = () => {
//   return (
//     <div className='flex flex-row gap-6'>
//       <div className='flex-shrink-0'>
//         <Amenity />
//       </div>
//       <div className='flex-grow'>
//         <AmentyList />
//       </div>
//       <div className='flex-grow'>
//         <PropertyType />
//       </div>
//     </div>
//   );
// };