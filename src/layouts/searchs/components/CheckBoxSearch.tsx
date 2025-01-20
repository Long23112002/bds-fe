/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */


import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { searchStore } from "../../../stores/SearchStore";
import '../styles/search.css';
import { pageFilterStore } from "../../../stores/PageFilterStore";

interface ListItem {
    id: string;
    value: string;
    isChecked: boolean;
    icon: string;
}

const CheckBoxList = () => {
    const [data, setData] = useState<ListItem[]>([]);

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

    useEffect(() => {
        const mappedOptions = pageFilterStore.residentialOptions.map((item: any) => ({
            id: item.id,
            value: item.name,
            isChecked: false,
            icon: 'fa-house',
        }));
        setData(mappedOptions);
    }, [pageFilterStore.residentialOptions]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setData(prevData => prevData.map(item => ({ ...item, isChecked })));
    };

    const handleCheckboxChange = (id: string) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const handleReset = () => {
        setData(prevData => prevData.map(item => ({ ...item, isChecked: false })));
    };

    const getSelectedItems = () => {
        return data.filter(item => item.isChecked).map(item => ({ id: item.id, value: item.value }));
    };

    const handleApply = () => {
        const selectedItems = getSelectedItems();
        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            residentialPropertyIds: new Set(selectedItems.map(item => parseInt(item.id))),
        })


        searchStore.setIsOpenMenuButton(false);
    };

    useEffect(() => {
        pageFilterStore.fetchResidentials(
            { name: '' },
            { page: 0, size: 10000 }
        );
    }, []);

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

                {data.map(item => (
                    <label key={item.id} className="list-group-item border-bottom">
                        <div className="d-flex align-items-center">
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
                <button className="btn btn-danger" onClick={handleApply}>
                    Áp dụng
                </button>
            </div>
        </div>
    );
};

export default observer(CheckBoxList);

