/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Steps, Form, Radio, Button, Input, Select, InputNumber } from 'antd';
import { TagOutlined, KeyOutlined, SearchOutlined, EditOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import AddressModal from './components/AddressModal';
import LocationSelectModal from '../postnew/components/LocaltionsModal';
import ReactQuill from 'react-quill';
import { SparklesIcon } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';
import ImageUploadStep from './components/ImageUploadStep';
import SubscriptionSelector from './components/SubscriptionSelector';
import PropertyPreviewModal from './components/PropertyPreviewModal';
import useCheckLogin from '../../../hooks/useCheckLogin';
import { formPostNew } from '../../../stores/FormPostNew';
import { newPostStore } from '../../../stores/NewPostStore';
import { PropertiesFilter } from '../../../types/PropertiesFilter';
import { Pageable } from '../../../types/Pageable';

const PostNew = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [titleLength, setTitleLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0);
    useCheckLogin();

    const [area, setArea] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceUnit, setPriceUnit] = useState("VND");
    const [totalPrice, setTotalPrice] = useState("");
    const [isLandSelected, setIsLandSelected] = useState(false);

    const handleResidentialChange = (value: any) => {
        const selectedResidential = formPostNew.residentials.find(item => item.id === value);
        if (selectedResidential && selectedResidential.name === 'Đất') {
            setIsLandSelected(true);
        } else {
            setIsLandSelected(false);
        }
    };

    const handlePriceChange = (value: any) => {
        setPrice(value);
        calculateTotalPrice(value, area, priceUnit);
    };

    const handleAreaChange = (value: any) => {
        setArea(value);
        calculateTotalPrice(price, value, priceUnit);
    };

    const handlePriceUnitChange = (value: any) => {
        setPriceUnit(value);
        calculateTotalPrice(price, area, value);
    };

    const calculateTotalPrice = (price: any, area: any, priceUnit: any) => {
        let total = 0;

        if (priceUnit === "Giá / m²") {
            total = price * area;
        } else if (priceUnit === "VND") {
            total = price;
        } else if (priceUnit === "Thỏa thuận") {
            setTotalPrice("Thỏa thuận");
            setPrice(0);
            return;
        }

        let displayValue = "";

        if (priceUnit === "VND") {
            const pricePerSquareMeter = area > 0 ? Math.round(total / area) : 0;
            if (total >= 1_000_000_000) {
                const totalInBillions = total / 1_000_000_000;
                const pricePerSquareMeterInMillions = pricePerSquareMeter / 1_000_000;
                displayValue = `Tổng trị giá ${Math.round(totalInBillions).toLocaleString()} tỷ (~${Math.round(pricePerSquareMeterInMillions).toLocaleString()} triệu/m²)`;
            } else if (total >= 1_000_000) {
                const totalInMillions = total / 1_000_000;
                const pricePerSquareMeterInMillions = pricePerSquareMeter / 1_000_000;
                displayValue = `Tổng trị giá ${Math.round(totalInMillions).toLocaleString()} triệu (~${Math.round(pricePerSquareMeterInMillions).toLocaleString()} triệu/m²)`;
            } else {
                const pricePerSquareMeterInThousands = pricePerSquareMeter / 1_000;
                displayValue = `Tổng trị giá ${total.toLocaleString()} VND (~${Math.round(pricePerSquareMeterInThousands).toLocaleString()} nghìn/m²)`;
            }
        } else if (priceUnit === "PRICE_M2") {
            const pricePerMillion = price / 1_000_000;
            const total = price * area;

            if (total >= 1_000_000_000) {
                const totalInBillion = total / 1_000_000_000;
                displayValue = `Giá ${Math.round(pricePerMillion).toLocaleString()} triệu/m² (Tổng trị giá ~${Math.round(totalInBillion).toLocaleString()} tỷ)`;
            } else if (total >= 1_000_000) {
                const totalInMillion = total / 1_000_000;
                displayValue = `Giá ${Math.round(pricePerMillion).toLocaleString()} triệu/m² (Tổng trị giá ~${Math.round(totalInMillion).toLocaleString()} triệu)`;
            } else {
                displayValue = `Giá ${Math.round(pricePerMillion).toLocaleString()} triệu/m² (Tổng trị giá ~${total.toLocaleString()} VND)`;
            }
        }

        setTotalPrice(displayValue);
    };


    useEffect(() => {
        if (price === 0 && priceUnit === "Thỏa thuận") {
            setTotalPrice("Thỏa thuận");
            setPrice(0);
        }
    }, [price, priceUnit]);




    const steps = [
        {
            title: 'Thông tin BDS',
            content: 'First-Content',
        },
        {
            title: 'Hình ảnh & video',
            content: 'Second-Content',
        },
        {
            title: 'Cấu hình & thanh toán',
            content: 'Third-Content',
        },
    ];

    const onFinish = (values: any) => {

        const selectedResidential = formPostNew.residentials.find(
            (item) => item.id === values.residentialPropertyId
        );

        const valueRequest = {
            ...values, provinceCode: newPostStore.stressTotal?.province,
            districtCode: newPostStore.stressTotal?.district,
            wardCode: newPostStore.stressTotal?.ward,
            street: newPostStore.stressTotal?.street,
            linkMap: newPostStore.stressTotal?.urlmap,
            infor: {
                residentialProperty: selectedResidential?.name || "",
                propertyLegalDocument: formPostNew.propertyLegalDocuments.find(
                    (item) => item.id === values.propertyLegalDocumentId
                )?.name || "",
                interior: formPostNew.interiors.find(
                    (item) => item.id === values.interiorId
                )?.name || "",
                houseDirection: formPostNew.houseDirections.find(
                    (item) => item.id === values.houseDirectionId
                )?.name || "",
                balconyDirection: formPostNew.balconyDirections.find(
                    (item) => item.id === values.balconyDirectionId
                )?.name || "",
            }
        };

        newPostStore.setValueNewPost(valueRequest);
        if (newPostStore.currentStep < steps.length - 1) {
            newPostStore.setCurrentStep(newPostStore.currentStep + 1);
        }
    };


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleLength(e.target.value.length);
    };

    const handleDescriptionChange = (content: string) => {
        const textOnly = content.replace(/<[^>]*>/g, '');
        setDescriptionLength(textOnly.length);
    };



    const handleTypeChange = (e: any) => {
        setSelectedType(e.target.value);

        console.log(e.target.value);
    };

    const handelOpenModalAddress = () => {
        newPostStore.setIsOpenModalAddress(true);
    }

    useEffect(() => {
        const filter: PropertiesFilter = { name: '' };
        const pageable: Pageable = { size: 1000, page: 0 };
        formPostNew.fetchBalconyDirection(filter, pageable);
        formPostNew.fetchHouseDirection(filter, pageable);
        formPostNew.fetchInteriors(filter, pageable);
        formPostNew.fetchpropertyLegalDocument(filter, pageable);
        formPostNew.fetchResidentials(filter, pageable);
    }, [])

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <div className="w-100 border-bottom bg-white">
                <div className="container px-4 py-4 d-flex justify-content-between align-items-center">
                    <h1 className="h4 mb-0">Tạo tin đăng</h1>
                    <div className="d-flex gap-3">
                        {newPostStore.currentStep === 2 ? (
                            <Button onClick={() => formPostNew.setFormReview(true)} type="default" icon={<TagOutlined />}>
                                Xem trước
                            </Button>
                        ) : (
                            <Button disabled icon={<TagOutlined />}>
                                Xem trước
                            </Button>
                        )}
                        <Button>Thoát</Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container px-4 py-5">
                <Steps
                    current={newPostStore.currentStep}
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
                    {newPostStore.currentStep === 0 && (
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
                                    name="demand"
                                    rules={[{ required: true, message: 'Vui lòng chọn loại giao dịch' }]}
                                >
                                    <Radio.Group className="w-100" onChange={handleTypeChange}>
                                        <div className="row g-3">
                                            <div className="col-12 col-md-6">
                                                <Radio.Button value="SELL" className="w-100 h-auto p-0">
                                                    <div className="p-3 d-flex align-items-center gap-2">
                                                        <TagOutlined className="fs-5" />
                                                        <span>Bán</span>
                                                    </div>
                                                </Radio.Button>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <Radio.Button value="RENT" className="w-100 h-auto p-0">
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
                                        initialValue={newPostStore.stressTotal?.street}
                                    >
                                        {newPostStore.stressTotal?.street == null ? (
                                            <Input
                                                value={""}
                                                size="large"
                                                placeholder="Nhập địa chỉ"
                                                prefix={<SearchOutlined />}
                                                onClick={handelOpenModalAddress}
                                            />
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <span>{newPostStore.stressTotal?.street}</span>
                                                <Button
                                                    type="link"
                                                    onClick={handelOpenModalAddress}
                                                    style={{ marginLeft: 8 }}
                                                >
                                                    <EditOutlined /> Chỉnh sửa
                                                </Button>
                                            </div>
                                        )}
                                    </Form.Item>
                                </div>
                            )}

                            {selectedType && (
                                <div className="bg-white p-4 rounded shadow-sm mt-3">
                                    <h2 className="h5 mb-4">Thông tin chính</h2>

                                    <Form.Item
                                        label="Loại BDS"
                                        name="residentialPropertyId"
                                        rules={[{ required: true, message: 'Vui lòng chọn loại BDS' }]}
                                    >
                                        <Select onChange={handleResidentialChange} size="large" placeholder="Chọn loại BDS">
                                            {formPostNew.residentials.map((item) => (
                                                <Select.Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Diện tích"
                                        name="arena"
                                        rules={[{ required: true, message: 'Vui lòng nhập diện tích' }]}
                                    >
                                        <InputNumber
                                            placeholder='Nhập diện tích'
                                            suffix="m²"
                                            min={0}
                                            size="large"
                                            style={{ width: '100%' }}
                                            controls={{
                                                upIcon: <PlusOutlined />,
                                                downIcon: <MinusOutlined />
                                            }}
                                            formatter={(value) =>
                                                (value ? (value as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')
                                            }
                                            parser={(value: string | undefined): number => parseFloat(value?.replace(/,/g, '') || '0')}
                                            onChange={(value) => handleAreaChange(value)}
                                        />

                                    </Form.Item>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <Form.Item
                                                label="Mức giá"
                                                name="price"
                                                rules={[{ required: priceUnit !== "AGREEMENT", message: "Vui lòng nhập giá" }]}
                                            >

                                                {priceUnit === "AGREEMENT" ? (
                                                    <div>
                                                        <input disabled className='form-control' type="text" value={"Thỏa thuận"} />
                                                    </div>
                                                ) : (

                                                    <InputNumber
                                                        min={0}
                                                        size="large"
                                                        style={{ width: '100%' }}
                                                        controls={{
                                                            upIcon: <PlusOutlined />,
                                                            downIcon: <MinusOutlined />
                                                        }}
                                                        formatter={(value) =>
                                                            (value ? (value as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')
                                                        }
                                                        parser={(value: string | undefined): number => parseFloat(value?.replace(/,/g, '') || '0')}
                                                        onChange={(value) => handlePriceChange(value)}
                                                    />
                                                )}

                                            </Form.Item>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item
                                                label="Đơn vị"
                                                name="unit"
                                                initialValue="VND"
                                            >
                                                <Select size="large" onChange={handlePriceUnitChange}>
                                                    <Select.Option value="VND" key="VND">VND</Select.Option>
                                                    <Select.Option value="PRICE_M2" key="Giá / m²">Giá / m²</Select.Option>
                                                    <Select.Option value="AGREEMENT" key="Thỏa thuận">Thỏa thuận</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        {totalPrice && (
                                            <span className="text-muted">Tổng trị giá: {totalPrice}</span>
                                        )}
                                    </div>
                                </div>
                            )}


                            {selectedType && (
                                <div className="bg-white p-4 rounded shadow-sm mb-4 mt-3">
                                    <h2 className="h5 mb-4">Thông tin khác <span className="text-muted">(không bắt buộc)</span></h2>

                                    <Form.Item
                                        label="Giấy tờ pháp lý"
                                        name="propertyLegalDocumentId"
                                    >
                                        <Select size="large" placeholder="Chọn giấy tờ pháp lý">
                                            {formPostNew.propertyLegalDocuments.map((item) => (
                                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {!isLandSelected && (
                                        <Form.Item
                                            label="Nội thất"
                                            name="interiorId"
                                        >
                                            <Select size="large" placeholder="Chọn nội thất">
                                                {formPostNew.interiors.map((item) => (
                                                    <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    )}


                                    {!isLandSelected && (
                                        <div className="row">

                                            <div className="col-md-6">
                                                <Form.Item
                                                    label="Số phòng ngủ"
                                                    name="numberOfBedrooms"
                                                    initialValue={0}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        size="large"
                                                        style={{ width: '100%' }}
                                                        controls={{
                                                            upIcon: <PlusOutlined />,
                                                            downIcon: <MinusOutlined />
                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Item
                                                    label="Số phòng tắm, vệ sinh"
                                                    name="numberOfBathrooms"
                                                    initialValue={0}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        size="large"
                                                        style={{ width: '100%' }}
                                                        controls={{
                                                            upIcon: <PlusOutlined />,
                                                            downIcon: <MinusOutlined />
                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                    )}



                                    <Form.Item
                                        label="Hướng nhà"
                                        name="houseDirectionId"
                                    >
                                        <Select size="large" placeholder="Chọn hướng nhà">
                                            {formPostNew.houseDirections.map((item) => (
                                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {!isLandSelected && (
                                        <Form.Item
                                            label="Hướng ban công"
                                            name="balconyDirectionId"
                                        >
                                            <Select size="large" placeholder="Chọn hướng ban công">

                                                {formPostNew.balconyDirections.map((item) => (
                                                    <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                ))}

                                            </Select>
                                        </Form.Item>
                                    )}




                                    <Form.Item>

                                        <Form.Item
                                            label="Đường vào"
                                            name="entrance"
                                            rules={[{ required: true, message: 'Vui lòng nhập đuờng vào' }]}
                                        >
                                            <Input size="large" placeholder="Nhập diện tích" suffix="m" type="number" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Mặt tiền"
                                            name="front"
                                            rules={[{ required: true, message: 'Vui lòng nhập đuờng vào' }]}
                                        >
                                            <Input size="large" placeholder="Nhập diện tích" suffix="m" type="number" />
                                        </Form.Item>
                                    </Form.Item>

                                </div>
                            )}

                            {selectedType && (
                                <div className="bg-white p-4 rounded shadow-sm mb-4">
                                    <h2 className="h5 mb-4">Thông tin liên hệ</h2>

                                    <Form.Item
                                        label="Tên liên hệ"
                                        name="contactName"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên liên hệ' }]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Nguyễn Hải Long"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <span>
                                                Email <span className="text-muted">(không bắt buộc)</span>
                                            </span>
                                        }
                                        name="email"
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Nhập email"
                                            type="email"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="0888880243"
                                            type="tel"
                                        />
                                    </Form.Item>
                                </div>

                            )}

                            {selectedType && (
                                <div className="bg-white p-4 rounded shadow-sm mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h2 className="h5 mb-0">Tiêu đề & Mô tả</h2>
                                        <Button type="default" icon={<SparklesIcon />} className="d-flex align-items-center gap-2">
                                            Tạo với AI
                                            <span className="text-muted fs-6">(còn 98 lượt)</span>
                                        </Button>
                                    </div>

                                    <Form.Item
                                        label={
                                            <div className="d-flex justify-content-between w-100">
                                                <span>Tiêu đề</span>
                                                <span className="text-muted">{titleLength}/99 ký tự</span>
                                            </div>
                                        }
                                        name="title"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tiêu đề' },
                                            { min: 30, message: 'Tiêu đề phải có ít nhất 30 ký tự' },
                                            { max: 99, message: 'Tiêu đề không được vượt quá 99 ký tự' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ (VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy)"
                                            onChange={handleTitleChange}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className="d-flex justify-content-between w-100">
                                                <span>Mô tả</span>
                                                <span className="text-muted">{descriptionLength}/3000 ký tự</span>
                                            </div>
                                        }
                                        name="description"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập mô tả' },
                                            { min: 30, message: 'Mô tả phải có ít nhất 30 ký tự' },
                                            { max: 3000, message: 'Mô tả không được vượt quá 3000 ký tự' }
                                        ]}
                                    >
                                        <ReactQuill
                                            theme="snow"
                                            onChange={handleDescriptionChange}
                                            placeholder={`Mô tả chi tiết về:
                       • Loại hình bất động sản
                       • Vị trí
                       • Diện tích, tiện ích
                       • Tình trạng nội thất
                       ...
                       (VD: Khu nhà có vị trí thuận lợi, gần công viên, trường học...)`}
                                            modules={{
                                                toolbar: [
                                                    ['bold', 'italic', 'underline', 'strike'],
                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                    ['clean']
                                                ]
                                            }}
                                            style={{ height: '200px', marginBottom: '50px' }}
                                        />
                                    </Form.Item>
                                </div>
                            )}
                        </>
                    )}

                    {newPostStore.currentStep === 1 && (
                        <ImageUploadStep />
                    )}

                    {newPostStore.currentStep === 2 && (
                        <SubscriptionSelector />
                    )}

                    {newPostStore.currentStep === 0 && (
                        <div className="d-flex justify-content-between mt-4">
                            <Button size="large">
                                Quay lại
                            </Button>
                            <Button size="large" type="primary" htmlType="submit">
                                Tiếp theo
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
            <AddressModal />
            <LocationSelectModal />
            <PropertyPreviewModal />
        </div>
    )
}

export default observer(PostNew);