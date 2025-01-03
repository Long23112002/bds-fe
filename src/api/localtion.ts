import axios from "axios"
import { BASE_API } from "../enums/baseApi"

export const fetchProvince = async () => {
    try {
        const res = await axios.get(`${BASE_API}/api/v1/provinces?size=63&page=0`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchDistrict = async (provinceId: string) => {
    try {
        const res = await axios.get(`${BASE_API}/api/v1/districts/${provinceId}?size=1000&page=0`)
        return res.data
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchWard = async (districtId: string) => {
    try {
        const res = await axios.get(`${BASE_API}/api/v1/wards/${districtId}?size=1000&page=0`)
        return res.data
    }
    catch (error) {
        console.log(error)
    }
}