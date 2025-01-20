
import { Route, Routes } from "react-router-dom";
import useCheckLogin from "../../hooks/useCheckLogin";
import SidebarUser from "./components/SideBarUser";
import ManagerUserPost from "./components/ManagerUserPost";
import AccountOverview from "./components/AccountOverview";

const ManagerUser = () => {
    useCheckLogin();

    return (
        <div className="d-flex min-vh-100 bg-light">
            <SidebarUser />
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/post-user-manager" element={<ManagerUserPost />} />
                    <Route path="/" element={<AccountOverview />} />
                </Routes>
            </main>
        </div>
    );
};

export default ManagerUser;
