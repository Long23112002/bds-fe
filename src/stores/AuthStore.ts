/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { LoginRequest, LoginResponse } from "../types/AuthenLogin";
import { loginApi } from "../api/authentication";
import { notifyError, notifySuccess } from "../utils/NotificationUtils";
import { saveAuthData } from "../utils/AuthUtil";

class AuthStore {
    isOpenLoginModal = false;
    isOpenRegisterModal = false;
    loginResponse: LoginResponse | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setIsOpenLoginModal(value: boolean) {
        this.isOpenLoginModal = value;
    }

    setIsOpenRegisterModal(value: boolean) {
        this.isOpenRegisterModal = value;
    }

    setLoginResponse(value: LoginResponse | null) {
        this.loginResponse = value;
    }

    async loginUser(loginRequest: LoginRequest) {
        try {
            const response = await loginApi(loginRequest);
            this.setLoginResponse(response);
            saveAuthData(response);
            notifySuccess("Đăng nhập thành công");
            this.isOpenLoginModal = false;
        } catch (error: any) {
            notifyError(error.response?.data?.message);
        }
    }
}

export const authStore = new AuthStore();
