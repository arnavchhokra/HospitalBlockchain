import axios from "axios";
import { useEffect, useState } from "react";
import { getActivity, getbankdetails } from "../helper/api";


export default function useFetch() {
    
    const [getData, setDatta] = useState({ apidata: undefined });

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await getActivity()
                if (response.status === 201) {
                    setDatta({ apidata: response.data });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])
    return [getData, setDatta];
}

// export  function useBank(){
//     const [getbankData, setbankData] = useState({ apibankdata: undefined });

//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//                 let response = await getbankdetails()
//                 console.log(response);
//                 if (response.status === 201) {
//                     setbankData({ apibankdata: response.data });
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchData()
//     }, [])
//     return [getbankData, setbankData]; 
// } 