import { Skeleton } from 'antd';
import '../styles/location-card.css';
import { useState, useEffect } from 'react';
import { pageFilterStore } from '../../../stores/PageFilterStore';
import { useNavigate } from 'react-router-dom';

interface LocationData {
    name: string;
    listings: number;
    image: string;
    code?: string;
}

const locations: LocationData[] = [{ name: 'TP. Hồ Chí Minh', listings: 65712, code: '79', image: 'https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-1.jpg?height=400&width=800', }, { name: 'Hà Nội', listings: 61974, code: '01', image: 'https://file4.batdongsan.com.vn/images/newhome/cities1/HN-web-3.jpg?height=300&width=400', }, { name: 'Đà Nẵng', listings: 9212, code: '48', image: 'https://file4.batdongsan.com.vn/images/newhome/cities1/DDN-web-1.jpg?height=300&width=400', }, { name: 'Bình Dương', listings: 7386, code: '74', image: 'https://file4.batdongsan.com.vn/images/newhome/cities1/BD-web-2.jpg?height=300&width=400', }, { name: 'Đồng Nai', listings: 3868, code: '75', image: 'https://file4.batdongsan.com.vn/images/newhome/cities1/DDN-web-2.jpg?height=300&width=400', },];

export default function LocationCards() {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleLocationClick = (name: string, code: string) => {
      
        pageFilterStore.setParamSearch({
            ...pageFilterStore.paramSearch,
            provinceCode: code,
        })

        pageFilterStore.setValueSearch({
            ...pageFilterStore.valueSearchLabel,
            location: name,
        })
        navigate('/filter-page')
    };

    if (loading) {
        return (
            <div className="container my-5">
                <h2 className="mb-5">
                    <Skeleton.Input active size="small" style={{ width: 200 }} />
                </h2>
                <div className="row g-4">
                    <div className="col-lg-6 col-md-12">
                        <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="row g-4">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="col-lg-6 col-md-6 col-sm-12">
                                    <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-5">Bất động sản theo địa điểm</h2>
            <div className="row g-4">
                {/* Cột 1: TP. Hồ Chí Minh */}
                <div className="col-lg-6 col-md-12">
                    <div
                        className="card w-100 cursor-pointer shadow-sm"
                        onClick={() => handleLocationClick(locations[0].name, locations[0].code || '')}
                    >
                        <div className="position-relative" style={{ height: '100%' }}>
                            <img
                                src={locations[0].image}
                                alt={locations[0].name}
                                className="object-cover w-100 h-100"
                                style={{
                                    objectFit: 'cover',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                            <div className="position-absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white h4">{locations[0].name}</h3>
                                <p className="text-white">
                                    {locations[0].listings.toLocaleString()} tin đăng
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cột 2: Các địa điểm còn lại */}
                <div className="col-lg-6 col-md-12">
                    <div className="row g-4">
                        {locations.slice(1).map((location, index) => (
                            <div key={index} className="col-lg-6 col-md-6 col-sm-12">
                                <div
                                    className="card w-100 cursor-pointer shadow-sm"
                                    onClick={() => handleLocationClick(location.name, location.code || '')}
                                >
                                    <div className="position-relative" style={{ height: '200px' }}>
                                        <img
                                            src={location.image}
                                            alt={location.name}
                                            className="object-cover w-100 h-100"
                                            style={{
                                                objectFit: 'cover',
                                                height: '100%',
                                                width: '100%',
                                            }}
                                        />
                                        <div className="position-absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                            <h3 className="text-white h6">{location.name}</h3>
                                            <p className="text-white">
                                                {location.listings.toLocaleString()} tin đăng
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
