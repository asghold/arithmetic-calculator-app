import React, { useReducer, useState } from "react";
import { getAuthToken, getBalance } from "../services/axios_helper";
import Calculator from "./Calculator/Calculator";
import reducer from "./Calculator/Operations";
import './Home.css';
import Navbar from "./Navbar/Navbar";
import StringGenerator from "./StringGenerator/StringGenerator";

const Home = () =>{
    const [value, dispatch] = useReducer(reducer, "");
    const [accessToken, setAccessToken] = useState(getAuthToken());
    const [balance, setBalance] = useState(()=>getBalance());

    const chargeBalance = (balance) => {
        setBalance(balance);

    }
    return (
        <>
            { accessToken && <Navbar balance={balance}></Navbar>}
            <div className="row justify-content-md-center">
                <div className="col-8 calc-card">
                    <div className="card" style={{ width:"50rem"}}>
                        <div className="card-body calc-content">
                            <h4 className="card-title">Arithmetic Calculator</h4>
                            <Calculator value={value} dispatch={dispatch}  chargeBalance={chargeBalance}/>
                            <br/>

                            <h4 className="card-title">String Generator</h4>
                            <StringGenerator  chargeBalance={chargeBalance}/>                         

                            
                </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Home;