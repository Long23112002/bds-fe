/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";


class SearchStore {
     
    isOpenMenuButton = false;

    isOpenSearchSuggest = false;

    isLocaltionFilterModal = false;

    searchLocation = {
        province: '',
        district: '',
        ward: '',
        street: '',
        project: ''
    }
    searchValue = '';

    priceSearchValue={
        min: 0,
        max: 0
    }

    isOpenArenaFilter = false;

    areaSearchValue = {
        min: 0,
        max: 0
    }

    isfilterOption = false;

    filterOptionValue = {
        bedroom: [],
        bedroomVietnamese:[],
        directions:[],
        directionsVietnamese:[],
        content:[],
        contentVietnamese:[]
    }

    isModalPeiceFilter = false;

    constructor(){
        makeAutoObservable(this)
    }

    setIsOpenMenuButton(value: boolean){
        this.isOpenMenuButton = value;
    }

    setIsOpenSearchSuggest(value: boolean){
        this.isOpenSearchSuggest = value;
    }

    setSearchValue(value: string){
        this.searchValue = value;
    }

    setIsLocaltionFilterModal(value: boolean){
        this.isLocaltionFilterModal = value;
    }

    setSearchLocation(value: any){
        this.searchLocation = value;
    }

    setPriceSearchValue(value: any){
        this.priceSearchValue = value;
    }

    setIsModalPeiceFilter(value: boolean){
        this.isModalPeiceFilter = value;
    }

    setIsOpenArenaFilter(value: boolean){
        this.isOpenArenaFilter = value;
    }

    setAreaSearchValue(value: any){
        this.areaSearchValue = value;
    }

    setIsfilterOption(value: boolean){
        this.isfilterOption = value;
    }

    setFilterOptionValue(value: any){
        this.filterOptionValue = value;
    }
}

export const searchStore = new SearchStore();