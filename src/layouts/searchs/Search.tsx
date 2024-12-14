/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import '../../layouts/searchs/styles/search.css';
import CheckBoxList from './components/CheckBoxSearch';
import { searchStore } from '../../stores/SearchStore';
import RealEstateSearch from './components/RealEstateSearch';
import LocationFilter from './components/LocationFilter';
import { Tooltip } from 'antd';
import PriceFilter from './components/PriceFilter';
import AreaFilter from './components/AreaFilter';
import FilterOption from './components/FilterOption';

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOpentMenu = () => {
        searchStore.setIsOpenMenuButton(!searchStore.isOpenMenuButton)
    }

    const handleSearchToggle = () => {
        searchStore.setIsOpenSearchSuggest(!searchStore.isOpenSearchSuggest);
    };

    const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchStore.setSearchValue(e.target.value);
        searchStore.setIsOpenSearchSuggest(true);
    }

    const handelOpenLocaltionForm = () => {
        searchStore.setIsLocaltionFilterModal(!searchStore.isLocaltionFilterModal);

    }

    const handelOpenModalPrice = () => {
        searchStore.setIsModalPeiceFilter(!searchStore.isModalPeiceFilter);
    }

    const handelOpenModalArea = () => {
        searchStore.setIsOpenArenaFilter(!searchStore.isOpenArenaFilter);
    }

    const handelOpenFilterOption = () => {
        searchStore.setIsfilterOption(!searchStore.isfilterOption);
    }

    const { searchLocation, priceSearchValue, areaSearchValue, filterOptionValue } = searchStore;

    const optionText = [
        filterOptionValue?.bedroomVietnamese?.length > 0 ? `Phòng ngủ: ${filterOptionValue?.bedroomVietnamese.join(", ")}` : "",
        filterOptionValue?.directionsVietnamese?.length > 0 ? `Hướng nhà: ${filterOptionValue?.directionsVietnamese.join(", ")}` : "",
        filterOptionValue?.contentVietnamese?.length > 0 ? `Nội dung tin: ${filterOptionValue?.contentVietnamese.join(", ")}` : ""
    ]
        .filter((value) => value)
        .join(", ");


    const displayOptionText = optionText?.length > 10 ? `${optionText.slice(0, 11)}...` : optionText;



    const mapPriceToDescription = (priceSearchValue: any) => {
        const { min, max } = priceSearchValue;

        if (min === 0 && max === 0) {
            return "Tất cả mức giá";
        }

        if (min === 0 && max !== 0) {
            return `<= ${max >= 1000 ? (max / 1000).toFixed(1) + " tỷ" : max + " triệu"
                }`;
        }

        if (min !== 0 && max !== 0) {
            const minLabel =
                min >= 1000 ? (min / 1000).toFixed(1) + " tỷ" : min + " triệu";
            const maxLabel =
                max >= 1000 ? (max / 1000).toFixed(1) + " tỷ" : max + " triệu";
            return `${minLabel} - ${maxLabel}`;
        }

        return "Không xác định";
    };

    const mapAreaToDescription = (areaSearchValue: any) => {
        const { min, max } = areaSearchValue;

        if (min === 0 && max === 0) {
            return "Tất cả diện tích";
        }

        if (min === 0 && max !== 0) {
            return `<= ${max} m²`;
        }

        if (min !== 0 && max !== 0) {
            return `${min} - ${max} m²`;
        }

        return "Không xác định";
    };

    const handelResetFilterForm = () => {
        searchStore.setSearchLocation({});
        searchStore.setPriceSearchValue({
            min: 0,
            max: 0
        });
        searchStore.setIsOpenArenaFilter(false);
        searchStore.setAreaSearchValue({
            min: 0,
            max: 0
        });
        searchStore.setIsfilterOption(false);
        searchStore.setFilterOptionValue({
            bedroom: [],
            bedroomVietnamese: [],
            directions: [],
            directionsVietnamese: [],
            content: [],
            contentVietnamese: []
        });
        searchStore.setIsModalPeiceFilter(false);
    }

    const locationText = ["project", "street", "ward", "district", "province"]
        .map((key) => searchLocation[key as keyof typeof searchLocation])
        .filter((value) => value)
        .join(", ");

    const displayText = locationText.length > 20 ? `${locationText.slice(0, 20)}...` : locationText;



    return (
        <>
            <div className="tab-section  mx-auto mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            Nhà đất bán
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                            Nhà đất cho thuê
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
                            Dự án
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="search-container tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className='tab-custom d-flex justify-content-center align-items-start pt-3'>
                            <div style={{
                                width: '96%',
                                display: 'flex',
                                alignItems: 'center',
                                height: '40%',
                            }} className='d-flex justify-content-center align-items-center'>
                                <button onClick={handleOpentMenu} className='btn btn-dark btn-dark-search'>
                                    <span className="icon-search">
                                        <i className="fa-solid fa-house"></i>
                                    </span>
                                    <span className='m-2' style={{ fontSize: '13px', fontWeight: 'bold' }} >Loại nhà đất</span>
                                    <span className="icon-search">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </span>
                                </button>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="form-control input-search"
                                    placeholder='Nhập từ khóa tìm kiếm'
                                    onFocus={handleSearchToggle}
                                    onChange={handleSearchFilter}
                                />
                                <button
                                    className='btn btn-danger'
                                    style={{
                                        position: 'absolute',
                                        right: '30px',
                                    }}>
                                    <span className="icon-search">
                                        <i className="fas fa-search" />
                                    </span>
                                    <span className='m-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>Tìm kiếm</span>
                                </button>
                            </div>

                        </div>
                        <CheckBoxList />
                        <RealEstateSearch />

                        <div className="row m-1" style={{ position: 'relative', bottom: '50px' }}>
                            <div className="col-6 col-md-3" onClick={handelOpenLocaltionForm}>
                                <Tooltip title={locationText || ""} placement="bottom">
                                    <button className="custom-button w-100 d-flex justify-content-between align-items-center">
                                        {displayText || "Trên toàn quốc"}
                                        <span className="">
                                            <i className="fas fa-chevron-down"></i>
                                        </span>
                                    </button>
                                </Tooltip>
                            </div>
                            <div className="col-6 col-md-3">
                                <button onClick={handelOpenModalPrice} className="custom-button w-100 d-flex">
                                    {mapPriceToDescription(priceSearchValue) || 'Mức giá'}
                                    <span><i className="fas fa-chevron-down"></i></span>
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button onClick={handelOpenModalArea}
                                    className="custom-button d-flex">
                                    {mapAreaToDescription(areaSearchValue) || 'Diện tích'}
                                    <span><i className="fas fa-chevron-down"></i></span></button>
                            </div>
                            <div className="col-6 col-md-2">
                                <Tooltip title={optionText || ""} placement="bottom">
                                    <button onClick={handelOpenFilterOption} className="custom-button d-flex">
                                        {displayOptionText || 'Lọc thêm'} <span><i className="fas fa-chevron-down"></i></span></button>
                                </Tooltip>
                            </div>

                            {/* Nút Đặt lại */}
                            <div className="col-12 col-md-1">
                                <button onClick={handelResetFilterForm} style={{
                                    border: 'none'
                                }} className="custom-button"><i className="fa-solid fa-arrows-rotate"></i></button>
                            </div>
                        </div>

                        <LocationFilter />
                        <PriceFilter />
                        <AreaFilter />
                        <FilterOption />
                    </div>


                    <div className="search-container tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    </div>
                    <div className=" search-container tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>
            </div>
        </>
    )
}

export default observer(Search);

