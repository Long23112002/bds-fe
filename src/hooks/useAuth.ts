import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthData {
    id: string | null;
    email: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    avatar: string | null;
    isAdmin: boolean;
    roles: string[] | null;
    accessToken: string | null;
    refreshToken: string | null;
    wallet: number | null;
}

export const useAuth = () => {
    const [authData, setAuthData] = useState<AuthData | null>(null);

    useEffect(() => {
        const loadAuthData = () => {
            const accessToken = Cookies.get("accessToken");
            const refreshToken = Cookies.get("refreshToken");
            const id = localStorage.getItem("id");
            const email = localStorage.getItem("email");
            const fullName = localStorage.getItem("fullName");
            const phoneNumber = localStorage.getItem("phoneNumber");
            const wallet = localStorage.getItem("wallet") ? parseFloat(localStorage.getItem("wallet")!) : null;
            const avatar = localStorage.getItem("avatar");
            const isAdmin = localStorage.getItem("isAdmin") === "true";
            const roles = localStorage.getItem("roles")?.split(",") || null;

            if (accessToken && refreshToken) {
                setAuthData({
                    id,
                    email,
                    fullName,
                    phoneNumber,
                    avatar,
                    isAdmin,
                    roles,
                    accessToken,
                    refreshToken,
                    wallet,
                });
            } else {
                setAuthData(null);
            }
        };

        loadAuthData();
    }, []);

    const clearAuth = () => {
        setAuthData(null);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        localStorage.clear();
    };

    return { authData, clearAuth };
};
