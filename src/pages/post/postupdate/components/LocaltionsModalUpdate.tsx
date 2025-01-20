/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { newPostStore } from "../../../../stores/NewPostStore";
import { locationStore } from "../../../../stores/LocationStore";

const LocationSelectModalUpdate: React.FC = () => {
    const [form] = Form.useForm();
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const provinces = locationStore.provinces.map((province: any) => ({
        value: province.code,
        label: province.fullName,
    }));

    const districts = locationStore.districts?.map((district: any) => ({
        value: district.code,
        label: district.fullName,
    }));

    const wards = locationStore.wards?.map((ward: any) => ({
        value: ward.code,
        label: ward.fullName,
    }));

    useEffect(() => {
        locationStore.fetchProvinces();
    }, []);

    const handleConfirm = () => {
        form.validateFields()
            .then((values) => {
                newPostStore.setStressTotal(values);
                newPostStore.setIsOpenModalLocations(false);
                newPostStore.setIsOpenModalAddress(false);
            })
            .catch((info) => {
                console.error("Validation Failed:", info);
            });
    };

    const handleOnCancel = () => {
        newPostStore.setIsOpenModalLocations(false);
        form.resetFields();
        setSelectedProvince(null);
        setSelectedDistrict(null);
    };

    const handleAddressChange = (changedValues: any) => {
        if (changedValues.province) {
            locationStore.fetchDistricts(changedValues.province);
            setSelectedProvince(changedValues.province);
            form.setFieldsValue({ district: null, ward: null });
            setSelectedDistrict(null);
        }

        if (changedValues.district) {
            locationStore.fetchWards(changedValues.district);
            setSelectedDistrict(changedValues.district);
            form.setFieldsValue({ ward: null });
        }

        const province = form.getFieldValue("province");
        const district = form.getFieldValue("district");
        const ward = form.getFieldValue("ward");
        const streetName = form.getFieldValue("streetName");

        const address = [ward, district, province]
            .filter(Boolean)
            .map((value) => {
                const option = [...provinces, ...districts, ...wards].find((opt) => opt.value === value);
                return option?.label;
            })
            .join(", ");


        if (address) {
            const fullAddress = streetName ? `${streetName}, ${address}` : address;
            form.setFieldsValue({ street: fullAddress });
        }
    };


    useEffect(() => {
        if (newPostStore.postUpdateDetail) {
            form.setFieldsValue({
                province: newPostStore?.postUpdateDetail?.province?.name,
                district: newPostStore?.postUpdateDetail?.district?.name,
                ward: newPostStore?.postUpdateDetail?.ward?.name,
                streetName: newPostStore?.postUpdateDetail?.street
                    ? newPostStore.postUpdateDetail.street.split(',')[0]
                    : '',
                street: newPostStore?.postUpdateDetail?.street,
                urlmap: newPostStore?.postUpdateDetail?.linkMap,
            });

            setSelectedProvince(newPostStore?.postUpdateDetail?.province);
            setSelectedDistrict(newPostStore?.postUpdateDetail?.district);
        }
    }, [newPostStore.postUpdateDetail]);


    return (
        <Modal
            title={
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Chọn địa chỉ</h5>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={handleOnCancel}
                        className="p-0 border-0"
                    />
                </div>
            }
            open={newPostStore.isOpenModalLocations}
            onCancel={handleOnCancel}
            footer={null}
            width={800}
            closable={false}
            className="location-select-modal"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    province: newPostStore.province,
                    district: newPostStore.district,
                    ward: newPostStore.ward,
                    street: newPostStore.street,
                    project: newPostStore.project,
                }}
                onValuesChange={handleAddressChange}
            >
                <Form.Item
                    label="Tỉnh/Thành"
                    name="province"
                    rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành!" }]}
                >
                    <Select
                        className="w-100 rounded"
                        placeholder="Chọn tỉnh/thành"
                        options={provinces}
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    label="Quận/Huyện"
                    name="district"
                    rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
                >
                    <Select
                        className="w-100 rounded"
                        placeholder="Chọn quận/huyện"
                        options={districts}
                        size="large"
                        disabled={!selectedProvince}
                    />
                </Form.Item>

                <Form.Item
                    label="Phường/Xã"
                    name="ward"
                    rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
                >
                    <Select
                        className="w-100 rounded"
                        placeholder="Chọn phường/xã"
                        options={wards}
                        size="large"
                        disabled={!selectedDistrict}
                    />
                </Form.Item>

                <Form.Item
                    label="Tên đường"
                    name="streetName"
                    rules={[{ required: true, message: "Vui lòng nhập tên đường!" }]}
                >
                    <Input placeholder="Nhập tên đường" />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ cụ thể"
                    name="street"
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể!" }]}
                >
                    <Input placeholder="Nhập địa chỉ cụ thể" />
                </Form.Item>

                <Form.Item
                    label="Link Google Map"
                    name="urlmap"
                    rules={[{ required: true, message: "Vui lòng nhập link Google Map!" }]}
                >
                    <Input placeholder="Nhập link Google Map" />
                </Form.Item>

                <div className="d-flex justify-content-between mt-4">
                    <Button size="large" onClick={handleOnCancel}>
                        Quay lại
                    </Button>
                    <Button type="primary" size="large" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default observer(LocationSelectModalUpdate);
