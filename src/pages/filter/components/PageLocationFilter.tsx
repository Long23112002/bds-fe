/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { Modal, Input, List } from "antd";
import { observer } from "mobx-react-lite";
import { locationStore } from "../../../stores/LocationStore";
import { pageFilterStore } from "../../../stores/PageFilterStore";

interface Location {
    id: string;
    label: string;
    selected?: string;
    code?: string;
}

const PagePriceFilter = () => {
    const [locations, setLocations] = useState<Location[]>([
        { id: "province", label: "Tỉnh/Thành" },
        { id: "district", label: "Quận/Huyện" },
        { id: "ward", label: "Phường/Xã" },
    ]);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");

    const handleLocationSelect = (code: string, name: string) => {
        setLocations((prevLocations) =>
            prevLocations.map((location) => {
                if (location.id === activeModal) {
                    return { ...location, selected: name, code };
                }
                if (activeModal === "province" && location.id === "district") {
                    return { ...location, selected: undefined, code: undefined };
                }
                if ((activeModal === "province" || activeModal === "district") && location.id === "ward") {
                    return { ...location, selected: undefined, code: undefined };
                }
                return location;
            })
        );

        if (activeModal === "province") {
            locationStore.fetchDistricts(code);
        } else if (activeModal === "district") {
            locationStore.fetchWards(code);
        }

        setActiveModal(null);
    };
    
    const handleReset = () => {
        setLocations(locations.map((location) => ({ ...location, selected: undefined, code: undefined })));
    };

    const handleApply = () => {
        const selectedLocations = locations
            .filter(loc => loc.selected)
            .reduce((acc, loc) => {
                acc[loc.id] = loc.code as string; // Lưu mã code
                acc[`${loc.id}Name`] = loc.selected as string; // Lưu tên địa điểm
                return acc;
            }, {} as Record<string, string>);
    
        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            wardCode: selectedLocations.ward,
            districtCode: selectedLocations.district,
            provinceCode: selectedLocations.province,
        });
    
        // Ưu tiên hiển thị tên xã, quận, hoặc tỉnh
        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            location: selectedLocations.wardName || selectedLocations.districtName || selectedLocations.provinceName,
        });
    
        pageFilterStore.setIsLocaltionFilterModal(false);
    };
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                if (!activeModal) {
                    pageFilterStore.setIsLocaltionFilterModal(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeModal]);

    useEffect(() => {
        locationStore.fetchProvinces();
    }, []);

    return (
        <>
            <div ref={listRef} className="card p-4 w-100 mx-auto" style={{
                display: pageFilterStore.isLocaltionFilterModal ? "block" : "none",
                maxWidth: "350px",
                position: "absolute",
                top: "58px",
                left: "897px",
            }}>
                <div className="mb-4">
                    <h2 className="h5 mb-4">Khu vực</h2>
                    <div className="mb-3">
                        {locations.map((item) => (
                            <button
                                key={item.id}
                                className="btn btn-outline-secondary d-flex justify-content-between align-items-center w-100 mb-2"
                                style={{ height: "56px" }}
                                onClick={() => setActiveModal(item.id)}
                                disabled={
                                    (item.id === "district" && !locations.find(loc => loc.id === "province")?.selected) ||
                                    (item.id === "ward" && !locations.find(loc => loc.id === "district")?.selected)
                                }
                            >
                                <span>{item.selected || item.label}</span>
                                <i className="bi bi-chevron-right text-muted"></i>
                            </button>
                        ))}
                    </div>
                    <div className="d-flex gap-3 pt-4">
                        <button
                            className="btn btn-outline-secondary flex-fill d-flex align-items-center justify-content-center"
                            onClick={handleReset}
                        >
                            <i className="bi bi-arrow-counterclockwise me-2"></i>
                            Đặt lại
                        </button>
                        <button
                            className="btn btn-danger flex-fill"
                            onClick={handleApply}
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                title={`Chọn ${locations.find((loc) => loc.id === activeModal)?.label}`}
                open={!!activeModal}
                onCancel={() => setActiveModal(null)}
                footer={null}
                style={{ maxWidth: "500px" }} // Optional: Adjust modal width as needed
            >
                <Input
                    placeholder={`Tìm ${locations.find((loc) => loc.id === activeModal)?.label}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mb-3"
                />
                <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Add scroll here */}
                    <List
                        dataSource={
                            (activeModal === "province"
                                ? locationStore.provinces
                                : activeModal === "district"
                                    ? locationStore.districts
                                    : activeModal === "ward"
                                        ? locationStore.wards
                                        : []
                            ).filter((item: { code: string; fullName: string }) =>
                                item.fullName.toLowerCase().includes(searchValue.toLowerCase())
                            )
                        }
                        renderItem={(item: any) => (
                            <List.Item
                                onClick={() => handleLocationSelect(item.code, item.fullName)}
                                className="d-flex justify-content-between align-items-center"
                                style={{ cursor: "pointer", padding: "12px 16px" }}
                            >
                                <span>{item.fullName}</span>
                                <i className="bi bi-chevron-right"></i>
                            </List.Item>
                        )}
                    />
                </div>
            </Modal>
        </>
    );
}

export default observer(PagePriceFilter);
