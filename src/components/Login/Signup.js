import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../services/axios_helper";

const Signup = () => {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); 

    const handleRegister = async () => {
        try{
        if(!username || !password){
            setError('Please enter both fields, username and password');
            return;
            }
            request("POST","/api/auth/signup",
                {username: username, password: password}
            ).then((response) => {
                navigate('/');
            } ).catch((error) => {
                navigate('/signup')
            })
        
        } catch (error) {
            setError('Error, try again!!');
        } 
    }  
    return (
        <div className="row justify-content-center align-items-center vh-100">
            <div className="col-4">
                <div className="tab-content p-5 border rounded-lg">
                    <h2>Register</h2>
                    <div className="form-outline mb-4 p-3">
                        <input id="username" value={username} type="email" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                        <label className="form-label" htmlFor="loginUsername">Username</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" value={password} id="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button className="btn btn-primary btn-block mb-4" onClick={handleRegister}> Sign up </button>
                     
                </div>
            </div>
        </div>
    );
}

export default Signup;