import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [tasksPerUser, settasksPerUser] = useState(null)
  const [isloading, setisloading] = useState(false)
  const [activeTaskStatus, setActiveTaskStatus] = useState(null);



  async function getData() {
    setisloading(true)

    try {

      const { data } = await axios.get("/api/employee/dashboard", {
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

  async function updateStatus(id_task, status) {
    try {

      const { data } = await axios.get(`/api/employee/updateTask/${id_task}/${status}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
        },
        withCredentials: true
      })
      getData();

    } catch (error) {
      console.log("error in update", error);
    }
  }


  useEffect(function () {
    getData()
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
    </div> : <div className="container mt-5 bg-body-tertiary p-3 rounded-3 shadow ">
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

             <div className="d-flex justify-content-center align-items-center">
                   <Link className="text-decoration-none ms-auto" to={`/empcomm/${task.id}`} >
                                <div className="d-flex me-4 ">
                                <i className="fa-solid fa-eye"></i>
                                </div>
                              </Link>

                <div className="d-flex p-3 position-relative   ">
                  <i style={{ cursor: "pointer" }} className="fa-solid fa-pen ms-auto text-primary"
                    onClick={() =>
                      setActiveTaskStatus(activeTaskStatus === index ? null : index)
                    }> </i>


                  {activeTaskStatus === index && (
                    <div
                      className="dropdown-menu show position-absolute"
                      style={{ right: 10, top: '100%', zIndex: 1000 }}
                    >
                      <button onClick={function () { updateStatus(task.id, "Pending") }} className="dropdown-item">Pending </button>
                      <button onClick={function () { updateStatus(task.id, "Inprogress") }} className="dropdown-item">Inprogress</button>
                      <button onClick={function () { updateStatus(task.id, "Completed") }} className="dropdown-item">Completed</button>
                      <button onClick={function () { updateStatus(task.id, "Deferred") }} className="dropdown-item">Deferred</button>
                      <button onClick={function () { updateStatus(task.id, "Cancelled") }} className="dropdown-item">Cancelled</button>
                    </div>
                  )}


                </div>
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>}

  </>

}
