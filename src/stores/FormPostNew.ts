import { makeAutoObservable } from "mobx";
import { PropertiesFilter } from "../types/PropertiesFilter";
import { Pageable } from "../types/Pageable";
import { fetchBalconyDirectionApi } from "../api/balconyDirection";
import { fetchHouseDirectionApi } from "../api/houseDirection";
import { fetchInteriorsApi } from "../api/interior";
import { propertyLegalDocumentApi } from "../api/propertyLegalDocument";
import { residentialApi } from "../api/residential";

interface BalconyDirection {
    id: number;
    name: string;
}


interface HouseDirection {
    id: number;
    name: string;
}

interface Interior {
    id: number;
    name: string;
}


interface PropertyLegalDocument {
    id: number;
    name: string;
}


interface Residential {
    id: number;
    name: string;
}



class FormPostNew {

    balconyDirections: BalconyDirection[] = []
    houseDirections: HouseDirection[] = []
    interiors: Interior[] = []
    propertyLegalDocuments: PropertyLegalDocument[] = []
    residentials: Residential[] = []
    isOpenFormReview = false;


    constructor() {
        makeAutoObservable(this);
    }

    setFormReview(value: boolean) {
        this.isOpenFormReview = value;
    }

    setBalconyDirections(balconyDirections: BalconyDirection[]) {
        this.balconyDirections = balconyDirections;
    }

    setHouseDirections(houseDirections: HouseDirection[]) {
        this.houseDirections = houseDirections;
    }

    setInteriors(interiors: Interior[]) {
        this.interiors = interiors;
    }

    setPropertyLegalDocuments(propertyLegalDocuments: PropertyLegalDocument[]) {
        this.propertyLegalDocuments = propertyLegalDocuments;
    }

    setResidentials(residentials: Residential[]) {
        this.residentials = residentials;
    }

    async fetchBalconyDirection(filter: PropertiesFilter, pageable: Pageable) {
        const balconyDirections = await fetchBalconyDirectionApi(filter, pageable)

        if (balconyDirections) {
            this.setBalconyDirections(balconyDirections.data)
        }
    }

    async fetchHouseDirection(filter: PropertiesFilter, pageable: Pageable) {
        const balconyDirections = await fetchHouseDirectionApi(filter, pageable)

        if (balconyDirections) {
            this.setHouseDirections(balconyDirections.data)
        }
    }

    async fetchInteriors(filter: PropertiesFilter, pageable: Pageable) {
        const interiorsApi = await fetchInteriorsApi(filter, pageable)

        if (interiorsApi) {
            this.setInteriors(interiorsApi.data)
        }
    }

    async fetchpropertyLegalDocument(filter: PropertiesFilter, pageable: Pageable) {
        const propertyLegalDocument = await propertyLegalDocumentApi(filter, pageable)

        if (propertyLegalDocument) {
            this.setPropertyLegalDocuments(propertyLegalDocument.data)
        }
    }

    async fetchResidentials(filter: PropertiesFilter, pageable: Pageable) {
        const residentials = await residentialApi(filter, pageable)

        if (residentials) {
            this.setResidentials(residentials.data)
        }
    }
}

export const formPostNew = new FormPostNew();