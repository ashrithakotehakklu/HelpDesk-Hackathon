import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaEdit } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useNavigate , useParams } from 'react-router-dom'
const viewTicket = () => {
    let history = useNavigate();
    const { id } = useParams();
    console.log(id);
    const [ticket, setTicket] = useState([]);
  const [assignedTo, setassignedTo] = useState([]);
  const [unAssigned, setunAssigned] = useState([]);
  useEffect(() => {
    loadTicket();
  }, []);
 
  const loadTicket = async () => {
    let access = JSON.parse(localStorage.getItem("Access"));

    console.log(access);
    let email = JSON.parse(localStorage.getItem("mail_id"));
    console.log(email);
    let form_details = {
      page_name: "user_dashboard",
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
    console.log("Hello",result);
   
    setunAssigned(result[0].USER_DATA[0].UNASSIGNED_TICKETS);
    console.log(unAssigned);
    
  };
  const onEdit = (tickets) =>{
    let id = tickets.TICKET_NUMBER;
    let problemd = tickets.PROBLEM_DESCRIPTION;
    console.log(id);
    console.log(problemd);
    let raisedOn = tickets.RAISED_ON;
    let raisedBy = tickets.RAISED_BY;
    localStorage.setItem("TicketId",JSON.stringify(id));
    localStorage.setItem("problemd",JSON.stringify(problemd));
    localStorage.setItem("raisedOn",JSON.stringify(raisedOn));
    localStorage.setItem("raisedBy",JSON.stringify(raisedBy));
    
  }
  return (
    <div>
        <Header></Header>
        <div className="Names">All Tickets</div>
        <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th scope="col">Ticket Number</th>
            <th scope="col">Ticket Status</th>
            <th scope="col">Ticket Type</th>
            <th scope="col">Problem Description</th>
            <th scope="col">Raised By</th>
            <th scope="col">Raised On</th>
            <th scope="col">Assigned To</th>
            <th colspan="2" scope="col">Action</th>
          
          </tr>
        </thead>
        <tbody>
              {unAssigned.map((tickets,index) =>(
                <tr>
                    <th scope="row">{index + 1 }</th>
                    <td>{tickets.TICKET_NUMBER}</td>
                    <td>{tickets.TICKET_STATUS}</td>
                    <td>{tickets.TICKET_TYPE}</td>
                    <td>{tickets.PROBLEM_DESCRIPTION}</td>
                    <td>{tickets.RAISED_BY_NAME}</td>
                    <td>{tickets.RAISED_ON}</td>
                    <td>{tickets.ASSIGNED_TO_NAME}</td>
                    <td><Link to={`/editTicket/${tickets.TICKET_NUMBER}`} onClick={() => onEdit(tickets)}><FaEdit></FaEdit></Link></td>
                    
                </tr>

              ))}     
        </tbody>
      </table>
    </div>
  )
}

export default viewTicket