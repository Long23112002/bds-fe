import { Notification } from '../../api/notification';
import './styles/notification-tabs.css';



const NotificationList = ({ notifications }: { notifications: Notification[] }) => {
  if (notifications.length === 0) {
    return (
      <div className="empty-notification">
        Không có thông báo
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className='notification-list-container'>
      <div className="notification-list">
        {notifications?.map(notification => (
          <div key={notification.id} className="notification-item" style={{ position: 'relative' }}>
            <div className="notification-icon">
              {notification.type === 'promotion' ? '🎉' : '📢'}
            </div>
            <div className="notification-content mx-2">
              <h3 style={{ fontSize: '13px' }}>{notification?.title}</h3>
              {notification.description && (
                <p className="description">{notification?.description}</p>
              )}
            </div>
            <time
              className="mx-2"
              style={{
                fontSize: '11px',
                color: '#6c757d',
              }}
            >
              {formatDate(notification?.createdAt)}
            </time>
            {!notification?.isRead && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '11px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'red',
                  borderRadius: '50%',
                }}
              ></span>
            )}
          </div>
        ))}
      </div>
    </div>


  );
};

export default NotificationList

