/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Tabs, Switch } from 'antd';
import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import './styles/notification-tabs.css';
import Notification from './NotificationList';
import { observer } from 'mobx-react-lite';
import { notificationStore } from '../../stores/NotificationStore';
import React, { useEffect, useState } from 'react';
import { updateNotificationBluk } from '../../api/notification';


const NotificationTabs = () => {

    const ref = React.useRef<HTMLDivElement>(null);
    const [loggingEnabled, setLoggingEnabled] = useState(false);



    const [params, setParams] = React.useState({
        notificationType: '',
        isRead: '',
    });

    const handleSwitchChange = () => {
        const newLoggingState = !loggingEnabled;
        setLoggingEnabled(newLoggingState);
        setParams({
            ...params,
            isRead: newLoggingState ? 'false' : '',
        });
    };


    useEffect(() => {

        notificationStore.fetchNotification({
            ...params,
            notificationType: params.notificationType,
            isRead: params.isRead,
            userId: localStorage.getItem('id') ? parseInt(localStorage.getItem('id') as string) : 0,
        });
    }, [notificationStore.isOpenNotification, params]);



    const items = [
        {
            key: '1',
            label: 'Tất cả',
            children: (
                <Notification
                    notifications={notificationStore?.dataNotification || []}
                />
            ),
        },
        {
            key: '2',
            label: 'Hệ thống',
            children: (
                <Notification
                    notifications={
                        Array.isArray(notificationStore?.dataNotification)
                            ? notificationStore.dataNotification.filter(n => n?.type === 'GLOBAL')
                            : []
                    }
                />
            ),
        },
        {
            key: '3',
            label: 'Tin đăng',
            children: (
                <Notification
                    notifications={
                        Array.isArray(notificationStore?.dataNotification)
                            ? notificationStore.dataNotification.filter(n => n?.type === 'POST')
                            : []
                    }
                />
            ),
        },
        {
            key: '4',
            label: 'Yêu cầu của khách hàng',
            children: (
                <Notification
                    notifications={
                        Array.isArray(notificationStore?.dataNotification)
                            ? notificationStore.dataNotification.filter(n => n?.type === 'CUSTOMER')
                            : []
                    }
                />
            ),
        },
    ];


    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            notificationStore.isOpenNotification = false;
        }
    };

    const handleScroll = () => {
        notificationStore.isOpenNotification = false;
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleUpdateBluk = async () => {
        await updateNotificationBluk();
        notificationStore.fetchNotification({
            ...params,
            notificationType: params.notificationType,
            isRead: params.isRead,
            userId: localStorage.getItem('id') ? parseInt(localStorage.getItem('id') as string) : 0,
        });
    }

    return (
        <div ref={ref} style={{
            display: notificationStore.isOpenNotification ? 'block' : 'none',
            width: '660px',
            position: 'absolute',
            zIndex: '100',
            left: '740px',
            top: '0px',
        }} className="notification-container">
            <div className="notification-header">
                <h2>
                    <BellOutlined />
                    Thông báo
                </h2>
                <div className="header-controls">
                    <div className="switch-container">
                        <Switch size="small" checked={loggingEnabled} onChange={handleSwitchChange} />
                        <span>Chưa đọc</span>
                    </div>

                    <button onClick={handleUpdateBluk} className="settings-button">
                        <i className="fa-solid fa-check-double"></i>
                    </button>
                    <button className="settings-button">
                        <SettingOutlined />
                    </button>
                </div>
            </div>

            <Tabs items={items} className="custom-tabs" />
        </div>
    );
};

export default observer(NotificationTabs);
