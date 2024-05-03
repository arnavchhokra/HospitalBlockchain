import React, { useEffect, useState } from 'react'
import styles from '../pages/Styles/login.module.css'
import Doctordata from '../components/Doctordata';
import { useNavigate } from 'react-router-dom';
import Hospitaldata from '../components/Hospitaldata';

export const Dash = () => {
    const navigate = useNavigate();
    const [IsHospitalData, setIsHospitalData] = useState(true);
    const [value, setValue] = useState("Hospital")

    useEffect(() => {
        let jwtToken = localStorage.getItem("token")
        let loginType = localStorage.getItem('loginType')
        if (jwtToken) {
            try {
                const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
                const expirationTime = decodedToken.exp * 1000;
                if (Date.now() > expirationTime && loginType !== "Admin") {
                    navigate('/');

                }

            } catch (error) {
                console.error('Error decoding or invalid token:', error);
                navigate('/');

            }
        } else {            
            navigate('/');
        }
    }, [])

   
    const handleSelectChange = (event) => {
        if (event.target.value === "Hospital") {
            setIsHospitalData(true)
            setValue("Hospital")
        }
        else {
            setIsHospitalData(false)
            setValue("Doctor")
        }
    };
    return (
        <div className={`py-1 ${styles.registerbg}`}>
            <h1 className='mt-6 text-2xl font-bold flex items-center justify-center'>Admin Dashboard</h1>

            <label htmlFor="cars" className='mr-2 ml-20 uppercase text-blueGray-600 text-xl font-bold mb-2'>SHOW DATA:</label>

            <select className='m-2  px-2 rounded text-xl bg-blue-100 font-bold' name="cars" id="cars" onChange={handleSelectChange} value={value}>
                <option value="Hospital">Hospital</option>
                <option value="Doctor">Doctor</option>
            </select>


            {
                IsHospitalData && value === "Hospital" ?
                    <Hospitaldata />
                    :
                    <div>
                        <Doctordata />
                    </div>
            }
        </div>
    )
}
