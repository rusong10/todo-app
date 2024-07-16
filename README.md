# Todo App

A simple Todo application built with React Native (Expo) and Firebase (Firestore & Auth).

## Introduction

This project is a straightforward Todo app that allows users to manage their tasks. It includes user authentication and real-time updates with Firebase.

## Technologies Used

- React Native (Expo)
- Firebase Firestore
- Firebase Authentication

## Features

- User Authentication (Sign up, Sign in, Sign out)
- Create, read and delete todos
- Mark todos as completed
- Real-time updates with Firestore

## Installation

### Prerequisites

- Node.js
- Expo CLI
- EAS CLI
- Firebase account

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/rusong10/todo-app.git
   cd todo-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```
   
3. **Set up Firebase**
    - Go to the Firebase Console and create a new project.
    - Enable Firestore and Authentication (Email/Password).
    - Copy your Firebase configuration keys.

4. **Configure environment variables:**
    - Create a new `.env.development` file based on the `.env.template` file:

      ```sh
      cp .env.template .env.development
      ```

    - Edit the .env.development file:

      ```env
      ENV_SETUP="Development"
      API_KEY=your_firebase_api_key
      AUTH_DOMAIN=your_project_id.firebaseapp.com
      PROJECT_ID=your_project_id
      STORAGE_BUCKET=your_project_id.appspot.com
      MESSAGING_SENDER_ID=your_messaging_sender_id
      APP_ID=your_app_id
      ```

5. **Log in to EAS**
   
   ```sh
   eas login
   ```
   
7. **Build a development build using EAS (Android):**
   
   ```sh
   eas build --profile development --platform android
   ```
   
9. **Start the app:**
   
   ```sh
   npm start
   ```
   
## Usage

1. Open the app on your emulator or physical device.
2. Sign up for a new account or log in with an existing account.
3. Add, delete, and mark todos as completed.

## Download
You can download the latest APK from the [Releases](https://github.com/rusong10/todo-app/releases/tag/v1.0.0) section.

## Screenshots
<img src="https://github.com/user-attachments/assets/ab8f5556-03c3-49da-af84-5316b3e5eded" alt="Login Screen" width="300"/>
<img src="https://github.com/user-attachments/assets/e6c71691-6584-48cc-9e55-ff28f2152175" alt="Home Screen" width="300"/>
