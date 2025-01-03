import axios from "axios"
import { BASE_API } from "../enums/baseApi"


export const fetchPackageApi = async () => {
    try {
        const res = await axios.get(`${BASE_API}/api/v1/packages?size=600&page=0`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}