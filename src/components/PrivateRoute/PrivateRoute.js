import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../../services/axios_helper";

const PrivateRoute = () => {
    const token = getAuthToken();
    return token ? <Outlet /> : <Navigate to='/'/>
}

export default PrivateRoute;
