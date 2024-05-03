import React, { useEffect, useState } from 'react'
import { getActivity } from '../helper/api';
import useFetch from '../hooks/fetch.hook';

export const Activity = () => {
  const [{ apidata }, setDatta] = useFetch()

  const ischeck = () => {
    if (localStorage.getItem("logintype") == "Customer") {

      if (localStorage.getItem("username") == apidata.username) {
        return true
      }
      return false
    }
    return true
  }
  return (
    <>
      {apidata && ischeck() ? (
        <div>
          <div className='mt-52 ml-32 text-2xl font-bold text-emerald-500'>Activity</div>
          <div className='ml-20 text-xl'>{apidata ? apidata.username : ""} created contract</div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmbyinsuranceprovider ? "Insurance Provider confirmed" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmbybank ? "Bank updated financial health" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmbankbyinsuranceprovider ? "Confirmation from bank by insurance Provider is done" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmbyhospital ? "Hospital updated medical health of customer" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.recalculatepolicy ? "Insurance provider recalculated policy" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmpolicybycustomer ? "Recalculated policy is confirmed by customer" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.invokeclaimbyinsuranceprovider ? "Policy send to hospital" : "s" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirminvokeclaimbyhospital ? "Invoke claim request confimed by hospital" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmbydoctor ? "Invoke claim request confimed by Doctor" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmclaimrequrestbyinsuranceprovider ? "Submited details by Insurance Provider" : "" : ""} </div>
          <div className='ml-20 text-xl'>{apidata ? apidata.confirmclaimrequrestbyinsuranceprovider ? "Contract completed" : "" : ""} </div>

        </div>
      ) : null}
    </>

  )
}
