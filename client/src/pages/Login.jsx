import React, { useEffect, useState } from 'react'
import styles from '../pages/Styles/login.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../helper/api';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate()
  const [loginType, setLoginype] = useState('Customer');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      if (values.email === "admin@gmail.com") {
        let lt = "Admin"
        let loginPromises = login(values, lt)
        loginPromises.then((result) => {
          console.log(result);
          if (result.status == 201) {
            localStorage.setItem("loginType", lt);
            toast.success('Login successfully');
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
          }
          else {
            toast.error('Something went wrong! Please try again');
          }
        })
      }
      else {
        if (loginType === "Hospital") {
          try {
            let response = await axios.post("http://localhost:4000/api/v1/hospitallist/hospitallogin", values)
            if (response.status == 200) {
              toast.success("Login successfull")
              setTimeout(() => {
                navigate('/hospital')
              }, 1500);
            }

          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
        else if (loginType === "Doctor") {
          try {
            let response = await axios.post("http://localhost:4000/api/v1/doctorlist/doctorlogin", values)
            if (response.status == 200) {
              toast.success("Login successfull")
              setTimeout(() => {
                navigate('/doctor')
              }, 1500);
            }
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
        else {
          let loginPromises = login(values, loginType);
          loginPromises.then((result) => {
            if (result.data.message === "user not found") {
              toast.error('User not found. Please register.');
              setTimeout(() => {
                navigate("/register");
              }, 3000);
            }
            else {
              if (result.status == 201) {
                if (loginType === "Bank") navigate('/bank');
                else if (loginType === "InsuranceProvider") navigate("/InsuranceProvider");
                else if (loginType === "Customer") navigate("/customer");
              }
              else {
                toast.error(result.data.message);
              }
            }
          }).catch((error) => {
            toast.error("please try again")
          })
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
  const handleSelectChange = (event) => {
    setLoginype(event.target.value);
  };
  return (
    <div className={`h-screen ${styles.loginbg}`} >
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h3 className=' text-center text-2xl font-bold text-gray-800 md:mb-4 lg:text-3xl'> Welcome back</h3>

          <form className={`mx-auto max-w-lg rounded-lg border-2 ${styles.glass}`} onSubmit={formik.handleSubmit}>
            <h2 className="text-center text-2xl font-bold text-gray-800 md:mb-2 lg:text-3xl">Login</h2>

            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base" >Email</label>
                <input name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" {...formik.getFieldProps('email')} required />
              </div>

              <div>
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base" >Password</label>
                <input name="password" type="password" id="myInput" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" {...formik.getFieldProps('password')} required />
              </div>
              <label >
                <input className='mr-1' type="checkbox" onClick={showpassword} />
                Show Password
              </label>
              <label htmlFor="cars" className='mr-2  uppercase text-blueGray-600 text-xs font-bold mb-2'>Login As:</label>

              <select name="cars" id="cars" onChange={handleSelectChange} value={loginType}>
                <option value="Customer">Customer</option>
                <option value="InsuranceProvider">insurance Company</option>
                <option value="Hospital">Hospital</option>
                <option value="Doctor">Doctor</option>
                <option value="Bank">Bank</option>
              </select>
              <button className="block rounded-lg mt-28 bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base" type='submit'>Log in</button>
            </div>

            <div className="flex items-center justify-center  p-4">
              <p className="text-center text-l text-gray-500">Don't have an account? <Link to="/register" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</Link></p>
            </div>
          </form>


        </div>
      </div>
    </div >
  )
}
