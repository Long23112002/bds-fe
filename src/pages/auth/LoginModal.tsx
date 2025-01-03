/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined, AppleOutlined, GoogleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../stores/AuthStore';

const LoginModal: React.FC = () => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        form.validateFields().then(async (values) => {
            await authStore.loginUser(values);
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin");
            window.location.href = redirectPath;
        }).catch((errorInfo) => {
            console.log('Validation failed:', errorInfo);
        });
    };

    const handleCancel = () => {
        authStore.setIsOpenLoginModal(false);
    };

    const handelOpenRegister = () => {
        authStore.setIsOpenLoginModal(false);
        authStore.setIsOpenRegisterModal(true);
    }

    return (
        <Modal
            visible={authStore.isOpenLoginModal}
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
                        <img src="https://batdongsan.com.vn/sellernet/static/media/cover.800e56db.png" alt="Login Illustration" className="img-fluid" />
                    </div>
                    <h2 className="mt-3">Tìm nhà đất</h2>
                    <p className="text-muted">Batdongsan.com.vn dẫn lối</p>
                </div>

                {/* Right side with form */}
                <div className="col-md-6 p-4">
                    <h2 className="mb-1">Xin chào bạn</h2>
                    <h3 className="mb-4">Đăng nhập để tiếp tục</h3>

                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="SĐT chính hoặc email" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Nhớ tài khoản</Checkbox>
                                </Form.Item>
                                <a href="#" className="text-danger">Quên mật khẩu?</a>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <button type="submit" className=" btn btn-danger w-100" onClick={handleOk}>
                                Đăng nhập
                            </button>
                        </Form.Item>

                        <div className="text-center my-3">
                            <span className="bg-white px-2 text-muted">Hoặc</span>
                        </div>

                        <Form.Item>
                            <Button icon={<AppleOutlined />} className="w-100 mb-3" size="large">
                                Đăng nhập với Apple
                            </Button>
                            <Button icon={<GoogleOutlined />} className="w-100" size="large">
                                Đăng nhập với Google
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
                            Chưa là thành viên?{' '}
                            <a onClick={handelOpenRegister} href="#" className="text-danger">Đăng ký tại đây</a>
                        </p>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default observer(LoginModal);

