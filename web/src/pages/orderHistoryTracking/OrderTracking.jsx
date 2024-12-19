import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./OrderTracking.module.css";

const TrackingPage = () => {
    const { order_id } = useParams();
    const [trackingInfo, setTrackingInfo] = useState("");

    useEffect(() => {
        const fetchTrackingInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/order-tracking/${order_id}`
                );
                const result = await response.json();
                if (result.error) {
                    setTrackingInfo("No tracking information available.");
                } else {
                    setTrackingInfo(result.tracking_info);
                }
            } catch (error) {
                console.error("Error fetching tracking info:", error);
                setTrackingInfo("Error fetching tracking info.");
            }
        };

        fetchTrackingInfo();
    }, [order_id]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Tracking Information for Order ID:{" "}
                <span className={styles.orderId}>{order_id}</span>
            </h1>
            <p className={styles.trackingInfo}>{trackingInfo}</p>
        </div>
    );
};

export default TrackingPage;
