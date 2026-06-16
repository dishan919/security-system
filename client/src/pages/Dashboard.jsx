import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedCard, setSelectedCard] = useState("all");
  const [latestAlert, setLatestAlert] = useState(null);

  // FETCH DATA
  useEffect(() => {
    // HISTORY
    axios
      .get("http://localhost:5000/api/history/test@gmail.com")
      .then((res) => {
        setHistory(res.data);

        const latest = res.data.find((h) => h.isNewDevice);
        setLatestAlert(latest || null);
      })
      .catch((err) => console.log(err));

    // ACCOUNTS
    axios
      .get("http://localhost:5000/api/accounts/test@gmail.com")
      .then((res) => {
        console.log("ACCOUNTS:", res.data);
        setAccounts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // FILTER HISTORY (STEP 5)
  const filteredHistory =
    selectedCard === "all"
      ? history
      : selectedCard === "safe"
      ? history.filter((item) => !item.isNewDevice)
      : history.filter((item) => item.isNewDevice);

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* TITLE */}
        <h1 style={styles.title}>🔐 Security Dashboard</h1>

        {/* ALERT BOX */}
        {latestAlert && (
          <div style={styles.alertBox}>
            🚨 New device login detected!
          </div>
        )}

        {/* CARDS */}
        <div style={styles.cardContainer}>
          <div
            style={{
              ...styles.card,
              background: "#1e90ff",
              border: selectedCard === "all" ? "2px solid white" : "none",
            }}
            onClick={() => setSelectedCard("all")}
          >
            <h2>Total Logins</h2>
            <p style={styles.cardNumber}>{history.length}</p>
          </div>

          <div
            style={{
              ...styles.card,
              background: "#ff4d4f",
              border: selectedCard === "new" ? "2px solid white" : "none",
            }}
            onClick={() => setSelectedCard("new")}
          >
            <h2>New Devices</h2>
            <p style={styles.cardNumber}>
              {history.filter((h) => h.isNewDevice).length}
            </p>
          </div>

          <div
            style={{
              ...styles.card,
              background: "#52c41a",
              border: selectedCard === "safe" ? "2px solid white" : "none",
            }}
            onClick={() => setSelectedCard("safe")}
          >
            <h2>Safe Logins</h2>
            <p style={styles.cardNumber}>
              {history.filter((h) => !h.isNewDevice).length}
            </p>
          </div>

          {/* STEP 6 CARD */}
          <div
            style={{
              ...styles.card,
              background: "#6366f1",
            }}
          >
            <h2>Accounts</h2>
            <p style={styles.cardNumber}>{accounts.length}</p>
          </div>
        </div>

        {/* HISTORY TABLE */}
        <h2 style={styles.sectionTitle}>
          {selectedCard === "all" && "📋 All Login History"}
          {selectedCard === "new" && "🚨 New Device Logins"}
          {selectedCard === "safe" && "✔ Safe Device Logins"}
        </h2>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Device</th>
                <th style={styles.th}>IP</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, i) => (
                  <tr key={i}>
                    <td style={styles.td}>
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td style={styles.td}>
                      {item.browser} ({item.os})
                    </td>
                    <td style={styles.td}>{item.ip}</td>
                    <td style={styles.td}>
                      {item.isNewDevice ? (
                        <span style={styles.badgeDanger}>🚨 New</span>
                      ) : (
                        <span style={styles.badgeSafe}>✔ Safe</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={styles.noData}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ACCOUNTS TABLE (STEP 6) */}
        <h2 style={styles.sectionTitle}>📱 Connected Accounts</h2>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Platform</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Email</th>
              </tr>
            </thead>

            <tbody>
              {accounts.length > 0 ? (
                accounts.map((acc, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{acc.platform}</td>
                    <td style={styles.td}>{acc.username}</td>
                    <td style={styles.td}>{acc.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={styles.noData}>
                    No accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
  },

  alertBox: {
    background: "#dc2626",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  card: {
    width: "220px",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },

  cardNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  sectionTitle: {
    marginBottom: "15px",
  },

  tableContainer: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#1e293b",
    borderRadius: "10px",
    overflow: "hidden",
  },

  th: {
    background: "#334155",
    padding: "12px",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #334155",
  },

  badgeDanger: {
    background: "#dc2626",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  badgeSafe: {
    background: "#16a34a",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
  },
};

export default Dashboard;