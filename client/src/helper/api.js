import axios from 'axios'
import { getusername } from './username';
// axios.defaults.baseURL = process.env.REACT_APP_DEV_SERVER;
// import ethers from "ethers"
export async function register(values) {

    try {
        localStorage.setItem("username", values.firstname)

        const data = await axios.post('http://localhost:4000/api/v1/user/register', values)

        return data.data
    } catch (error) {
        return error
    }

}

export async function login(values, loginType) {
    try {
        localStorage.setItem("logintype", loginType)
        values = await Object.assign(values, { logintype: loginType || '' })

        let data = await axios.post('http://localhost:4000/api/v1/user/login', values);
        localStorage.setItem("token", data.data.token)
        return data
    } catch (error) {
        return error
    }
}


export async function createNewContract(values) {
    try {
        let username = localStorage.getItem('username')
        values = await Object.assign(values, { username: username || '' })
        const data = await axios.post('http://localhost:4000/api/v1/contract/createcontract', values);
        return data
    } catch (error) {
        return error
    }
}

export async function getContract() {
    try {
        const data = await axios.get('http://localhost:4000/api/v1/contract/getcontract')
        return data.data;
    } catch (error) {
        return error
    }
}


export async function setActivity(values) {
    try {
        const data = await axios.post('http://localhost:4000/api/v1/activity/setactivity', values)
        return data;
    } catch (error) {
        return error
    }
}

export async function updateActivity(values) {
    try {

        const data = await axios.put('http://localhost:4000/api/v1/activity/updateactivity', values)
        return data;
    } catch (error) {
        return error
    }
}
export async function getActivity() {
    try {
        let username = await getusername()

        const data = await axios.get('http://localhost:4000/api/v1/activity/getactivity', {
            params: {
                username: username
            }
        })
        return data
    } catch (error) {
        return error
    }
}



export async function setbankdetails(values) {
    try {
        let username = await getusername()
        values = await Object.assign(values, { username: username || '' })
        const data = await axios.post('http://localhost:4000/api/v1/bank/setbankdetails', values);
        return data.data
    } catch (error) {
        return error
    }
}


export async function getbankdetails() {
    try {
        let username = await getusername()
        const data = await axios.get('http://localhost:4000/api/v1/bank/getbankdetails', {
            params: {
                username: username
            }
        })
        return data
    } catch (error) {
        return error
    }
}


export async function setHospital(values) {
    try {
        let username = await getusername()
        values = await Object.assign(values, { username: username || '' })
        const data = await axios.post("http://localhost:4000/api/v1/hospital/sethospital", values)
        return data.data
    } catch (error) {
        return error
    }
}


export async function gethospital() {
    try {
        let username = await getusername()
        const data = await axios.get('http://localhost:4000/api/v1/hospital/gethospital', {
            params: {
                username: username
            }
        })
        return data
    } catch (error) {
        return error
    }
}


export async function setpolicy(values) {
    try {
        let username = await getusername()
        values = await Object.assign(values, { username: username || '' })
        const data = await axios.post("http://localhost:4000/api/v1/policy/setpolicy", values)
        return data.data
    } catch (error) {
        return error
    }
}
export async function getpolicy() {
    try {
        let username = await getusername()
        const data = await axios.get('http://localhost:4000/api/v1/policy/getpolicy', {
            params: {
                username: username
            }
        })
        return data
    } catch (error) {
        return error
    }
}