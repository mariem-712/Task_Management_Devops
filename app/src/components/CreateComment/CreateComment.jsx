import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function CreateComment() {
    const { id } = useParams();

    const [task, settask] = useState({})
    const [allComments, setallComments] = useState(null)
    let userComment = {
        comment: ""
    };

    async function getData() {
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
            console.log("data in comment", data)
            getAllComment();



        } catch (error) {
            console.log(error);

        }
    }

    useEffect(function () {
        getData();
        getAllComment();
    }, [])

    async function createComment(values) {
        console.log(values);
        let content = values.comment;

        try {
            const { data } = await axios.post(`http://localhost:8081/api/admin/createComment/${id}`,
                null,
                {
                    params: { content },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                    },
                    withCredentials: true
                }
            );
            formikObj.resetForm();
            getAllComment();
          
        } catch (error) {
            console.error('Error:', error);

        }
    }

    async function getAllComment() {
        try {
            const { data } = await axios.get(`http://localhost:8081/api/admin/comments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('tokenJwt')}`
                    },
                    withCredentials: true
                }
            );
            console.log(data, "co");
            setallComments(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const formikObj = useFormik({
        initialValues: userComment,

        onSubmit: createComment,
        validate: function (values) {
            const errors = {}
            console.log(values);
            if (!values.comment) {
                errors.comment = "comment is required"
            }
            return errors
        }

    });

    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-9   ">
                    <div className="my_task shadow   bg-white py-5 px-4 rounded-3 ">
                        <h2 className='text-primary'>{task?.title}</h2>

                        <p className="text-muted" >{task?.description} </p>

                        <div className="task_content   border-2 border-top   border-gray p-2 d-flex justify-content-between  align-items-center">
                            <div className="Task_content_left  ">
                                <p className='mt-1'>dealine : <span className='fw-bold'>  {new Date(task?.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}    </span></p>
                                <p className='mt-1'>Priority : <span className='fw-bold'>{task?.priority}</span></p>
                            </div>

                            <div className="Task_content_right ">
                                <p className='mt-1'>Employee : <span className='fw-bold'>{task?.employeeName}</span></p>
                                <p className='mt-1'>status : <span className='fw-bold'>{task?.taskStatus}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div className="row mt-5">
                <div className="col-md-9">
                    <div className="comment  shadow   bg-white py-5 px-4 rounded-3 ">
                        <h2> Create comment : </h2>
                        <div className=" shadow-sm p-4">
                            <form onSubmit={formikObj.handleSubmit} >

                                <label htmlFor="comment">comment : </label>
                                <textarea onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.comment} id='comment' type="text" className='form-control mb-3' />
                                {formikObj.errors?.comment && formikObj.touched.comment ? <div className="alert alert-danger"> {formikObj.errors?.comment}</div> : ""}

                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="submit" className='btn btn-outline-primary' >Publish Comment  </button>
                                </div>




                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 gy-3">

                {allComments?.map((comment) =>
                    <div className="col-md-9   ">
                        <div className="my_task shadow   bg-white py-5 px-4 rounded-3  ">
                            <div className="admin_img w-25 d-flex  align-items-center">
                                <img className=" rounded-circle" src={require("../../images/Admin-Profile-Vector-PNG-Clipart.png")} alt="" />
                                <h2 className="ms-3">Admin</h2>
                            </div>
                           
                            <p className="text-muted ms-5 ps-2"> {new Date(comment.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>

                            <p>{comment.content} ?</p>



                        </div>

                    </div>)}


            </div>


        </div>








    </>
}

