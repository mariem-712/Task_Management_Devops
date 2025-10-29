import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {

  const [tasksPerUser, settasksPerUser] = useState(null)
  const [isloading, setisloading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All');

  async function getData() {
    setisloading(true)

    try {

      const { data } = await axios.get("/api/admin/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
        },
        withCredentials: true
      })
      console.log("data", data)
      settasksPerUser(data)

    } catch (error) {
      console.log("error in EmployeeDashboard", error);

    }
    setisloading(false)

  }

  async function deleteTask(id) {
    console.log("id", id);

    try {

      const data  = await axios.delete(`/api/admin/deleteTask/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
        },
        withCredentials: true
      })
      getData();

    } catch (error) {
      console.log("error in delete task", error);

    }
    
    
  }

  useEffect(function () {
    getData()
  }, [])

  async function searshByStatus(e) {

    let taskStatus = e.target.value;
    setSelectedStatus(taskStatus);
    if (taskStatus === "All") {
      getData();
    }
    else {
      setisloading(true)
      try {


        const { data } = await axios.get(`/api/admin/search/${taskStatus}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
          },
          withCredentials: true
        })
        console.log("data", data)
        settasksPerUser(data)

      } catch (error) {
        console.log("error in EmployeeDashboard", error);

      }
      setisloading(false)
    }

  }



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
    </div> : <div className="container mt-5 bg-body-tertiary p-3 rounded-3 shadow ">

      <select
        onChange={searshByStatus}
        className="form-select w-auto mb-5 "
        value={selectedStatus}
      >

        <option value={"All"} > All</option>
        <option value="Inprogress">Inprogress</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Deferred">Deferred</option>
        <option value="Cancelled">Cancelled</option>

      </select>

      <div className="row g-3">
        {tasksPerUser?.map((task, index) => (

          <div key={index} className="col-md-4    ">
            <div className="my_task shadow   bg-white p-2 rounded-3 ">
              <h2 className='text-primary'>{task.title}</h2>

              <p className="text-muted" >{task.description} </p>

              <div className="task_content   border-2 border-top border-bottom  border-gray p-2 d-flex justify-content-between  align-items-center">
                <div className="Task_content_left  ">
                  <p className='mt-1'>dealine : <span className='fw-bold'>  {new Date(task.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}    </span></p>
                  <p className='mt-1'>Priority : <span className='fw-bold'>{task.priority}</span></p>
                </div>

                <div className="Task_content_right ">
                  <p className='mt-1'>Employee : <span className='fw-bold'>{task.employeeName}</span></p>
                  <p className='mt-1'>status : <span className='fw-bold'>{task.taskStatus}</span></p>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-end ">

   
              <Link className="text-decoration-none" to={`/createcomment/${task.id}`} >
                  <div className="d-flex me-4 ">
                  <i className="fa-solid fa-eye"></i>
                  </div>
                </Link>

                <i onClick={function(){deleteTask(task.id)}} style={{ cursor: "pointer" }} class="fa-solid fa-trash-can me-3"></i>

                <Link className="text-decoration-none" to={`/edittask/${task.id}`} >
                  <div className="d-flex p-3 ">
                    <i style={{ cursor: "pointer" }} className="fa-solid fa-pen ms-auto text-primary">  </i>
                  </div>
                </Link>

              </div>



            </div>
          </div>
        ))}
      </div>
    </div>}

  </>
}

