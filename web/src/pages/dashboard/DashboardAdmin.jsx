import React, { useState } from "react";
import emailjs from "emailjs-com";

const DashboardAdmin = () => {
  const [email, setEmail] = useState("");

  // Replace these with your actual EmailJS credentials
  const serviceID = "service_l0y2hum";
  const templateID = "template_zs34psf";
  const userID = "XGoOJ8r4MixHe5O3c";

  const sendEmail = (action, recipientEmail, qr) => {
    var templateParams = {
      from_name: "Yash Laundry",
      to_name: recipientEmail,
      reply_to: recipientEmail,
      message: action,
      image_url: "",
    };
    if (action === "T-shirt order confirmed") {
      templateParams.image_url = qr;
    }

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        alert(`Email notification for "${action}" sent to: ${recipientEmail}`);
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send email.");
      }
    );
  };

  const handleAction = (action) => {
    const recipientEmail = prompt(
      `Enter the email to notify about "${action}":`
    );
    if (recipientEmail) {
      setEmail(recipientEmail);
      sendEmail(action, recipientEmail, "https://i.imgur.com/laEKQFL.jpeg");
    } else {
      alert(`Action "${action}" cancelled. No email entered.`);
    }
  };

  // New handler for referring a friend
  const handleReferFriend = () => {
    const friendEmail = prompt(
      "Enter your friend's email address to refer them:"
    );
    if (friendEmail) {
      const referMessage = "Check out Yash Laundry: yashchaudhary.com";
      sendEmail(referMessage, friendEmail, "");
    } else {
      alert("Referral cancelled. No email entered.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Laundry Admin Panel</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleAction("T-shirt order confirmed")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
          }}
        >
          Add T-shirt
        </button>
        <button
          onClick={() =>
            handleAction(
              "Your t-shirt has been washed and will be delivered in 2-3 days"
            )
          }
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
          }}
        >
          Wash T-shirt
        </button>
        <button
          onClick={() =>
            handleAction(
              "Your T-shirt has been dried and shipped and delivered in 1 day"
            )
          }
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
          }}
        >
          Dry T-shirt
        </button>
        <button
          onClick={() =>
            handleAction(
              "T-shirt delivered, please provide feedback on our page"
            )
          }
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
          }}
        >
          Deliver T-shirt
        </button>
        <button
          onClick={() =>
            handleAction("T-shirt order cancelled, Please visit us again")
          }
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
          }}
        >
          Cancel T-shirt
        </button>

        {/* New button for referring a friend */}
        <button
          onClick={handleReferFriend}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
          }}
        >
          Refer a Friend
        </button>
      </div>
      {email && (
        <div style={{ marginTop: "20px" }}>
          <h3>Last email notification sent to: {email}</h3>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
