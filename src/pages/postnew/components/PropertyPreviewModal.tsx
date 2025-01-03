/* eslint-disable react-refresh/only-export-components */

import { Modal, Tabs, Button, Switch } from 'antd'
import { useState } from 'react'
import type { TabsProps } from 'antd'
import {
    Telephone,
    Share,
    ExclamationTriangle,
    Heart,
    GeoAlt,
    Images,
} from 'react-bootstrap-icons'
import "../styles/PropertyPreviewModal.css"
import { formPostNew } from '../../../stores/FormPostNew'
import { observer } from 'mobx-react-lite'
import { newPostStore } from '../../../stores/NewPostStore'
import { Bell } from 'lucide-react'

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

const userInfor = {
    fullname: localStorage.getItem("fullName"),
    avartar: localStorage.getItem("avartar"),
}


const PropertyPreviewModal = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const { valueNewPost, stressTotal } = newPostStore

    const images = valueNewPost?.images ?? []

    const maskPhoneNumber = (phone: string) => {
        if (phone && phone.length >= 7) {
            return phone.slice(0, 7) + ' ***';
        }
        return phone || "";
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Trang chi tiết',
            children: (
                <div className="space-y-6">
                    <div className="image-container">
                        <img
                            src={images[currentImage]?.url || "/path-to-placeholder-image.jpg"}
                            alt="Property view"
                            className="object-cover"
                        />
                        <div className="image-counter">
                            {images.length > 0 ? `${currentImage + 1} / ${images.length}` : "No images available"}
                        </div>
                    </div>

                    <div className="thumbnail-container">
                        {images.length > 0 ? (
                            images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                                >
                                    <img
                                        src={img.url || "/path-to-placeholder-image.jpg"}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="object-cover"
                                    />
                                </button>
                            ))
                        ) : (
                            <p>No thumbnails available</p>
                        )}
                    </div>

                    <div className="property-info">
                        <h1 className="property-title">
                            {valueNewPost?.title || "No title available"}
                        </h1>

                        <p className="property-address">
                            {stressTotal?.street || "No address available"}
                        </p>

                        <div className="property-price">
                            <div>
                                <div className="price-info">
                                    {formatPrice(valueNewPost?.price || 0)} /m²
                                    <span className="price-details mx-3">~{formatPrice(valueNewPost.price * valueNewPost.arena)}</span>
                                </div>
                            </div>
                            <div className="action-buttons">
                                <Button icon={<Share />} />
                                <Button icon={<ExclamationTriangle />} />
                                <Button icon={<Heart />} />
                            </div>
                        </div>

                        <div className="property-features">
                            <h2 className="feature-title">Đặc điểm bất động sản</h2>
                            <div className="feature-grid">
                                <div className="feature-item">
                                    <div className="feature-label">Diện tích</div>
                                    <div className="feature-value">{valueNewPost?.arena || "N/A"} m²</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-label">Mức giá</div>
                                    <div className="feature-value">{formatPrice(valueNewPost?.price || 0)} /m²
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-label">Hướng nhà</div>
                                    <div className="feature-value">{valueNewPost?.infor?.houseDirection || "N/A"}</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-label">Hướng ban công</div>
                                    <div className="feature-value">{valueNewPost?.infor?.balconyDirection || "N/A"}</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-label">Pháp lý</div>
                                    <div className="feature-value">{valueNewPost?.infor?.propertyLegalDocument || "N/A"}</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-label">Nội thất</div>
                                    <div className="feature-value">{valueNewPost?.infor?.interior || "N/A"}</div>
                                </div>
                            </div>
                        </div>

                        <div className="property-description">
                            <h2 className="description-title">Thông tin mô tả</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: valueNewPost?.description || "No description available",
                                }}
                            ></p>
                        </div>

                        <div className="poster-info">
                            <h2 className="description-title">Thông tin người đăng</h2>
                            <div className="poster-avatar-container">
                                <div className="poster-avatar">
                                    <img src={userInfor.avartar || "/path-to-default-avatar.jpg"} alt="#" />
                                </div>
                                <div className="poster-name">{userInfor?.fullname}</div>
                            </div>



                            <div className="disclaimer">
                                Quý vị đang xem nội dung tin rao <strong>"{valueNewPost.title}"</strong>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Trang danh sách',
            children: (
                <div className="list-view">

                    <div className="property-card">
                        <div className="property-image">
                            <img
                                src={valueNewPost?.images?.[0]?.url || "/placeholder.svg?height=300&width=500"}
                                alt="Property view"
                            />
                            <div className="image-count">
                                <Images size={16} />
                                <span>{valueNewPost?.images?.length || 0}</span>
                            </div>

                        </div>

                        <div className="property-details">
                            <h3 className="property-name">
                                {valueNewPost?.title || "No title available"}
                            </h3>

                            <div className="property-stats">
                                <span className="property-price"> {formatPrice(valueNewPost.price * valueNewPost.arena)} </span>
                                <span className="property-size"> {valueNewPost.arena}m²</span>
                                <span className="property-unit-price">{formatPrice(valueNewPost?.price || 0)}/m²</span>
                            </div>

                            <div className="property-location">
                                <GeoAlt size={16} />
                                <span>{stressTotal?.street}</span>
                            </div>

                            <div className="property-footer">
                                <span className="post-date">Đăng hôm nay</span>
                                <Button shape="circle" icon={<Heart size={16} />} />
                            </div>
                        </div>
                    </div>

                    <div className="notification-bar">
                        <div className="notification-content">
                            <Bell size={24} className="notification-icon" />
                            <span className="notification-text">Email cho tôi khi có tin đăng mới tương tự</span>
                        </div>
                        <Switch />
                    </div>
                </div>
            ),
        }
    ]

    return (
        <Modal
            title="Xem trước giao diện"
            open={formPostNew.isOpenFormReview}
            onCancel={() => formPostNew.setFormReview(false)}
            width={800}
            footer={
                <div className="modal-footer">
                    <Button type="primary" icon={<Telephone size={16} />} className="primary-button">
                        {maskPhoneNumber(valueNewPost?.phoneNumber || "")} · Hiện số
                    </Button>
                </div>
            }
        >
            <Tabs items={items} className="modal-tabs" />
        </Modal>
    )
}

export default observer(PropertyPreviewModal)
