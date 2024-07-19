import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Records from "../Records";

const AppRoutes = () => {
    return (
        <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />}/>  
                </Route>    
                <Route element={<PrivateRoute />}>
                    <Route path="/records" element={<Records />}/>
                </Route>
            </Routes>
    );
}

export default AppRoutes;