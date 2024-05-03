import React, { useEffect, useState } from 'react'
import { Label } from '../components/Label'
import { useNavigate } from 'react-router-dom'
import { Connectwallet } from '../components/Connectwallet'
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook';
import { Activity } from '../components/Activity';


export const Doctor = () => {
  const navigate = useNavigate()
  const [{ apidata }, setDatta] = useFetch();
  const [getSmartContract, setSmartContract] = useState();
  const [walletAddress, setWalletAddress] = useState()
  useEffect(() => {
    let istoken = localStorage.getItem('token')
    if (!istoken) {
      navigate('/login')
    }
  }, [])

  const confirm = async () => {
    if (!getSmartContract && !walletAddress) {
      toast.error("please connect to wallet")
      return null;
    }
    else {
      try {
        let contractdata = await getContract()
        let userwa = contractdata.userwalletaddress
        let setClaimByDoctor = await getSmartContract.setClaimByDoctor(userwa)
        await setClaimByDoctor.wait()

        let values = {
          username: contractdata.username,
          confirmbydoctor: true
        }

        const confirmStatus = updateActivity(values)
        toast.success("Doctor updated")
      } catch (error) {
        toast.error("Please try again")
      }
    }
  }
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Label name={"Doctor"} />
      <Connectwallet
        setSmartContract={setSmartContract}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      {apidata && apidata.confirmbydoctor != true && apidata.confirminvokeclaimbyhospital ? (
        <div className='border-2 w-60 ml-20'>
          <h3 className='mt-4  ml-2 text-xl'>Confirm Request by Hospital</h3>
          <h1 className='ml-2'>Send to Insurance Provider Underwrite</h1>


          <button type='button' className='bg-gray-400 font-bold uppercase rounded px-6 py-2 text-sm outline-none focus:outline-none ml-2 mt-6' onClick={confirm}>Take Action</button>
        </div>
      ) : null}
      <Activity/>
    </div>
  )
}
