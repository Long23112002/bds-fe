/* eslint-disable react-refresh/only-export-components */


import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { searchStore } from "../../../stores/SearchStore";
import '../styles/search.css';

interface ListItem {
    id: string;
    value: string;
    isChecked: boolean;
    icon: string;
}

const CheckBoxList = () => {
    const [data, setData] = useState<ListItem[]>([
        { id: '1', value: 'Tất cả nhà đất', isChecked: false, icon: 'fa-house' },
        { id: '2', value: 'Căn hộ chung cư', isChecked: false, icon: 'fa-building' },
        { id: '3', value: 'Chung cư mini, căn hộ dịch vụ', isChecked: false, icon: 'fa-building-user' },
        { id: '4', value: 'Các loại nhà bán', isChecked: false, icon: 'fa-home' },
        { id: '5', value: 'Nhà riêng', isChecked: false, icon: 'fa-house-user' },
        { id: '6', value: 'Nhà biệt thự, liền kề', isChecked: false, icon: 'fa-house-flag' },
        { id: '7', value: 'Nhà mặt phố', isChecked: false, icon: 'fa-store' },
        { id: '8', value: 'Shophouse, nhà phố thương mại', isChecked: false, icon: 'fa-shop' },
    ]);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                searchStore.setIsOpenMenuButton(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = data.map(item => ({
            ...item,
            isChecked: e.target.checked,
        }));
        setData(newData);
    };

    const handleCheckboxChange = (id: string) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setData(newData);
    };

    const handleReset = () => {
        const newData = data.map(item => ({
            ...item,
            isChecked: false,
        }));
        setData(newData);
    };

    return (
        <div ref={listRef} className={`list-group ${searchStore.isOpenMenuButton ? 'open' : ''}`}>
            <div>
                <label className="list-group-item">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-list me-2"></i>
                        <span>Chọn tất cả</span>
                    </div>
                    <input
                        className="form-check-input me-1"
                        type="checkbox"
                        id="select-all"
                        checked={data.every(item => item.isChecked)}
                        onChange={handleSelectAll}
                    />
                </label>

                {data.map((item) => (
                    <label key={item.id} className="list-group-item border-bottom">
                        <div className="d-flex align-items-center">
                            <i className={`fas ${item.icon} me-2`}></i>
                            <span>{item.value}</span>
                        </div>
                        <input
                            className="form-check-input me-1"
                            type="checkbox"
                            id={`checkbox-${item.id}`}
                            checked={item.isChecked}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                    </label>
                ))}
            </div>
            <div className="list-group-item">
                <button className="btn btn-outline-white" onClick={handleReset}>
                    <i className="fa-solid fa-arrows-rotate"></i> <span>Đặt lại</span>
                </button>
                <button className="btn btn-danger">Áp dụng</button>
            </div>
        </div>
    );
};

export default observer(CheckBoxList);

