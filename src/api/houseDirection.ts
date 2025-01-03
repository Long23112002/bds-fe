/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { Pageable } from "../types/Pageable"
import { PropertiesFilter } from "../types/PropertiesFilter"
import { BASE_API } from "../enums/baseApi"


export const fetchHouseDirectionApi = async (filter: PropertiesFilter, pageable: Pageable) => {
    try {
    
        const params: any = {
            size: pageable.size || 1000,
            page: pageable.page || 0,
        };

       
        if (filter && Object.keys(filter).length > 0) {
            Object.assign(params, filter);  
        }

        const res = await axios.get(`${BASE_API}/api/v1/house_directions`, { params });
        return res.data;
    } catch (error) {
        console.error('Error fetching house direction:', error);
        throw error;
    }
};
