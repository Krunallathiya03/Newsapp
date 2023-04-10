import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';


const SignUp=()=>{
    const[name, setName]=useState("");
    const[password, setPassword]=useState("");
    const navigate = useNavigate();
    const collectData=async()=>{
        console.warn(name,password);
        let result = await fetch("http://localhost:5000/register",
        {
            method:'post',
            body: JSON.stringify({name,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = result.JSON();
        console.warn(result);
        navigate('/')
    }
    return(
        <div className="register">
            <h1>Register </h1>
            <input type="text" className="inputBox" placeholder="Enter Name"
            value={name} onChange={(e)=>setName(e.target.value)} />


            <input type="text" className="inputBox" placeholder="Enter Password"
            value={password} onChange={(e)=>setPassword(e.target.value)} />


            <input onClick={collectData} class="btn btn-primary" type="submit" value="Submit"></input>

        </div>
    )
}

export default SignUp