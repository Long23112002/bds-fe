
import { BASE_API } from "../enums/baseApi"
import axiosInstance from "./AxiosInstance"

export type NotificationResponse = Notification[]

export interface Notification {
    id: number
    title: string
    description: string
    type: string
    isRead: boolean
    createdAt: number
}

export interface NotificationParam {
    notificationType: string
    isRead: string
    userId: number
}

export const fetchNotificationApi = async (param: NotificationParam) => {
    try {
        const res = await axiosInstance.get(
            `${BASE_API}/api/v1/notifications?` +
            (param.userId ? `userId=${param.userId}&` : '') +
            (param.notificationType ? `notificationType=${param.notificationType}&` : '') +
            (param.isRead !== undefined && param.isRead !== '' ? `isRead=${param.isRead}&` : '')
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateNotificationBluk = async () => {
    try {
        const res = await axiosInstance.put(`${BASE_API}/api/v1/notifications/bluk`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

