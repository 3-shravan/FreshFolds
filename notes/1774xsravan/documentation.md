# Project Documentation: Fresh and Folds - Laundry Management Website

## Project Overview

**Fresh and Folds** is a web-based laundry management system that streamlines order tracking and management for both users and administrators. The project aims to provide an efficient and easy-to-use interface to manage multiple laundry orders, track their status, and maintain an order history log. The platform is built using modern web technologies, following best practices for maintainable code and a professional design.

---

## Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Python (Flask)
- **Database:** MongoDB
- **Authentication & Routing:** React Router, Flask
- **Version Control:** Git & GitHub (with regular commits and pushes for version management)

---

## Key Functionalities

### 1. User Order History Management

- **View Order History:** Users can view all their past and current orders in a well-structured layout.
- **Search and Filter:**
  - **Search by Order ID:** Users can search their orders by entering the specific Order ID.
  - **Filter by Status:** Users can filter orders based on their status – _Completed_, _Processing_, or _To Be Received_.
- **Order Export Options:** Users can export their order logs in multiple formats:
  - **PDF**
  - **CSV**
  - **JSON**
- **User-friendly Design:** The order history page is styled for readability and responsiveness to provide a seamless experience across devices.

---

### 2. Admin Dashboard Management

- **User Overview:**
  - Admins have access to an overview of all users who have placed orders.
  - Each user appears only once (despite having multiple orders) using **MongoDB’s aggregation pipeline** to prevent repetition.
- **Search and Filter Users:**
  - Admins can search users by name or unique User ID to quickly locate specific records.
- **Order Management:**
  - **View Orders:** Each user entry includes a "Details" button that reveals all the orders placed by that user.
  - **Order Tracking and Editing:** Admins can track, update, and edit user orders directly from the dashboard.
- **Admin Dashboard Design:**
  - The admin dashboard is carefully styled to maintain clarity and ease of use, ensuring data is easy to access and manage.
  - The layout is optimized for intuitive navigation with dedicated search bars and action buttons.

---

## Backend Implementation Details

- **MongoDB Database Schema:**
  - `users` collection: Stores user details like names and unique IDs.
  - `orders` collection: Stores multiple orders per user, with fields every field provided while making the order:
- **Aggregation Pipeline:**

  - Used to fetch distinct users from the orders collection to ensure a user appears only once, even if they have placed multiple orders.

- **API Endpoints:**
  - **User Side:** Fetch all orders for a specific user based on their `user_id`.
  - **Admin Side:**
    - Retrieve all users with their orders.
    - Fetch individual user details and associated orders.
    - Update order status if required.

---

## Frontend Implementation Details

- **React with Vite:**

  - The project follows a **clean folder structure** provided for React and Flask integration.
  - **Class-based components** are used to ensure modularity and maintainability.

- **Order History Page (User):**

  - Cards are used to display individual orders horizontally aligned for better readability.
  - Sticky search bars and export buttons ensure smooth user experience.

- **Admin Dashboard:**
  - Users are listed with the option to view detailed orders by clicking the "Details" button.
  - Search functionality ensures quick access to specific users or orders.

---

## Challenges Faced and Solutions

1. **Handling Search and Filter:**

   - Initially faced issues with search requests using.

2. **Order Aggregation for Admin:**

   - Used **MongoDB aggregation and pipelines** to ensure each user appears only once, avoiding duplication caused by multiple orders.

3. **Design and Styling of Order Cards:**

   - Focused on professional and responsive design to maintain consistency across devices.

4. **Role-based Redirection after Login:**

   - Implemented authentication logic to redirect users and admins to their respective dashboards upon login.

5. **Export Functionality:**
   - Integrated **PDF, CSV, and JSON export options** to allow users to download their order history in preferred formats.

---

## Project Structure

### React (Frontend)

```
src/
│
├── components/
│   ├──
│
│   ...
├── pages/
│   ├── orderHistoryTracking/
│         ├── admin/
                 └── OrderHistoryAdmin.jsx
                 |---OrderHistoryAdmin.module.css
          |---OrderHistoryUser.module.css
│         └── OrderHistoryUser.jsx
├── App.jsx
└── index.jsx
```

### Python Flask (Backend)

```
api/
│
├── root/
│   ├── dashboard/
        ├── __pycache__/
        ├── __dashboard__.http
        ├── __init__.py
        ├── __routes__.py
        ├── adminorderhistory.py
        ├── orderhistory.py


```

---

## Best Practices Followed

1. **Modular Code Structure:** Ensured separation of concerns between frontend and backend logic.
2. **Class-based Components:** Improved readability and reusability of components.
3. **API Efficiency:** Used aggregation pipelines to handle large datasets efficiently.
4. **Responsive Design:** Made sure both user and admin interfaces work seamlessly across devices.
5. **Role-based Routing:** Implemented dynamic redirects based on user roles (user/admin).
6. **Version Control:** Used Git and GitHub for version control, with frequent commits and pushes to manage code versions effectively.

---

## Future Improvements

1. **Automated Notifications:** Integrate email or SMS notifications to inform users about order status updates.
2. **Analytics Dashboard for Admin:** Provide insights into order trends and user activity.
3. **Mobile App Integration:** Extend functionality with a mobile application for enhanced accessibility.
4. **Enhanced Security:** Add features like two-factor authentication (2FA) for better security.

---

## Conclusion

The **Fresh and Folds** laundry management website provides an effective way to manage orders for both users and admins. The combination of React, Flask, and MongoDB has allowed for a seamless experience with powerful backend logic and a professional frontend design. The implementation follows best practices in coding, design, and project structure, ensuring the system is scalable and maintainable.
