/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { PostRequest } from "../api/posts";

class NewPostStore {
    province: string | null = null;
    district: string | null = null;
    ward: string | null = null;
    street: string | null = null;
    project: string | null = null;

    isOpenModalAddress = false;

    currentStep = 0;

    isOpenModalLocations = false;

    valueNewPost: PostRequest = {} as PostRequest;


    stressTotal: {
        district: string | null;
        province: string | null;
        street: string | null;
        streetName: string | null;
        urlmap: string | null;
        ward: string | null;
    } | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    setValueNewPost(value: PostRequest) {
        this.valueNewPost = value;
    }

    setStressTotal(value: any) {
        this.stressTotal = value;
    }

    setCurrentStep(value: number) {
        this.currentStep = value;
    }


    setProvince(value: string | null) {
        this.province = value;
        this.district = null;
        this.ward = null;
    }

    setDistrict(value: string | null) {
        this.district = value;
        this.ward = null;
    }

    setWard(value: string | null) {
        this.ward = value;
    }

    setStreet(value: string | null) {
        this.street = value;
    }

    setProject(value: string | null) {
        this.project = value;
    }

    setIsOpenModalAddress(value: boolean) {
        this.isOpenModalAddress = value;
    }

    setIsOpenModalLocations(value: boolean) {
        this.isOpenModalLocations = value;
    }


    get displayAddress() {
        const parts = [
            this.street,
            this.ward,
            this.district,
            this.province,
            this.project ? `(Dự án: ${this.project})` : null,
        ];
        return parts.filter((part) => part).join(", ");
    }

}


export const newPostStore = new NewPostStore();

