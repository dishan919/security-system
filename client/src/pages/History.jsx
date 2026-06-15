import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/history", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, []);
   const filteredHistory =
  filter === "all"
    ? history
    : history.filter((item) =>
        item.device === filter || item.os === filter
      );
      //sort
      const sortedHistory = [...filteredHistory].sort((a, b) => {
  if (sortOrder === "latest") {
    return new Date(b.createdAt) - new Date(a.createdAt);
  } else {
    return new Date(a.createdAt) - new Date(b.createdAt);
  }
});
const indexOfLast = currentPage * recordsPerPage;
const indexOfFirst = indexOfLast - recordsPerPage;

const currentRecords = sortedHistory.slice(indexOfFirst, indexOfLast);


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📜 Login History</h1>
       <h2>Total Records: {history.length}</h2>
      {history.length === 0 ? (
        <p style={styles.empty}>No history found</p>
      ) : (
    currentRecords.map((item) => (
          <div key={item._id} style={styles.card}>
            <p><b>📧 Email:</b> {item.email}</p>
            <p><b>📱 Device:</b> {item.device}</p>
            <p><b>💻 OS:</b> {item.os}</p>
            <p><b>🌐 IP:</b> {item.ip}</p>
            <p><b>⏰ Time:</b> {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
      
      <select onChange={(e) => setFilter(e.target.value)}>
  <option value="all">All</option>
  <option value="Chrome">Chrome</option>
  <option value="Edge">Edge</option>
  <option value="Windows">Windows</option>
  <option value="Android">Android</option>
</select>

<button onClick={() =>
  setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
}>
  {sortOrder === "latest" ? "🔼 Latest First" : "🔽 Oldest First"}
</button>

<div style={{ marginTop: "20px" }}>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ⬅ Prev
  </button>

  <span style={{ margin: "0 10px" }}>
    Page {currentPage}
  </span>

  <button
    disabled={indexOfLast >= sortedHistory.length}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next ➡
  </button>
</div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  empty: {
    textAlign: "center",
    color: "gray",
  },
};

export default History;