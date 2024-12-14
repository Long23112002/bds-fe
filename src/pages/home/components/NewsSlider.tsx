/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const newsItems = [
  {
    id: '1',
    number: '01',
    title: 'Văn Phòng Công Chứng Hoàng Mai Ở Đâu? Có Uy Tín Không?',
    imageUrl: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/12/2-van-phong-cong-chung-hoang-mai-ha-noi.jpg?height=300&width=500',
    link: '#'
  },
  {
    id: '2',
    number: '02',
    title: 'Lãi Suất Vay Ngân Hàng Sacombank Tháng 12/2024 - Từ 6,5%/Năm',
    imageUrl: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/03/lai-suat-ngan-hang-sacombank-ava.jpg?height=300&width=500',
    link: '#'
  },
  {
    id: '3',
    number: '03',
    title: 'Batdongsan.com.vn Ra Mắt Ứng Dụng Di Động Mới',
    imageUrl: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/12/BDS-AppLaunch_KV_square.png?height=300&width=500',
    link: '#'
  }
];

function NextArrow(props : any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle shadow-sm"
      style={{ zIndex: 10, right: '15px' }}
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
}

function PrevArrow(props : any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle shadow-sm"
      style={{ zIndex: 10, left: '25px' }}
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
}

export default function NewsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Tin tức bất động sản</h2>
      <div className="position-relative">
        <Slider {...settings}>
          {newsItems.map((item) => (
            <div key={item.id} className="px-2">
              <a href={item.link} className="text-decoration-none">
                <div className="position-relative overflow-hidden rounded">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-100 object-fit-cover transition"
                    style={{ height: '200px', transition: 'transform 0.3s' }}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="fs-3 fw-bold text-white">{item.number}</span>
                      <h3 className="fs-5 fw-medium text-white mb-0">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

