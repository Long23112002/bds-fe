/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, Typography, Tag, Space, Skeleton } from 'antd';
import { LeftOutlined, RightOutlined, PictureOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/featured.css';
import React from 'react';

const { Title, Text } = Typography;

interface Project {
    id: number;
    name: string;
    image: string;
    status: string;
    area: string;
    location: string;
    imageCount: number;
    startDate?: string;
}

const projects: Project[] = [
    {
        id: 1,
        name: "Vinhomes Ocean Park Gia Lâm",
        image: "https://file4.batdongsan.com.vn/crop/260x146/2024/11/04/20241104105811-ce11_wm.jpg?height=200&width=600",
        status: "Đang mở bán",
        area: "420 ha",
        location: "Gia Lâm, Hà Nội",
        imageCount: 16
    },
    {
        id: 2,
        name: "The Opus One - Vinhomes Grand Park",
        image: "https://file4.batdongsan.com.vn/crop/260x146/2024/11/04/20241104105811-ce11_wm.jpg?height=200&width=600",
        status: "Đang mở bán",
        area: "2,3 ha",
        location: "Quận 9, Hồ Chí Minh",
        imageCount: 7,
        startDate: "25/2/2024: Khởi công"
    },
    {
        id: 3,
        name: "Vinhomes Ocean Park Gia Lâm",
        image: "https://file4.batdongsan.com.vn/crop/260x146/2024/11/04/20241104105811-ce11_wm.jpg?height=200&width=600",
        status: "Sắp mở bán",
        area: "420 ha",
        location: "Gia Lâm, Hà Nội",
        imageCount: 16
    },
    {
        id: 4,
        name: "Vinhomes Ocean Park Gia Lâm",
        image: "https://file4.batdongsan.com.vn/crop/260x146/2024/11/04/20241104105811-ce11_wm.jpg?height=200&width=600",
        status: "Đang mở bán",
        area: "420 ha",
        location: "Gia Lâm, Hà Nội",
        imageCount: 16
    },
];

const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                zIndex: 1,
                right: "-20px"
            }}
            onClick={onClick}
        >
            <RightOutlined style={{ color: "black" }} />
        </div>
    );
};

const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                zIndex: 1,
                left: "-20px"
            }}
            onClick={onClick}
        >
            <LeftOutlined style={{ color: "black" }} />
        </div>
    );
};

export default function FeaturedProjects() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    // Simulate loading state
    const [loading, setLoading] = React.useState(true);

    // Simulate data loading delay
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate 2 seconds delay
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={4} style={{ margin: 0 }}>Dự án bất động sản nổi bật</Title>
                <a href="#" style={{ color: '#ff4d4f', textDecoration: 'none' }}>
                    Xem thêm →
                </a>
            </div>

            <div style={{ position: 'relative', padding: '0 20px' }}>
                <Slider {...settings}>
                    {loading ? (
                        Array(4).fill(null).map((_, index) => (
                            <div key={index} style={{ padding: '0 15px' }}>
                                <Skeleton active paragraph={{ rows: 4 }} />
                            </div>
                        ))
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} style={{ padding: '0 15px' }}>
                                <Card
                                    hoverable
                                    cover={
                                        <div style={{ position: 'relative', width: "100%" }}>
                                            <img
                                                alt={project.name}
                                                src={project.image}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                background: 'rgba(0,0,0,0.6)',
                                                color: 'white',
                                                padding: '2px 8px',
                                                borderRadius: '2px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <PictureOutlined style={{ marginRight: '4px' }} />
                                                <span>{project.imageCount}</span>
                                            </div>
                                        </div>
                                    }
                                    bodyStyle={{ padding: '12px', height: '', overflow: 'hidden' }}
                                >
                                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                        <Space>
                                            <Tag color={project.status === "Sắp mở bán" ? "error" : "success"}>
                                                {project.status}
                                            </Tag>
                                        </Space>
                                        <Title level={5} style={{ margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.name}</Title>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            {project.area}<br />
                                            {project.location}
                                        </Text>
                                    </Space>
                                </Card>
                            </div>
                        ))
                    )}
                </Slider>
            </div>
        </div>
    );
}
