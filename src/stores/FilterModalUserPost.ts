import { makeAutoObservable } from "mobx"

class FilterModalUserPost {

    isOpenModalFilter = false

    setIsOpenModalFilter(value: boolean) {
        this.isOpenModalFilter = value
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export const filterModalUserPost = new FilterModalUserPost()