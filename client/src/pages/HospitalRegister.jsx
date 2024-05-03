import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../pages/Styles/login.module.css'
import axios from 'axios';

const HospitalRegister = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            hospitalname: '',
            address: '',
            city: '',
            state: '',
            country: '',
            contactNumber: '',
            email: '',
            password: '',
            retype: ''
        },
        onSubmit: async values => {
            if (values.password !== values.retype) {
                toast.error("Password must be same")
            }
            else {
                let response;

                try {
                    response = await axios.post("http://localhost:4000/api/v1/hospitallist/hospitalregister", values);

                    if (response.status === 201) {
                        toast.success("Register successfully");
                        setTimeout(() => {
                            navigate('/');
                        }, 1500);
                    } else {
                        toast.error("Please try again");
                    }
                } catch (error) {
                    if (error.response) {                        
                        if (error.response.status === 409) {
                            toast.error(error.response.data);
                        }
                    } else if (error.request) {
                        console.error(error.request);
                    } else {
                        console.error('Error', error.message);
                    }
                }                
            }
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
    return (
        <div className={`flex-auto px-4 lg:px-10 py-5 pt-0 ${styles.registerglass}`}>
            <form onSubmit={formik.handleSubmit}>

                <h6 className="text-blueGray-400 text-sm  mb-2 font-bold uppercase">
                    Hospital Information
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Hospital Name
                            </label>
                            <input  {...formik.getFieldProps('hospitalname')} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your name' required />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Address
                            </label>
                            <input  {...formik.getFieldProps('address')} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter you surname' required />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                City
                            </label>
                            <input {...formik.getFieldProps('city')} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your email' required />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                State
                            </label>
                            <input  {...formik.getFieldProps('state')} type='text' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your mobile number' required />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Country
                            </label>
                            <input  {...formik.getFieldProps('country')} type='text' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your mobile number' required />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Contact Number
                            </label>
                            <input  {...formik.getFieldProps('contactNumber')} type='text' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your mobile number' required />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Email
                            </label>
                            <input  {...formik.getFieldProps('email')} type='email' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder='Enter your mobile number' required />
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
        </div>
    )
}

export default HospitalRegister