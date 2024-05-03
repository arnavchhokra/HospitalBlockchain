import axios from "axios";
import { useEffect, useState } from "react";
import { getContract } from "../helper/api";


export default function useGetch() {
    const [getuser, setuser] = useState({ username: undefined });

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await getContract()
                if (response) {
                    setuser({ username: response });
                
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])
    return [getuser, setuser];
}
