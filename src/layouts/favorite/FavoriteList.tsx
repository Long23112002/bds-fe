/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Avatar, Button, Typography, Space, Row, Col, Select, Badge, Tooltip } from 'antd';
import { PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchFavoriteApi, newFavoriteApi } from '../../api/favorite';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { favoriteStore } from '../../stores/FavoriteStore';

const { Title, Text } = Typography;
const { Option } = Select;

export default function FavoriteList() {

    const [listFavorite, setListFavorite] = useState<any[]>([]);

    useEffect(() => {
        const fetchFavorite = async () => {

            const res = await fetchFavoriteApi();
            setListFavorite(res);
        };
        fetchFavorite();
    }, []);


    const handleClickAddFavorite = async (e: any, postId: number) => {
        e.stopPropagation();
        e.preventDefault();
        const req = {
            postId: postId
        }
        await newFavoriteApi(req);
        await favoriteStore.fetchListFavorite();
    };


    const handleClickRemoveFavorite = async (e: any, postId: number) => {
        e.stopPropagation();
        e.preventDefault();
        await favoriteStore.deleteFavorite(postId);
        await favoriteStore.fetchListFavorite();
        setListFavorite(listFavorite.filter((fav: any) => fav.post.id !== postId));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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


    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={3} style={{ margin: '10px 0' }}>Tin đăng đã lưu</Title>
                    <Text type="secondary">Tổng số {listFavorite.length} tin đăng</Text>
                </Col>
                <Col>
                    <Select defaultValue="newest" style={{ width: 200 }}>
                        <Option value="newest">Lưu mới nhất</Option>
                    </Select>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={18}>
                    {listFavorite.map((fv: any) => (
                        <Link to={`/post-detail/${fv?.post?.id}`} style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}>
                            <Badge.Ribbon placement="start" text={
                                fv?.post?.codePlant === 'daimond' ? 'VIP KIM CƯƠNG' : fv?.post?.codePlant === 'gold' ? 'VIP VÀNG' : fv?.post?.codePlant === 'silver' ? 'VIP BẠC' : ''
                            } color={
                                fv?.post?.codePlant === 'daimond' ? 'red' : fv?.post?.codePlant === 'gold' ? 'yellow' : fv?.post?.codePlant === 'silver' ? 'gray' : ''
                            }>
                                <Card style={{
                                    marginBottom: 16
                                }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={8}>
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    alt="property main"
                                                    src={`${fv?.post?.images?.[0]?.url || '/placeholder.svg'}?height=400&width=800`}
                                                    style={{ width: '100%', height: 200, objectFit: 'cover' }}
                                                />
                                            </div>
                                            <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                                                {fv?.post?.images?.slice(1, 4).map((image: any, index: number) => (
                                                    <Col span={8} key={index}>
                                                        <img
                                                            alt={`property thumbnail ${index}`}
                                                            src={`${image.url}?height=100&width=200`}
                                                            style={{ width: '100%', height: 60, objectFit: 'cover' }}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                        <Col span={16}>
                                            <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
                                                {fv?.post?.title}
                                            </Title>

                                            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                                <Space size="large">
                                                    <Text strong style={{ color: '#f5222d', fontSize: 18 }}>
                                                        {fv?.post?.price ? (
                                                            fv?.post?.unit === "VND" ? (
                                                                formatPrice(fv?.post?.price)
                                                            ) : fv?.post?.unit === "PRICE_M2" && fv?.post?.arena ? (
                                                                formatPrice(fv?.post?.price * fv?.post?.arena)
                                                            ) : (
                                                                "N/A"
                                                            )
                                                        ) : (
                                                            "Thỏa thuận"
                                                        )}
                                                    </Text>
                                                    <Space>
                                                        <Text>{fv?.post?.arena} m²</Text>
                                                        {fv?.post?.price === 0 ? (
                                                            <Text type="secondary"></Text>
                                                        ) : (
                                                            <Text type="secondary">• {fv?.post?.price === 0 && (
                                                                fv?.post?.price && fv?.post?.arena ? (
                                                                    fv?.post?.unit === "VND" ? (
                                                                        `~ ${formatPrice(fv?.post?.price / fv?.post?.arena)}/m²`
                                                                    ) : (
                                                                        `~ ${formatPrice(fv?.post?.price)}/m²`
                                                                    )
                                                                ) : (
                                                                    ""
                                                                )
                                                            )} tr/m²</Text>
                                                        )}

                                                    </Space>
                                                    <Space>
                                                        <Space>
                                                            <i className="fa-solid fa-bed"></i>
                                                            <Text>{fv?.post?.numberOfBedrooms}</Text>
                                                        </Space>
                                                        <Space>
                                                            <i className="fa-solid fa-bath"></i>
                                                            <Text>{fv?.post?.numberOfBathrooms}</Text>
                                                        </Space>
                                                    </Space>
                                                </Space>

                                                <Space>
                                                    <EnvironmentOutlined />
                                                    <Text type="secondary">{fv?.post?.district?.fullName}, {fv?.post?.province?.fullName}</Text>
                                                </Space>

                                                <Text
                                                    type="secondary"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        WebkitLineClamp: 3, // Limit to 3 lines
                                                    }}
                                                >
                                                    {fv?.post?.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200)}...
                                                </Text>
                                            </Space>
                                        </Col>
                                    </Row>
                                    <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 16, paddingTop: 16 }}>
                                        <Row justify="space-between" align="middle">
                                            <Col>
                                                <Space>
                                                    <Avatar src="/placeholder.svg?height=40&width=40" />
                                                    <div>
                                                        <Text strong>{fv?.post?.user?.fullName || 'Người dùng ẩn danh'}</Text>
                                                        <br />
                                                        Đăng {differenceInCalendarDays(new Date(), fv?.post?.createdAt) === 0 ? 'Hôm nay' : `${differenceInCalendarDays(new Date(), fv?.post?.createdAt)} ngày trước`}
                                                    </div>
                                                </Space>
                                            </Col>
                                            <Col>
                                                <Space>
                                                    <Button type="primary" icon={<PhoneOutlined />}>
                                                        {fv?.post?.user?.phoneNumber || 'Ẩn số'}
                                                    </Button>
                                                    <Tooltip
                                                        title={
                                                            favoriteStore.listFavorite.some((fav: any) => fav.post.id === fv?.post?.id)
                                                                ? "Bấm để bỏ lưu tin"
                                                                : "Bấm để lưu tin"
                                                        }
                                                        placement="bottom"
                                                    >
                                                        <Button
                                                            onClick={(e) => {
                                                                const isFavorite = favoriteStore.listFavorite.some((fav: any) => fav.post.id === fv?.post?.id);
                                                                if (isFavorite) {
                                                                    handleClickRemoveFavorite(e, fv?.post?.id);
                                                                } else {
                                                                    handleClickAddFavorite(e, fv?.post?.id);
                                                                }
                                                            }}
                                                            className="btn"
                                                            style={{
                                                                background: 'none',
                                                                padding: '0px',
                                                                width: '34px',
                                                                height: '34px',
                                                                border: '1px solid #ccc',
                                                            }}
                                                        >
                                                            {favoriteStore.listFavorite.some((fav: any) => fav.post.id === fv?.post?.id) ? (
                                                                <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                                                            ) : (
                                                                <i className="far fa-heart" style={{ cursor: 'pointer' }}></i>
                                                            )}
                                                        </Button>
                                                    </Tooltip>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        </Link>

                    ))}
                </Col>

                <Col span={6}>
                    <Card>
                        <Title level={5}>Hỗ trợ tiện ích</Title>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <a href="#">Tư vấn phong thủy</a>
                            <a href="#">Dự tính chi phí làm nhà</a>
                            <a href="#">Tính lãi suất</a>
                            <a href="#">Quy trình xây nhà</a>
                            <a href="#">Xem tuổi làm nhà</a>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

