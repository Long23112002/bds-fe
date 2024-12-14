import { Tabs, Skeleton, Card } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

export default function NewsTabsLayout() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 3000);
  }, []);

  return (
    <div style={{ backgroundColor: 'white', height: '620px' }}>
      <div className="container mt-4">
        <Tabs
          defaultActiveKey="featured"
          tabBarExtraContent={
            <a href="/xem-them" className="text-danger d-flex align-items-center">
              Xem thêm <i className="fa-solid fa-arrow-right" style={{ color: '#ff0033', padding: '0 0 0 5px' }}></i>
            </a>
          }
        >
          <TabPane tab={<span className="fs-5">Tin nổi bật</span>} key="featured">
            {loading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              <div className="row g-2">
                <div className="col-md-8">
                  <Card
                    cover={
                      <img
                        src="https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/12/Error-Alert-Failure-Icon-Problem-Concept.png"
                        alt="Bất động sản"
                        style={{ height: '400px', objectFit: 'cover' }}
                      />
                    }
                  >
                    <Card.Meta
                      title="Thị Trường Bất Động Sản Đang Được Dần Đất Bởi Nhu Cầu Ở Thực"
                      description={<span className="text-muted">3 ngày trước</span>}
                    />
                  </Card>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-3">
                    <Card>
                      <Card.Meta title="Giá Bất Động Sản Tăng Cao Khiến Nhóm Thu Nhập Cao Nhất Cũng Không Thể Mua Nhà?" />
                    </Card>
                    <Card>
                      <Card.Meta title="Batdongsan.com.vn Thông Báo Về Việc Xử Lý Sự Cố Ảnh Hưởng Dịch Vụ Đăng Tin" />
                    </Card>
                    <Card>
                      <Card.Meta title="Dòng Tiền Đầu Tư Rời Hà Nội, Chuyển Hướng Mạnh Vào Khu Vực Phía Nam" />
                    </Card>
                    <Card>
                      <Card.Meta title="Nhà Riêng Hà Nội Sôi Động Cuối Năm" />
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </TabPane>

          <TabPane tab={<span className="fs-5">Tin tức</span>} key="news">
            {loading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              <div className="row g-2">
                <div className="col-md-8">
                  <Card
                    cover={
                      <img
                        src="https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/12/Error-Alert-Failure-Icon-Problem-Concept.png"
                        alt="Bất động sản"
                        style={{ height: '400px', objectFit: 'cover' }}
                      />
                    }
                  >
                    <Card.Meta
                      title="Thị Trường Bất Động Sản Đang Được Dần Đất Bởi Nhu Cầu Ở Thực"
                      description={<span className="text-muted">3 ngày trước</span>}
                    />
                  </Card>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-3">
                    <Card>
                      <Card.Meta title="Giá Bất Động Sản Tăng Cao Khiến Nhóm Thu Nhập Cao Nhất Cũng Không Thể Mua Nhà?" />
                    </Card>
                    <Card>
                      <Card.Meta title="Batdongsan.com.vn Thông Báo Về Việc Xử Lý Sự Cố Ảnh Hưởng Dịch Vụ Đăng Tin" />
                    </Card>
                    <Card>
                      <Card.Meta title="Dòng Tiền Đầu Tư Rời Hà Nội, Chuyển Hướng Mạnh Vào Khu Vực Phía Nam" />
                    </Card>
                    <Card>
                      <Card.Meta title="Nhà Riêng Hà Nội Sôi Động Cuối Năm" />
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </TabPane>

          {/* Repeat for other tabs */}
        </Tabs>
      </div>
    </div>
  );
}
