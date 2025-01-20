/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Input, Select, Switch, Button, Card, Badge, Row, Typography, Space, Col, Divider, Tooltip, Pagination } from 'antd'
import { SearchOutlined, EnvironmentOutlined, HomeOutlined, BankOutlined, HeartOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'

import '../filter/styles/filter-style.css'
import { countProvinceApi, PostParam } from '../../api/posts'
import { Link } from 'react-router-dom'
import PageArenaFilter from './components/PageArenaFilter'
import { pageFilterStore } from '../../stores/PageFilterStore'
import PagePriceFilter from './components/PagePriceFilter'
import PageFilterOption from './components/PageFilterOption'
import PageLocationFilter from './components/PageLocationFilter'
import PageCheckBoxSearch from './components/PageCheckBoxSearch'
import { observer } from 'mobx-react-lite'
import { favoriteStore } from '../../stores/FavoriteStore'
import { newFavoriteApi } from '../../api/favorite'
import Cokie from 'js-cookie'
import { authStore } from '../../stores/AuthStore'

const { Option } = Select
const { Title, Text } = Typography;

const FillterPage = () => {
    const [searchLocation, setSearchLocation] = useState('Trên toàn quốc')
    const [currentImage, setCurrentImage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedType, setSelectedType] = useState<"sell" | "rent">("sell")
    const [keyword, setKeyword] = useState<string | null>(null);

    const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
    const [selectedAreaRange, setSelectedAreaRange] = useState<{ min: number; max: number } | null>(null);
    const [countProvice, setCountProvice] = useState<any>([]);

    const priceRanges = selectedType === "sell" ? [
        { label: "Thỏa thuận", min: 0, max: 0 },
        { label: "Dưới 500 triệu", min: 0, max: 500000000 },
        { label: "500 - 800 triệu", min: 500000000, max: 800000000 },
        { label: "800 triệu - 1 tỷ", min: 800000000, max: 1000000000 },
        { label: "1 - 2 tỷ", min: 1000000000, max: 2000000000 },
        { label: "2 - 3 tỷ", min: 2000000000, max: 3000000000 },
        { label: "3 - 5 tỷ", min: 3000000000, max: 5000000000 },
        { label: "5 - 7 tỷ", min: 5000000000, max: 7000000000 },
        { label: "7 - 10 tỷ", min: 7000000000, max: 10000000000 },
        { label: "20 - 30 tỷ", min: 20000000000, max: 30000000000 },
    ] : [
        { label: "Thỏa thuận", min: 0, max: 0 },
        { label: "Dưới 1 triệu", min: 0, max: 1000000 },
        { label: "1 - 3 triệu", min: 1000000, max: 3000000 },
        { label: "3 - 5 triệu", min: 3000000, max: 5000000 },
        { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
        { label: "10 - 40 triệu", min: 10000000, max: 40000000 },
        { label: "40 - 70 triệu", min: 40000000, max: 70000000 },
        { label: "70 - 100 triệu", min: 70000000, max: 100000000 },
        { label: "Trên 100 triệu", min: 100000000, max: Infinity },
    ];


    const areaRanges = [
        { label: "Dưới 30 m²", min: 0, max: 30 },
        { label: "30 - 50 m²", min: 30, max: 50 },
        { label: "50 - 80 m²", min: 50, max: 80 },
        { label: "80 - 100 m²", min: 80, max: 100 },
        { label: "100 - 150 m²", min: 100, max: 150 },
        { label: "150 - 200 m²", min: 150, max: 200 },
        { label: "200 - 250 m²", min: 200, max: 250 },
        { label: "250 - 300 m²", min: 250, max: 300 },
        { label: "300 - 500 m²", min: 300, max: 500 },
        { label: "Trên 500 m²", min: 500, max: 10000000 },
    ];

    const handleAreaRangeClick = (min: number, max: number) => {
        setSelectedAreaRange({ min, max });

        const selectedAreaLabel = areaRanges.find(range => range.min === min && range.max === max)?.label;

        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            maxArea: max,
            minArea: min,
        });

        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            arena: selectedAreaLabel
        })
    };

    const handlePriceRangeClick = (min: number, max: number) => {
        setSelectedPriceRange({ min, max });

        const selectedPriceLabel = priceRanges.find(range => range.min === min && range.max === max)?.label;


        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            minPrice: min,
            maxPrice: max,
        });

        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            price: selectedPriceLabel
        })
    };


    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);




    const visibleItems = isExpanded ? priceRanges : priceRanges.slice(0, 10);


    useEffect(() => {
        console.log(pageFilterStore.paramSearch);
    }, [])



    useEffect(() => {
        const fetchPostFilter = async () => {
            const param: PostParam = {
                page: currentPage - 1,
                size: 10,
            }
            if (param) {
                pageFilterStore.setParamSearch({
                    ...pageFilterStore.paramSearch,
                    page: pageFilterStore.paramSearch.page,
                    size: 10,
                });

            }
        };
        fetchPostFilter();
    }, [currentPage]);

    useEffect(() => {
        const fetchCountProvince = async () => {
            const res = await countProvinceApi(selectedType.toUpperCase());
            setCountProvice(res);
        };
        fetchCountProvince();
    }, [selectedType]);



    const formatPrice = (price: number | string) => {
        const priceValue = typeof price === 'number' ? price : parseFloat(price as string);

        if (isNaN(priceValue)) {
            return "Giá không hợp lệ";
        }

        if (priceValue >= 1e9) {
            return `${(priceValue / 1e9).toFixed(1)} tỷ`;
        } else if (priceValue >= 1e6) {
            return `${(priceValue / 1e6).toFixed(0)} triệu`;
        } else if (priceValue >= 1e3) {
            return `${(priceValue / 1e3).toFixed(0)} nghìn`;
        }

        return priceValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    function extractDistrictAndCity(address: string): string {
        const parts = address.split(',');
        const districtAndCity = parts.slice(-2).join(',').trim();
        return districtAndCity;
    }

    const handlePageChange = (newPage: number) => {
        pageFilterStore.setParamSearch({ page: newPage });
        window.scrollTo(0, 0);
    };

    const handelKeywordChange = (value: string) => {
        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            keyword: value
        })
    }

    const handleProvinceClick = (provinceCode: string, provinceName: string) => {
        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            location: provinceName
        })
        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            provinceCode: provinceCode
        })
    }


    const handelResetFormSearch = () => {
        pageFilterStore.setParamSearch({
            minPrice: 0,
            maxPrice: 0,
            provinceCode: '',
            districtCode: '',
            wardCode: '',
            street: '',
            keyword: '',
            maxArea: 0,
            minArea: 0,
            residentialPropertyIds: new Set<number>(),
            houseDirectionIds: new Set<number>(),
            balconyDirectionIds: new Set<number>(),
            numBerOfBedrooms: new Set<number>(),
            page: 0,
            size: 100000,
            status: '',
            demand: '',
            media: new Set<string>(),
        });
        pageFilterStore.setValueSearch({
            price: '',
            arena: '',
            location: '',
            checkboxQuantity: 0,
            redesinal: ''
        })
    }

    const handleSelectType = (type: 'SELL' | 'RENT') => {

        return () => {
            setSelectedType(type === 'SELL' ? 'sell' : 'rent');
            pageFilterStore.setParamSearch({
                ...pageFilterStore.paramSearch,
                demand: type
            });
        };
    };


    const handleClickAddFavorite = async (e: any, postId: number) => {
        e.stopPropagation();
        e.preventDefault();
        const req = {
            postId: postId
        }
        await newFavoriteApi(req);
        await favoriteStore.fetchListFavorite();
    };


    const handleClickRemoveFavorite = async (e: any, postId: number) => {
        e.stopPropagation();
        e.preventDefault();
        await favoriteStore.deleteFavorite(postId);
        await favoriteStore.fetchListFavorite();
    }



    return (
        <>
            <div className="sticky-header">
                <div className="container-fluid d-flex align-items-center gap-3">
                    {/* Toggle buttons */}
                    <div className="btn-group">
                        <Button
                            type={pageFilterStore.paramSearch.demand === "SELL" || pageFilterStore.paramSearch.demand === "" ? "primary" : "default"}
                            onClick={handleSelectType('SELL')}
                            className="rounded-start"
                        >
                            Bán
                        </Button>
                        <Button
                            type={pageFilterStore.paramSearch.demand === "RENT" ? "primary" : "default"}
                            onClick={handleSelectType('RENT')}
                            className="rounded-end mx-2"
                        >
                            Cho thuê
                        </Button>
                    </div>

                    {/* Search input */}
                    <Input
                        placeholder="Dự án Vinhomes Ocean Park"
                        prefix={<SearchOutlined />}
                        className="search-input"
                        onChange={(e) => handelKeywordChange(e.target.value)}
                        value={pageFilterStore.paramSearch.keyword}

                    />

                    {/* Dropdown filters */}
                    <Space className="dropdown-filters" >

                        <Button onClick={() => {
                            pageFilterStore.setIsOpenMenuButton(!pageFilterStore.isOpenMenuButton)
                        }}>
                            Loại nhà đất
                            <span className="ms-2 text-primary">
                                {pageFilterStore.valueSearchLabel.price === '' || pageFilterStore.valueSearchLabel.price === null
                                    ? 'Tất cả'
                                    : pageFilterStore.valueSearchLabel.price}
                            </span>
                        </Button>



                        <Button onClick={() => pageFilterStore.setIsLocaltionFilterModal(!pageFilterStore.isLocaltionFilterModal)}>
                            Khu vực & Dự án
                            <span className="ms-2 text-primary">
                                {pageFilterStore.valueSearchLabel.location === '' || pageFilterStore.valueSearchLabel.location === null
                                    ? 'Toàn quốc'
                                    : pageFilterStore.valueSearchLabel.location}
                            </span>
                        </Button>


                        <Button onClick={() => pageFilterStore.setIsModalPeiceFilter(!pageFilterStore.isModalPeiceFilter)}>
                            Mức giá
                            <span className="ms-2 text-primary">
                                {pageFilterStore.valueSearchLabel.price === '' || pageFilterStore.valueSearchLabel.price === null
                                    ? 'Tất cả'
                                    : pageFilterStore.valueSearchLabel.price}
                            </span>
                        </Button>


                        {/* <Dropdown menu={{ items: sizes }} trigger={["click"]}> */}
                        <Button onClick={() => pageFilterStore.setIsOpenArenaFilter(!pageFilterStore.isOpenArenaFilter)}>
                            Diện tích
                            <span className="ms-2 text-primary">
                                {pageFilterStore.valueSearchLabel.arena === '' || pageFilterStore.valueSearchLabel.arena === null
                                    ? 'Tất cả'
                                    : pageFilterStore.valueSearchLabel.arena}
                            </span>
                        </Button>
                        {/* </Dropdown> */}
                    </Space>

                    {/* Additional options */}
                    <Button onClick={() => pageFilterStore.setIsfilterOption(!pageFilterStore.isfilterOption)} >
                        <Badge
                            count={pageFilterStore.valueSearchLabel.checkboxQuantity}
                            style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                fontSize: '10px',
                                marginLeft: '8px',
                            }}
                        />
                        <i className="fa-solid fa-arrow-up-wide-short"></i>
                        Lọc thêm
                    </Button>
                    <Button onClick={handelResetFormSearch}>
                        <i className="fa-solid fa-arrows-rotate"></i>
                        Đặt lại
                    </Button>
                    <PageArenaFilter />
                    <PagePriceFilter />
                    <PageCheckBoxSearch />
                    <PageFilterOption />
                    <PageLocationFilter />
                </div>
            </div>


            <div className="container px-4 mt-3">


                {/* Main Content */}
                <div className="row">
                    {/* Property Listings */}
                    <div className="col-md-9">
                        <div className="listing-header d-flex justify-content-between align-items-center mb-3">
                            <h1 className="h5 mb-0">Mua bán nhà đất trên toàn quốc, giá thỏa thuận</h1>
                            <span className="text-muted">Hiện có {pageFilterStore.totalPosts} bất động sản</span>
                        </div>

                        <div className="listing-filters d-flex gap-3 mb-3">
                            <Button icon={<EnvironmentOutlined />}>Xem trên bản đồ</Button>
                            <div className="d-flex align-items-center gap-2">
                                <span>Môi giới chuyên nghiệp</span>
                                <Switch size="small" />
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span>Tin xác thực</span>
                                <Switch size="small" />
                            </div>
                        </div>

                        {/* Property Cards */}
                        {pageFilterStore.postFilterResult && pageFilterStore.postFilterResult.length > 0 ? (
                            pageFilterStore.postFilterResult.map((post: any) => (
                                <Link key={post.id} to={`/post-detail/${post.id}`} style={{
                                    textDecoration: 'none',
                                    color: '#2C2C2C'
                                }}>
                                    <div className="mb-3">
                                        <Badge.Ribbon placement="start" text={
                                            post.codePlant === 'daimond' ? 'VIP KIM CƯƠNG' : post.codePlant === 'gold' ? 'VIP VÀNG' : post.codePlant === 'silver' ? 'VIP BẠC' : ''
                                        } color={
                                            post.codePlant === 'daimond' ? 'red' : post.codePlant === 'gold' ? 'yellow' : post.codePlant === 'silver' ? 'gray' : ''
                                        }>
                                            <Card
                                                style={{
                                                    maxWidth: 800,
                                                }}
                                                bodyStyle={{ padding: 12 }}
                                            >
                                                <Row gutter={[8, 8]}>
                                                    <Col xs={24} sm={24} md={12}>
                                                        <img
                                                            src={post?.images[0]?.url}
                                                            alt="Main Property"
                                                            style={{
                                                                width: '100%',
                                                                height: '300px',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px',
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col xs={0} sm={0} md={12}>
                                                        <Row gutter={[8, 8]}>
                                                            <Col span={24}>
                                                                <img
                                                                    src={post?.images[1]?.url}
                                                                    alt="Property 1"
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '146px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer',
                                                                        marginBottom: '8px'
                                                                    }}
                                                                    onClick={() => setCurrentImage(1)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={[8, 8]}>
                                                            {post.images.slice(2, 4).map((img: any, index: number) => (
                                                                <Col span={12} key={index}>
                                                                    <img
                                                                        src={img?.url || 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'}
                                                                        alt={`Property ${index + 3}`}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '146px',
                                                                            objectFit: 'cover',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                        onClick={() => setCurrentImage(index + 2)}
                                                                    />
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <div style={{ padding: '12px 0' }}>
                                                    <Title level={5} style={{ margin: '8px 0' }}>
                                                        {post.title}
                                                    </Title>

                                                    <Space split={<Divider type="vertical" />} wrap>
                                                        <Text type="danger" strong>
                                                            {post.price * post.arena === 0 ? 'Thỏa thuận' : formatPrice(post.price * post.arena)}
                                                        </Text>
                                                        <Text>{post.arena} m²</Text>
                                                        <Text>{post.pricePerMeter} tr/m²</Text>
                                                        <Space>
                                                            <Tooltip title="Số phòng ngủ">
                                                                <HomeOutlined />
                                                            </Tooltip>
                                                            <Text>{post.numberOfBedrooms}</Text>
                                                        </Space>
                                                        <Space>
                                                            <Tooltip title="Số tầng">
                                                                <BankOutlined />
                                                            </Tooltip>
                                                            <Text>{post.floors}</Text>
                                                        </Space>
                                                        <Text>{extractDistrictAndCity(post.street)}</Text>
                                                    </Space>

                                                    <Row
                                                        justify="space-between"
                                                        align="middle"
                                                        style={{ marginTop: 16 }}
                                                    >
                                                        <Space>
                                                            <img
                                                                src={post?.user?.avatar || 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
                                                                alt="Agent"
                                                                style={{
                                                                    width: 40,
                                                                    height: 40,
                                                                    borderRadius: '50%',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                            <div>
                                                                <Text strong>{post?.user?.fullName}</Text>
                                                                <br />
                                                                <Text type="secondary">Đăng hôm nay</Text>
                                                            </div>
                                                        </Space>

                                                        <Space>
                                                            <Tooltip
                                                                title={
                                                                    favoriteStore.listFavorite.some((fav: any) => fav.post.id === post?.id)
                                                                        ? "Bấm để bỏ lưu tin"
                                                                        : "Bấm để lưu tin"
                                                                }
                                                                placement="bottom"
                                                            >
                                                                <Button
                                                                    onClick={(e) => {
                                                                        const token = Cokie.get('accessToken');
                                                                        if (!token) {
                                                                            authStore.setIsOpenLoginModal(true);

                                                                        }

                                                                        const isFavorite = favoriteStore.listFavorite.some(
                                                                            (fav: any) => fav.post.id === post?.id
                                                                        );

                                                                        if (isFavorite) {
                                                                            handleClickRemoveFavorite(e, post?.id);
                                                                        } else {
                                                                            handleClickAddFavorite(e, post?.id);
                                                                        }
                                                                    }}
                                                                    className="btn"
                                                                    style={{
                                                                        background: 'none',
                                                                        padding: '0px',
                                                                        width: '34px',
                                                                        height: '34px',
                                                                        border: '1px solid #ccc',
                                                                    }}
                                                                >
                                                                    {favoriteStore.listFavorite.some((fav: any) => fav.post.id === post?.id) ? (
                                                                        <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                                                                    ) : (
                                                                        <i className="far fa-heart" style={{ cursor: 'pointer' }}></i>
                                                                    )}
                                                                </Button>
                                                            </Tooltip>
                                                        </Space>
                                                    </Row>
                                                </div>

                                            </Card>
                                        </Badge.Ribbon>
                                    </div>
                                </Link>

                            ))
                        ) : (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                {/* <img
                                    src="https://via.placeholder.com/300?text=Không+có+bài+viết+phù+hợp"
                                    alt="No Data"
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        objectFit: 'contain',
                                        marginBottom: '16px',
                                    }}
                                /> */}
                                <Text type="secondary">Không tìm thấy bài viết nào phù hợp.</Text>
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination
                            current={(pageFilterStore.paramSearch.page ?? 0) + 1}
                            total={pageFilterStore.totalPosts}
                            pageSize={20}
                            onChange={(page) => handlePageChange(page - 1)}
                            showSizeChanger={false}

                            style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px ', display: 'flex', justifyContent: 'center' }}
                        />
                    </div>

                    {/* Sidebar Filters */}
                    <div className="col-md-3">

                        <Card className="mb-3" title="Lọc theo khoảng giá" bordered={true}>
                            <ul className="list-unstyled">
                                {priceRanges.map((range, index) => (
                                    <li key={index} className='pt-2' style={{ cursor: 'pointer' }}>
                                        <a
                                            href="#"

                                            className="text-decoration-none"
                                            onClick={() => handlePriceRangeClick(range.min, range.max)}
                                        >
                                            {range.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </Card>

                        <Card className="mb-3" title="Lọc theo diện tích" bordered={true}>
                            <ul className="list-unstyled">
                                {areaRanges.map((range, index) => (
                                    <li key={index} className='pt-2' style={{ cursor: 'pointer' }}>
                                        <a
                                            href="#"
                                            className="text-decoration-none"
                                            onClick={() => handleAreaRangeClick(range.min, range.max)}
                                        >
                                            {range.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </Card>

                        <Card className="mb-3" title="Mua bán nhà đất" bordered={true}>
                            <ul className="list-unstyled">
                                {countProvice.map((item: any) => (
                                    <li key={item.code}>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            handleProvinceClick(item.code, item.provinceName);
                                        }} className="text-decoration-none">{`${item.provinceName}(${item.count})`}</a>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                style={{ width: '100%', color: 'red' }}
                                type="link"
                                onClick={toggleExpand}
                                icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                            >
                                {isExpanded ? "Thu gọn" : "Xem thêm"}
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </>

    )
}

export default observer(FillterPage);

