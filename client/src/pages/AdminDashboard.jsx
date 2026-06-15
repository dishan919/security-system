import { useEffect, useState } from "react";

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5000/api/admin/analytics"
      );

      const result = await res.json();

      setData(result);
    };

    fetchData();
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>📊 Admin Dashboard</h1>

      <div style={styles.dashboard}>
  <div style={styles.card}>
    <h2>👥 Users</h2>
    <h1>{data.totalUsers}</h1>
  </div>

  <div style={styles.card}>
    <h2>🔑 Logins</h2>
    <h1>{data.totalLogins}</h1>
  </div>

  <div style={styles.card}>
    <h2>🔔 Notifications</h2>
    <h1>{data.totalNotifications}</h1>
  </div>
</div>
    </div>
    
  );
}
const styles = {
  dashboard: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  card: {
    flex: 1,
    minWidth: "250px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
};
export default AdminDashboard;