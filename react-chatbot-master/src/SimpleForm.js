import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Review from './Review';

class SimpleForm extends Component {
    render() {
      return (
        <ChatBot
          steps={[
            {
              id: '1',
              message: 'Greeting',
              trigger: 'hi',
            },
            {
              id: 'hi',
              user: true,
              trigger: '2',
            },
            {
              id: '2',
              message: 'what is your name?',
              trigger: 'name',
            },
            {
              id: 'name',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: '{previousValue} How can I help You?',
              trigger:'help'
            },
            
            {
              id: 'help',
              options: [
                { value: 'ticket', label: 'Ticket Creation', trigger: '5' },
                { value: 'login', label: 'Login', trigger: '6' },
                { value: 'laptop', label: 'Laptop', trigger: '7' },
                { value: 'other help', label: 'Other Help', trigger: '8' },
              ],
            },
            {
              id: '5',
              options: [
                { value: 'ticket creation', label: 'Create a Ticket', trigger: '9' },
                { value: 'help required in ticket creation', label: 'Steps for ticket creation', trigger: '10' },
                { value: 'ticket status', label: 'Ticket Status', trigger: '11' },
                { value: 'other help', label: 'Other Help', trigger: '12' },
              ],
            },
            
            {
              id: '6',
              
              options: [
                { value: 'login issue', label: 'Login Issue', trigger: '13' },
                { value: 'access required', label: 'New Access', trigger: '13' },
                { value: 'acces not working', label: 'Access not working', trigger: '13' },
              ],
            },
            {
              id: '7',
              
              options: [
                { value: 'Shutting Down', label: 'Shutting Down', trigger: '14' },
                { value: 'Hardware issue', label: 'Hardware issue', trigger: '14' },
                { value: 'Sofware issue', label: 'Sofware issue', trigger: '14' },
              ],
            },
            {
              id: '8',
              
              options: [
                { value: 'HR', label: 'HR', trigger: '15' },
                { value: 'Finance', label: 'Finanace', trigger: '15' },
                { value: 'other issue', label: 'other issuee', trigger: '15' },
              ],
            },
            {
              id: '9',
              message:"Please login to the portal and create a ticket",
              trigger:"20"
            },
            {
              id: '10',
              message:"Please login to the portal with credentials and click on the button to create a new ticket.Fill all the details.New ticket will be created and routed to concern team",
              trigger:"20"
            },
            {
              id: '11',
              message:"Please login to the portal and check the dashboard with all the ticket status",
              trigger:"20"
            },
            {
              id: '12',
              message:"Contact Admin Team",
              trigger:"20"
            },
            {
              id: '13',
              message:"Contact Admin team they will help you with access related issue admin@factspan.com",
              trigger:"20"
            },
            {
              id: '14',
              message:"Create a new ticket to the IT team they will help you out",
              trigger:"20"
            },
            {
              id: '15',
              message:"Contact hr@factspan.com",
              trigger:"20"
            },
            {
              id: '20',
              message:"Hope it helps! Thanks for contacting chatbot",
              end:true
            },
            // {
            //   id: '7',
            //   message: 'Great! Check out your summary',
            //   trigger: 'review',
            // },
            // {
            //   id: 'review',
            //   component: <Review />,
            //   asMessage: true,
            //   trigger: 'update',
            // },
            // {
            //   id: 'update',
            //   message: 'Would you like to update some field?',
            //   trigger: 'update-question',
            // },
            // {
            //   id: 'update-question',
            //   options: [
            //     { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            //     { value: 'no', label: 'No', trigger: 'end-message' },
            //   ],
            // },
            // {
            //   id: 'update-yes',
            //   message: 'What field would you like to update?',
            //   trigger: 'update-fields',
            // },
            // {
            //   id: 'update-fields',
            //   options: [
            //     { value: 'name', label: 'Name', trigger: 'update-name' },
            //     { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            //     { value: 'age', label: 'Age', trigger: 'update-age' },
            //   ],
            // },
            // {
            //   id: 'update-name',
            //   update: 'name',
            //   trigger: '7',
            // },
            // {
            //   id: 'update-gender',
            //   update: 'gender',
            //   trigger: '7',
            // },
            // {
            //   id: 'update-age',
            //   update: 'age',
            //   trigger: '7',
            // },
            // {
            //   id: 'end-message',
            //   message: 'Thanks! Your data was submitted successfully!',
            //   end: true,
            // },
          ]}
        />
      );
    }
  }
  
  export default SimpleForm;