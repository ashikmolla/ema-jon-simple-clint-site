import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AutheProvider';

const PrivetRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // const location=useLocation();
    // console.log(location)
    if (loading) {
        return <div> <progress className="progress w-56 "></progress></div>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivetRoutes;