import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
           textAlign: "center",
    marginBottom: "30px",
        }}
      >
        <Card title="Total Logins" value="24" />
        <Card title="Devices" value="5" />
        <Card title="New Devices" value="2" />
      </div>
    </div>
  );
}

export default Dashboard;