import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { checkAuthenticatedAPI } from '../APIServices/usersAPI/usersAPI';
import { Spinner } from '../common/Spinner';

const AuthRoute = ({ children, adminOnly }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthenticatedAPI,
  });

  if (isLoading) return <Spinner />; 
//   if (isError) return <div>Error occurred</div>; 
  if (!data || !data.isAuthenticated) return <Navigate to="/" />; 
  if (adminOnly && data.user.role !== 'Admin') return <Navigate to="/" />; 

  return children; 
};

export default AuthRoute;
