import React, { useState } from "react";
import { request, setBalance } from "../../services/axios_helper";
import Button from "./Button";
import EqualButton from "./EqualButton";
import Input from "./Input";

const operators = ['*','/','+','-']
    
const Calculator = ({value, dispatch, chargeBalance}) => {  
    
    const [values, setValues] = useState([]);
    const [operator, setOperator] = useState(0);
    const [error, setError] = useState('');
    
    
    const handleOperation=(({type})=> {
            
        switch(type){
            case 'clear':
                dispatch({type:"handleClear"});
                setValues([]);
                setOperator(0);
                break;
            case 'sum':
                if(values.length!==0){
                        handleEquals();
                }
                setValues((values)=>{
                    return values.concat(value)});
                setOperator(1);
                dispatch({type:"handleClear"});                        
                break;
            case 'subs':
                if(values.length!==0){
                    handleEquals();
                }
                setValues((values)=>{
                    return values.concat(value)});
                setOperator(2);
                dispatch({type:"handleClear"});                        
                break;
            case 'mult':
                if(values.length!==0){
                    handleEquals();
                }
                setValues((values)=>{
                    return values.concat(value)});
                setOperator(3);
                dispatch({type:"handleClear"});                        
                break;
            case 'div':
                if(values.length!==0){
                    if(value!== 0){
                        handleEquals();
                    } else {
                        dispatch({type:"handleClear"});  
                        dispatch({ type: "addtoInputNum", param: 'Infinity'});
                        setValues([]);
                        setOperator(0);                
                        break;
                        
                    }
                }
                setValues((values)=>{
                    return values.concat(value)});
                setOperator(4);
                dispatch({type:"handleClear"});                        
                break;

            default:
                request("POST","/api/calculator/"+5,
                    {numbers: [value]}
                ).then((response) => {
                    dispatch({type:"handleClear"});  
                    dispatch({ type: "addtoInputNum", param: response.data.operationResponse});
                    setBalance(response.data.userBalance);
                    chargeBalance(response.data.balance);
                    
                    setValues([]);
                    setOperator(0);                
                    }
                ).catch((error)=> {
                    console.log(error);
                });
                break;
        }

        
        
    });

    const handleEquals = ()=>{
        if(values.length!==0 && operator!==0){
            
            request("POST","/api/calculator/"+operator,
                {numbers: [values[0],value]}
            ).then((response) => {
                dispatch({type:"handleClear"});  
                dispatch({ type: "addtoInputNum", param: response.data.operationResponse});
                chargeBalance(response.data.userBalance);
                setValues([]);
                setOperator(0);
                setError('');                
            }
            ).catch((error)=> {
                if(operator===4 && value==='0'){
                    dispatch({type:"handleClear"});  
                    dispatch({ type: "addtoInputNum", param: 'Infinity'});
                    setValues([]);
                    setOperator(0);                
                        
                } else {
                    setError("Insufficient balance");
                }
                
            })
        }

    }


    return (
        <div className="Calculator">
            <div className="calc-wrapper">
                <Input input={value}></Input>
                <div className="row">
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "7" })}>7</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "8" })}>8</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "9" })}>9</Button>
                    <Button onClick={() => handleOperation({ type: "root" })}>√</Button> 
                    <Button onClick={() => handleOperation({ type: "clear" })}>C</Button>
                    
                </div>
                <div className="row">
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "4" })}>4</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "5" })}>5</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "6" })}>6</Button>
                    <Button onClick={() => handleOperation({ type: "sum"})}>+</Button>
                    <Button onClick={() => handleOperation({ type: "subs"})}>-</Button>                      
                </div>
                <div className="row">
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "1" })}>1</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "2" })}>2</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "3" })}>3</Button>
                    <Button onClick={() => handleOperation({ type: "mult", param: "*" })}>*</Button>
                    <Button onClick={() => handleOperation({ type: "div", param: "/" })}>/</Button>
                </div>
                <div className="row">
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "0" })}>0</Button>
                    <Button onClick={() => dispatch({ type: "addtoInputNum", param: "." })}>.</Button>
                    <Button> </Button>
                    <EqualButton onClick={() => handleEquals()}> = </EqualButton>
                    
                </div>
                <div className="row">
                {error && <span className="alert alert-danger">{error}!!!!!</span>} 
                </div>
            </div>
        </div>
    );
}

export default Calculator;