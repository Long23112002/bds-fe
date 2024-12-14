/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Modal, Form, Input, Checkbox, Button, Select } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../stores/AuthStore';


const { Option } = Select;

const RegisterModal: React.FC = () => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      authStore.setIsOpenRegisterModal(false);
    }).catch((errorInfo) => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleCancel = () => {
    authStore.setIsOpenRegisterModal(false);
  };

  const handelOpenLogin = () => {
    authStore.setIsOpenRegisterModal(false);
    authStore.setIsOpenLoginModal(true);
  }

  return (
    <Modal
      visible={authStore.isOpenRegisterModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={850}
      className="p-0"
    >
      <div className="row g-0">
        {/* Left side with illustration */}
        <div className="col-md-6 bg-light p-4 d-none d-md-block">
          <img src="https://batdongsan.com.vn/sellernet/static/media/header-logo-sisu.4b76e0ce.svg" alt="Batdongsan Logo" className="mb-4" />
          <div className="position-relative" style={{ height: '400px' }}>
            <img src="https://batdongsan.com.vn/sellernet/static/media/cover.800e56db.png" alt="Register Illustration" className="img-fluid" />
          </div>
          <h2 className="mt-3">Tìm nhà đất</h2>
          <p className="text-muted">Batdongsan.com.vn dẫn lối</p>
        </div>

        {/* Right side with form */}
        <div className="col-md-6 p-4">
          <h2 className="mb-1">Xin chào bạn</h2>
          <h3 className="mb-4">Đăng ký tài khoản mới</h3>

          <Form form={form} layout="vertical">
            <Form.Item
              name="fullname"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Họ và tên" size="large" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
            </Form.Item>

            <Form.Item
              name="userType"
              rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
            >
              <Select size="large" placeholder="Bạn là?">
                <Option value="individual">Cá nhân</Option>
                <Option value="agent">Môi giới</Option>
                <Option value="business">Doanh nghiệp</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản!')) },
              ]}
            >
              <Checkbox>
                Tôi đồng ý với các điều khoản sử dụng
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100" size="large" onClick={handleOk}>
                Đăng ký
              </Button>
            </Form.Item>

            <p className="text-center text-muted small">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <a href="#" className="text-danger">Điều khoản sử dụng</a>,{' '}
              <a href="#" className="text-danger">Chính sách bảo mật</a>,{' '}
              <a href="#" className="text-danger">Quy chế</a>,{' '}
              <a href="#" className="text-danger">Chính sách</a> của chúng tôi.
            </p>

            <p className="text-center">
              Đã có tài khoản?{' '}
              <a onClick={handelOpenLogin} href="#" className="text-danger">Đăng nhập tại đây</a>
            </p>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default observer(RegisterModal);

