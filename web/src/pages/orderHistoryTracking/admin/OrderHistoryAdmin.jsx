import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { adminFetchUsers } from "../../../services";
import styles from "./OrderHistoryAdmin.module.css";
import { useNavigate } from "react-router-dom";

const AdminOrderList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminFetchUsers({ search: search });
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Users </h1>

      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by User Name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.orderList}>
        {users.length > 0 ? (
          users.map((order, index) => (
            <div key={index} className={styles.orderCard}>
              <div className={styles.orderDetails}>
                <li>
                  <strong className={styles.key}>User:</strong> <span className={styles.fullname}>{order.fullName}</span>
                </li>
                <li>
                  <strong className={styles.key}>ID:</strong> <span className={styles.uid}>{order.user_id} </span>
                </li>
                <li>
                  <strong className={styles.key}>Latest Order Date:</strong>{" "}
                  {new Date(order.latestDate).toLocaleDateString()}
                </li>
              </div>
              <button className={styles.detailButton}  onClick={()=>navigate(`/admin/order-history/${order.fullName}/${order.user_id}`)}>Details</button>
            </div>
          ))
        ) : (
          <p>No users found matching the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrderList;
