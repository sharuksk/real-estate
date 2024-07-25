import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAmenityAPI } from '../../../APIServices/mastersAPI/amenityAPI'

export const AmentyList = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['amenities'], 
        queryFn: getAmenityAPI,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <div>
            <h1>Amenty List</h1>
            <ul>
                {data?.map((amenity) => (
                    <><li key={amenity._id}>{amenity.amenityname}</li><li key={amenity._id}>{amenity.createdBy}</li></>
                ))}
            </ul>
            <button onClick={refetch}>Refetch</button>
        </div>
    );
};
