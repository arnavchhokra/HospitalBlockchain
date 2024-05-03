import { getContract } from "./api";



export async function getusername() {
    try {
        let response = await getContract();
        return response.username

    } catch (error) {
        console.log(error);
    }

}
