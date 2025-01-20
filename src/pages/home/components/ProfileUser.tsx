/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Card, Tabs, Avatar, Button, Badge, Row, Col, Image, Tooltip } from 'antd';
import { PhoneOutlined, LinkOutlined, FacebookOutlined } from '@ant-design/icons';
import { CollapsibleList } from './CollapsibleList';
import { useParams } from 'react-router-dom';
import { getUserProfileByIdApi } from '../../../api/authentication';
import { ProfileInfoResponse } from '../../../types/ProfileInfo';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;


export default function ProfileUser() {
    const [userProfile, setUserProfile] = useState<ProfileInfoResponse>();
    const { id } = useParams<any>();
    const [selectType, setSelectType] = useState('SELL');
    const [countPostRent, setCountPostRent] = useState(0);
    const [countPostSell, setCountPostSell] = useState(0);
    const [copied, setCopied] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchUserInfor = async () => {
            if (id) {
                const res = await getUserProfileByIdApi(Number(id) || 0, { page: 0, size: 10000 }, selectType);
                setUserProfile(res);
            }
        };
        fetchUserInfor();
    }, [id, selectType]);

    useEffect(() => {
        const fetchCountPost = async () => {
            if (id) {
                const res = await getUserProfileByIdApi(Number(id) || 0, { page: 0, size: 10000 }, 'RENT');
                setCountPostRent(res.posts.data.length);
            }
        };
        fetchCountPost();
    }, [id])

    useEffect(() => {
        const fetchCountPostSell = async () => {
            if (id) {
                const res = await getUserProfileByIdApi(Number(id) || 0, { page: 0, size: 10000 }, 'SELL');
                setCountPostSell(res.posts.data.length);
            }
        };
        fetchCountPostSell();
    }, [id])

    const formatPrice = (price: number | string) => {
        const priceValue = typeof price === 'number' ? price : parseFloat(price as string);

        if (isNaN(priceValue)) {
            return "Giá không hợp lệ";
        }

        if (priceValue >= 1e9) {
            return `${(priceValue / 1e9).toFixed(1)} tỷ`;
        } else if (priceValue >= 1e6) {
            return `${(priceValue / 1e6).toFixed(0)} triệu`;
        } else if (priceValue >= 1e3) {
            return `${(priceValue / 1e3).toFixed(0)} nghìn`;
        }

        return priceValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const calculateDuration = (joinDate: string): string => {
        const now = new Date();
        const joined = new Date(joinDate);
        if (isNaN(joined.getTime())) {
            return "Ngày tham gia không hợp lệ";
        }

        const diffInMilliseconds = now.getTime() - joined.getTime();


        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
        if (diffInYears > 0) {
            return `${diffInYears} năm tham gia Batdongsan.com.vn`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths} tháng tham gia Batdongsan.com.vn`;
        } else if (diffInWeeks > 0) {
            return `${diffInWeeks} tuần tham gia Batdongsan.com.vn`;
        } else {
            return `${diffInDays} ngày tham gia Batdongsan.com.vn`;
        }
    };

    const handleCopyToClipboard = (phoneNumber: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
        navigator.clipboard
            .writeText(phoneNumber)
            .then(() => {
                setCopied(true);
            })
            .catch(() => {
                setCopied(false);
            });
    };

    const handleCopyUrl = (setCopiedUrl: React.Dispatch<React.SetStateAction<boolean>>) => {
        const url = window.location.href;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                setCopiedUrl(true);
            })
            .catch(() => {
                setCopiedUrl(false);
            });
    };

    const openZalo = (phoneNumber: any) => {
        const url = `https://chat.zalo.me/?phone=${phoneNumber}`;
        window.open(url, '_blank');
    };




    const handleTabChange = (key: any) => {
        if (key === '1') {
            setSelectType('SELL');
        } else if (key === '2') {
            setSelectType('RENT');
        }
    };




    return (
        <>
            <div className='container-fluid'>
                <img
                    style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                    src="https://guru.batdongsan.com.vn/assets/cover-pa.png"
                    alt="profile-banner"
                />
            </div>
            <div className="container py-4">
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8} lg={6}>
                        <Card className="mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <Avatar size={100} src="/placeholder.svg" className="mb-2" />
                                <h4 className="mb-1">{userProfile?.user.fullName}</h4>
                                <div className="text-primary d-flex align-items-center justify-content-center gap-1 mb-2">
                                    <span>Môi giới chuyên nghiệp</span>
                                </div>

                                <div className="text-center mb-3">
                                    <div className="text-muted small">{countPostSell + countPostRent} tin đăng</div>
                                    <div className="text-muted small">{calculateDuration(userProfile?.user?.createdAt || '')}</div>
                                </div>

                                <div className="d-flex gap-2 mb-3">
                                    <Tooltip title={copied ? 'Sao chép thành công!' : 'Click để sao chép'}>
                                        <Button
                                            type="primary"
                                            icon={<PhoneOutlined />}
                                            style={{ backgroundColor: '#4CAF50' }}
                                            onClick={() => handleCopyToClipboard(userProfile?.user?.phoneNumber || '', setCopied)}
                                            onMouseLeave={() => setCopied(false)}
                                        >
                                            {userProfile?.user?.phoneNumber || ''}
                                        </Button>
                                    </Tooltip>
                                    <Button onClick={() => openZalo(userProfile?.user?.phoneNumber || '')} >Chat Zalo</Button>
                                </div>

                                <div className="text-muted small text-center">
                                    Đây là môi giới chuyên nghiệp đã được xác thực thông tin cá nhân. Có thể tư vấn và hỗ trợ giao dịch nhanh chóng.
                                </div>
                            </div>
                        </Card>

                        <Card className="mb-3">
                            <span className="me-2">Chia sẻ trang cá nhân:</span>
                            <Button icon={<FacebookOutlined />} className="me-2" />
                            <Tooltip title={copiedUrl ? 'Sao chép thành công!' : 'Click để sao chép'}>
                                <Button onClick={() => handleCopyUrl(setCopiedUrl)} icon={<LinkOutlined />} />

                            </Tooltip>
                        </Card>

                        <CollapsibleList
                            title="Khu vực hoạt động"
                            items={userProfile?.areaOfOperations?.map(arena => (
                                { text: `${arena.province}, ${arena.district}`, count: arena.countArena }
                            )) || []}
                        />
                        <CollapsibleList
                            title="Loại hình mô giới"
                            items={userProfile?.residentialOfOperations?.map(redis => (
                                { text: redis.residential, count: redis.countResidential }
                            )) || []}
                        />
                    </Col>

                    <Col xs={24} md={16} lg={18}>
                        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                            <TabPane tab={`Tin đăng bán (${countPostSell})`} key="1">
                                <Row gutter={[16, 16]}>
                                    {userProfile?.posts?.data.map(post => (
                                        <Col xs={24} sm={12} lg={8} key={post.id}>
                                            <Link to={`/post-detail/${post.id}`} style={{
                                                textDecoration: 'none',
                                                color: '#2C2C2C'
                                            }}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <div className="position-relative">
                                                            <Image
                                                                src={post?.images[0]?.url}
                                                                alt={post?.title}
                                                                style={{ height: '200px', objectFit: 'cover' }}
                                                                className="w-100"
                                                                preview={false}
                                                            />
                                                            <Badge
                                                                count={
                                                                    <span style={{
                                                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                                                        padding: '2px 8px',
                                                                        borderRadius: '4px',
                                                                        color: 'white',
                                                                    }}>
                                                                        <i className="fas fa-camera me-1" /> {post?.images.length}
                                                                    </span>
                                                                }
                                                                className="position-absolute bottom-0 end-0 m-2"
                                                            />
                                                        </div>
                                                    }
                                                >
                                                    <h6 className="mb-2" style={{ fontSize: '14px' }}>{post.title}</h6>
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <span className="text-danger fw-bold">{post.price * post.arena === 0 ? 'Thỏa thuận' : formatPrice(post.price * post.arena)}</span>
                                                        <span className="text-danger fw-bold">{`${post?.arena} m²`}</span>
                                                    </div>
                                                    <div className="text-muted small">

                                                        <div> <i className="fa-solid fa-location-dot"></i>  {`${post?.district?.name}, ${post?.province?.name}`}</div>
                                                        <div className='mt-2'> Đăng {differenceInCalendarDays(new Date(), post.createdAt) === 0 ? 'Hôm nay' : `${differenceInCalendarDays(new Date(), post.createdAt)} ngày trước`}</div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </TabPane>
                            <TabPane tab={`Tin đăng cho thuê (${countPostRent})`} key="2">
                                <Row gutter={[16, 16]}>
                                    {userProfile?.posts?.data.map(post => (
                                        <Col xs={24} sm={12} lg={8} key={post.id}>
                                            <Link to={`/post-detail/${post.id}`} style={{
                                                textDecoration: 'none',
                                                color: '#2C2C2C'
                                            }}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <div className="position-relative">
                                                            <Image
                                                                src={post?.images[0]?.url}
                                                                alt={post?.title}
                                                                style={{ height: '200px', objectFit: 'cover' }}
                                                                className="w-100"
                                                                preview={false}
                                                            />
                                                            <Badge
                                                                count={
                                                                    <span style={{
                                                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                                                        padding: '2px 8px',
                                                                        borderRadius: '4px',
                                                                        color: 'white',
                                                                    }}>
                                                                        <i className="fas fa-camera me-1" /> {post?.images.length}
                                                                    </span>
                                                                }
                                                                className="position-absolute bottom-0 end-0 m-2"
                                                            />
                                                        </div>
                                                    }
                                                >
                                                    <h6 className="mb-2" style={{ fontSize: '14px' }}>{post.title}</h6>
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <span className="text-danger fw-bold">{post.price * post.arena === 0 ? 'Thỏa thuận' : formatPrice(post.price * post.arena)}</span>
                                                        <span className="text-danger fw-bold">{`${post?.arena} m²`}</span>
                                                    </div>
                                                    <div className="text-muted small">

                                                        <div> <i className="fa-solid fa-location-dot"></i>  {`${post?.district?.name}, ${post?.province?.name}`}</div>
                                                        <div className='mt-2'> Đăng {differenceInCalendarDays(new Date(), post.createdAt) === 0 ? 'Hôm nay' : `${differenceInCalendarDays(new Date(), post.createdAt)} ngày trước`}</div>
                                                    </div>
                                                </Card>
                                            </Link>

                                        </Col>
                                    ))}
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </>
    );
}

