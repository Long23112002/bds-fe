/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Skeleton } from 'antd';
import propertyStore from '../../../stores/PropertyStore';
import { observer } from 'mobx-react-lite';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';

const PropertyListing: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(8);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
        setIsExpanded(true);
    }

    useEffect(() => {
        propertyStore.fetchProperties();
    }, []);

    function extractDistrictAndCity(address: string): string {
        const parts = address.split(',');
        const districtAndCity = parts.slice(-2).join(',').trim();
        return districtAndCity;
    }

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
        <div style={{
            backgroundColor: '#FAFAFA'
        }}>
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Bất động sản dành cho bạn</h2>
                    <div>
                        <span className="me-3">Tin nhà đất bán mới nhất</span>
                        <span>Tin nhà đất cho thuê mới nhất</span>
                    </div>
                </div>

                <div className="row g-4">

                    {loading ? (
                        Array.from({ length: visibleCount }).map((_, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-3">
                                <Skeleton active paragraph={{ rows: 4 }} />
                            </div>
                        ))
                    ) : (
                        Array.isArray(propertyStore.properties.data) && propertyStore.properties.data.slice(0, visibleCount).map((property: any) => (
                            <Link to={`post-detail/${property.id}`} key={property.id} className="col-12 col-md-6 col-lg-3" style={{
                                textDecoration: 'none',
                                color: '#2C2C2C'
                            }}>
                                <Card
                                    style={{
                                        borderRadius: '4px',
                                        boxShadow: '0px 4px 6px 0px rgba(44,44,44,0.04)',
                                        cursor: 'pointer',
                                        border: '1px solid #F2F2F2'
                                    }}
                                    cover={
                                        <div style={{
                                            position: 'relative',
                                            boxShadow: '0px 4px 6px 0px rgba(44,44,44,0.04)'
                                        }}>
                                            <Badge.Ribbon text={'VIP'} color={'red'} placement="start"></Badge.Ribbon>
                                            <img
                                                alt={property.title}
                                                src={property.images[0].url}
                                                style={{
                                                    width: '100%',
                                                    height: '170px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px 4px 0px 0px'
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 10,
                                                    right: 10,
                                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    color: 'white',
                                                }}
                                            >
                                                <i className="fas fa-camera" /> {property?.images?.length}
                                            </div>
                                        </div>
                                    }
                                >
                                    <h6
                                        className="mb-2"
                                        style={{
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold',
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            lineHeight: '1.4',
                                        }}
                                    >
                                        {property.title}
                                    </h6>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                                            {property?.price === 0 ? 'Thỏa thuận' : formatPrice(property.price * property.arena)}
                                        </span>
                                        <span>{property.arena} m²</span>
                                    </div>
                                    <div className="d-flex align-items-center" style={{ color: '#666' }}>
                                        <i className="fas fa-map-marker-alt me-1" />
                                        <small>{extractDistrictAndCity(property.street)}</small>
                                    </div>
                                    <div className="mt-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <small style={{ color: '#666' }}>
                                            Đăng {differenceInCalendarDays(new Date(), property.createdAt) === 0 ? 'Hôm nay' : `${differenceInCalendarDays(new Date(), property.createdAt)} ngày trước`}
                                        </small>
                                        <small style={{ color: '#666' }}>
                                            <button className="btn" style={{
                                                background: 'none',
                                                padding: '0px',
                                                width: '34px',
                                                height: '34px',
                                                border: '1px solid #ccc',
                                            }}>
                                                <i className="far fa-heart" style={{ cursor: 'pointer' }}></i>
                                            </button>
                                        </small>
                                    </div>

                                </Card>
                            </Link>
                        ))

                    )}

                    <div className="d-flex justify-content-center">
                        {isExpanded ? (
                            <Link to={'/filter-page'}>

                                <Button
                                    style={{
                                        fontWeight: 'bold',
                                        width: '160px',
                                        height: '46px',
                                        color: '#2C2C2C',
                                        background: '#fff',
                                        border: 'solid 1px #ccc',
                                        fontFamily: '"Lexend Medium", Roboto, Arial',
                                        fontSize: '14px',
                                        lineHeight: '20px',

                                        letterSpacing: '-0.2px',
                                        padding: '13px 15px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    Xem tiếp
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                onClick={handleLoadMore}
                                style={{
                                    fontWeight: 'bold',
                                    width: '160px',
                                    height: '46px',
                                    color: '#2C2C2C',
                                    background: '#fff',
                                    border: 'solid 1px #ccc',
                                    fontFamily: '"Lexend Medium", Roboto, Arial',
                                    fontSize: '14px',
                                    lineHeight: '20px',

                                    letterSpacing: '-0.2px',
                                    padding: '13px 15px',
                                    borderRadius: '8px',
                                }}
                            >
                                Mở rộng
                                <i className="fas fa-chevron-down"></i>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default observer(PropertyListing);
