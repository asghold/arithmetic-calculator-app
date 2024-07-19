import React, { useState } from "react";
import { request } from "../../services/axios_helper";

const StringGenerator = ({chargeBalance}) => {

    const [random, setRandom] = useState();
    const [number, setNumber] = useState();
    const [error, setError] = useState('');
    const [errorNumber, setErrorNumber] = useState('');
    const [result, setResult] = useState('');

    const handleGenerate = ()=> {
        //if(!random){
        //    setError('Enter the number of strings you want to generate')
        //    return;
        //} 
        if(!number){
            setErrorNumber('Enter the number of characters  you want to generate')
            return;
        } else if(number>32){
            setErrorNumber('Number characters must be less or equal to 32')
        }

        request("POST","/api/calculator/6",
            {
               // numberStrings: random,
               numberStrings: 1,
                length: number
            }
        ).then((response) => {
            setResult(()=> {return response.data.operationResponse});
            chargeBalance(response.data.userBalance);
            setError('');
            setErrorNumber('');
            
        }
        ).catch((error)=> {
            setError("Insufficient balance");            
        })

        

    }
    return (
        <div className="row">
            <div className="col-12">
            <div className="row">
            {/*<div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Random strings:</span>
                <input type="text" class="form-control" placeholder="0" value=1 onChange={(e) => setRandom(e.target.value)}/>
            </div>*/}
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Number of characters in the string:</span>
                <input type="text" class="form-control" placeholder="0" value={number} onChange={(e) => setNumber(e.target.value)} />
                {errorNumber && <span className="alert alert-danger">{errorNumber}</span>}
            </div>
            <button className="btn btn-primary btn-block mb-4" onClick={handleGenerate}> Generate</button>
            </div>
            </div>
            <div className="row">
                {!error && <span>{result.split(",").map(s => <p> {s} </p>)}</span>}
                {error && <span className="alert alert-danger">{error}!!!!!</span>}            
            </div>
            
        </div>

    );
}

export default StringGenerator;