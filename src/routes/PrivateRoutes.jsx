import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";


const PrivateRoutes = ({children}) => {
    const {user,loading} = use(AuthContext)

    if(loading){
        return <p className="text-4xl text-gray-500 text-center mt-10">Loading.....</p>
    }

    if(!user){
        return <Navigate to={'/register'}></Navigate>
    }

    return children
};

export default PrivateRoutes;