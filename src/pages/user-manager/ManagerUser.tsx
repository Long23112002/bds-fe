import useCheckLogin from "../../hooks/useCheckLogin";
import SidebarUser from "./components/SideBarUser";


const ManagerUser = () => {
    useCheckLogin();
    return (
        <div className="d-flex min-vh-100 bg-light">
            <SidebarUser />
            <main className="flex-grow-1">

            </main>
        </div>
    )

}

export default ManagerUser;