import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/authenticationContext';

export default function Navbar() {

  const { token, settoken } = useContext(authContext)
  const { userRole, setuserRole } = useContext(authContext)
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("tokenJwt")
    settoken(null)
    localStorage.removeItem("userRole")
    setuserRole(null)
    navigate("/login")
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">

          <ul className="navbar-nav ">

            {token ? <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li> : ""}

          </ul>

          <ul className="navbar-nav ">

            {token && userRole == "Employee" ? <li className="nav-item">
              <Link className="nav-link" to="/empdas">Employee Dashboard </Link>
            </li> : ""}

          </ul>




          <ul className="navbar-nav ">

            {token && userRole == "Admin" ? <li className="nav-item">
              <Link className="nav-link" to="/admindas">Admin Dashboard </Link>
            </li> : ""}

            {token && userRole == "Admin" ? <li className="nav-item">
              <Link className="nav-link" to="/allusers">All Users </Link>
            </li> : ""}

          </ul>

          <ul className="navbar-nav ">

            {token && userRole == "Admin" ? <li className="nav-item">
              <Link className="nav-link" to="/createTask">Create Task </Link>
            </li> : ""}

          </ul>


          <ul className="navbar-nav ms-auto ">
            {!token ? <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li> : ""}


            {!token ? <li className="nav-item">
              <Link className="nav-link" to="/login">login</Link>
            </li> : ""}

            {token ? <li className="nav-item">
              <span onClick={logout} style={{ cursor: "pointer" }} className="nav-link" >logout</span>
            </li> : ""}


          </ul>
        </div>
      </div>
    </nav>


  </>
}
