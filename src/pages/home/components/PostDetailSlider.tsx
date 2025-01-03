/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Carousel } from "antd";
import { useRef } from "react";
import PostDetailCard from "./PostDetailCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import '../styles/post-detail-slider.css'


const PostDetailSlider = () => {
  const carouselRef = useRef<any>(null);

  const properties = [
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      imageCount: 7,
      title: 'Cần tiến bán gấp căn nhà 340m2 Phường Phú...',
      price: '1,6 tỷ',
      area: '340 m²',
      location: 'Bến Tre, Bến Tre',
      postedTime: 'Đăng 4 ngày trước',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      imageCount: 12,
      title: 'Nhà nhà đất - gần lộ lớn - giá tốt - chính chủ...',
      price: '1,3 tỷ',
      area: '108,1 m²',
      location: 'Bến Tre, Bến Tre',
      postedTime: 'Đăng 1 tuần trước',
    },

    {
      imageUrl: 'https://via.placeholder.com/300x200',
      imageCount: 7,
      title: 'Cần tiến bán gấp căn nhà 340m2 Phường Phú...',
      price: '1,6 tỷ',
      area: '340 m²',
      location: 'Bến Tre, Bến Tre',
      postedTime: 'Đăng 4 ngày trước',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      imageCount: 12,
      title: 'Nhà nhà đất - gần lộ lớn - giá tốt - chính chủ...',
      price: '1,3 tỷ',
      area: '108,1 m²',
      location: 'Bến Tre, Bến Tre',
      postedTime: 'Đăng 1 tuần trước',
    },

    {
      imageUrl: 'https://via.placeholder.com/300x200',
      imageCount: 7,
      title: 'Cần tiến bán gấp căn nhà 340m2 Phường Phú...',
      price: '1,6 tỷ',
      area: '340 m²',
      location: 'Bến Tre, Bến Tre',
      postedTime: 'Đăng 4 ngày trước',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      imageCount: 12,
      title: 'Nhà nhà đất - gần lộ lớn - giá tốt - chính chủ...',
      price: '1,3 tỷ',
      area: '108,1 m²',
      location: 'Bến Tre, Bến Tre',
      postedTime: 'Đăng 1 tuần trước',
    },
  ];

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (

    <div className="property-slider mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h5 mb-0">Bất động sản dành cho bạn</h2>
        <div className="d-flex gap-2">
          <Button shape="circle" icon={<LeftOutlined />} onClick={handlePrev} />
          <Button shape="circle" icon={<RightOutlined />} onClick={handleNext} />
        </div>
      </div>

      <Carousel
        ref={carouselRef}
        slidesToShow={3}
        slidesToScroll={1}
        autoplay
        dots={false}
        responsive={[
          {
            breakpoint: 1200,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 992,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 2 },
          },
        ]}
      >
        {properties.map((property, index) => (
          <div key={index} className="carousel-item">
            <PostDetailCard data={property} />
          </div>
        ))}
      </Carousel>

    </div>
  );
};

export default PostDetailSlider;