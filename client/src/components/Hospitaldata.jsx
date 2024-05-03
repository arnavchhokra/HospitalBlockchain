import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';



const Hospitaldata = () => {
    const [hospitalsampledata, setHospitalsampledata] = useState([]);
    const [loader, isLoader] = useState(false);
    const gethospitallist = async () => {
        try {
            isLoader(true)
            const result = await axios.get("http://localhost:4000/api/v1/hospitallist/hospitallist")
            setHospitalsampledata(result.data)
            isLoader(false)
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        gethospitallist()
    }, [])

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            {loader ? <Loader /> :
                <div className="relative overflow-x-auto m-2 rounded">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Hospital Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    contactNumber
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    State
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="">
                                    Approve
                                </th>

                            </tr>
                        </thead>
                        {
                            hospitalsampledata && hospitalsampledata.length > 0 ? (
                                <tbody>
                                    {hospitalsampledata.map((index, i) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index.hospitalname}
                                            </th>
                                            <td className="px-6 py-4">
                                                {index.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {index.contactNumber}
                                            </td>
                                            <td className="px-6 py-4">
                                                {index.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {index.state}
                                            </td>
                                            <td className="px-6 py-4">
                                                {index.country}
                                            </td>
                                            <td>
                                                {index.isApproveByAdmin ? (
                                                    <div className='py-4'>Approved</div>
                                                ) : (
                                                    <button className='px-4 mt-1 py-2 bg-red-500 font-bold rounded' id='myBtn' onClick={() => {
                                                        let logintype = localStorage.getItem('logintype');
                                                        if(logintype != "Admin"){
                                                            toast.error("You are not allowed")
                                                        }
                                                        else{
                                                        if (document.getElementById("myBtn").innerText == "Approved") {
                                                            toast.error("Already Approved")
                                                        }
                                                        else {
                                                            document.getElementById("myBtn").innerText = "Approving"
                                                            let response = axios.put("http://localhost:4000/api/v1/hospitallist/approvehospital", { email: index.email });
                                                            response.then((result) => {
                                                                if (result.status == 200) {
                                                                    toast.success('Approved successfully');
                                                                    document.getElementById("myBtn").innerText = "Approved"
                                                                }
                                                                else {
                                                                    toast.success(result.data);
                                                                    document.getElementById("myBtn").innerText = "Approve"
                                                                }
                                                            }).catch(err => toast.error("Please try again"))
                                                        }
                                                    }
                                                    }}>Approve</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center">
                                            No data
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }

                    </table>
                </div>
            }
        </div>
    )
}

export default Hospitaldata