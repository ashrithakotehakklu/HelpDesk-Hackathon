import React, { useState, useEffect } from "react";
import {useRef} from 'react';
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import { useHistory, useParams } from 'react-router-dom'

const EditTicket = () => {
    const navigate = useNavigate();
    // let history = useHistory();
    // const id = useParams
    let problem ="";
    let problemId="";
    let Id="";
    const ref = useRef(null);
 const [ticket, setTicket] = useState({
    
    problem,
 });
 const [comments, setComments] = useState("")
 const [selectedValue, setSelectedValue] = useState("");
 const onInputChange = e => {
    //console.log(e.target.value);
    setSelectedValue(e.target.value);
    let value = e.target.value;
    console.log(value);
    
    if(value == "Deepesh"){
        Id = "1002"
       } else if (value == "Sankalp") {
        Id = "1003"
       }
        else if (value == "Rakesh") {
        Id = "1004"
       } else if (value == "Jennifer") {
        Id = "1035"
       } 
       
       console.log(Id);
       localStorage.setItem("assigneeId",JSON.stringify(Id));
  }
  const onInputChanges = e =>{
   let status = e.target.value;
   console.log(status);
   localStorage.setItem("status",JSON.stringify(status));
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
    let data = await fetch(" http://192.168.15.57:5004/helpdesk", {
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
    console.log("Hello");
    
    let user_id = JSON.parse(localStorage.getItem("user_id"));
    console.log(user_id);
    let ticketId = JSON.parse(localStorage.getItem("Id"));
    console.log(ticketId);
    let ticketNo = JSON.parse(localStorage.getItem("TicketId"));
    console.log(ticketNo);
    let problemd = JSON.parse(localStorage.getItem("problemd"));
    console.log(problemd);
    let status = JSON.parse(localStorage.getItem("status"));
    console.log(status);
    localStorage.setItem("comments",JSON.stringify(comments));
   
    let comment = JSON.parse(localStorage.getItem("comments"));
    console.log(comment);
    
    let raised_on = JSON.parse(localStorage.getItem("raisedOn"));
    console.log(raised_on);
    let raised_by = JSON.parse(localStorage.getItem("raisedBy"));
    console.log(raised_by);
    let assignId = JSON.parse(localStorage.getItem("assigneeId"));
    console.log(assignId);
    let access = JSON.parse(localStorage.getItem("Access"));
    console.log(access);
    let email = JSON.parse(localStorage.getItem("mail_id"));
    console.log(email);
    let form_details = {
      page_name: "edit_ticket",
      mail_id: email,
      user_details: access,
      ticket_data: [{"USER_ID":user_id,
      "TICKET_ID":ticketId,"TICKET_NUMBER":ticketNo,
      "PROBLEM_DESCRIPTION":problemd,
      "TICKET_STATUS":status,
      "COMMENT":comment,"RAISED_ON":raised_on,"RAISED_BY":raised_by,
      "ASSIGNED_TO":assignId}]
    };
    console.log(form_details);
    
    let data = await fetch(" http://192.168.15.57:5004/helpdesk", {
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
        <h4 className="text-center mb-4">Edit a Ticket</h4>
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
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Ticket ID
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputPassword3"
                placeholder="Email"
                value = {JSON.parse(localStorage.getItem("TicketId"))}
                readOnly
              />
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
                value = {JSON.parse(localStorage.getItem("problemd"))}
                readOnly
              ></textarea>
            </div>
            <div class="form-group row p-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Assign to
            </label>
            <div class="col-sm-10">
              <select id="inputState" class="form-control" onChange={e => onInputChange(e)}>
              <option selected>Assign To</option>
               <option>Deepesh</option>
               <option>Sankalp</option>
               <option>Rakesh</option>
               <option>Jennifer</option>
              </select>
            </div>
           
          </div>
          <div class="form-group row p-2">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Ticket Status
            </label>
            <div class="col-sm-10">
              <select id="inputState" class="form-control" onChange={e => onInputChanges(e)}>
              <option selected>Active</option>
               <option>Pending</option>
               <option>Completed</option>
             
              </select>
            </div>
           
          </div>
          <div class="form-group row p-2 mb-4">
            <label for="inputPassword3" class="col-sm-2 p-2 col-form-label">
              Comments
            </label>
            <div class="col-sm-10">
              <textarea
                class="form-control w-90"
                id="exampleFormControlTextarea1"
                rows="3"
                
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
            </div>
            
          </div>
          </div>
          <div class="form-group row p-2 mb-4 text-center">
            
            <button className="btn btn-primary col-md-12" onClick={(e) => onSubmit(e)}>Update Ticket</button>
          </div>

        </form>
      </div>
    </div>
    </div>
  );
};

export default EditTicket