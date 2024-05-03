import React, { useEffect, useState } from 'react'
import { Label } from '../components/Label'
import { Activity } from '../components/Activity'
import { useFormik } from 'formik';
import { createNewContract, getpolicy, setActivity, updateActivity } from '../helper/api';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook';
import { getusername } from '../helper/username';
import { useNavigate } from 'react-router-dom';
import { Connectwallet } from '../components/Connectwallet';
import { Dash } from '../components/Dash';
export const Customer = () => {
  const navigate = useNavigate();
  const [{ apidata }, setDatta] = useFetch();
  const [getpolicydetails, setgetpolicydetails] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false)
  const [getSmartContract, setSmartContract] = useState();
  const [walletAddress, setWalletAddress] = useState()

  const createContract = () => {
    if (!getSmartContract && !walletAddress) {
      toast.error("Please connect to wallet")
      return null;
    }
    else {
      setShowModal(true);
    }
  }

  const closeCreateContract = () => {
    setShowModal(false)
  }

  const confirmpolicy = () => {
    if (!getSmartContract && !walletAddress) {
      toast.error("Please connect to wallet")
      return null;
    }
    else {
      setModal(true)
    }
  }
  const confirmpolicycancel = () => {
    setModal(false)
  }

  useEffect(() => {
    let istoken = localStorage.getItem('token')
    if (!istoken) {
      navigate('/login')
    }
    async function getpol() {
      let response = await getpolicy()
      if (response.status == 201) {
        setgetpolicydetails(response.data)
      }
    }
    getpol()
  }, [])

  const formik = useFormik({
    initialValues: {
      aadhar: '',
      sex: '',
      bank: '',
      accountnumber: '',
      insuranceprovider: '',
      policy: '',
      hospital: '',
      pan: '',
      assured: '',
      policyterm: '',
      payment: '',
      premium: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      try {
        let setDeatils = await getSmartContract.setDeatils(values.insuranceprovider, values.bank, values.hospital)
        await setDeatils.wait();
        values = values = Object.assign(values, { userwalletaddress: walletAddress || '' })
        let contractPromises = createNewContract(values);
        contractPromises.then(result => {
          if (result.status == 200) {
            toast.success('Contract Already Exits with same value');
          }
          else if (result.status == 201) {
            let username = localStorage.getItem("username")
            let valuess = {
              username,
              createcontract: true,
            }
            let activitystatus = setActivity(valuess);
            activitystatus.then(res => {
              if (res.status == 200) {
                toast.success('Activity Already Updated');
              }
              if (res.status == 201) {
                toast.success('Contract Created Sucessfully');
              }
              else {
                toast.error("Internal server error")
              }
            })
          }
          else {
            toast.error("Internal server error")
          }
        })

        setShowModal(false)
      } catch (error) {
        toast.error("Please try again user rejected")
        return null
      }

    }

  })

  const confirmpolicybycustomer = async () => {
    let setconfirmpolicy = await getSmartContract.setConfirmPolicy();
    await setconfirmpolicy.wait()
    let values = {
      username: apidata.username,
      confirmpolicybycustomer: true
    }
    const confirmStatus = updateActivity(values)
    confirmStatus.then((result) => {
      if (result.status == 201)
        toast.success("Policy confirmed")
      setModal(false)
    })
  }
  return (
    <div className='flex'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div>
      <h1 className='ml-20 mt-16 text-xl'>Customer: {localStorage.getItem("username")}</h1>
      <Connectwallet
        setSmartContract={setSmartContract}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      {apidata && apidata.confirmpolicybycustomer != true && apidata.recalculatepolicy ? (<>
        <button type='button' className='ml-16 bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-20 mt-6' onClick={confirmpolicy}>Confirm Policy</button>
        {
          modal ? (
            <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <div className="rounded-lg px-8 pb-8 w-full">
                      <label className="flex justify-center items-center block text-black mb-2 text-xl">
                        OFFER
                      </label>
                      <label className='text-xl'>Created by: {apidata.username}</label>
                    </div>
                    <div>Premimum payment paid (true/false): {getpolicydetails.premiumpayment ? 'True' : 'False'}</div>
                    <div>Policy Name: {getpolicydetails.policyname}</div>
                    <div>Insurance Date {getpolicydetails.insurancedate} </div>
                    <div>Maturity Date {getpolicydetails.maturitydate} </div>
                    <div>Sum Assured INR: {getpolicydetails.assured}</div>
                  </div>
                  <div className="flex items-center justify-center mb-4  border-solid rounded-b">
                    <button
                      className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      onClick={confirmpolicybycustomer}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-4 mb-1"
                      type="button"
                      onClick={confirmpolicycancel}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : ""
        }
      </>) :
        <div>
          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-20 mt-6' onClick={createContract}>Create Contract</button>
          {showModal ? (
            <form onSubmit={formik.handleSubmit} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <div className="rounded-lg px-8 pb-8 w-full">
                      <label className="block text-black mb-2 text-xl">
                        New Contract
                      </label>
                      <input className="shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Aadhar card Number"
                        {...formik.getFieldProps('aadhar')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Sex M-F-O"
                        {...formik.getFieldProps('sex')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Bank Address like 0x39b62D34744f65Dd1ccE4A56558ae91133476C6E"
                        {...formik.getFieldProps('bank')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Account Number"
                        {...formik.getFieldProps('accountnumber')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Insurance Provider Address like 0x39b62D34744f65Dd1ccE4A56558ae91133476C6E"
                        {...formik.getFieldProps('insuranceprovider')}
                        required
                      />
                      <input className=" mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Policy Name"
                        {...formik.getFieldProps('policy')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Hospital Address like 0x39b62D34744f65Dd1ccE4A56558ae91133476C6E"
                        {...formik.getFieldProps('hospital')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Pan Number"
                        {...formik.getFieldProps('pan')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Sum Assured INR"
                        {...formik.getFieldProps('assured')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Policy Term in years"
                        {...formik.getFieldProps('policyterm')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Payment Term (1-12/year)"
                        {...formik.getFieldProps('payment')}
                        required
                      />
                      <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                        type="text"
                        placeholder="Premimum payment paid (true/false)"
                        {...formik.getFieldProps('premium')}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-4  border-solid rounded-b">
                    <button
                      className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                    >
                      Create
                    </button>
                    <button
                      className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-4 mb-1"
                      type="button"
                      onClick={closeCreateContract}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : ""}
        </div>
      }
      <Activity />
      </div>
      <div className='ml-60 mt-4 rounded w-full'>
        <Dash/>
      </div>
    </div>
  )
}
