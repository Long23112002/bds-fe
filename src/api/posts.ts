/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BASE_API } from '../enums/baseApi';
import Cokie from 'js-cookie';
import { ObservableSet } from 'mobx';
import axiosInstance from './AxiosInstance';

export interface PostRequest {
    contactName: string
    email: string
    phoneNumber: string
    demand: string
    numberOfBedrooms: number
    numberOfBathrooms: number
    arena: number
    price: number
    unit: string
    provinceCode: string
    districtCode: string
    wardCode: string
    street: string
    description: string
    images: Image[]
    videoUrl: string
    linkMap: string
    status: string
    userId: number
    title: string
    residentialPropertyId: number
    propertyLegalDocumentId: number
    interiorId: number
    houseDirectionId: number
    balconyDirectionId: number
    packageBuy: {
        packagePriceId: number,
        totalPrice: number,
        startDate: string,
        startTime: string,
    }
    infor: Infor

}

export interface Image {
    url: string
}

export interface Infor {
    residentialProperty: string,
    propertyLegalDocument: string,
    interior: string,
    houseDirection: string,
    balconyDirection: string
}

export interface PostParam {
    [key: string]: any;
    minPrice?: number;
    maxPrice?: number;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    street?: string;
    keyword?: string;
    maxArea?: number;
    minArea?: number;
    residentialPropertyIds?: Set<number>;
    houseDirectionIds?: Set<number>;
    balconyDirectionIds?: Set<number>;
    numBerOfBedrooms?: Set<number>;
    page?: number;
    size?: number;
    status?: string;
    demand?: string;
    media?: Set<string>;
}

export const countPostApi = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_API}/api/v1/posts/count`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}




export const newPostApi = async (req: PostRequest) => {
    try {
        const token = Cokie.get('accessToken');
        console.log('token', token);

        const response = await axios.post(`${BASE_API}/api/v1/posts`, req, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });


        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const filterPostApi = async (param: PostParam) => {
    try {
        const validParams: Record<string, any> = {};

        for (const key in param) {
            const value = param[key];


            if (value instanceof ObservableSet || value instanceof Set) {
                validParams[key] = Array.from(value).join(',');
            } else {

                validParams[key] = value;
            }
        }

        const response = await axios.get(`${BASE_API}/api/v1/posts`, {
            params: validParams,
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};




export const getPostByIdApi = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_API}/api/v1/posts/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const filterSuggesApi = async () => {
    try {
        const response = await axios.get(`${BASE_API}/api/v1/posts/suggest`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export const countProvinceApi = async (demand: string) => {
    try {
        const response = await axios.get(`${BASE_API}/api/v1/posts/count_province?demand=${demand}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


