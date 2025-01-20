import { BASE_API } from "../enums/baseApi";
import { LoginRequest, LoginResponse, UserResponse } from "../types/AuthenLogin"
import Cokie from "js-cookie";

import axios from "axios";
import { ProfileInfoResponse } from "../types/ProfileInfo";
import { Pageable } from "../types/Pageable";

export const loginApi = async (loginRequest: LoginRequest) => {
    try {
        const response = await axios.post<LoginResponse>(`${BASE_API}/api/v1/auth/login`, loginRequest);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUserInforApi = async () => {
    const token = Cokie.get('accessToken');
    try {
        const response = await axios.get<UserResponse>(`${BASE_API}/api/v1/auth/user_info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

};

export const getUserProfileByIdApi = async (id: number, pageable: Pageable, demand: string) => {
    try {
        const response = await axios.get<ProfileInfoResponse>(`${BASE_API}/api/v1/auth/profile_info/${id}`, {
            params: {
                page: pageable.page,
                size: pageable.size,
                demand: demand, 
            },
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
