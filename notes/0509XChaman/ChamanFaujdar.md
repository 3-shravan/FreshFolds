# Request Submission Form

This document provides an overview of the **Request Submission Form** developed for the **FreshNFold** laundry management project.

## Technologies Used
- **React.js**
- **Chakra UI**
- **Redux**
- **React Router**

## Features
The form allows users to submit laundry pickup requests, with fields for various laundry items, pickup date, service type, contact number, and additional details.

### Form Fields:
- **Pickup Date (Required)**: A date-time field where users select when they want the laundry to be picked up.
- **Topwear**: A text input field for topwear items like T-shirts, tops, and shirts.
- **Bottomwear**: A text input field for bottomwear items such as jeans, lowers, and leggings.
- **Woolen Cloths**: A text input field for any woolen clothes.
- **Others**: A text input field for other laundry items.
- **Service Type (Required)**: A dropdown selection for either *Fast Service* or *Regular Service*.
- **Contact Number (Required)**: A 10-digit phone number input.
- **Description**: A field for any additional information or special instructions.

## User Authentication
The form checks if the user is authenticated:
- If the user is not authenticated (`isAuth`), the user is redirected to the login page.
- If authenticated, the `userId` is automatically filled in the form.

## Form Submission
The form uses basic validation to ensure the required fields are filled:
- **pickupDate**, **serviceType**, **contactNumber**, and **userId** are mandatory.
- If any required fields are missing, a toast notification displays an error message.

Once validated, the form data is dispatched using the `createRequest` action to handle submission.

## Code Snippet
Here is a sample code snippet for the request submission form:


