/* eslint-disable react-refresh/only-export-components */

import { Avatar, Dropdown, Badge, Tooltip } from 'antd'
import { BellOutlined, HeartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import '../layouts/styles/user-dropdown.css'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { favoriteStore } from '../stores/FavoriteStore'
import { observer } from 'mobx-react-lite'
import Cokie from 'js-cookie'
import { authStore } from '../stores/AuthStore'
import { notificationStore } from '../stores/NotificationStore'

const UserDropdown = ({ name, avatar }: { name: string, avatar: string }) => {

    const { clearAuth } = useAuth();


    const handleLogout = () => {
        clearAuth();
        window.location.href = '/';
    };

    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: 'overview',
            label: (
                <div className="d-flex align-items-center">
                    <span>Tổng quan</span>
                    <Badge count="Mới" className="ms-2" />
                </div>
            ),
            onClick: () => {
                navigate('/user-dasboard')
            }
        },
        {
            key: 'post-management',
            label: 'Quản lý tin đăng',
        },
        {
            key: 'member',
            label: (
                <div className="d-flex align-items-center justify-content-between">
                    <span>Gói hội viên</span>
                    <span className="text-success">Tiết kiệm đến -30%</span>
                </div>
            ),
        },
        {
            key: 'customer',
            label: 'Quản lý khách hàng',
        },
        {
            key: 'ads',
            label: 'Quản lý tin tài trợ',
        },
        {
            key: 'profile',
            label: 'Thay đổi thông tin cá nhân',
        },
        {
            key: 'password',
            label: 'Thay đổi mật khẩu',
        },
        {
            key: 'professional',
            label: (
                <div className="d-flex align-items-center">
                    <span>Môi giới chuyên nghiệp</span>
                    <Badge count="Mới" className="ms-2" />
                </div>
            ),
        },
        {
            key: 'topup',
            label: 'Nạp tiền',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            onClick: handleLogout
        },
    ]

    const handleClickFavorite = () => {
        const token = Cokie.get('accessToken');
        if (!token) {
            authStore.setIsOpenLoginModal(true);
        }
        favoriteStore.setIsOpenModalFavorite(!favoriteStore.isOpenModalFavorite);
    };

    const handleClickNotification = () => {
        const token = Cokie.get('accessToken');
        if (!token) {
            authStore.setIsOpenLoginModal(true);
        }
        notificationStore.setIsOpenNotification(!notificationStore.isOpenNotification);
    }


    return (
        <div className="d-flex align-items-center gap-3">
            <Tooltip title="Danh sách các tin đã lưu" placement='bottom'>
                <Badge style={{
                    cursor: 'pointer'
                }} onClick={handleClickFavorite} count={favoriteStore.listFavorite.length}>
                    <HeartOutlined style={{
                        cursor: 'pointer'
                    }} className="fs-5" />
                </Badge>
            </Tooltip>

            <Badge style={{
                cursor: 'pointer'
            }} onClick={handleClickNotification} count={notificationStore.countReadFlase}>
                <BellOutlined style={{
                    cursor: 'pointer'
                }} className="fs-5" />
            </Badge>


            <Dropdown
                menu={{ items }}
                trigger={['hover']}
                placement="bottomRight"
                overlayClassName="w-250"
            >
                <div className="d-flex align-items-center gap-2 cursor-pointer">
                    <Avatar size={40} className="bg-pink-100">
                        {avatar}
                    </Avatar>
                    <span className="fw-medium">{name}</span>
                </div>

            </Dropdown>
        </div>
    )
}

export default observer(UserDropdown);
