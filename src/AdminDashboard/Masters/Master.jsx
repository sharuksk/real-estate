import React from 'react';
import { Amenity } from './Amenty/Amenity';
import { AmentyList } from './Amenty/AmentyList';

export const Master = () => {
  return (
    <div className='flex flex-row gap-6'>
      <div className='flex-shrink-0'>
        <Amenity />
      </div>
      <div className='flex-grow'>
        <AmentyList />
      </div>
    </div>
  );
};
// import React from 'react';
// import { Amenity } from './Amenty/Amenity';
// import { AmentyList } from './Amenty/AmentyList';

// export const Master = () => {
//   return (
//     <div className='flex flex-col gap-6 p-6'>
//       <div className='flex flex-row gap-6'>
//         <div className='flex-1'>
//           <Amenity />
//         </div>
//         <div className='flex-2'>
//           <AmentyList />
//         </div>
//       </div>
//       {/* Add additional forms or sections here */}
//       <div className='flex flex-row gap-6'>
//         {/* Example additional form */}
//         <div className='flex-1'>
//           {/* Replace with your other form component */}
//           <OtherFormComponent />
//         </div>
//         <div className='flex-1'>
//           {/* Another additional form or section */}
//           <AnotherFormComponent />
//         </div>
//       </div>
//     </div>
//   );
// };
