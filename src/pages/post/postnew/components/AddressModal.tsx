/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Modal, Input, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { newPostStore } from '../../../../stores/NewPostStore';


const AddressModal: React.FC = () => {

    const searchHistory = [
        "Cao ốc văn phòng 16 Liễu Giai, Phố Liễu Giai, Phường Liễu Giai, Quận Ba Đình, Hà Nội"
    ];

    const onSelectAddress = (address: string) => {
        console.log(address)
        newPostStore.setIsOpenModalAddress(false);
    }

    const onClose = () => {
        newPostStore.setIsOpenModalAddress(false);
    }

    return (
        <Modal
            title={
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Nhập địa chỉ</h5>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={onClose}
                        className="p-0 border-0"
                    />
                </div>
            }
            open={newPostStore.isOpenModalAddress}
            onCancel={onClose}
            footer={null}
            width={800}
            closable={false}
            className="address-modal"
        >
            <div className="py-3">
                <Input
                    size="large"
                    placeholder="Nhập địa chỉ"
                    prefix={<SearchOutlined />}
                    className="rounded-pill mb-3"
                />

                <p className="text-muted mb-4">
                    Tìm kiếm bằng cách nhập tên quận huyện, phường xã, đường phố hoặc tên dự án
                </p>

                <div className="mb-4">
                    <p className="mb-3">Hoặc</p>
                    <Button
                        size="large"
                        className="rounded-pill"
                        style={{ border: '2px solid #e6e6e6' }}
                        onClick={() => newPostStore.setIsOpenModalLocations(true)}
                    >
                        Chọn địa chỉ
                    </Button>
                </div>

                {searchHistory.length > 0 && (
                    <div>
                        <h6 className="mb-3">Lịch sử tìm kiếm</h6>
                        <div className="border rounded p-3">
                            {searchHistory.map((address, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer hover-bg-light p-2"
                                    onClick={() => onSelectAddress(address)}
                                >
                                    {address}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default observer(AddressModal);

