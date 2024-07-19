import React, { useState } from "react";
import { getAuthToken, getBalance } from "../services/axios_helper";
import Navbar from "./Navbar/Navbar";
import RecordsTable from "./RecordsTable/RecordsTable";



const Records = () =>{
    const [accessToken, setAccessToken] = useState(getAuthToken());
    const [balance, setBalance] = useState(()=>getBalance());

    return (
        <>
        {accessToken && <Navbar balance={balance}></Navbar>}
            
        <div className="container">
            <h1>
                User 
                Records
            </h1>
            <hr/>
            <br/>

            <RecordsTable></RecordsTable>            
        </div>
        </>
    );
}

export default Records;