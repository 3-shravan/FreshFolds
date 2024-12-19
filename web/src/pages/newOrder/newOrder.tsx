import React, { useState } from "react";
import axios from "axios";
import "./newOrder.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/authContext";

interface Order {
  trackingId: string;
  user_id: string;
  fullName: string;
  address: string;
  numberOfClothes: number;
  dateSubmitted: string;
  expectedDate: string;
  status: string;
}

const OrderForm: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [numberOfClothes, setNumberOfClothes] = useState<string>("");
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { currentUser } = useAuth();

  const generateTrackingId = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const ensureUniqueTrackingId = async (
    trackingId: string
  ): Promise<string> => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/check-tracking-id",
        { trackingId }
      );
      const data = response.data;
      if (data.exists) {
        return ensureUniqueTrackingId(generateTrackingId());
      } else {
        return trackingId;
      }
    } catch (error) {
      console.error("Error checking tracking ID uniqueness:", error);
      throw error;
    }
  };

  const submitOrder = async (newOrder: Order): Promise<void> => {
    console.log("Submitting order:", newOrder); // Debugging line
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        newOrder
      );
      console.log("Response from submitOrder:", response.data); // Debugging line
      const result = response.data;

      console.log("Order submitted successfully:", result); // Debugging line
      setLastOrder(result);
      setSubmitted(true);
    } catch (error) {
      console.error(`Error submitting order: ${error.message}`);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    console.log("Form submitted"); // Debugging line

    let trackingId = generateTrackingId();
    console.log("Generated tracking ID:", trackingId); // Debugging line
    let uniqueTrackingId = await ensureUniqueTrackingId(trackingId);

    const newOrder: Order = {
      trackingId: uniqueTrackingId,
      user_id: currentUser.ruid,
      fullName: currentUser.fullName,
      address,
      numberOfClothes: parseInt(numberOfClothes, 10),
      dateSubmitted: new Date().toISOString(),
      expectedDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: "To Be Received",
    };

    try {
      await submitOrder(newOrder);

      setAddress("");
      setNumberOfClothes("");
    } catch (error) {
      console.error(`Error submitting order: ${error.message}`);
    }
  };

  const handleAnotherOrder = (): void => {
    setLastOrder(null);
    setSubmitted(false);
  };

  const copyToClipboard = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text).catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    }
  };

  return (
    <div className="order-form">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Submit a New Order</h2>
          <p className="text-secondary text-center">
            Enter the details of the new order below.
          </p>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfClothes">Number of Clothes</label>
            <input
              type="number"
              name="numberOfClothes"
              id="numberOfClothes"
              value={numberOfClothes}
              onChange={(e) => setNumberOfClothes(e.target.value)}
              required
            />
          </div>
          <button className="order-button" type="submit">
            Submit Order
          </button>
        </form>
      ) : (
        <div className="order-details">
          <h1>Order Details</h1>
          <div className="details-container">
            <p
              className="details tracking-id"
              onClick={() => copyToClipboard(lastOrder?.trackingId)}
            >
              <strong className="fields">Tracking ID:</strong>
              {lastOrder?.trackingId}
              <span className="tooltip">Click to copy tracking ID</span>
            </p>
            <p className="details">
              <strong className="fields">User:</strong>{" "}
              {lastOrder?.user || "N/A"}
            </p>
            <p className="details">
              <strong className="fields">Address:</strong>{" "}
              {lastOrder?.address || "N/A"}
            </p>
            <p className="details">
              <strong className="fields">Number of Clothes:</strong>{" "}
              {lastOrder?.numberOfClothes || "N/A"}
            </p>
            <p className="details">
              <strong className="fields">Date Submitted:</strong>{" "}
              {new Date(lastOrder?.dateSubmitted || "").toLocaleDateString()}
            </p>
            <p className="details">
              <strong className="fields">Expected Date:</strong>{" "}
              {new Date(lastOrder?.expectedDate || "").toLocaleDateString()}
            </p>
            <p className="details">
              <strong className="fields">Status:</strong>{" "}
              {lastOrder?.status || "N/A"}
            </p>
          </div>
          <button className="order-btn" onClick={handleAnotherOrder}>
            Place Another Order
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

const NewOrder: React.FC = () => {
  return (
    <main className="order-page">
      <OrderForm />
    </main>
  );
};

export default NewOrder;
