import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/authContext";
import styles from "./OrderHistoryUser.module.css";
import { GiLoincloth } from "react-icons/gi";
import { userOrderHistoryService } from "../../services";
import { jsPDF } from "jspdf"; // PDF export library
import { FaSearch } from "react-icons/fa";

const OrderHistoryUser = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // For status filter
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { user_id } = useParams();
  const { fullName } = useParams();
  const navigate = useNavigate();

  const userID = user_id;
  const userName = fullName;
  const isAdmin = currentUser.userType === "admin";
  const isUser = currentUser.userType === "user";

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const response = await userOrderHistoryService({
            user_id: userID || currentUser.ruid,
            search: search,
            status: status,
          });
          setData(response);
        } catch (err) {
          console.error("Error fetching order history:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentUser, search, status, userID]); // Fetch data whenever search or status changes

  // Function to download order as PDF
  const downloadPDF = (order) => {
    const doc = new jsPDF();
    doc.text(`Order ID: ${order.trackingId}`, 10, 10);
    doc.text(
      `Order Date: ${new Date(order.dateSubmitted).toLocaleDateString()}`,
      10,
      20
    );
    doc.text(
      `Expected Date: ${new Date(order.expectedDate).toLocaleDateString()}`,
      10,
      30
    );
    doc.text(`Number of Clothes: ${order.numberOfClothes}`, 10, 40);
    doc.text(`Status: ${order.status}`, 10, 50);
    doc.text(`Address: ${order.address}`, 10, 60);
    doc.save(`Order_${order.trackingId}.pdf`);
  };

  // Function to convert JSON to CSV (browser-compatible)
  const jsonToCSV = (order) => {
    const headers = [
      "trackingId",
      "dateSubmitted",
      "expectedDate",
      "numberOfClothes",
      "status",
      "address",
    ];
    const rows = [
      [
        order.trackingId,
        new Date(order.dateSubmitted).toLocaleDateString(),
        new Date(order.expectedDate).toLocaleDateString(),
        order.numberOfClothes,
        order.status,
        order.address,
      ],
    ];
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    return csvContent;
  };

  // Function to download order as CSV
  const downloadCSV = (order) => {
    const csv = jsonToCSV(order);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Order_${order.trackingId}.csv`);
    link.click();
  };

  // Function to download order as JSON
  const downloadJSON = (order) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(order, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    link.setAttribute("download", `Order_${order.trackingId}.json`);
    link.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {isAdmin && (
        <h1 className={styles.title}>Order History for {userName}</h1>
      )}
      {isUser && (
        <h1 className={styles.title}>
          Order History for {currentUser.fullName}
        </h1>
      )}

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <FaSearch className={styles.searchIcon} />
          </div>
          <input
            type="text"
            placeholder=" Search by Order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="">All Status</option>
          <option value="To Be Received">To Be Received</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <ul className={styles.orderList}>
        {data.map((order, index) => (
          <li className={styles.orderItem} key={index}>
            <div className={styles.orderDetails}>
              <span>
                Order ID: <strong>{order.trackingId}</strong>
              </span>
              <span>
                Order Date:{" "}
                <strong>
                  {new Date(order.dateSubmitted).toLocaleDateString()}
                </strong>
              </span>
              <span>
                Expected Date:{" "}
                <strong>
                  {new Date(order.expectedDate).toLocaleDateString()}
                </strong>
              </span>
              <span>
                Number of Clothes: <strong>{order.numberOfClothes}</strong>
              </span>
              <span>
                Status: <strong>{order.status}</strong>
              </span>
              <span>
                Address: <strong>{order.address}</strong>
              </span>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.trackButton}
                onClick={() => {
                  !isAdmin
                    ? navigate(`/order-tracking/${order.trackingId}`)
                    : navigate("/soon");
                }}
              >
                

                <GiLoincloth className={styles.trackicon} /> {isAdmin ? " Edit & Track" : "Track"}
              </button>

              {/* {isAdmin && ( <button className={styles.edit} onClick={()=>navigate('/---')}>Edit Orders</button> )} */}

              <div className={styles.dropdown}>
                <button className={styles.exportButton}>Download</button>
                <div className={styles.dropdownContent}>
                  <span onClick={() => downloadPDF(order)}>PDF</span>
                  <span onClick={() => downloadJSON(order)}>JSON</span>
                  <span onClick={() => downloadCSV(order)}>CSV</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistoryUser;
