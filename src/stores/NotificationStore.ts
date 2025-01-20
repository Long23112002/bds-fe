/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { fetchNotificationApi, NotificationResponse } from "../api/notification";

class NotificationStore {

    isOpenNotification = false;
    countReadFlase = 0;
    dataNotification: NotificationResponse = [] 

    setIsOpenNotification(isOpenNotification: boolean) {
        this.isOpenNotification = isOpenNotification
    }

    setCountReadFlase(countReadFlase: number) {
        this.countReadFlase = countReadFlase
    }

    setDataNotification(dataNotification: any) {
        this.dataNotification = dataNotification
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchNotification(param: any) {
        const favorites = await fetchNotificationApi(param)
        this.setDataNotification(favorites)
        this.setCountReadFlase(favorites?.filter((item: any) => !item.isRead).length)
    }

}
export const notificationStore = new NotificationStore();