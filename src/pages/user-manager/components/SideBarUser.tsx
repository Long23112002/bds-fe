

import { Avatar, Button, Menu } from 'antd'
import {
    UserOutlined,
    DashboardOutlined,
    TeamOutlined,
    CrownOutlined,
    BankOutlined,
    IdcardOutlined,
    ShopOutlined,
    QuestionCircleOutlined,
    FileTextOutlined,
    BarChartOutlined,
    SettingOutlined,
    DollarOutlined,
    CreditCardOutlined,
    BookOutlined,
    FileSearchOutlined
} from '@ant-design/icons'
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Cokie from 'js-cookie';

export default function SidebarUser() {

    const { authData } = useAuth();

    const wallet = Cokie.get('wallet');
    const id = localStorage.getItem('id');

    const navigator = useNavigate();

    return (
        <div className="d-flex flex-column vh-100 bg-white shadow-sm p-3" style={{ width: '300px', overflowY: 'auto' }}>
            {/* User Profile */}
            <div className="text-center mb-4 pb-3 border-bottom">
                <Avatar src={authData?.avatar} size={64} icon={<UserOutlined />} className="mb-2" />
                <h3 className="fw-medium">{authData?.fullName}</h3>
            </div>

            {/* Account Balance */}
            <div className="mb-4 p-3 bg-light rounded">
                <h4 className="text-muted mb-2">Số dư tài khoản</h4>
                <div className="d-flex justify-content-between mb-2">
                    <span>TK Chính</span>
                    <span>{new Intl.NumberFormat().format(Number(wallet) || 0)} đ</span>
                </div>
                <div className="d-flex justify-content-between align-items-center small">
                    <span>Mã chuyển khoản : </span>
                    <div className="d-flex align-items-center">
                        <span className="me-2">{`BDS${id}`}</span>
                        <Button style={{
                            width: '30px',
                            height: '30px',
                            lineHeight: '0',
                            padding: '0',
                            borderRadius: '50%'
                        }} className="btn btn-outline-secondary btn-sm p-0 d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Top Up Button */}
            <Button className="btn btn-primary w-100 mb-4 d-flex justify-content-center align-items-center">
                Nạp tiền
            </Button>

            {/* Navigation Menu */}
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <DashboardOutlined />,
                        label: 'Tổng quan',
                        onClick: () => navigator('/user-dasboard')
                    },
                    {
                        key: 'sub1',
                        icon: <TeamOutlined />,
                        label: 'Quản lý tin đăng',
                        children: [
                            {
                                key: '2',
                                icon: <FileTextOutlined />,
                                label: 'Đăng mới',
                                onClick: () => navigator('/post-new')
                            },
                            {
                                key: '3',
                                icon: <FileTextOutlined />,
                                label: 'Danh sách tin',
                                onClick: () => navigator('/user-dasboard/post-user-manager')
                            },
                            {
                                key: '4',
                                icon: <BarChartOutlined />,
                                label: 'Tin nháp',
                            }
                        ],
                    },
                    {
                        key: '4',
                        icon: <TeamOutlined />,
                        label: 'Quản lý khách hàng',
                    },
                    {
                        key: '5',
                        icon: <CrownOutlined />,
                        label: 'Gói Hội viên',
                    },
                    {
                        key: '6',
                        icon: <CrownOutlined />,
                        label: 'Tài khoản Pro',
                    },
                    {
                        key: 'sub2',
                        icon: <BankOutlined />,
                        label: 'Quản lý tài chính',
                        children: [
                            {
                                key: '7',
                                icon: <DollarOutlined />,
                                label: 'Lịch sử giao dịch',
                            },
                            {
                                key: '8',
                                icon: <CreditCardOutlined />,
                                label: 'Nạp tiền',
                            },
                        ],
                    },
                    {
                        key: 'sub3',
                        icon: <IdcardOutlined />,
                        label: 'Quản lý TK Cá nhân',
                        children: [
                            {
                                key: '9',
                                icon: <UserOutlined />,
                                label: 'Thông tin cá nhân',
                            },
                            {
                                key: '10',
                                icon: <SettingOutlined />,
                                label: 'Cài đặt',
                            },
                        ],
                    },
                    {
                        key: '11',
                        icon: <ShopOutlined />,
                        label: 'Quản lý TK Doanh nghiệp',
                    },
                    {
                        key: 'sub4',
                        icon: <QuestionCircleOutlined />,
                        label: 'Báo giá & Hướng dẫn',
                        children: [
                            {
                                key: '12',
                                icon: <BookOutlined />,
                                label: 'Báo giá dịch vụ',
                            },
                            {
                                key: '13',
                                icon: <FileSearchOutlined />,
                                label: 'Hướng dẫn sử dụng',
                            },
                        ],
                    },
                ]}
            />
        </div>
    )
}
