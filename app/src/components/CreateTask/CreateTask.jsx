import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Vortex } from 'react-loader-spinner'

export default function CreateTask() {

    const [mesgOnCreateTask, setmesgOnCreateTask] = useState(null)
    const [allUsersNaame, setallUsersNaame] = useState([])
    const [isloadind, setisloadind] = useState(false)


    let UserTask = {
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        employeeId: ""
    }

    async function createTask(values) {
        setisloadind(true)
        try {
            const data = await axios.post("http://localhost:8081/api/admin/createTask", values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                    },
                    withCredentials: true
                }
            )
            setmesgOnCreateTask("Task Created successfully")
            console.log("datan", data);
            
            formikObj.resetForm();
        } catch (error) {
            console.log(error);
           
        }
            setisloadind(false)

    }

    const formikObj = useFormik({
        initialValues: UserTask,
        enableReinitialize: true,
        onSubmit: createTask,
        validate: function (values) {
            
            setmesgOnCreateTask(null)
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
} else {
    const selectedDate = new Date(values.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (selectedDate <= today) {
        errors.dueDate = "Due date must be in the future";
    }
}

            if (!values.employeeId) {
                errors.employeeId = "employeeId is required"
            }

            return errors
        }

    });

    async function getAllUsers() {

        try {

            const { data } = await axios.get("http://localhost:8081/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                },
                withCredentials: true
            })
            setallUsersNaame(data)
            console.log(data)

        } catch (error) {
            console.log("error ", error);

        }

    }

    useEffect(() => {
        getAllUsers()
    }
        , [])



    return <>

        <div className="w-75 m-auto py-5">

            {mesgOnCreateTask && <div className='alert alert-primary'>{mesgOnCreateTask}</div>}

            <h2> Create Task : </h2>
           <div className="card shadow-sm p-4">
           <form onSubmit={formikObj.handleSubmit} >

<label htmlFor="title">title : </label>
<input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.title} id='title' type="text" placeholder='title' className='form-control mb-3' />
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
    <option value="" disabled hidden >Select an Priority </option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
</select>
{formikObj.errors?.priority && formikObj.touched.priority ? <div className="alert alert-danger"> {formikObj.errors?.priority}</div> : ""}


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
    <option value="" disabled hidden >Select an employee </option>
    {allUsersNaame?.map((user, index) => <>
        <option key={index} value={user.id}>{user.name}</option>
    </>)}
</select>
{formikObj.errors?.employeeId && formikObj.touched.employeeId ? <div className="alert alert-danger"> {formikObj.errors?.employeeId}</div>  : ""}


<div className="d-flex justify-content-center align-items-center">
<button type="submit" className='btn btn-outline-primary' >{ isloadind? <Vortex
  visible={true}
  height="40"
  width="40"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
    :
    "Create Task" } </button>
</div>




</form>
           </div>
        </div>


    </>
}
