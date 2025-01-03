import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { authStore } from "../stores/AuthStore";

const useCheckLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!Cookies.get("accessToken");

    useEffect(() => {
        if (!isAuthenticated) {
            const currentPath = location.pathname;
            localStorage.setItem("redirectAfterLogin", currentPath);
            navigate("/");
            authStore.setIsOpenLoginModal(true);
        }
    }, [isAuthenticated, navigate, location]);

    return isAuthenticated;
};

export default useCheckLogin;
