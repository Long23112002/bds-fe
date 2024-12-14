import { makeAutoObservable } from "mobx";

class AuthStore {
    
    isOpenLoginModal = false;
    isOpenRegisterModal = false;
     
    constructor(){
        makeAutoObservable(this)
    }

    setIsOpenLoginModal(value: boolean){
        this.isOpenLoginModal = value
    }

    setIsOpenRegisterModal(value: boolean){
        this.isOpenRegisterModal = value
    }


}

export const authStore = new AuthStore();

