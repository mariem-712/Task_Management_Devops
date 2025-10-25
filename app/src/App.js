import React, { Component } from 'react'
import Home from './components/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import ProtectedRoot from './components/ProtectedRoot/ProtectedRoot';
import {  AuthProvider } from './components/Context/authenticationContext';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EditTask from './components/EditTask/EditTask';
import CreateTask from './components/CreateTask/CreateTask';
import CreateComment from './components/CreateComment/CreateComment';
import UserTable from './components/UserTable/UserTable';
import EmployeeComment from './components/EmployeeComment/EmployeeComment';


const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      {
         path: 'home', element: <ProtectedRoot  >   <Home />   </ProtectedRoot> 
      },
      { 
        path: '/', element: <ProtectedRoot  >   <Home />    </ProtectedRoot> 
      },
      { 
        path: '/edittask/:id', element: <ProtectedRoot role="Admin" >   <EditTask />    </ProtectedRoot> 
      },
      { 
        path: '/createTask', element: <ProtectedRoot  role="Admin" >   <CreateTask />    </ProtectedRoot> 
      },
      { 
        path: '/createcomment/:id', element: <ProtectedRoot role="Admin"  >   <CreateComment />    </ProtectedRoot> 
      },    
  

      {
        path: '/empdas', element: <ProtectedRoot  role="Employee"> <EmployeeDashboard />   </ProtectedRoot>
      },
      {
        path: 'admindas', element: <ProtectedRoot  role="Admin" > <AdminDashboard />   </ProtectedRoot>
      },
      {
        path: 'allusers', element: <ProtectedRoot  role="Admin" > <UserTable />   </ProtectedRoot>
      },
      {
        path: '/empcomm/:id', element: <ProtectedRoot  role="Employee" > <EmployeeComment />   </ProtectedRoot>
      },
      
       

      { path: 'register', element: <Register /> } ,

      { path: 'login', element: <Login /> },

      { path: '*', element: <NotFound /> },

    ]
  },
])


export default function App() {
 
  return <>
  
  <AuthProvider>

<RouterProvider router={router} />

</AuthProvider>
  
  </>
}
