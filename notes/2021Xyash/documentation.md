--------- freshNFold Project Documentation ---------

--- Week 1: Research and Initial Setup

    Objectives:
      • Research customizable notification systems.
      • Develop foundational screens for notification settings.
      • Start implementing basic notification functionalities.

Tasks Completed:

1.Research Customizable Notification Systems

• Investigated various notification systems (e.g., Slack, Trello) to understand user preferences and notification templates.
• Identified best practices for user-friendly notification customization.

2.Develop Foundational Screens for Notification Settings

• Created wireframes for notification settings page.
• Designed UI for customizing notification types and templates.

3.Start Implementing Basic Notification Functionalities

• Set up the initial code structure for handling notifications.
• Implemented basic logic to send alerts when reminders are due.

Code Snippets:

// Basic alert notification logic in LaundryReminder component
useEffect(() => {
const interval = setInterval(() => {
const now = new Date();
reminders.forEach(reminder => {
if (new Date(reminder.time) <= now && !reminder.notified) {
alert(`Time for: ${reminder.text}`);
// Update state to mark as notified
}
});
}, 60000); // Check every minute
return () => clearInterval(interval);
}, [reminders]);

--- Week 2: Customization and Integration

    Objectives:

     • Implement customizable notification preferences and templates.
     • Integrate notification system with order updates and status changes.
     • Conduct user testing of notification functionalities.

Tasks Completed:

1.Implement Customizable Notification Preferences

• Added options for users to choose notification types (email, SMS, in-app).
• Created a UI for users to set their notification preferences.

2.Integrate Notification System with Order Updates

• Established event triggers for sending notifications based on order status changes.
• Integrated with existing order management functionalities in the application.

3.Conduct User Testing

• Conducted user testing sessions to gather feedback on the notification system.
• Collected and analyzed user feedback to identify areas for improvement.

Code Snippets:

// Function to send email notifications on order status changes
const sendEmailNotification = (action, recipientEmail) => {
// Logic to send email using EmailJS
};

--- Week 3: Advanced Features and Testing

    Objectives:

     • Implement advanced notification features and configuration rules.
     • Conduct thorough system testing and resolve any identified issues.

Tasks Completed:

1.Implement Advanced Notification Features

• Developed logic for users to set conditions for receiving notifications (e.g., notify only for delayed orders).
• Enhanced notification templates to allow customization for different actions (order confirmation, delivery updates).

2.Conduct Thorough System Testing

• Ran comprehensive tests to check the functionality of all notification features.
• Resolved any identified bugs or issues, ensuring the system performed as expected.

Code Snippets:

// Advanced notification condition logic
if (userPreferences.delayNotification && order.isDelayed) {
sendEmailNotification('Your order is delayed', userEmail);
}

--- Week 4: Finalization and Documentation

    Objectives:

     • Finalize notification functionalities and conduct thorough system testing.
     • Document the development process and final features.

Tasks Completed:

1.Finalize Notification Functionalities

• Completed the integration of all notification functionalities.
• Ensured that all user preferences were respected in the notification system.

2.Conduct Final Testing

• Performed final tests to confirm that notifications were functioning correctly.
• Made any last-minute adjustments based on test results.

3.Documentation

• Compiled documentation summarizing the notification system, its functionalities, and how it integrates with the overall application.

Code Snippets:

// Final structure of notification settings
return (

  <div>
    <h2>Notification Settings</h2>
    <form>
      <label>
        <input type="checkbox" /> Email Notifications
      </label>
      <label>
        <input type="checkbox" /> SMS Notifications
      </label>
      {/* More settings */}
    </form>
  </div>
);

--- Summary ---
Throughout the four weeks of development on the FreshNFold project, significant progress was made in creating a robust notification system.
Key tasks included researching customizable notification preferences, implementing user-friendly interfaces,
integrating notifications with order management, and conducting thorough testing to ensure functionality.
The final documentation provides a comprehensive overview of the developed features and processes.
