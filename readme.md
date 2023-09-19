# Chirp - React Native Chat App with Expo and Firestore

## Description

Chirp is a chat application built using React Native, Expo, and Google Firestore Database. The app allows users to enter their name, choose a background color for the chat screen, engage in text conversations, send images, and share location data. The chat data is stored both online and offline using Google Firestore Database.

## Table of Contents

- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Setting up the Development Environment](#setting-up-the-development-environment)
- [Database Configuration](#database-configuration)
- [Necessary Libraries to Install](#necessary-libraries-to-install)
- [Running the App](#running-the-app)

## Key Features

- **User Authentication:** Users can enter their name and choose a background color before joining the chat.
- **Conversations Page:** Display conversations with an input field and submit button for sending messages.
- **Image Sending:** Users can send images as part of their messages.
- **Location Sharing:** Users can share their current location as part of their messages.
- **Online and Offline Storage:** Chat data is stored in Google Firestore Database for online access and is cached for offline use.

## Screenshots

![Start screen](screenshots/start_screen.png)
Start screen

![Chat screen](screenshots/chat_screen.png)
Chat screen

## Setting up the Development Environment

To set up the development environment for Chirp, follow these steps:

1. **Expo Setup:**

   - Create an Expo account.
   - Install Expo CLI globally using npm:

   ```bash
   npm install -g expo-cli
   ```

2. **Android Studio Setup (Optional):**
   - If you plan to run the app on an Android emulator, set up Android Studio. Follow the official Expo guide for Android development environment setup: [Expo Android Development Environment](https://docs.expo.dev/workflow/android-studio-emulator/)

## Database Configuration

Chirp uses Firebase as the backend database. To configure Firebase:

1. Visit the [Firebase Console](https://console.firebase.google.com/) and create a new project if you don't have one already.
2. In the "Rules" tab, change "allow read, write: if false;" to "allow read, write: if true;"
3. Set up Firebase Authentication (Anonymous Authentication is used in this app) and Firestore Database. Make sure to enable anonymous authentication in Firebase.
4. Obtain the Firebase configuration object for your project. It should look something like this:

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};
```

In the App.js file of your project, replace the firebaseConfig object with your own Firebase configuration.

## Necessary Libraries to Install

Before running the app, make sure to install the required dependencies using npm or yarn:
(Expo only supports Node up to version 16.19.0, please ensure you are using this version)

```
npm install
@react-native-async-storage/async-storage
@react-native-community/netinfo
@react-navigation/native
@react-navigation/native-stack
expo firebase
react-native
react-native-gifted-chat
react-native-safe-area-context
react-native-screens
expo-image-picker
expo-location
react-native-maps
```

This will install all the dependencies needed to run the app.

## Running the App

Now that you've set up the environment and Firebase, you can run the app:

```
expo start
```

This command will start the Expo development server, and you can run the app on an emulator or a physical device.

    Use expo start -c to clear cache.
    Use expo start --offline for offline testing.

Feel free to reach out if you have any questions, encounter issues, or have feedback. We're here to make your chat experience exceptional.
