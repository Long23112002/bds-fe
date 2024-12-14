/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { searchStore } from "../../../stores/SearchStore";
// import '../styles/search.css';

interface ListItem {
    id: string;
    value: string;
    isChecked: boolean;
    icon: string;
}

const RealEstateSearch = () => {
    const [data, ] = useState<ListItem[]>([
        { id: '1', value: 'Tất cả nhà đất', isChecked: false, icon: 'fa-house' },
        { id: '2', value: 'Căn hộ chung cư', isChecked: false, icon: 'fa-building' },
        { id: '3', value: 'Chung cư mini, căn hộ dịch vụ', isChecked: false, icon: 'fa-house-user' },
        { id: '4', value: 'Các loại nhà bán', isChecked: false, icon: 'fa-home' },
        { id: '5', value: 'Nhà riêng', isChecked: false, icon: 'fa-house-user' },
        { id: '6', value: 'Nhà biệt thự, liền kề', isChecked: false, icon: 'fa-house-user' },
        { id: '7', value: 'Nhà mặt phố', isChecked: false, icon: 'fa-store' },
        { id: '8', value: 'Shophouse, nhà phố thương mại', isChecked: false, icon: 'fa-shop' },
    ]);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                searchStore.setIsOpenSearchSuggest(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const searchValue = searchStore.searchValue.toLowerCase();

    const filteredData = data.filter(item =>
        item.value.toLowerCase().includes(searchValue)
    );

    return (
        <div ref={listRef} className={`list-group ${searchStore.isOpenSearchSuggest ? 'opensugest' : ''}`}
             style={{ width: '80%', position: 'absolute', top: '64%', left: '18%', zIndex: 1000, borderRadius: '4px 4px 4px 4px' }}>
            <div>
                {filteredData.map((item) => (
                    <label key={item.id} className="list-group-item border-bottom">
                        <div className="d-flex align-items-center">
                            <i className={`fas ${item.icon} me-2`}></i>
                            <a style={{
                                fontSize: '14px',
                                color: '#000',
                                textDecoration: 'none',
                            }} href="#">{item.value}</a>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default observer(RealEstateSearch);
