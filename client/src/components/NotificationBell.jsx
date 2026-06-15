import { useEffect, useState } from "react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ position: "relative", cursor: "pointer" }}>
      {/* 🔔 Bell Icon */}
      <div onClick={() => setOpen(!open)} style={{ fontSize: "24px" }}>
        🔔

        {/* 🔴 Badge */}
        {notifications.length > 0 && (
          <span style={{
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            marginLeft: "5px"
          }}>
            {notifications.length}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "30px",
          background: "#fff",
          width: "250px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "8px",
          padding: "10px"
        }}>
          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div key={n._id} style={{ padding: "5px 0" }}>
                🔔 {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;