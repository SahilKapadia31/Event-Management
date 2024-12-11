# Event Management System

## Overview

The **Event Management System** is a full-stack web application that enables users to create, view, edit, and manage events. The application provides functionality for user authentication, event browsing, RSVP management, and notifications for event updates. The app is fully responsive and deploys both frontend and backend on Vercel.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Requirements](#requirements)
4. [Getting Started](#getting-started)
5. [Deployment](#deployment)
6. [Testing](#testing)
7. [UI References](#ui-references)
8. [Contributing](#contributing)
9. [License](#license)

## Features

1. **User Authentication**:
   - User registration and login using JWT.
   - Authentication required for creating and managing events.

2. **Create Event**:
   - Add new events with details such as:
     - Event title
     - Description
     - Date
     - Location
     - Max attendees
   - Supports image uploads for event banners.

3. **View Events**:
   - Display all upcoming events on the home page.
   - Filter events by:
     - Date
     - Location
     - Event type.

4. **RSVP for Events**:
   - Registered users can RSVP for events.
   - RSVP is limited to the maximum number of attendees.
   - Users can view their RSVP status for events.

5. **Event Notifications**:
   - Notifications for event updates and reminders.

6. **Edit/Delete Events**:
   - Event creators can update or delete their events.

7. **Mobile-Responsive Design**:
   - Fully optimized for mobile and tablet devices.

8. **Deployment**:
   - Fully deployed on Vercel for both frontend and backend.

## Technologies Used

- **Frontend**:
  - React.js
  - React Context API for state management
  - CSS Frameworks for styling (e.g., Bootstrap, Tailwind CSS)
- **Backend**:
  - Node.js with Express.js
  - MongoDB (Mongoose for schema definition)
- **Authentication**:
  - JWT (JSON Web Tokens)
- **Deployment**:
  - Vercel (Frontend and Backend)

## Requirements

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Context API or built-in state

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB instance running locally or on MongoDB Atlas

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-management-system
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Environment Variables**:
   - Create a `.env` file in the `backend` directory with the following:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` for the frontend.

## Deployment

1. Deploy the **frontend** on Vercel:
   - Link your GitHub repository and deploy directly from the `frontend` folder.

2. Deploy the **backend** on Vercel:
   - Link your GitHub repository and deploy directly from the `backend` folder.

3. Add the live URLs to your GitHub repository's README.

## Testing

1. **Ensure both servers are running** (frontend and backend).
2. **Test User Authentication**:
   - Register a new user and log in.
3. **Test Event Creation**:
   - Create a new event with all required details and image upload.
4. **RSVP**:
   - RSVP for an event as a registered user and validate RSVP limits.
5. **Edit/Delete Events**:
   - Verify the edit and delete functionality.
6. **Responsiveness**:
   - Test the application on various devices (mobile, tablet, desktop).

## UI References

1. [Eventbrite.com](https://www.eventbrite.com): Clean and professional design for event management.
2. [Meetup.com](https://www.meetup.com): Simplified interface for browsing events.
3. [Ticketmaster.com](https://www.ticketmaster.com): Comprehensive design for events with images and stats.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open a pull request or an issue.

## License

This project is open-source and available under the [MIT License](LICENSE).