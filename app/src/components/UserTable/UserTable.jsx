import React, { useEffect, useState } from "react";
import "./UserTable.css";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";


export default function UserTable() {


  const [allUsers, setallUsers] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getAllUsers() {
    setisloading(true)

    try {

      const { data } = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
        },
        withCredentials: true
      })
      console.log("data", data)
      setallUsers(data)

    } catch (error) {
      console.log(error);

    }
    setisloading(false)

  }

  useEffect(function () {
    getAllUsers()
  }, [])


  return <>
       {isloading ? <div className="vh-100 bg-black d-flex justify-content-center align-items-center ">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div> :
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>

            <th>User Role</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userRole}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       }
  </>
};



