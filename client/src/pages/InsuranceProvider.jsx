import React, { useEffect, useState } from 'react'
import { Label } from '../components/Label'
import { Activity } from '../components/Activity';
import { getContract, getbankdetails, gethospital, setActivity, setpolicy, updateActivity } from '../helper/api';
import useFetch from '../hooks/fetch.hook';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getusername } from '../helper/username';
import { Connectwallet } from '../components/Connectwallet';

export const InsuranceProvider = () => {
  const navigate = useNavigate()
  const [{ apidata }, setDatta] = useFetch();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState('');
  const [bankdata, setBankData] = useState(false);
  const [hospitalData, setHospitalData] = useState(false)
  const [modal, setModal] = useState(false)
  const [getSmartContract, setSmartContract] = useState();
  const [walletAddress, setWalletAddress] = useState()
  const [reason, setReason] = useState('');
  const takeAction = async () => {
    if (!getSmartContract && !walletAddress) {
      toast.error("please connect to wallet")
      return null;
    }
    else {
      const getcontractdata = getContract()
      getcontractdata.then((result) => {
        setData(result)
      }).catch((err) => {
        toast.error("please try again")
      })
      setShowModal(true);
    }
  }

  const closetakeAction = () => {
    setShowModal(false)
  }


  const Confirm = async () => {
    try {
      let userwalletaddress = await data.userwalletaddress
      let setinsuranceProvider = await getSmartContract.setinsuranceProvider(userwalletaddress, true);
      await setinsuranceProvider.wait();
      let values = {
        username: data.username,
        confirmbyinsuranceprovider: true
      }
      let confirmStatus = updateActivity(values);
      confirmStatus.then(result => {
        if (result.status == 201)
          toast.success("Insurance Provider confirmed")
      })
      setShowModal(false)
    } catch (error) {
      toast.error("please try again")
    }

  }
  useEffect(() => {
    let istoken = localStorage.getItem('token')
    if (!istoken) {
      navigate('/login')
    }
    async function getbankdata() {
      let bankpromises = getbankdetails()
      bankpromises.then((result) => {
        if (result.status == 201) {
          setBankData(result.data)
        }
      }).catch((err) => {
        toast.error("please try again")
      })
    }

    getbankdata()
  }, [])

  useEffect(() => {
    async function gethospitaldetails() {
      let hospitalPromises = gethospital()
      hospitalPromises.then(result => {
        if (result.status == 201)
          setHospitalData(result.data)
      })
    }
    gethospitaldetails()
  }, [])

  const bankconfirm = () => {
    let values = {
      username: apidata.username,
      confirmbankbyinsuranceprovider: true
    }
    let confirmStatus = updateActivity(values);
    toast.success("Confirmation from bank by insurance Provider is done")

  }

  const recalculatepolicyModal = () => {
    if (!getSmartContract && !walletAddress) {
      toast.error("please connect to wallet")
      return null;
    }
    else {
      setModal(true)
    }

  }
  const closedrecalucate = () => {
    setModal(false)
  }


  const formik = useFormik({
    initialValues: {
      premiumpayment: '',
      policyname: '',
      insurancedate: '',
      maturitydate: '',
      finalpremiumoffer: '',
      assured: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      try {
        let contractdata = await getContract()
        let userwa = contractdata.userwalletaddress
        let setRecalculatePolicy = await getSmartContract.setRecalculatePolicy(userwa)
        await setRecalculatePolicy.wait()
        let sethospitaldetailspromises = await setpolicy(values)
        let valuess = {
          username: apidata.username,
          recalculatepolicy: true
        }
        let response = updateActivity(valuess)
        toast.success('Policy re calculated');
        setModal(false)
      } catch (error) {
        toast.error("please try again")
      }

    }
  })
  const handleInputChange = (event) => {
    setReason(event.target.value);
  };
  const invokepolicy = async () => {
    try {
      if (!reason) {
        toast.error("please enter the reason")
      }
      else {
        let contractdata = await getContract()
        let userwa = contractdata.userwalletaddress
        let setinvokeclaim = await getSmartContract.setInvokeClaim(userwa, contractdata.insuranceprovider, reason)
        await setinvokeclaim.wait()
        let valuess = {
          username: apidata.username,
          invokeclaimbyinsuranceprovider: true
        }
        let response = updateActivity(valuess)
        toast.success('Policy send to hospital');
      }
    } catch (error) {
      toast.error("Please try again")
    }


  }

  const submitclaim = async () => {
    try {
      let contractdata = await getContract()
      let userwa = contractdata.userwalletaddress
      let setclaimrequestconfirm = await getSmartContract.setClaimRequestConfirm(userwa)
      await setclaimrequestconfirm.wait()
      let valuess = {
        username: apidata.username,
        confirmclaimrequrestbyinsuranceprovider: true
      }
      let response = updateActivity(valuess)
      toast.success('Submited details');
    } catch (error) {
      toast.success("Please try again")
    }

  }
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Label name={"InsuranceProvider"} />
      <Connectwallet
        setSmartContract={setSmartContract}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      {apidata && apidata.confirmbyinsuranceprovider != true ? (
        <div className='border-2 w-60 ml-20'>
          <h3 className='mt-4  ml-2 text-xl'>{apidata ? `${apidata.username} Created Contract` : null}</h3>

          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={takeAction}>Take Action</button>
          {showModal ? (
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
                    <div>Addhar Card Number: {data.aadhar}</div>
                    <div>Sex: {data.sex}</div>
                    <div>Account Number: {data.accountnumber} </div>
                    <div>Insurance Provider Name:  {data.insuranceprovider}</div>
                    <div>Policy Name: {data.policy}</div>
                    <div>Hospital Name: {data.hospital} </div>
                    <div>Pan Card Number: {data.pan}</div>
                    <div>Sum Assured INR: {data.assured}</div>
                    <div>Policy Term in years: {data.policyterm}</div>
                    <div>Payment Term (1-12/year): {data.payment}</div>
                    <div>Premimum payment paid (true/false): {data.premium ? 'True' : 'False'}</div>
                  </div>
                  <div className="flex items-center justify-center mb-4  border-solid rounded-b">
                    <button
                      className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      onClick={Confirm}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-4 mb-1"
                      type="button"
                      onClick={closetakeAction}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : ""}
        </div>
      )
        : null}



      {apidata && bankdata && apidata.confirmbankbyinsuranceprovider != true && apidata.confirmbybank ? (
        <div className='border-2 w-60 ml-20'>
          <h3 className='mt-4  ml-2 text-xl'>Confirm Request by Bank</h3>

          <h1 className='ml-2 mt-2'>Customer is Verified: {bankdata.verified ? "True" : null}</h1>
          <h1 className='ml-2'>Customer is ACtive{bankdata.active ? "True" : null}</h1>
          <h1 className='ml-2'>Customer Credit: {bankdata.credit}</h1>
          <h1 className='ml-2'>Send to medical Underwrite</h1>


          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={bankconfirm}>Take Action</button>
        </div>
      ) : null}
      {apidata && hospitalData && apidata.recalculatepolicy != true && apidata.confirmbyhospital ? (
        <div className='border-2 w-80 ml-20'>
          <h3 className='mt-4  ml-2 text-xl'>Confirm Request by Hospital</h3>

          <h1 className='ml-2 mt-2'>Customer is Physical: {hospitalData.physical ? "True" : null}</h1>
          <h1 className='ml-2'>Customer is Active: {hospitalData.active ? "True" : null}</h1>
          <h1 className='ml-2'>Customer Score: {hospitalData.score}</h1>
          <h1 className='ml-2'>Send to customer</h1>


          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={recalculatepolicyModal}>Take Action</button>
          {
            modal ? (
              <form onSubmit={formik.handleSubmit} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                    <div className="relative p-6 flex-auto">
                      <div className="rounded-lg px-8 pb-8 w-full">
                        <label className="block text-black mb-2 text-xl">
                          Recalcualte Policy
                        </label>
                        <input className="shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Premium Payment Recived - True/False"
                          {...formik.getFieldProps('premiumpayment')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="policy name"
                          {...formik.getFieldProps('policyname')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Insurance Date"
                          {...formik.getFieldProps('insurancedate')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Maturity Date"
                          {...formik.getFieldProps('maturitydate')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Final Premium offer"
                          {...formik.getFieldProps('finalpremiumoffer')}
                          required
                        />
                        <input className="mt-2 shadow appearance-none  rounded w-full py-2 px-3 text-tt ${isCodeInvalid ? 'border-red-500' : 'border-gray-30"
                          type="text"
                          placeholder="Final Sum Assured (INR)"
                          {...formik.getFieldProps('assured')}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-4  border-solid rounded-b">
                      <button
                        className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Issue Policy
                      </button>
                      <button
                        className="bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-4 mb-1"
                        type="button"
                        onClick={closedrecalucate}
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
      ) : null}
      {apidata && apidata.invokeclaimbyinsuranceprovider != true && apidata.confirmpolicybycustomer ? (
        <div className='border-2 w-80 ml-20'>
          <div className='text-xl'>{apidata.username} has confirm policy</div>
          <input
            type="text"
            placeholder='Enter the reason'
            className='border-2 rounded mt-2 mb-2 text-xl bg-blue-100'
            value={reason}
            onChange={handleInputChange}
          />

          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={invokepolicy}>Take Action</button>

        </div>
      ) : null}
      {apidata && apidata.confirmclaimrequrestbyinsuranceprovider != true && apidata.confirminvokeclaimbyhospital ? (
        <div className='border-2 w-80 ml-20 mt-4'>
          <div className='text-xl'>Submit claim Details</div>
          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={submitclaim}>Take Action</button>

        </div>
      ) : null}


      <Activity></Activity>
    </div>

  )
}
