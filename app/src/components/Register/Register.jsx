import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    let user = {
        name: "",
        email: "",
        password: ""
    }

    const [registerMesage, setregisterMesage] = useState(null)
    const [isLoding, setisLoding] = useState(false)

    const navigateToLogin = useNavigate()



    async function registerNewUser(values) {

        setisLoding(true)

        try {
            const data = await axios.post("http://localhost:8081/api/auth/signup", values)
            console.log(data.data);

                setregisterMesage("success")         

                setTimeout(function () {
                    navigateToLogin("/login")
                }, 1000)
            
        } catch (error) {
            console.log("error in register", error.response.data);
            setregisterMesage(error.response.data)
        }
        setisLoding(false)

    }



    const formikObj = useFormik({
        initialValues: user,
        onSubmit: registerNewUser,

        validate: function (values) {
            
            setregisterMesage(null)

            const errors = {}

            if (values.name.length < 4 || values.name.length > 10) {
                errors.name = "Name must be from 4 characters to 10 characters "
            }

            if (values.email.includes("@") === false || values.email.includes(".") === false) {
                errors.email = "email invalid"
            }

            
            if (values.password.length < 5 || values.password.length > 12) {
                errors.password = "password must be from 5 characters to 12 characters "
            }
            // console.log(errors);
            return errors;
        }

    });

    return <>
        <div className="w-75 m-auto py-5">

            {registerMesage != null ? <div className="alert alert-success">{registerMesage} </div> : ""}
            <h2> Register now : </h2>
            <form onSubmit={formikObj.handleSubmit} >

                <label htmlFor="name">Name : </label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' type="text" placeholder='name' className='form-control mb-3' />
                {formikObj.errors.name && formikObj.touched.name ? <div className="alert alert-danger"> {formikObj.errors?.name}</div> : ""}


                <label htmlFor="email">Email : </label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="text" placeholder='email' className='form-control mb-3' />
                {formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-danger"> {formikObj.errors?.email}</div> : ""}


                <label htmlFor="password">Password : </label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password" placeholder='password' className='form-control mb-3' />
                {formikObj.errors?.password && formikObj.touched.password ? <div className="alert alert-danger"> {formikObj.errors?.password}</div> : ""}

                <button type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success' > {isLoding ? <RotatingLines
                    visible={true}
                    height="45"
                    width="45"
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Register"}
                </button>


            </form>
        </div>



    </>
}
