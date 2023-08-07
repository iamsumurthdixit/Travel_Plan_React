import { AppContext } from "./AppContextFile";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Notification = () => {
    const { user, isDropdownOpen, setDropdownOpen } = useContext(AppContext);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
  
    const fetchNotifications = async (userId) => {
      try {
        const res = await axios.get(
          `http://localhost:9191/java/getNotificationByUserId/${userId}`
        );
  
        console.log(res.data);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications ", error);
      }
    };
  
    useEffect(() => {
      if (user && isDropdownOpen) {
        fetchNotifications(user?.id);
      }
    }, [user, isDropdownOpen]);
  
    const handleDeleteNotification = async (notificationId) => {
      try {
        const res = await axios.delete(
          `http://localhost:9191/java/deleteNotification/${notificationId}`
        );
  
        console.log(res.data);
  
        fetchNotifications(user?.id);
      } catch (error) {
        console.error("error deleting notification", error);
      }
    };
  
    const handleNotificationClick = async (notificationId, planId) => {
      try {
        const res = await handleDeleteNotification(notificationId);
        console.log(res.data);
  
        setDropdownOpen(false); // order changed => navigate should be up
        navigate(`/${planId}`);
      } catch (error) {
        console.error("error in clicking ", error);
      }
    };
  
    // if (!user || !isDropdownOpen) {
    //   return null;
    // }
  
    return (
      <div className="notification-list">
        {notifications && notifications.length > 0 ? (
          <ul>
            { console.log('notifications, ', notifications) }
            {notifications.map((notification) => (
              <li
                key={notification.id}
                onClick={() =>
                  handleNotificationClick(notification.id, notification.planId)
                }
              >
                {notification.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications</p>
        )}
      </div>
    );
  };
  