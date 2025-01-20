/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { deleteFavoriteApi, FavoriteRequest, fetchFavoriteApi, newFavoriteApi } from "../api/favorite";



class FavoriteStore {

    listFavorite:any = []
    isOpenModalFavorite = false;

    constructor() {
        makeAutoObservable(this)
    }

    setIsOpenModalFavorite(isOpen: boolean) {
        this.isOpenModalFavorite = isOpen
    }

    setListFavorite(value: any) {
        this.listFavorite = value
    }

    async fetchListFavorite() {
        const favorites = await fetchFavoriteApi()
        this.setListFavorite(favorites)
    }

    async addFavorite(req: FavoriteRequest) {
        try {
            const response = await newFavoriteApi(req)
            this.setListFavorite({
                ...this.listFavorite,
                response
            })
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async deleteFavorite(postId: number) {
        try {

            await deleteFavoriteApi(postId);
            const updatedFavorites = this.listFavorite.filter((favorite: any) => favorite.postId !== postId);
            this.setListFavorite(updatedFavorites);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }


}

export const favoriteStore = new FavoriteStore();