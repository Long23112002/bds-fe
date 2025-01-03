import { notification, message } from 'antd';

export const notifySuccess = (messageText: string, description?: string) => {
    notification.success({
        message: messageText,
        description: description,
        placement: 'topRight',
        showProgress: true,
        pauseOnHover: true,
    });
};

export const notifyError = (messageText: string, description?: string) => {
    notification.error({
        message: messageText,
        description: description,
        showProgress: true,
        pauseOnHover: true,
        placement: 'topRight',
    });
};

export const showMessage = (type: 'success' | 'error' | 'warning' | 'info', text: string) => {
    message[type](text);
};
