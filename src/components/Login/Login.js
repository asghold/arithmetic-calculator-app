import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request, setAuthToken, setBalance } from "../../services/axios_helper";

const Login = ()=>{
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            if(!username || !password){
                setError('Please enter both fields, username and password');
                return;
            }
            request("POST","/api/auth/signin",
                {username: username, password: password}
            ).then((response) => {
                setAuthToken(response.data.accessToken);
                request("GET","/api/calculator/balance",{})
                .then((resp) => {

                    setBalance(resp.data.userBalance!==undefined);
                    navigate('/home');
                }
                )
                
            } ).catch((error) => {
                setError('Bad credentials, please enter your Username and Password!!')
                navigate('/')
            });

        } catch (error) {
            setError('Invalid username or password');

        }
    }
  
    return (
        <div className="row justify-content-center align-items-center vh-100">
            <div className="col-4">
                <div className="tab-content p-5 border rounded-lg">
                    <h2>Login</h2>
                    <div className="form-outline mb-4 p-3">
                        <input id="username" value={username} type="email" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                        <label className="form-label" htmlFor="loginUsername">Username</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" value={password} id="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button className="btn btn-primary btn-block mb-4" onClick={handleLogin}> Sign in </button>
                    <div className="text-center"> 
                        <p>Not a member? <a href="/signup" >Register</a></p> 
                    </div> 
                </div>
            </div>
        </div>

    );
} 

export default Login;
