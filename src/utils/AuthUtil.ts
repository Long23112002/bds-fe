import { LoginResponse } from "../types/AuthenLogin";
import Cookies from "js-cookie";

export const saveAuthData = (data: LoginResponse) => {

    if (data.authResponse != null && data.userResponse != null) {
        Cookies.set("accessToken", data.authResponse.accessToken);
        Cookies.set("refreshToken", data.authResponse.refreshToken);
        localStorage.setItem("id", data.userResponse.id.toString());
        localStorage.setItem("email", data.userResponse.email);
        localStorage.setItem("fullName", data.userResponse.fullName);
        localStorage.setItem("phoneNumber", data.userResponse.phoneNumber);
        localStorage.setItem("avatar", data.userResponse.avatar);
        localStorage.setItem("isAdmin", data.userResponse.isAdmin.toString());
        localStorage.setItem("roles", data.userResponse.roles);
        Cookies.set("wallet", data.userResponse.wallet.toString());
    }

};

export const clearAuthData = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("roles");
    Cookies.remove("wallet");
}