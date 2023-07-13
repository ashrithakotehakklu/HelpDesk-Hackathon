import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import dashboard from '../src/components/Dashboard'
import { useNavigate } from "react-router-dom"

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

   async function login() {
    console.warn(email,password);
    let loginDetails = email;
    console.log(loginDetails);
    let checkaccess = {
        "page_name": "user_dashboard",
        "mail_id": loginDetails
    }
    let data = await fetch("http://192.168.15.57:5004/checkaccess", {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json"
        },
        body:JSON.stringify(checkaccess)

    });
    let result = await data.json();
    console.log(result);
    localStorage.setItem("Access",JSON.stringify(result));
    localStorage.setItem("mail_id",JSON.stringify(email));
    let user_id = result.USER_ID;
    console.log(user_id);
    localStorage.setItem("user_id",JSON.stringify(user_id));
    let role = result.USER_CLASS;
    console.log(role);
    if(role == "IT_TEAM"){
    navigate("/dashboard");
   } else if (role == "ADMIN") {
   navigate("/dashboardAdmin");
   }
    else if (role == "EMPLOYEE") 
    navigate("/dashboardUser");
   }
   
   
  return (
    <div className="main-div">
       <h4 className='h1-heading'>Help Desk Login</h4> 
        <div className='row login-div'>
             
        <div className="col-md-3 offset-md-5">
            <input type="email" placeholder='Email Address'
            onChange={(e) =>setEmail(e.target.value)}
            className='form-control'></input>
            <br />
            <input type="password" placeholder='Passowrd'
            onChange={(e) =>setPassword(e.target.value)}
            className='form-control'></input>
            <br />
            <button onClick={login} className='btn btn-primary'>Submit</button>
        </div>
        </div>
    </div>

  )
}

export default Login