/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, Button, Avatar, Tooltip, Carousel } from 'antd';
import {
  PhoneOutlined,
  MessageOutlined,
  RightOutlined,
  LeftOutlined,
  ShareAltOutlined,
  WarningOutlined,
  HeartOutlined,
  HomeOutlined,
  CompassOutlined,
  ColumnHeightOutlined,
  BankOutlined
} from '@ant-design/icons';
import '../styles/post-detail.css'
import { useEffect, useRef, useState } from 'react';
import PostDetailSlider from './PostDetailSlider';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { authStore } from '../../../stores/AuthStore';
import { getPostByIdApi } from '../../../api/posts';

const PostDetail = () => {

  const { id } = useParams<any>();

  const { authData } = useAuth();

  const [postDetail, setPostDetail] = useState<PostResponse>();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    const fetchPostDetail = async () => {
      if (id) {
        const res = await getPostByIdApi(Number(id));
        setPostDetail(res);
      }
    };
    fetchPostDetail();
  }, [id]);



  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const openUrl = (url: any) => {
    window.open(url, '_blank');
  };

  const openZalo = (phoneNumber: any) => {
    const url = `https://chat.zalo.me/?phone=${phoneNumber}`;
    window.open(url, '_blank');
  };

  const handleClickPhone = () => {
    if (authData) {
      authStore.isOpenLoginModal = true;
    }
  }

  const maskPhoneNumber = (phone: string) => {
    if (phone && phone.length >= 7) {
      return phone.slice(0, 7) + ' ***';
    }
    return phone || "";
  };



  const handleThumbnailClick = (index: any) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  }

  const mapCodePlant = (name: string): string => {
    if (name === "daimond") {
      return "Tin kim cương";
    } else if (name === "gold") {
      return "Tin vàng";
    } else if (name === "silver") {
      return "Tin bạc";
    } else {
      return "Tin thường";
    }
  };

  const formatDate = (dateString: string): string => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    const date = new Date(`${year}-${month}-${day}`);

    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };



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
    <div className="container py-4">
      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">


          {/* Image Carousel */}
          <div className="position-relative mb-4">
            <Carousel
              arrows
              prevArrow={<LeftOutlined />}
              nextArrow={<RightOutlined />}
              className="property-carousel"
              afterChange={(current) => setCurrentIndex(current)}
              ref={carouselRef}
            >
              {postDetail?.images.map((img, index) => (
                <div key={index}>
                  <div
                    style={{
                      height: '500px',
                      backgroundImage: `url(${img.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <div className="position-absolute bottom-0 end-0 p-2 bg-dark bg-opacity-50 text-white">
              {currentIndex + 1} / {postDetail?.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="d-flex gap-2 mb-4 overflow-auto">
            {postDetail?.images.map((thumb, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                style={{
                  minWidth: '150px',
                  height: '100px',
                  backgroundImage: `url(${thumb.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: currentIndex === index ? '2px solid #007bff' : 'none',
                  cursor: 'pointer',
                }}
                className="rounded"
              />
            ))}
          </div>

          {/* Property Title and Location */}
          <h1 className="h3 mb-3">
            {postDetail?.title}
          </h1>
          <p className="text-muted mb-4">
            {postDetail?.street}
          </p>

          {/* Key Property Information */}
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
            <div>
              <div className="text-muted small">Mức giá</div>
              <div className="h4 mb-0">
                {postDetail?.price ? (
                  postDetail.unit === "VND" ? (
                    formatPrice(postDetail.price)
                  ) : postDetail.unit === "PRICE_M2" && postDetail.arena ? (
                    formatPrice(postDetail.price * postDetail.arena)
                  ) : (
                    "N/A"
                  )
                ) : (
                  "Thỏa thuận"
                )}
              </div>
              <div className="small text-muted">
                
                {postDetail?.price === 0 && (
                  postDetail?.price && postDetail?.arena ? (
                    postDetail.unit === "VND" ? (
                      `~ ${formatPrice(postDetail.price / postDetail.arena)}/m²`
                    ) : (
                      `~ ${formatPrice(postDetail.price)}/m²`
                    )
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
            <div>
              <div className="text-muted small">Diện tích</div>
              <div className="h4 mb-0"> {postDetail?.arena} m²</div>
            </div>
            <div>
              <div className="text-muted small">Phòng ngủ</div>
              <div className="h4 mb-0">{postDetail?.numberOfBedrooms} PN</div>
            </div>
            <div className="d-flex gap-3">
              <Tooltip title="Chia sẻ">
                <Button icon={<ShareAltOutlined />} />
              </Tooltip>
              <Tooltip title="Báo cáo">
                <Button icon={<WarningOutlined />} />
              </Tooltip>
              <Tooltip title="Lưu tin">
                <Button icon={<HeartOutlined />} />
              </Tooltip>
            </div>
          </div>

          {/* Property Description */}
          <Card className="mb-4">
            <h2 className="h5 mb-4">Thông tin mô tả</h2>
            <div className="text-justify mb-4">
              <p
                style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  overflow: 'visible',
                  display: 'block',
                  maxWidth: '100%',
                }}
                dangerouslySetInnerHTML={{
                  __html: postDetail?.description || "No description available",
                }}
              ></p>
            </div>
          </Card>


          {/* Property Features */}
          <Card className="mb-4">
            <h2 className="h5 mb-4">Đặc điểm bất động sản</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <HomeOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Diện tích</div>
                    <div>{postDetail?.arena} m²</div>
                  </div>
                </div>
                {postDetail?.front !== 0 && (
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <CompassOutlined className="fs-4" />

                    <div>
                      <div className="text-muted small">Đường vào</div>
                      <div>{postDetail?.front} m</div>
                    </div>


                  </div>
                )}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <BankOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Hướng ban công</div>
                    <div>Nam</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <ColumnHeightOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Số phòng ngủ</div>
                    <div>2 phòng</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <HomeOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Mức giá</div>
                    <div>
                      {postDetail?.price ? (
                        postDetail.unit === "VND" ? (
                          formatPrice(postDetail.price)
                        ) : postDetail.unit === "PRICE_M2" && postDetail.arena ? (
                          formatPrice(postDetail.price * postDetail.arena)
                        ) : (
                          "N/A"
                        )
                      ) : (
                        "Thỏa thuận"
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <CompassOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Hướng nhà</div>
                    <div>{postDetail?.houseDirection.name}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <BankOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Số tầng</div>
                    <div>2 tầng</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <ColumnHeightOutlined className="fs-4" />
                  <div>
                    <div className="text-muted small">Số toilet</div>
                    <div>2 phòng</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-4">
            <div className="row g-3">
              <div className="col-6">
                <div className="text-muted small">Ngày đăng</div>
                <div>{postDetail?.packagePriceTransaction.startDate ?
                  formatDate(postDetail.packagePriceTransaction.startDate.toString()) : "N/A"}</div>
              </div>
              <div className="col-6">
                <div className="text-muted small">Ngày hết hạn</div>
                <div>{postDetail?.packagePriceTransaction.endDate ?
                  formatDate(postDetail.packagePriceTransaction.endDate.toString()) : "N/A"}</div>
              </div>
              <div className="col-6">
                <div className="text-muted small">Loại tin</div>
                <div>{mapCodePlant(postDetail?.codePlant || '')}</div>
              </div>
              <div className="col-6">
                <div className="text-muted small">Mã tin</div>
                <div>41955803</div>
              </div>
            </div>
          </Card>

          <div className="mt-5">
            <PostDetailSlider />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <Card className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <Avatar size={64} className="me-3">{postDetail?.user.avatar}</Avatar>
              <div>
                <h2 className="h5 mb-1">{postDetail?.user.fullName}</h2>
                <p className="mb-0 text-muted">Môi giới chuyên nghiệp</p>
              </div>
            </div>

            <Button
              type="primary"
              icon={<PhoneOutlined />}
              block
              size="large"
              className="mb-2"
              onClick={handleClickPhone}
            >
              {authData ? postDetail?.phoneNumber : (postDetail?.phoneNumber ?
                maskPhoneNumber(postDetail.phoneNumber) : "") + " · Hiện số"}
            </Button>

            <Button
              icon={<MessageOutlined />}
              block
              size="large"
              className="mb-2"
              onClick={() => openZalo(postDetail?.phoneNumber)}
            >
              Chat qua Zalo
            </Button>

            <Button block size="large" className='mb-2'>
              Yêu cầu liên hệ lại
            </Button>

            <Button onClick={() => openUrl(postDetail?.linkMap)} block size="large" className='mb-2' >
              <i className="fa-solid fa-map-location-dot"></i>
              Xem google map
            </Button>

            {
              postDetail?.videoUrl && (
                <Button onClick={() => openUrl(postDetail?.videoUrl)} block size="large" className='mb-2'>
                  <i className="fa-brands fa-youtube"></i>
                  Xem video
                </Button>
              )
            }
          </Card>

          <Card title="Bất động sản nổi bật" className="mb-4">
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Chung cư Carillon 2
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Cho thuê kho xưởng Bến Tre
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Cho thuê cửa hàng Bến Tre
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

