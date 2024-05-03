import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../pages/Styles/login.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { registerValidation } from '../helper/userValid';
import { register } from '../helper/api';
import HospitalRegister from './HospitalRegister';
import DoctorRegister from './DoctorRegister';
export const Register = () => {
    const navigate = useNavigate()
    const [registerType, setRegisterType] = useState("User")
    const [userType, setuserType] = useState({
        isHospital: false,
        isDoctor: false,
        isUser: true
    })
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
            retype: ''
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { logintype: 'Customer' || '' })
            let registerPromise = register(values)
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: <b>Register Successfully...!</b>,
                error: <b>Could not Register.</b>
            });
            registerPromise.then(function () {
                navigate("/customer");
            });
        }
    })


    const showpassword = () => {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    const handleSelectChange = (event) => {
        setRegisterType(event.target.value);

        if (event.target.value == "Hospital") {
            setuserType({
                isHospital: true,
                isDoctor: false,
                isUser: false
            })

        }
        else if (event.target.value == "Doctor") {
            setuserType({
                isHospital: false,
                isDoctor: true,
                isUser: false
            })

        }
        else {
            setuserType({
                isHospital: false,
                isDoctor: false,
                isUser: true
            })
        }

    };
    return (
        <section className={`py-1 ${styles.registerbg}`}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-2">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className={`mb-0 px-6 py-6 ${styles.registerglass}`}>

                        <div className="text-center flex justify-between">

                            <h6 className="text-blueGray-700 text-xl font-bold">
                                Register
                            </h6>
                        </div>
                        <label htmlFor="cars" className='mr-2  uppercase text-blueGray-600 text-xs font-bold mb-2'>Register As:</label>

                        <select name="cars" id="cars" onChange={handleSelectChange} value={registerType}>
                            <option value="Hospital">Hospital</option>
                            <option value="Doctor">Doctor</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    {
                        userType && userType.isUser ?
                            <div className={`flex-auto px-4 lg:px-10 py-10 pt-0 ${styles.registerglass}`}>
                                <form onSubmit={formik.handleSubmit}>

                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-2 font-bold uppercase">
                                        User Information
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    First Name
                                                </label>
                                                <input  {...formik.getFieldProps('firstname')} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your name' required />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    Last Name
                                                </label>
                                                <input  {...formik.getFieldProps('lastname')} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter you surname' required />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    Email address
                                                </label>
                                                <input {...formik.getFieldProps('email')} type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your email' required />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    Mobile
                                                </label>
                                                <input  {...formik.getFieldProps('mobile')} type='text' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your mobile number' required />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    Password
                                                </label>
                                                <input {...formik.getFieldProps('password')} type="password" id="myInput" className="border-0 px-3 py-3  mb-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your password' required />
                                                <label >
                                                    <input className='mr-1' type="checkbox" onClick={showpassword} />
                                                    Show Password
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                    Confim Password
                                                </label>
                                                <input {...formik.getFieldProps('retype')} type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='ReEnter your password' required />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="mt-6 border-b-1 border-blueGray-300" />



                                    <div className='flex flex-col items-center mt-5'>
                                        <button className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type='submit'>
                                            Register
                                        </button>
                                    </div>
                                    <p className='text-l text-gray-500 mt-4' >Already have account? <Link className='text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700' to={'/login'}>Login</Link></p>

                                </form>
                            </div> : null
                    }
                    {
                        userType && userType.isHospital ? <HospitalRegister /> : null
                    }
                    {
                        userType && userType.isDoctor ? <DoctorRegister /> : null
                    }
                </div>
            </div>
        </section>
    )
}
