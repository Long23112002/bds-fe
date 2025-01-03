/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx"
import { fetchDistrict, fetchProvince, fetchWard } from "../api/localtion"

class LocationStore {

    provinces: any = []
    districts: any = []
    wards: any = []

    constructor() {
        makeAutoObservable(this)
    }

    setProvinces(provinces: any) {
        this.provinces = provinces
    }

    setDistricts(districts: any) {
        this.districts = districts
    }

    setWards(wards: any) {
        this.wards = wards
    }

    async fetchProvinces() {
        const provinces = await fetchProvince()
        if (provinces) {
            this.setProvinces(provinces.data)
        }
    }

    async fetchDistricts(provinceId: string) {
        const districts = await fetchDistrict(provinceId)
        if (districts) {
            this.setDistricts(districts.data)
        }
    }

    async fetchWards(districtId: string) {
        const wards = await fetchWard(districtId)
        if (wards) {
            this.setWards(wards.data)
        }
    }

    resetLocation() {
        
    }


}

export const locationStore = new LocationStore();