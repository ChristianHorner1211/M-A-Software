# Acquisitions Management Platform

A professional web application designed for managing insurance carrier conversions during mergers and acquisitions. This platform streamlines the process of tracking carrier code changes, FEIN updates, and communication with 75+ carrier representatives.

## Overview

This application addresses the challenges faced by mergers and acquisitions teams when handling multiple simultaneous agency conversions. It provides real-time tracking, automated email templates, and comprehensive activity logging to ensure nothing falls through the cracks.

## Features

### 1. Multi-Acquisition Management
- **Tabbed Interface**: Easily switch between multiple active acquisitions
- **Real-time Status**: Track conversion progress across all carriers
- **Color-Coded System**:
  - 🟢 **Green (Transparent)**: Conversion completed
  - 🔴 **Red (Transparent)**: Outstanding/Not yet completed

### 2. Carrier Tracking
- Manage relationships with 75+ insurance carriers
- Track individual carrier conversion status
- Quick-action buttons for each carrier:
  - **Mark Done**: Toggle completion status
  - **Email**: Quickly compose emails to carrier reps

### 3. Email Templates
Five pre-configured email templates with auto-fill functionality:
1. **Initial Conversion Request**: First contact with carrier rep
2. **Follow-up Reminder**: Gentle reminder for pending conversions
3. **Urgent Request**: Escalation for time-sensitive matters
4. **Conversion Confirmation**: Verify completion of changes
5. **Completion Notice**: Thank carrier for successful conversion

**Auto-fill Fields**:
- Acquisition name
- Date acquired
- Previous owner
- New owner (LLC name)
- FEIN

### 4. Activity Log
- Track all interactions with carriers
- Activity types: Email, Phone Call, Note, Meeting
- Timestamped entries
- Filterable by acquisition

### 5. Bulk Email Capability
- Select multiple carriers at once
- Send batch emails with one click
- Pre-filled carrier-specific information

## Getting Started

### Opening the Application

1. Open `index.html` in any modern web browser
2. The application will load with sample data showing three acquisitions

### Creating a New Acquisition

1. Click the **"+ New Acquisition"** button in the header
2. Fill in the required information:
   - Acquisition Name
   - Date Acquired
   - Previous Owner
   - New Owner (LLC Name)
   - FEIN
3. Click **"Create Acquisition"**
4. The system will automatically assign carriers to the new acquisition

### Managing Carriers

1. **Select an acquisition** by clicking its tab at the top
2. View all carriers associated with that acquisition
3. **Mark as Done**: Click the "Mark Done" button when a carrier has completed the conversion
4. **Email a Carrier**: Click the carrier name or "Email" button to compose an email

### Using Email Templates

1. Click **"Email Templates"** in the header
2. Select carriers using the checkboxes
3. Choose a template from the left sidebar:
   - Initial Conversion Request
   - Follow-up Reminder
   - Urgent Request
   - Conversion Confirmation
   - Completion Notice
4. Review the auto-filled content (you can edit if needed)
5. Click **"Send Email"** to send

The email will be automatically populated with:
- Acquisition details
- Previous and new owner information
- FEIN
- Date acquired

### Tracking Activities

1. Click **"+ Add Activity"** in the Activity Log section
2. Select activity type (Email, Phone Call, Note, or Meeting)
3. Enter contact information
4. Select the relevant carrier
5. Add notes about the interaction
6. Click **"Add Activity"**

All activities are timestamped and associated with the current acquisition.

## Key Workflows

### Scenario 1: New Acquisition with 30 Carriers

1. Create a new acquisition with the acquisition details
2. Review the carrier list (system assigns carriers automatically)
3. Send initial conversion emails to all carriers using the bulk email feature
4. As carriers respond and complete conversions, mark them as "Done"
5. Send follow-up emails to carriers still showing as "Outstanding" (red)
6. Log all phone calls and responses in the Activity Log
7. Once all carriers are green (Done), the acquisition is complete

### Scenario 2: Following Up on Outstanding Conversions

1. Switch to the acquisition tab
2. Identify carriers with red (Outstanding) status
3. Click the carrier name to quickly compose a follow-up email
4. Select the "Follow-up Reminder" template
5. Send the email
6. Log the follow-up in the Activity Log

### Scenario 3: Managing 90+ Conversions Simultaneously

1. Use the tabbed interface to switch between active acquisitions
2. Color coding provides instant visual feedback on progress
3. Activity log helps remember what was discussed with each carrier
4. Email templates save time when communicating with multiple carriers

## Technical Details

### Technologies Used
- **HTML5**: Structure and content
- **CSS3**: Professional styling with responsive design
- **JavaScript (ES6)**: Interactive functionality and data management

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Data Storage
- Currently uses browser memory (data resets on page reload)
- For production use, integrate with a backend database

## Future Enhancements

Potential improvements for production deployment:

1. **Backend Integration**: Connect to a database for persistent storage
2. **Email Integration**: Direct integration with email client (Outlook, Gmail)
3. **Drag & Drop**: Implement drag-and-drop email import from Outlook
4. **User Authentication**: Multi-user support with role-based access
5. **Reporting**: Generate conversion status reports
6. **Notifications**: Automated reminders for outstanding conversions
7. **Search & Filter**: Advanced filtering for carriers and activities
8. **Export Functionality**: Export data to Excel/CSV
9. **Calendar Integration**: Track deadlines and follow-up dates
10. **Document Attachments**: Store carrier response emails and documents

## Design Principles

- **Professional Appearance**: Clean, modern interface suitable for corporate use
- **Color-Coded Status**: Transparent green/red system for quick visual reference
- **Efficiency-Focused**: Minimize clicks and repetitive data entry
- **Scalability**: Handles 75+ carriers and multiple simultaneous acquisitions
- **User-Friendly**: Intuitive interface requiring minimal training

## Support

This application was designed to streamline the M&A process for insurance carrier conversions. It eliminates the need to track conversions in spreadsheets or email threads, providing a centralized platform for all conversion-related activities.

---

**Version**: 1.0
**Last Updated**: January 2026
**Developed for**: Insurance M&A Department
