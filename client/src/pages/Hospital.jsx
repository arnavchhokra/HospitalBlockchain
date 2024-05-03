import React, { useEffect, useState } from 'react'
import { Label } from '../components/Label'
import { setHospital, setbankdetails, updateActivity } from '../helper/api'
import { Activity } from '../components/Activity'
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useGetch from '../hooks/get.hook';
import { Connectwallet } from '../components/Connectwallet';

export const Hospital = () => {
  const [{ username }, setuser] = useGetch();
  const navigate = useNavigate()

  const [{ apidata }, setDatta] = useFetch();
  const [showModal, setShowModal] = useState(false);
  const [getSmartContract, setSmartContract] = useState();
  const [walletAddress, setWalletAddress] = useState()
  const createContract = () => {
    if (!getSmartContract && !walletAddress) {
      toast.error("please connect to wallet")
      return null;
    }
    else {
      setShowModal(true);
    }
  }

  const closeCreateContract = () => {
    setShowModal(false)
  }

  useEffect(() => {
    let istoken = localStorage.getItem('token')
    if (!istoken) {
      navigate('/login')
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      active: '',
      score: '',
      physical: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      try {
        let userwalletaddress = username.userwalletaddress;
        let setHospital = await getSmartContract.setHospital(userwalletaddress, true, values.score)
        await setHospital.wait()
        let sethospitaldetailspromises = await setHospital(values)
        let valuess = {
          username: username.username,
          confirmbyhospital: true
        }
        let response = updateActivity(valuess)
        toast.success('Medical Health updated');
        setShowModal(false)
      } catch (error) {
        toast.error("Please try again")
      }
    }
  })

  const submitclaimrequest = async() => {
    try {
      if (!getSmartContract && !walletAddress) {
        toast.error("please connect to wallet")
        return null;
      }
      else {
      let userwalletaddress = username.userwalletaddress;

        let setclaimbyhospital = await  getSmartContract.setClaimByHospital(userwalletaddress)
        await setclaimbyhospital.wait()
        let valuess = {
          username: username.username,
          confirminvokeclaimbyhospital: true
        }
        let response = updateActivity(valuess)
        toast.success('Request claimed');
      }
    } catch (error) {
      toast.error("please try again")
    }
    
  }
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Label name={"Hospital"} />
      <Connectwallet
        setSmartContract={setSmartContract}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      {apidata && apidata.confirmbyhospital != true && apidata.confirmbankbyinsuranceprovider ? (
        <div className='border-2 ml-20'>
          <h1 className='mt-4  ml-2 text-2xl'>Insurance Provider called Hospital to Underwrite</h1>
          <h2 className='mt-2 text-red-800 text-xl ml-2' >Update Medical Health of Customer</h2>
          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={createContract}>Take Action</button>
          {
            showModal ? (
              <form onSubmit={formik.handleSubmit} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                    <div className="relative p-6 flex-auto">
                      <div className="rounded-lg px-8 pb-8 w-full">
                        <label className="block text-black mb-2 text-xl">
                          Update Medical Health of Customer
                        </label>
                        <input className="shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Active status of patient - True/False"
                          {...formik.getFieldProps('active')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Health score of patient -(1-1000)"
                          {...formik.getFieldProps('score')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Physical Verification Done- True/False"
                          {...formik.getFieldProps('physical')}
                          required
                        />

                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-4  border-solid rounded-b">
                      <button
                        className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Take Action
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
            ) : ""
          }
        </div>
      ) : ""}


      {apidata && apidata.invokeclaimbyinsuranceprovider && apidata.confirminvokeclaimbyhospital != true ? (
        <div className='border-2 w-80 ml-20'>
          <div className='text-xl'>Submit Claim Request</div>
          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={submitclaimrequest}>Take Action</button>

        </div>
      ) : null}
      <Activity />
    </div>
  )
}
