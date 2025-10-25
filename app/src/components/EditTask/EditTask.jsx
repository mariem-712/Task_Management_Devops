import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ColorRing, RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTask() {

    const { id } = useParams();
    const [isDataloading, setisDataloading] = useState(false)
    const [mesgOnupdate, setmesgOnupdate] = useState(null)
    const [task, settask] = useState({})
    const [allUsersNaame, setallUsersNaame] = useState([])

    


    // console.log("id", id);


    async function getData() {
        setisDataloading(true)

        try {

            const { data } = await axios.get(`http://localhost:8081/api/admin/oneTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                },
                withCredentials: true
            })
            const formattedDate = new Date(data.dueDate).toISOString().split('T')[0];
            data.dueDate = formattedDate;
            settask(data)
            console.log("data in edit", data)




        } catch (error) {
            console.log(error);

        }
        setisDataloading(false)

    }


    async function updateTask(values) {
        

        try {
            const data = await axios.put(`http://localhost:8080/api/admin/updateTask/${id}`, values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                    },
                    withCredentials: true
                }
            )
            setmesgOnupdate("Task updated successfully")
            // console.log("data in edit", data);

        } catch (error) {

        }


    }


    const formikObj = useFormik({
        initialValues: {
            title: task.title || '',
            description: task.description || '',
            priority: task.priority || '',
            dueDate: task.dueDate || '',
            taskStatus: task.taskStatus || '',
            employeeId: task.employeeId || ''

        },
        enableReinitialize: true,
        onSubmit: updateTask,
        validate: function (values) {

            setmesgOnupdate(null)
            const errors = {}
            if (!values.title) {
                errors.title = "title is required"
            }
            if (!values.description) {
                errors.description = "description is required"
            }
            if (!values.priority) {
                errors.priority = "priority is required"
            }
            if (!values.dueDate) {
                errors.dueDate = "dueDate is required"
            }
            if (!values.taskStatus) {
                errors.taskStatus = "taskStatus is required"
            }
            if (!values.employeeId) {
                errors.employeeId = "employeeId is required"
            }

            return errors
        }

    });


    useEffect(function () {
        getData();
        getAllUsers();
    }, [])

    

    async function getAllUsers() {

        try {

            const { data } = await axios.get("http://localhost:8080/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                },
                withCredentials: true
            })
            setallUsersNaame(data)

        } catch (error) {
            console.log("error ", error);

        }

    }




    return <>

        {isDataloading ? (
            <div className="vh-100 bg-black d-flex justify-content-center align-items-center ">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        ) : (
            <div className="w-75 m-auto py-5 ">

                {mesgOnupdate && <div className='alert alert-success'>{mesgOnupdate}</div>}

                <h2> Edit now : </h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={formikObj.handleSubmit} >

                        <label htmlFor="title">title : </label>
                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.title} id='title' type="text" placeholder='name' className='form-control mb-3' />
                        {formikObj.errors?.title && formikObj.touched.title ? <div className="alert alert-danger"> {formikObj.errors?.title}</div> : ""}


                        <label htmlFor="description">description : </label>
                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.description} id='description' type="text" placeholder='description' className='form-control mb-3' />
                        {formikObj.errors?.description && formikObj.touched.description ? <div className="alert alert-danger"> {formikObj.errors?.description}</div> : ""}


                        <label htmlFor="dueDate">Deadline : </label>
                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.dueDate} id='dueDate' type="date" placeholder='dueDate' className='form-control mb-3' />
                        {formikObj.errors?.dueDate && formikObj.touched.dueDate ? <div className="alert alert-danger"> {formikObj.errors?.dueDate}</div> : ""}

                        <label htmlFor="priority">Priority: </label>
                        <select onBlur={formikObj.handleBlur}
                            id="priority"
                            name="priority"
                            className="form-control mb-3"
                            value={formikObj.values.priority}
                            onChange={formikObj.handleChange}

                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        {formikObj.errors?.priority && formikObj.touched.priority ? <div className="alert alert-danger"> {formikObj.errors?.priority}</div> : ""}



                        <label htmlFor="taskStatus">Status: </label>
                        <select onBlur={formikObj.handleBlur}
                            id="taskStatus"
                            name="taskStatus"
                            className="form-control mb-3"
                            value={formikObj.values.taskStatus}
                            onChange={formikObj.handleChange}

                        >
                            <option value="Inprogress">Inprogress</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Deferred">Deferred</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        {formikObj.errors?.taskStatus && formikObj.touched.taskStatus ? <div className="alert alert-danger"> {formikObj.errors?.taskStatus}</div> : ""}



                        <label htmlFor="employeeId">Emoloyee Name: </label>
                        <select
                            placeholder="Select an employee"
                            id="employeeId"
                            name="employeeId"
                            className="form-control mb-3"
                            onBlur={formikObj.handleBlur}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.employeeId}
                        >
                            
                            {allUsersNaame?.map((user, index) => <>
                                <option key={index} value={user.id}>{user.name}</option>
                            </>)}
                        </select>
                        {formikObj.errors?.employeeId && formikObj.touched.employeeId ? <div className="alert alert-danger"> {formikObj.errors?.employeeId}</div> : ""}


                        <div className="d-flex justify-content-center align-items-center ">
                            <button type="submit" className='btn btn-outline-info px-3 mt-3 ' >Update Task  </button>
                        </div>

                    </form>
                </div>

            </div>
        )}

    </>
}
