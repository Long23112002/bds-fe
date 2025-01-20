import { Card } from 'antd';
import { FileTextOutlined, UsergroupAddOutlined, WalletOutlined, CrownOutlined } from '@ant-design/icons';
import Cokie from 'js-cookie';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { countPostApi } from '../../../api/posts';

export default function AccountOverview() {

    const wallet = Cokie.get('wallet');
    const [countPost, setCountPost] = useState(0);

    useEffect(() => {
        const fetchCountPost = async () => {
            const res = await countPostApi();
            setCountPost(res);
        }
        fetchCountPost();
    }, []);



    return (
        <div className="container py-4">
            <h2 className="h4 mb-4">Tổng quan tài khoản</h2>

            <div className="row g-4">
                {/* Posts Card */}
                <div className="col-12 col-md-6 col-lg-3">
                    <Card className="h-100">
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <FileTextOutlined className="fs-5" />
                                <span className="fw-medium">Tin đăng</span>
                            </div>
                            <div className="mt-2">
                                <div className="fs-3 fw-bold">
                                    <CountUp
                                        start={0}
                                        end={countPost || 0}
                                        duration={1}
                                        separator=","
                                    />
                                    {' tin'}
                                </div>
                                <div className="text-secondary small">Đang hiển thị</div>
                            </div>
                            <Link to={`/post-new`} className="text-danger text-decoration-none p-0">
                                Đăng tin
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Contacts Card */}
                <div className="col-12 col-md-6 col-lg-3">
                    <Card className="h-100">
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <UsergroupAddOutlined className="fs-5" />
                                <span className="fw-medium">Liên hệ trong 30 ngày</span>
                            </div>
                            <div className="mt-2">
                                <div className="fs-3 fw-bold">0 người</div>
                                <div className="text-success small">+ 0 mới vào hôm nay</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Balance Card */}
                <div className="col-12 col-md-6 col-lg-3">
                    <Card className="h-100">
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <WalletOutlined className="fs-5" />
                                <span className="fw-medium">Số dư</span>
                            </div>
                            <div>
                                <div className="text-secondary small">Tài khoản chính</div>
                                <div className="fs-4 fw-bold">    <span>{new Intl.NumberFormat().format(Number(wallet) || 0)} đ</span> </div>
                            </div>
                            <a href="#" className="text-danger text-decoration-none p-0">
                                Nạp tiền
                            </a>
                        </div>
                    </Card>
                </div>

                {/* Membership Card */}
                <div className="col-12 col-md-6 col-lg-3">
                    <Card className="h-100" style={{ backgroundColor: 'rgba(255, 192, 203, 0.1)' }}>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-2">
                                <CrownOutlined className="fs-5" />
                                <span className="fw-medium">Gói Hội Viên</span>
                                <span className=" rounded-pill ms-auto">
                                    Tiết kiệm đến 39%
                                </span>
                            </div>
                            <p className="small mb-3">
                                Thành thời đăng tin/đẩy tin không lo biến động giá
                            </p>
                            <button className="btn btn-outline-secondary align-self-start">
                                Tìm hiểu ngay
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

