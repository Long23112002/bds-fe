/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, Row, Col, Checkbox, Tag, Space, Dropdown, Button, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { notifySuccess } from '../../../utils/NotificationUtils';
import { Modal } from 'antd';

const { confirm } = Modal;

interface PostListItemProps {
    item: any;
    isSelected: boolean;
    onSelect: (id: string, checked: boolean) => void;
    extractAddress: (input: string) => string;
}

const PostListItem: React.FC<PostListItemProps> = ({ item, isSelected, onSelect, extractAddress }) => {


    const handleDelete = (id: number) => {
        notifySuccess('Tin đã được xóa thành công', id.toString());
    };

    const showDeleteConfirm = (id: number) => {
        confirm({
          title: 'Bạn có chắc chắn muốn xóa tin này?',
          content: 'Hành động này không thể hoàn tác nếu bạn đã mua gói.',
          okText: 'Xóa',
          okType: 'danger',
          cancelText: 'Hủy',
          onOk() {
            handleDelete(id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };


    return (
        <Card bodyStyle={{ padding: 16 }} key={item.id} className="mb-4">
            <Row gutter={16}>
                <Col>
                    <Checkbox
                        checked={isSelected}
                        onChange={(e) => onSelect(item.id, e.target.checked)}
                    />
                </Col>
                <Col>
                    <div style={{ width: 96, height: 96 }}>
                        <img
                            src={item.images[0].url}
                            alt=""
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 8,
                            }}
                        />
                    </div>
                </Col>
                <Col flex="auto">
                    <Space direction="vertical" style={{ width: '100%' }} size={8}>
                        <Row justify="space-between" align="top">
                            <Col>
                                <Tag color={
                                    item.status === 'APPROVED' ? 'green' :
                                        item.status === 'PENDING' ? 'yellow' : 'red'
                                }>
                                    {item.status === 'APPROVED' ? 'Đã duyệt' : item.status === 'PENDING' ? 'Chờ duyệt' : item.status === 'REJECTED' ? 'Không duyệt' : 'Hết hạn'}
                                </Tag>
                                <h3 className="text-lg font-semibold mt-1" style={{ fontSize: '16px' }}>
                                    {item.title}
                                </h3>
                            </Col>
                            <Col>
                                <Dropdown overlay={
                                    <Menu>
                                        <Menu.Item key="edit">
                                            <Link style={{
                                                color: 'black',
                                                textDecoration: 'none'
                                            }} to={`/post-update/${item.id}`}>Sửa tin</Link>
                                        </Menu.Item>
                                        <Menu.Item key="delete" onClick={() => showDeleteConfirm(item.id)}>Xóa tin</Menu.Item>
                                    </Menu>
                                }>
                                    <Button type="text" icon={<MoreOutlined />} />
                                </Dropdown>
                            </Col>
                        </Row>
                        <div style={{ color: 'gray', fontSize: '14px' }}>
                            {`${item?.residentialProperty?.name} • ${extractAddress(item?.street)}`}
                        </div>
                        <Row gutter={32}>
                            <Col>
                                <span style={{ color: 'gray', fontSize: '14px' }}>Mã tin:</span> {item.id}
                            </Col>
                            <Col>
                                <span style={{ color: 'gray', fontSize: '14px' }}>Ngày đăng:</span>{' '}
                                {new Date(item?.packagePriceTransaction?.startDate).toLocaleDateString('vi-VN')}
                            </Col>
                            <Col>
                                <span style={{ color: 'gray', fontSize: '14px' }}>Ngày hết hạn:</span>{' '}
                                {new Date(item?.packagePriceTransaction?.endDate).toLocaleDateString('vi-VN')}
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default PostListItem;

