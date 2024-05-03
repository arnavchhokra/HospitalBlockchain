import axios from "axios";
import { useEffect, useState } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { contractAddress, ABI } from '../contract'
export default function useCetch() {
    const [getSmartContract, setSmartContract] = useState();

    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal();
            const instance = await web3Modal.connect();
            console.log(instance);
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            console.log(signer);
            const newContract = new ethers.Contract(contractAddress, ABI, signer);
            console.log(newContract);
            setSmartContract(newContract);
        };

        setSmartContractAndProvider();

    }, [])
    return [getSmartContract, setSmartContract];
}
