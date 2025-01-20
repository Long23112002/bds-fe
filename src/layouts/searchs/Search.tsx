 
/* eslint-disable react-refresh/only-export-components */
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import '../../layouts/searchs/styles/search.css';
import CheckBoxList from './components/CheckBoxSearch';
import { searchStore } from '../../stores/SearchStore';
import RealEstateSearch from './components/RealEstateSearch';
import LocationFilter from './components/LocationFilter';
import { Tooltip } from 'antd';
import PriceFilter from './components/PriceFilter';
import AreaFilter from './components/AreaFilter';
import FilterOption from './components/FilterOption';
import { pageFilterStore } from '../../stores/PageFilterStore';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [demand, setDemand] = useState('');
    const nav = useNavigate();

    const handleOpentMenu = () => {
        searchStore.setIsOpenMenuButton(!searchStore.isOpenMenuButton)
    }

    const handelOpenLocaltionForm = () => {
        searchStore.setIsLocaltionFilterModal(!searchStore.isLocaltionFilterModal);
        console.log(searchStore.isLocaltionFilterModal);

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

    const valueSearchLabel = pageFilterStore.valueSearchLabel;


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


    const handleClickFilter = () => {

        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            demand: demand === 'SELL' ? 'SELL' : 'RENT',
        })
        nav('/filter-page')
    }


    const displayText = valueSearchLabel?.location?.length > 20 ? `${valueSearchLabel.location.slice(0, 20)}...` : valueSearchLabel.location;



    return (
        <>
            <div className=" search-bar tab-section  mx-auto mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li onClick={() => setDemand('SELL')} className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            Nhà đất bán
                        </button>
                    </li>
                    <li onClick={() => setDemand('RENT')} className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                            Nhà đất cho thuê
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
                                    onChange={(e) => pageFilterStore.setParamSearch({
                                        ...pageFilterStore.paramSearch,
                                        keyword: e.target.value
                                    })}
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
                                    <span onClick={handleClickFilter} className='m-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>Tìm kiếm</span>
                                </button>
                            </div>

                        </div>
                        <CheckBoxList />
                        <RealEstateSearch />

                        <div className="row m-1" style={{ position: 'relative', bottom: '50px' }}>
                            <div className="col-6 col-md-3" onClick={handelOpenLocaltionForm}>
                                <Tooltip title={valueSearchLabel.location || ""} placement="bottom">
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
                                    {valueSearchLabel.price || 'Mức giá'}
                                    <span><i className="fas fa-chevron-down"></i></span>
                                </button>
                            </div>
                            <div className="col-6 col-md-3">
                                <button onClick={handelOpenModalArea}
                                    className="custom-button d-flex">
                                    {valueSearchLabel.arena || 'Diện tích'}
                                    <span><i className="fas fa-chevron-down"></i></span></button>
                            </div>
                            <div className="col-6 col-md-2">
                                <Tooltip title={""} placement="bottom">
                                    <button onClick={handelOpenFilterOption} className="custom-button d-flex">
                                        {'Lọc thêm'} <span><i className="fas fa-chevron-down"></i></span></button>
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
                                        onChange={(e) => pageFilterStore.setParamSearch({
                                            ...pageFilterStore.paramSearch,
                                            keyword: e.target.value
                                        })}
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
                                        <span onClick={handleClickFilter} className='m-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>Tìm kiếm</span>
                                    </button>
                                </div>

                            </div>
                            <CheckBoxList />
                            <RealEstateSearch />

                            <div className="row m-1" style={{ position: 'relative', bottom: '50px' }}>
                                <div className="col-6 col-md-3" onClick={handelOpenLocaltionForm}>
                                    <Tooltip title={valueSearchLabel.location || ""} placement="bottom">
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
                                        {valueSearchLabel.price || 'Mức giá'}
                                        <span><i className="fas fa-chevron-down"></i></span>
                                    </button>
                                </div>
                                <div className="col-6 col-md-3">
                                    <button onClick={handelOpenModalArea}
                                        className="custom-button d-flex">
                                        {valueSearchLabel.arena || 'Diện tích'}
                                        <span><i className="fas fa-chevron-down"></i></span></button>
                                </div>
                                <div className="col-6 col-md-2">
                                    <Tooltip title={""} placement="bottom">
                                        <button onClick={handelOpenFilterOption} className="custom-button d-flex">
                                            {'Lọc thêm'} <span><i className="fas fa-chevron-down"></i></span></button>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(Search);

