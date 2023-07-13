import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate();
 
  // function getDashboard(){
  //   let access = JSON.parse(localStorage.getItem("Access"));
  //   let role = access[0].USER_CLASS;
  //   console.log(role);
  //   if(role == "IT_TEAM"){
  //   navigate("/dashboard");
  //  } else if (role == "ADMIN") {
  //  navigate("/dashboardAdmin");
  //  }
  //   else if (role == "EMPLOYEE") {
  //   navigate("/dashboardUser");
  //  }
  // }
  return (
    
      <nav className="navbar navbar-dark bg-dark">
     
        <Link to="/login"><button className="button-logout buttonh">
          <span className="buttonText">Log out</span>
           <FaSignOutAlt></FaSignOutAlt>
         
          </button></Link> 
          
      </nav>
    
  );
};

export default Header;
