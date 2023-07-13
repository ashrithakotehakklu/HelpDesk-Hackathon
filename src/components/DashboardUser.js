import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaEdit } from 'react-icons/fa';
import {Link} from 'react-router-dom';
const DashboardUser = () => {
    const [ticket, setTicket] = useState([]);
  const [assignedTo, setassignedTo] = useState([]);
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
    setTicket(result[0].USER_DATA[0].TICKETS_RAISED_BY_USER);
    console.log(ticket);
    setassignedTo(result[0].USER_DATA[0].TICKETS_ASSIGNED_TO_USER);
    console.log(assignedTo);
    
  };

  return (
    <div>
      <Header></Header>
      <Link className="btn btn-dark create-btn m-2" to="/createTicket">Create Ticket</Link>   
      <div className="Names">My Ticket</div>
      <table className="table table-bordered mx-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">Ticket Number</th>
            <th scope="col">Ticket Status</th>
            <th scope="col">Ticket Type</th>
            <th scope="col">Problem Description</th>
            <th scope="col">Raised By</th>
            <th scope="col">Raised On</th>
            <th colspan="2" scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
              {ticket.map((tickets,index) =>(
                <tr key={index}>
                    
                    <td>{tickets.TICKET_NUMBER}</td>
                    <td>{tickets.TICKET_STATUS}</td>
                    <td>{tickets.TICKET_TYPE}</td>
                    <td>{tickets.PROBLEM_DESCRIPTION}</td>
                    <td>{tickets.RAISED_BY_NAME}</td>
                    <td>{tickets.RAISED_ON}</td>
                    <td><Link to="/editTicket"><FaEdit></FaEdit></Link></td>
                  
                </tr>

              ))}     
        </tbody>
      </table>
     
      
    </div>
  )
}

export default DashboardUser