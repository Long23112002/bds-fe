/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { filterPostApi, PostParam } from "../api/posts";

class PropertyStore {
    properties:any = [];


    visibleCount = 8;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setProperties(properties: any) {
        this.properties = properties
    }

    async fetchProperties() {

        try {
            const param: PostParam = {
                page: 0,
                size: 12,
                status: "APPROVED"
            }
            const responsePost = await filterPostApi(param)
            this.setProperties(responsePost)
        }
        catch (error: any) {
            console.log(error);
        }
    }

    loadMore() {
        this.visibleCount += 8;
    }
}

const propertyStore = new PropertyStore();
export default propertyStore;
