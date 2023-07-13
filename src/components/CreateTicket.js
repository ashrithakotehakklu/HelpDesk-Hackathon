import React, { useState, useEffect } from "react";
import {useRef} from 'react';
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";

const CreateTicket = () => {
    const navigate = useNavigate();
    let problem ="";
    let problemId="";
    let Id="";
    const ref = useRef(null);
 const [ticket, setTicket] = useState({
    
    problem,
 });
 const [problems, setProblem] = useState("")
 const [selectedValue, setSelectedValue] = useState("");
 const onInputChanges = e => {
    //console.log(e.target.value);
    setSelectedValue(e.target.value);
    let value = e.target.value;
    console.log(value);
    
    if(value == "Technical"){
        Id = "2001"
       } else if (value == "HR") {
        Id = "2002"
       }
        else if (value == "Finance") {
        Id = "2003"
       }
       console.log(Id);
       localStorage.setItem("Id",JSON.stringify(Id));
  }
const onSubmit = (e) =>{
    e.preventDefault();
    createTicket();
    
}
useEffect(() => {
    loadTicket();
  }, []);
  const loadTicket = async () => {
    let access = JSON.parse(localStorage.getItem("Access"));
    let name = access[0].USER_NAME
    localStorage.setItem("Name",JSON.stringify(name));
    console.log(name);
    console.log(access);
    let email = JSON.parse(localStorage.getItem("mail_id"));
    console.log(email);
    let form_details = {
      page_name: "form_details",
      mail_id: email,
      user_details: access,
    };
    let data = await fetch("http://192.168.15.57:5004/helpdesk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(form_details),
    });
    let result = await data.json();
    console.log(result);
  };
   
  
const createTicket = async () => {
    localStorage.setItem("problems",JSON.stringify(problems));
    console.log(problems);
    Id = JSON.parse(localStorage.getItem("Id"));
    console.log(Id);
    console.log("Hello inside Create ticket");
    let access = JSON.parse(localStorage.getItem("Access"));
    console.log(access);
    let email = JSON.parse(localStorage.getItem("mail_id"));
    console.log(email);
    let form_details = {
      page_name: "add_ticket",
      mail_id: email,
      user_details: access,
      ticket_data: [{"TICKET_ID":Id,"PROBLEM_DESCRIPTION":problems}]
    };
    console.log(form_details);
    
    let data = await fetch("http://192.168.15.57:5004/helpdesk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(form_details),
    });
    let result = await data.json();
    console.log(result);
    let role = access[0].USER_CLASS;
    console.log(role);
    if(role == "IT_TEAM"){
    navigate("/dashboard");
   } else if (role == "ADMIN") {
   navigate("/dashboardAdmin");
   }
    else if (role == "EMPLOYEE") {
    navigate("/dashboardUser");
   }
};

 
  return (
    <div>
        <Header></Header>
    <div className="container p-4">
        
      <div className="w-50 mx-auto shadow p-3">
        <h4 className="text-center mb-4"> Create Ticket</h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-group row p-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="inputEmail3"
                placeholder="Name"
                value={JSON.parse(localStorage.getItem("Name"))}
                
              />
            </div>
          </div>
          <div class="form-group row p-2">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputPassword3"
                placeholder="Email"
                value = {JSON.parse(localStorage.getItem("mail_id"))}
                
              />
            </div>
          </div>
          <div class="form-group row p-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Ticket Type
            </label>
            <div class="col-sm-10">
              <select id="inputState" class="form-control" onChange={e => onInputChanges(e)}>
              <option selected>Choose Problem Type</option>
               <option>Technical</option>
               <option>HR</option>
               <option>Finance</option>
              </select>
            </div>
          </div>
          
          <div class="form-group row p-2 mb-4">
            <label for="inputPassword3" class="col-sm-2 p-2 col-form-label">
              Problem Description
            </label>
            <div class="col-sm-10">
              <textarea
                class="form-control w-90"
                id="exampleFormControlTextarea1"
                rows="3"
                
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
            </div>
            
          </div>
          <div class="form-group row p-2 mb-4 text-center">
            
            <button className="btn btn-primary col-md-12" onClick={(e) => onSubmit(e)}>Create Ticket</button>
          </div>

        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateTicket;
