import { makeAutoObservable } from "mobx";

class NewPostStore {
    province: string | null = null;
    district: string | null = null;
    ward: string | null = null;
    street: string | null = null;
    project: string | null = null;

    isOpenModalAddress = false;

    isOpenModalLocations = false;



    constructor() {
        makeAutoObservable(this);
    }


    setProvince(value: string | null) {
        this.province = value;
        this.district = null;
        this.ward = null;
        this.updateDisplayAddress();
    }

    setDistrict(value: string | null) {
        this.district = value;
        this.ward = null;
        this.updateDisplayAddress();
    }

    setWard(value: string | null) {
        this.ward = value;
        this.updateDisplayAddress();
    }

    setStreet(value: string | null) {
        this.street = value;
        this.updateDisplayAddress();
    }

    setProject(value: string | null) {
        this.project = value;
        this.updateDisplayAddress();
    }

    setIsOpenModalAddress(value: boolean) {
        this.isOpenModalAddress = value;
    }

    setIsOpenModalLocations(value: boolean) {
        this.isOpenModalLocations = value;
    }


    reset() {
        this.province = null;
        this.district = null;
        this.ward = null;
        this.street = null;
        this.project = null;
        
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


    private updateDisplayAddress() {

    }
}

// Khởi tạo store
export const newPostStore = new NewPostStore();
