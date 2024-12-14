/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { Modal, Input, List } from "antd";
import { searchStore } from "../../../stores/SearchStore";
import { observer } from "mobx-react-lite";

interface Location {
    id: string;
    label: string;
    selected?: string;
}

const provinces = [
    { id: "1", name: "Tỉnh 1" },
    { id: "2", name: "Tỉnh 2" },
    { id: "3", name: "Tỉnh 3" },
];
const districts = [
    { id: "1", name: "Quận 1" },
    { id: "2", name: "Quận 2" },
    { id: "3", name: "Quận 3" },
];

const wards = [
    { id: "1", name: "Phường 1" },
    { id: "2", name: "Phường 2" },
    { id: "3", name: "Phường 3" },
];

const streets = [
    { id: "1", name: "Đường 1" },
    { id: "2", name: "Đường 2" },
    { id: "3", name: "Đường 3" },
];

const projects = [
    { id: "1", name: "Dự án 1" },
    { id: "2", name: "Dự án 2" },
    { id: "3", name: "Dự án 3" },
];

const LocationFilter = () => {
    const [locations, setLocations] = useState<Location[]>([
        { id: "province", label: "Tỉnh/Thành" },
        { id: "district", label: "Quận/Huyện" },
        { id: "ward", label: "Phường/Xã" },
        { id: "street", label: "Đường/Phố" },
        { id: "project", label: "Dự án" },
    ]);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");

    const handleLocationSelect = (id: string, name: string) => {
        setLocations(
            locations?.map((location) =>
                location?.id === activeModal ? { ...location, selected: name } : location
            )
        );
        setActiveModal(null);
    };

    const handleReset = () => {
        setLocations(locations.map((location) => ({ ...location, selected: undefined })));
    };

    const handleApply = () => {
        const selectedLocations = locations.reduce((acc, loc) => {
            acc[loc.id] = loc.selected || "";
            return acc;
        }, {} as Record<string, string>);
        searchStore.setSearchLocation(selectedLocations);
        searchStore.setIsLocaltionFilterModal(false);
    };

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                if (!activeModal) {
                    searchStore.setIsLocaltionFilterModal(false);
                }
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeModal]);

    return (
        <>
            <div ref={listRef} className="card p-4 w-100 mx-auto" style={{
                display: searchStore.isLocaltionFilterModal ? "block" : "none",
                maxWidth: "350px",
                position: "absolute",
                top: "160px",
                left: "16px",
            }}>
                <div className="mb-4">
                    <h2 className="h5 mb-4">Khu vực & Dự án</h2>
                    <div className="mb-3">
                        {locations.map((item) => (
                            <button
                                key={item.id}
                                className="btn btn-outline-secondary d-flex justify-content-between align-items-center w-100 mb-2"
                                style={{ height: "56px" }}
                                onClick={() => setActiveModal(item.id)}
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
            >
                <Input
                    placeholder={`Tìm ${locations.find((loc) => loc.id === activeModal)?.label}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mb-3"
                />
                <List
                    dataSource={
                        (activeModal === "province"
                            ? provinces
                            : activeModal === "district"
                                ? districts
                                : activeModal === "ward"
                                    ? wards
                                    : activeModal === "street"
                                        ? streets
                                        : activeModal === "project"
                                            ? projects
                                            : []
                        ).filter((item: { id: string; name: string }) =>
                            item.name.toLowerCase().includes(searchValue.toLowerCase())
                        )
                    }
                    renderItem={(item) => (
                        <List.Item
                            onClick={() => handleLocationSelect(item.id, item.name)}
                            className="d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer", padding: "12px 16px" }}
                        >
                            <span>{item.name}</span>
                            <i className="bi bi-chevron-right"></i>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
}

export default observer(LocationFilter);
