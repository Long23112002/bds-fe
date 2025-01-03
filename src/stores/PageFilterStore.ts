/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, reaction } from "mobx";
import { fetchHouseDirectionApi } from "../api/houseDirection";
import { PropertiesFilter } from "../types/PropertiesFilter";
import { Pageable } from "../types/Pageable";
import { residentialApi } from "../api/residential";
import { filterPostApi, PostParam } from "../api/posts";
import { filterValidParams } from "../utils/ValidatorParam";


class PageFilterStore {

    isOpenMenuButton = false;

    isOpenSearchSuggest = false;

    isLocaltionFilterModal = false;

    isOpenArenaFilter = false;

    isfilterOption = false;

    diractionOptions: any = []

    residentialOptions: any = []

    postFilterResult: any = []

    searchLocation = {
        province: '',
        district: '',
        ward: '',
    }

    totalPosts = 0;

    searchValue = '';

    priceSearchValue = {
        min: 0,
        max: 0
    }



    areaSearchValue = {
        min: 0,
        max: 0
    }

    paramSearch: PostParam = {
        minPrice: 0,
        maxPrice: 0,
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        street: '',
        keyword: '',
        maxArea: 0,
        minArea: 0,
        residentialPropertyIds: new Set<number>(),
        houseDirectionIds: new Set<number>(),
        balconyDirectionIds: new Set<number>(),
        numBerOfBedrooms: new Set<number>(),
        page: 0,
        size: 100000,
        status: '',
        demand: '',
        media: new Set<string>(),
    };

    valueSearchLabel = {
        price: '',
        arena: '',
        location: '',
        checkboxQuantity: 0,
        redesinal: ''
    }


    filterOptionValue = {
        bedroom: [],
        bedroomVietnamese: [],
        directions: [],
        directionsVietnamese: [],
        content: [],
        contentVietnamese: []
    }

    isModalPeiceFilter = false;

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.paramSearch,
            async (newParamSearch) => {
                try {
                  
                    const validParams = filterValidParams(newParamSearch);
        
                
                    if (Object.keys(validParams).length > 0) {
                        const res = await filterPostApi(validParams);
                        console.log(res)
        
                        if (res && Array.isArray(res.data)) {
                            this.setPostFilterResult(res.data);
                            this.setTotalPosts(res.metadata.total);

                        } else {
                            this.setPostFilterResult([]);
                        }
                    } else {
                       
                        this.setPostFilterResult([]);
                    }
                } catch (error) {
                    console.error("Error fetching filtered posts:", error);
                    this.setPostFilterResult([]); 
                }
            },
            { delay: 300 }
        );

        
    }

    setTotalPosts(value: number) {
        this.totalPosts = value;
    }

    setValueSearch(value: any) {
        this.valueSearchLabel = value;
    }

    setParamSearch(value: PostParam) {
        this.paramSearch = value;
    }


    setPostFilterResult(value: any) {
        this.postFilterResult = value
    }

    setDiractionOptions(value: any) {
        this.diractionOptions = value;
    }

  
    setIsOpenMenuButton(value: boolean) {
        this.isOpenMenuButton = value;
    }

    setIsOpenSearchSuggest(value: boolean) {
        this.isOpenSearchSuggest = value;
    }

    setSearchValue(value: string) {
        this.searchValue = value;
    }

    setIsLocaltionFilterModal(value: boolean) {
        this.isLocaltionFilterModal = value;
    }

    setSearchLocation(value: any) {
        this.searchLocation = value;
    }

    setPriceSearchValue(value: any) {
        this.priceSearchValue = value;
    }

    setIsModalPeiceFilter(value: boolean) {
        this.isModalPeiceFilter = value;
    }

    setIsOpenArenaFilter(value: boolean) {
        this.isOpenArenaFilter = value;
    }

    setAreaSearchValue(value: any) {
        this.areaSearchValue = value;
    }

    setIsfilterOption(value: boolean) {
        this.isfilterOption = value;
    }

    setFilterOptionValue(value: any) {
        this.filterOptionValue = value;
    }

    setResidentialOptions(value: any) {
        this.residentialOptions = value
    }


    async fetchHouseDirection(filter: PropertiesFilter, pageable: Pageable) {
        const balconyDirections = await fetchHouseDirectionApi(filter, pageable)

        if (balconyDirections) {
            this.setDiractionOptions(balconyDirections.data)
        }
    }

    async fetchResidentials(filter: PropertiesFilter, pageable: Pageable) {
        const residentials = await residentialApi(filter, pageable)
        if (residentials) {
            this.setResidentialOptions(residentials.data)
        }
    }
}

export const pageFilterStore = new PageFilterStore();