import { Input, Select, Button } from 'antd';
import { SendOutlined, GlobalOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <footer className=" py-5" style={{
        backgroundColor:"#F2F2F2"
    }}>
      <div className="container">
        {/* Logo and Company Info */}
        <div className="row mb-4">
          <div className="col-md-4">
            <img
              src="https://staticfile.batdongsan.com.vn/images/logo/standard/black/logo_gray-5.svg"
              alt="Batdongsan Logo"
              width={200}
              height={50}
              className="mb-3"
            />
            <h5 className="text-uppercase mb-3">CÔNG TY CỔ PHẦN PROPERTYGURU VIỆT NAM</h5>
            <p className="mb-2">
              <i className="me-2 bi bi-geo-alt"></i>
              Tầng 31, Keangnam Hanoi Landmark, Phạm Hùng, Nam Từ Liêm, Hà Nội
            </p>
            <p className="mb-3">
              <i className="me-2 bi bi-telephone"></i>
              (024) 3562 5939 - (024) 3562 5940
            </p>
            <div className="d-flex gap-3 mb-4">
              <img
                src="https://staticfile.batdongsan.com.vn/images/app/qr-app.png"
                alt="QR Code"
                width={100}
                height={100}
              />
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://staticfile.batdongsan.com.vn/images/mobile/footer/google-play.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
                <img
                  src="https://staticfile.batdongsan.com.vn/images/mobile/footer/app_store.png"
                  alt="App Store"
                  width={120}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-md-2">
            <h6 className="text-uppercase mb-3">HƯỚNG DẪN</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Về chúng tôi</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Báo giá và hỗ trợ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Câu hỏi thường gặp</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Góp ý báo lỗi</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Sitemap</a></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6 className="text-uppercase mb-3">QUY ĐỊNH</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Quy định đăng tin</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Quy chế hoạt động</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Điều khoản thỏa thuận</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Chính sách bảo mật</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Giải quyết khiếu nại</a></li>
            </ul>
          </div>

          {/* Newsletter and Language */}
          <div className="col-md-4">
            <h6 className="text-uppercase mb-3">ĐĂNG KÝ NHẬN TIN</h6>
            <div className="mb-4">
              <Input.Group compact>
                <Input 
                  style={{ width: 'calc(100% - 40px)' }} 
                  placeholder="Nhập email của bạn"
                />
                <Button 
                  type="primary"
                  icon={<SendOutlined />}
                  style={{ width: '40px' }}
                />
              </Input.Group>
            </div>

            <h6 className="text-uppercase mb-3">QUỐC GIA & NGÔN NGỮ</h6>
            <Select
              defaultValue="vietnam"
              style={{ width: '100%' }}
              suffixIcon={<GlobalOutlined />}
            >
              <Select.Option value="vietnam">Việt Nam</Select.Option>
            </Select>
          </div>
        </div>

        {/* Branch Offices */}
        <div className="row mb-4">
          <div className="col-12">
            <h6 className="mb-3 d-flex align-items-center">
              <span className="me-2">Xem chi nhánh của Batdongsan.com.vn</span>
              <i className="bi bi-chevron-down"></i>
            </h6>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Chi nhánh TP. Hồ Chí Minh</h6>
            <p className="small mb-1">Tầng 3, Tháp B tòa nhà Viettel Complex, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP. Hồ Chí Minh</p>
            <p className="small">Hotline: 1900 1881 - Mobile: 0904 893 279</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Chi nhánh Hải Phòng</h6>
            <p className="small mb-1">Phòng 502, TD Business Center, lô 20A Lê Hồng Phong, quận Ngô Quyền, TP. Hải Phòng</p>
            <p className="small">Hotline: 1900 1881 - Mobile: 0903 456 322</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Chi nhánh Bình Dương</h6>
            <p className="small mb-1">Phòng 10, tầng 16, Becamex Tower, số 230 Đại lộ Bình Dương, Phú Hòa, TP.Thủ Dầu Một, tỉnh Bình Dương</p>
            <p className="small">Hotline: 1900 1881 - Mobile: 0919 255 580</p>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="row border-top pt-4">
          <div className="col-md-8">
            <p className="small mb-2">Copyright © 2007 - 2024 Batdongsan.com.vn</p>
            <p className="small mb-2">Giấy ĐKKD số 0104630479 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 02/06/2010</p>
            <p className="small mb-2">Giấy phép thiết lập trang thông tin điện tử tổng hợp trên mạng số 191/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 31/08/2023</p>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-end gap-3">
              <img
                src="https://staticfile.batdongsan.com.vn/images/newhome/da-dang-ki-bct.svg"
                alt="Certification"
                width={100}
                height={40}
              />
              <div className="d-flex gap-2">
                <a href="#" className="text-dark"><i className="bi bi-facebook fs-5"></i></a>
                <a href="#" className="text-dark"><i className="bi bi-youtube fs-5"></i></a>
                <a href="#" className="text-dark"><i className="bi bi-twitter fs-5"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
