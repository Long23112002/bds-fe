/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Radio, DatePicker, Button, TimePicker, Modal, Badge } from 'antd';
import { CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { packageStore } from '../../../../stores/PackageStore';
import { newPostStore } from '../../../../stores/NewPostStore';
import { newPostApi, PostRequest } from '../../../../api/posts';
import { notifyError, notifySuccess } from '../../../../utils/NotificationUtils';
import Cokie from 'js-cookie';
import { getUserInforApi } from '../../../../api/authentication';

const SubscriptionSelectorUpdate: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>('regular');
    const [previousPlan, setPreviousPlan] = useState<string>('regular');
    const [duration, setDuration] = useState<number>(10);
    const [startDate, setStartDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(dayjs().hour(12).minute(0));
    const [isSamePlan, setIsSamePlan] = useState<boolean>(true);
    const [originalStartDate, setOriginalStartDate] = useState(dayjs());
    const [originalSelectedTime, setOriginalSelectedTime] = useState(dayjs().hour(12).minute(0));
    useEffect(() => {
        packageStore.fetchPackage();
    }, []);

    const plans = packageStore.packages.map(plan => ({
        id: plan.id.toString(),
        title: plan.name,
        subtitle: plan.description,
        multiplier: plan.level,
        badge: plan.badge,
        color: plan.level === 30 ? '#DC3545' : plan.level === 15 ? '#CD853F' : plan.level === 10 ? '#20B2AA' : plan.level === 0 ? '#6C757D' : '#000000',
        pricePerDay: plan.packagePriceList[0].price / plan.packagePriceList[0].validity,
        packagePriceList: plan.packagePriceList
    }));




    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    const durations = selectedPlanData
        ? selectedPlanData.packagePriceList.map((pkg: { id: any; validity: any; price: any; }) => ({
            id: pkg.id,
            days: pkg.validity,
            pricePerDay: pkg.price
        }))
        : [];

    const calculateEndDate = () => {
        return startDate.add(duration, 'day').format('DD/MM/YYYY');
    };
    const calculateTotal = () => {
        if (isSamePlan) {
            const selectedPlanData = plans.find(p => p.id === selectedPlan);
            const originalDuration = newPostStore.postUpdateDetail?.packagePriceTransaction.packagePrice.validity;
            const additionalDays = duration - originalDuration;
            return (selectedPlanData?.pricePerDay || 0) * (additionalDays > 0 ? additionalDays : 0);
        }
        const selectedPlanData = plans.find(p => p.id === selectedPlan);
        return (selectedPlanData?.pricePerDay || 0) * (duration || 0);
    };



    useEffect(() => {
        const transaction = newPostStore.postUpdateDetail?.packagePriceTransaction;
        if (transaction) {
            const { packagePrice, startDate: start, startTime } = transaction;
            const planId = packagePrice.apackage.id.toString();
            const days = packagePrice.validity;

            setSelectedPlan(planId);
            setPreviousPlan(planId);
            setDuration(days);
            const originalDate = dayjs(new Date(start[0], start[1] - 1, start[2]));
            const originalTime = dayjs().hour(startTime[0]).minute(startTime[1]);
            setStartDate(originalDate);
            setSelectedTime(originalTime);
            setOriginalStartDate(originalDate);
            setOriginalSelectedTime(originalTime);
        }
    }, [newPostStore.postUpdateDetail]);

    const handlePlanChange = (newPlan: string) => {
        if (newPlan === previousPlan) {
            setIsSamePlan(true);
            setSelectedPlan(previousPlan);
            setDuration(durations.find((d: { days: number; }) => d.days === duration)?.days || 10);
            setStartDate(originalStartDate);
            setSelectedTime(originalSelectedTime);
        } else {
            setIsSamePlan(false);
            setSelectedPlan(newPlan);
            setPreviousPlan(selectedPlan);
            const selectedPlanData = plans.find(p => p.id === newPlan);
            if (selectedPlanData) {
                setDuration(selectedPlanData.packagePriceList[0].validity);
                setStartDate(dayjs());
                setSelectedTime(dayjs().hour(12).minute(0));
            }
        }
    };


    const handleContinue = async () => {
        if (selectedPlan !== previousPlan) {
            Modal.confirm({
                title: 'Xác nhận thay đổi gói',
                content: 'Bạn sẽ mất gói hiện tại. Bạn có chắc chắn muốn thay đổi không?',
                onOk: async () => {
                    await updatePost();
                },
                onCancel: () => {
                    // Do nothing, user canceled
                }
            });
        } else {
            await updatePost();
        }
    };

    const updatePost = async () => {
        const selectedPlanData = plans.find(p => p.id === selectedPlan);
        const selectedDuration = durations.find((d: { days: number; }) => d.days === duration);

        if (selectedPlanData && selectedDuration) {
            const packagePriceId = selectedPlanData.packagePriceList.find((pkg: { validity: any; }) => pkg.validity === selectedDuration.days)?.id;

            const price = calculateTotal();

            const valueRequest: PostRequest = {
                ...newPostStore.valueNewPost,
                packageBuy: {
                    packagePriceId: packagePriceId,
                    totalPrice: price,
                    startDate: startDate.format('YYYY-MM-DD'),
                    startTime: selectedTime.format('HH:mm:ss'),
                }
            };

            try {
                await newPostApi(valueRequest);

                const responseInfor = await getUserInforApi();

                Cokie.set('wallet', responseInfor.wallet.toString());

                notifySuccess('Đăng tin thành công. Vui lòng đợi kiểm duyệt.');

                setTimeout(() => {
                    window.location.href = `/post-new`;
                }, 2000);
            } catch (error: any) {
                console.error('Error:', error);

                if (error.response) {
                    notifyError(error.response.data?.message || 'Đã xảy ra lỗi từ máy chủ.');
                } else if (error.request) {
                    notifyError('Không thể kết nối đến máy chủ.');
                } else {
                    notifyError(error.message || 'Đã xảy ra lỗi không xác định.');
                }
            }
        } else {
            notifyError('Vui lòng chọn gói và thời gian hợp lệ.');
        }
    };

    const handleTimeChange = (time: dayjs.Dayjs | null) => {
        if (time) setSelectedTime(time);
    };

    return (
        <div className="w-100 py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    {/* Plan Selection */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="h5 mb-0">Chọn loại tin</h2>
                            <Button type="link" className="d-flex align-items-center p-0">
                                So sánh các loại tin và giá <InfoCircleOutlined className="ms-1" />
                            </Button>
                        </div>

                        <p className="text-muted mb-4">
                            <small>💡 Vị trí hiển thị càng cao, tỉ lệ chuyển đổi từ click thành liên hệ càng lớn</small>
                        </p>

                        <Radio.Group
                            className="w-100 h-100"
                            value={selectedPlan}
                            onChange={e => handlePlanChange(e.target.value)}
                        >
                            <div className="row g-3">
                                {plans.map((plan) => {
                                    console.log(plan)
                                    const isCurrentPlan = plan.id === newPostStore.postUpdateDetail?.packagePriceTransaction.packagePrice.apackage.id.toString();
                                    return (
                                        <div key={plan.id} className="col-12 col-md-6 d-flex">
                                            <Badge.Ribbon
                                                text={isCurrentPlan ? "Đang sử dụng" : ""}
                                                color="#52c41a"
                                                style={{
                                                    zIndex: 1,
                                                    width: '65px',
                                                    fontSize: '8px',
                                                    display: isCurrentPlan ? 'block' : 'none',
                                                }}
                                            >
                                                <Radio.Button
                                                    value={plan.id}
                                                    className="w-100 h-auto p-0"
                                                    style={{
                                                        border: selectedPlan === plan.id ? `1px solid ${plan.color}` : '1px solid #d9d9d9',
                                                        borderRadius: '8px',
                                                        padding: '16px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'stretch',
                                                        height: '100%',
                                                    }}
                                                >
                                                    <div className="p-3">
                                                        <div className="position-relative">
                                                            {plan.badge && (
                                                                <span
                                                                    className="position-absolute top-0 end-0 badge"
                                                                    style={{
                                                                        backgroundColor: '#DC3545',
                                                                        borderRadius: '4px',
                                                                        padding: '4px 8px',
                                                                        fontSize: '12px',
                                                                    }}
                                                                >
                                                                    {plan.badge}
                                                                </span>
                                                            )}
                                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                                <div
                                                                    style={{
                                                                        width: '24px',
                                                                        height: '24px',
                                                                        backgroundColor: plan.color,
                                                                        borderRadius: '4px',
                                                                    }}
                                                                ></div>
                                                                <div>
                                                                    <h3 className="h6 mb-0">{plan.title}</h3>
                                                                    <p className="small text-muted mb-0">{plan.subtitle}</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                                <span
                                                                    className="badge"
                                                                    style={{
                                                                        backgroundColor: plan.color,
                                                                        borderRadius: '4px',
                                                                        padding: '4px 8px',
                                                                        fontSize: '12px',
                                                                    }}
                                                                >
                                                                    X{plan.multiplier}
                                                                </span>
                                                                <span className="small text-muted">
                                                                    lượt liên hệ so với tin thường
                                                                </span>
                                                            </div>
                                                            <div className="fw-bold" style={{ color: plan.color }}>
                                                                {plan.pricePerDay.toLocaleString('vi-VN')} đ/ngày
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Radio.Button>
                                            </Badge.Ribbon>
                                        </div>
                                    );
                                })}

                            </div>
                        </Radio.Group>
                    </div>

                    <div className="bg-light p-4 rounded mb-4">
                        <h3 className="h6 mb-3">Đăng dài ngày hơn, tiết kiệm hơn!</h3>
                        <Radio.Group
                            className="w-100"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                        >
                            <div className="d-flex justify-content-between gap-3">
                                {durations.map((d: any) => {
                                    const isCurrentDuration = d.id === newPostStore.postUpdateDetail?.packagePriceTransaction.packagePrice.id;
                                    const isSelectable = !isSamePlan || d.days >= newPostStore.postUpdateDetail?.packagePriceTransaction.packagePrice.validity;
                                    return (
                                        <Radio.Button
                                            key={d.id}
                                            value={d.days}
                                            className="flex-grow-1"
                                            style={{
                                                border: duration === d.days ? '1px solid #1890ff' : '1px solid #d9d9d9',
                                                borderRadius: '8px',
                                                padding: '8px 12px',
                                                height: 'auto',
                                                width: '100%',
                                                opacity: isSelectable ? 1 : 0.5,
                                                pointerEvents: isSelectable ? 'auto' : 'none',
                                            }}
                                        >
                                            <div className="d-flex flex-column align-items-center">
                                                <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{d.days} ngày</span>
                                                <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{d.pricePerDay.toLocaleString('vi-VN')} đ/ngày</span>
                                                {isCurrentDuration && (
                                                    <span style={{ zIndex: 10, fontSize: '12px', whiteSpace: 'nowrap', color: 'red' }}>
                                                        Đang sử dụng
                                                    </span>
                                                )}
                                            </div>
                                        </Radio.Button>
                                    );
                                })}
                            </div>

                        </Radio.Group>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-4">
                        <h3 className="h6 mb-3">Ngày và giờ bắt đầu</h3>
                        <div className="d-flex flex-column gap-3">
                            <DatePicker
                                value={startDate}
                                onChange={(date) => date && setStartDate(date)}
                                format="DD/MM/YYYY"
                                className="w-100"
                                style={{ height: '40px' }}
                                suffixIcon={<CalendarOutlined />}
                                disabled={isSamePlan}
                            />
                            <TimePicker
                                value={selectedTime}
                                onChange={handleTimeChange}
                                format="hh:mm A"
                                use12Hours
                                className="w-100"
                                style={{ height: '40px' }}
                                disabled={isSamePlan}
                            />
                        </div>
                        <div className="text-muted mt-2">
                            Kết thúc ngày {calculateEndDate()} lúc {selectedTime.format('hh:mm A')}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="d-flex justify-content-between align-items-center border-top pt-4">
                        <Button size="large">Quay lại</Button>
                        <div className="text-end">
                            <div className="d-flex align-items-center gap-3">
                                <h4 className="mb-0">{calculateTotal().toLocaleString('vi-VN')} đ</h4>
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        backgroundColor: '#DC3545',
                                        borderColor: '#DC3545'
                                    }}
                                    onClick={handleContinue}
                                >
                                    Cập nhập tin
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(SubscriptionSelectorUpdate);