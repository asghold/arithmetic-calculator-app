import React from "react";
import { useNavigate } from "react-router-dom";
import { cleanBalance, setLogout } from "../../services/axios_helper";
import Balance from "../Balance/Balance";
import './Navbar.css';

const Navbar = ({balance}) => {
    const navigate = useNavigate();

    const handleLogout = ()=> {
        cleanBalance();
        setLogout();
        
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                         <a href="/home">Calculator</a>
                    </li>
                    <li>
                        <a href="/records">Records</a>
                    </li>                    
                </ul>
            </div>
            <div className="navbar-right">
                <div className="row">
                    <div className="col-12">
                    <button type="button" className="btn btn-primary elementNavbar" onClick={handleLogout}>Logout</button></div></div>
                <div className="row"><div className="elementNavbar"><Balance balance={balance}></Balance></div></div>
                    
                
            </div>
        </nav>
    );
}

export default Navbar;
