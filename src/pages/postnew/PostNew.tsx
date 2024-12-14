/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Steps, Form, Radio, Button, Input } from 'antd';
import { TagOutlined, KeyOutlined, SearchOutlined } from '@ant-design/icons';
import { newPostStore } from '../../stores/NewPostStore';
import { observer } from 'mobx-react-lite';
import AddressModal from './components/AddressModal';
import LocationSelectModal from '../postnew/components/LocaltionsModal';

const PostNew = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [form] = Form.useForm();

    const steps = [
        {
            title: 'Thông tin BDS',
            content: 'First-Content',
        },
        {
            title: 'Step 2',
            content: 'Second-Content',
        },
        {
            title: 'Step 3',
            content: 'Third-Content',
        },
    ];

    const onFinish = (values: any) => {
        console.log('Form values:', values);
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleTypeChange = (e: any) => {
        setSelectedType(e.target.value);
    };

    const handelOpenModalAddress = () => {
        newPostStore.setIsOpenModalAddress(true);
    }

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <div className="w-100 border-bottom bg-white">
                <div className="container px-4 py-4 d-flex justify-content-between align-items-center">
                    <h1 className="h4 mb-0">Tạo tin đăng</h1>
                    <div className="d-flex gap-3">
                        <Button type="default" icon={<TagOutlined />}>
                            Xem trước
                        </Button>
                        <Button>Thoát</Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container px-4 py-5">
                <Steps
                    current={currentStep}
                    items={steps.map((item) => ({ title: item.title }))}
                    className="mb-5"
                />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mx-auto"
                    style={{ maxWidth: '768px' }}
                >
                    {currentStep === 0 && (
                        <>
                            <div className="bg-white p-4 rounded shadow-sm mb-4">
                                <h2 className="h5 mb-4 d-flex align-items-center justify-content-between">
                                    Nhu cầu
                                    <span style={{ cursor: 'pointer' }}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>
                                    </span>
                                </h2>

                                <Form.Item
                                    name="propertyType"
                                    rules={[{ required: true, message: 'Vui lòng chọn loại giao dịch' }]}
                                >
                                    <Radio.Group className="w-100" onChange={handleTypeChange}>
                                        <div className="row g-3">
                                            <div className="col-12 col-md-6">
                                                <Radio.Button value="sell" className="w-100 h-auto p-0">
                                                    <div className="p-3 d-flex align-items-center gap-2">
                                                        <TagOutlined className="fs-5" />
                                                        <span>Bán</span>
                                                    </div>
                                                </Radio.Button>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Radio.Button value="rent" className="w-100 h-auto p-0">
                                                    <div className="p-3 d-flex align-items-center gap-2">
                                                        <KeyOutlined className="fs-5" />
                                                        <span>Cho thuê</span>
                                                    </div>
                                                </Radio.Button>
                                            </div>
                                        </div>
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            {selectedType && (
                                <div className="bg-white p-4 rounded shadow-sm">
                                    <h2 className="h5 mb-4 d-flex align-items-center justify-content-between">
                                        Địa chỉ BDS
                                        <span style={{ cursor: 'pointer' }}>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m18 15-6-6-6 6" />
                                            </svg>
                                        </span>
                                    </h2>

                                    <Form.Item
                                        name="address"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                    >
                                        <Input
                                            onClick={handelOpenModalAddress}
                                            size="large"
                                            placeholder="Nhập địa chỉ"
                                            prefix={<SearchOutlined />}
                                            className="rounded-pill"
                                        />
                                    </Form.Item>
                                </div>
                            )}
                        </>
                    )}

                    <div className="d-flex justify-content-end mt-4">
                        <Button type="primary" htmlType="submit" size="large">
                            Tiếp tục
                        </Button>
                    </div>
                </Form>
            </div>
            <AddressModal />
            <LocationSelectModal />
        </div>
    );
}

export default observer(PostNew);

