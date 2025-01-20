/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction } from "mobx";
import { filterValidParams } from "../utils/ValidatorParam";
import { filterPostApi } from "../api/posts";


class ManagerUserPostStore {

    dataPostUsers: any = [];

    paramSearch: any = {
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        keyword: '',
        residentialPropertyIds: new Set<number>(),
        page: 0,
        size: 100000,
        status: '',
        demand: '',
        userId: ''
    };

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.paramSearch,
            async (newParamSearch) => {
                try {

                    const validParams = filterValidParams(newParamSearch);

                    if (Object.keys(validParams).length > 0) {
                        const res = await filterPostApi(validParams);
                        console.log(res)

                        if (res && Array.isArray(res.data)) {
                            this.setDataPostUser(res.data);
                        } else {
                            this.setDataPostUser([]);
                        }
                    } else {

                        this.setDataPostUser([]);
                    }
                } catch (error) {
                    console.error("Error fetching filtered posts:", error);
                    this.setDataPostUser([]);
                }
            },
            { delay: 300 }
        );

    }

    setDataPostUser(dataPostUser: any) {
        this.dataPostUsers = dataPostUser;
    }

    setParamSearch(paramSearch: any) {
        this.paramSearch = paramSearch;
    }


}


export const managerUserPostStore = new ManagerUserPostStore();