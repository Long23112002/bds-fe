/* eslint-disable react-refresh/only-export-components */
import { observer } from 'mobx-react-lite';
import '../layouts/styles/navbar-style.css';
import { authStore } from '../stores/AuthStore';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UserDropdown from './UserDropdown';

const Navbar = () => {

    const { authData } = useAuth();

    const handelOpenModalLogin = () => {
        authStore.setIsOpenLoginModal(true)
    }

    const handelOpenModalRegister = () => {
        authStore.setIsOpenRegisterModal(true)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white" >
                <div className="container-fluid m-3">
                    <Link className="navbar-brand" to="/">
                        <img
                            style={{
                                width: '120px',
                                height: 'auto',
                                objectFit: 'cover'
                            }}
                            src="https://staticfile.batdongsan.com.vn/images/logo/standard/red/logo.svg"
                            alt="logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-li-custom">
                                <a className="nav-link text-dark" aria-current="page" href="#">Nhà đất bán</a>
                            </li>
                            <li className="nav-item text-li-custom">
                                <a className="nav-link text-dark" href="#">Nhà đất cho thuê</a>
                            </li>
                            <li className="nav-item text-li-custom">
                                <a className="nav-link text-dark" href="#">Dự án</a>
                            </li>
                            <li className="nav-item text-li-custom">
                                <a className="nav-link text-dark" href="#">Wiki BĐS</a>
                            </li>
                            <li className="nav-item text-li-custom">
                                <a className="nav-link text-dark" href="#">Phân tích đánh giá</a>
                            </li>
                            <li className="nav-item text-li-custom">
                                <a className="nav-link text-dark" href="#">Danh bạ</a>
                            </li>
                        </ul>
                        <div className="d-flex" style={{ gap: '20px' }}>
                            {authData ? (
                                <UserDropdown name={authData.fullName || ''} avatar={authData.avatar || ''}  />
                            ) : (
                                <div className="d-flex" style={{ gap: '20px' }}>
                                    <button className="btn btn-outline-primary btn-text-custom" onClick={handelOpenModalLogin}>Đăng nhập</button>
                                    <button className="btn btn-primary btn-custom" onClick={handelOpenModalRegister}>Đăng ký</button>
                                </div>
                            )}
                            <Link to='/post-new'>
                              <button className="btn btn-outline-white btn-text-custom">Đăng tin</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default observer(Navbar);
