/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card, Button } from 'antd';
import { HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';

interface PropertyData {
    imageUrl: string;
    imageCount: number;
    title: string;
    price: string;
    area: string;
    location: string;
    postedTime: string;
}

const PostDetailCard = ({ data }: { data: PropertyData }) => {
    const { imageUrl, imageCount, title, price, area, location, postedTime } = data;

    return (
        <Card
            hoverable
            cover={
                <div className="position-relative">
                    <img
                        alt={title}
                        src={imageUrl}
                        className="w-100"
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 end-0 p-2 bg-dark bg-opacity-50 text-white">
                        {imageCount}
                    </div>
                </div>
            }
            className="h-100 property-card"
        >
            <h3 className="h6 mb-2 text-truncate">{title}</h3>
            <div className="d-flex gap-2 text-danger mb-2">
                <span>{price}</span>
                <span>·</span>
                <span>{area}</span>
            </div>
            <div className="d-flex align-items-center gap-1 text-muted mb-2">
                <EnvironmentOutlined />
                <span>{location}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">{postedTime}</span>
                <Button type="text" icon={<HeartOutlined />} />
            </div>
        </Card>
    );
};

export default PostDetailCard;

