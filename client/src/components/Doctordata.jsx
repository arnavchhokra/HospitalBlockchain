import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';

const Doctordata = () => {
    const [doctorsampledata, setDoctorsampledata] = useState([]);
    const [loader, isLoader] = useState(false);
    const getdocotrlist = async () => {
        try {
            isLoader(true)
            const result = await axios.get("http://localhost:4000/api/v1/doctorlist/doctorlist")
            setDoctorsampledata(result.data)
            isLoader(false)
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getdocotrlist()
    }, [])
    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            {
                loader ? <Loader /> :
                    <div className="relative overflow-x-auto m-2 rounded">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        First Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Contact Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Specialization
                                    </th>
                                    <th scope="col" className="">
                                        Approve
                                    </th>

                                </tr>
                            </thead>
                            {
                                doctorsampledata && doctorsampledata.length > 0 ? (
                                    <tbody>
                                        {doctorsampledata.map((index, i) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index.firstname}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {index.lastname}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {index.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {index.mobile}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {index.specialization}
                                                </td>
                                                <td>
                                                    {index.isApproveByAdmin ? (
                                                        <div className='py-4'>Approved</div>
                                                    ) : (
                                                        <button className='px-4 mt-1 py-2 bg-red-500 font-bold rounded' id='myBtn' onClick={() => {
                                                            if (document.getElementById("myBtn").innerText == "Approved") {
                                                                toast.error("Already Approved")
                                                            }
                                                            else {
                                                                document.getElementById("myBtn").innerText = "Approving"
                                                                let response = axios.put("http://localhost:4000/api/v1/doctorlist/approvedoctor", { email: index.email });
                                                                response.then((result) => {
                                                                    if (result.status == 200) {
                                                                        toast.success('Approved successfully');
                                                                        document.getElementById("myBtn").innerText = "Approved"
                                                                    }
                                                                    else {
                                                                        toast.success(result.data);
                                                                        document.getElementById("myBtn").innerText = "Approve"
                                                                    }
                                                                }).catch(err => toast.error("Please try again"));
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

export default Doctordata