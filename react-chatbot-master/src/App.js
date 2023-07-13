import React, { useState } from 'react';
import SimpleForm from './SimpleForm';
import './App.css';
import Login from './Login';
import images from "../src/Images/chatbot.png"
import Dashboard  from './components/Dashboard';
import DashboardAdmin from './components/DashboardAdmin'
import DashboardUser from './components/DashboardUser'
import CreateTicket from './components/CreateTicket'
import EditTicket from './components/EditTicket'
import ViewTicket from './components/viewTicket'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = (props) => {
  let [showChat, setShowChat] = useState(false);

  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }

    return (
      
      <div className='App'>
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/dashboardUser" element={<DashboardUser />} />
          <Route path="/createTicket" element={<CreateTicket />} />
          <Route path="/viewTicket" element={<ViewTicket />} />
          <Route path="/editTicket/:id" element={<EditTicket />} />
        </Routes>
      
     
  
      <div className = "bot">
        <div style ={{display: showChat ? "" : "none"}}>
          <SimpleForm></SimpleForm>
        </div>      
        {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
        <div>
          {!showChat 
            ? <button className="btn chat-btn"><img src={images} alt="my image" onClick={() => startChat()} /></button> 
            : <button className="btn chat-btn"><img src={images} alt="my image" onClick={() => hideChat()} /></button>}
        </div>
      </div> 
  </div>     
      
    )
}

export default App;