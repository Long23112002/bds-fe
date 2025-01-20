
import { BASE_API } from '../enums/baseApi';
import axiosInstance from './AxiosInstance';

export interface FavoriteRequest {
    postId: number;
}

export const newFavoriteApi = async (req: FavoriteRequest) => {
    try {
        const response = await axiosInstance.post(`${BASE_API}/api/v1/favorites`, req);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const fetchFavoriteApi = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_API}/api/v1/favorites`);

        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteFavoriteApi = async (postId: number) => {

    try {
        const response = await axiosInstance.delete(`${BASE_API}/api/v1/favorites/${postId}`);
        return response.status;
    } catch (error) {
        return Promise.reject(error);

    }

}