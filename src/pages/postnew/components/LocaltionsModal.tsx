/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Select, Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { newPostStore } from "../../../stores/NewPostStore";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const LocationSelectModal: React.FC = () => {
    const [form] = Form.useForm();
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState({ lat: 21.028511, lng: 105.804817 });
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    });

    const provinces = [
        { value: "hanoi", label: "Hà Nội" },
        { value: "hcm", label: "TP. Hồ Chí Minh" },
    ];

    const districts = [
        { value: "district1", label: "Quận 1" },
        { value: "district2", label: "Quận 2" },
    ];

    const wards = [
        { value: "ward1", label: "Phường 1" },
        { value: "ward2", label: "Phường 2" },
    ];

    const geocodeAddress = (address: string) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === "OK" && results && results[0]) {
                if (results && results[0]) {
                    const location = results[0].geometry.location;
                    setMapCenter({ lat: location.lat(), lng: location.lng() });
                }

            } else {
                console.error("Geocoding failed: ", status);
            }
        });
    };

    const handleConfirm = () => {
        form.validateFields().then((values) => {
            console.log("Form Values:", values);
            setMarkerPosition(mapCenter);
            newPostStore.reset();
        }).catch((info) => {
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
            setSelectedProvince(changedValues.province);
            form.setFieldsValue({ district: null, ward: null });
            setSelectedDistrict(null);
        }
        if (changedValues.district) {
            setSelectedDistrict(changedValues.district);
            form.setFieldsValue({ ward: null });
        }

        // Kết hợp địa chỉ để geocode
        const province = form.getFieldValue("province");
        const district = form.getFieldValue("district");
        const ward = form.getFieldValue("ward");

        const address = [ward, district, province]
            .filter(Boolean)
            .map((value) => {
                const option = [...provinces, ...districts, ...wards].find((opt) => opt.value === value);
                return option?.label;
            })
            .join(", ");

        if (address) {
            geocodeAddress(address);
        }
    };

    return (
        <Modal
            title={
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Chọn địa chỉ</h5>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={newPostStore.reset}
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

                <div className="d-flex justify-content-between mt-4">
                    <Button size="large" onClick={handleOnCancel}>
                        Quay lại
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleConfirm}
                    >
                        Xác nhận
                    </Button>
                </div>
            </Form>

            {isLoaded && (
                <div className="mt-4">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "400px" }}
                        center={mapCenter}
                        zoom={14}
                    >
                        {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                </div>
            )}
        </Modal>
    );
};

export default observer(LocationSelectModal);
