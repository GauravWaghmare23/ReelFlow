# ReelFlow

ReelFlow is a modern social media application inspired by TikTok, designed to provide users with an engaging platform to create, share, and discover short-form video content. Built with React Native and Expo, ReelFlow offers a seamless cross-platform experience for iOS, Android, and Web.

## About

ReelFlow brings together content creators and viewers in an intuitive, swipeable video feed experience. The app focuses on delivering smooth video playback, interactive features, and a vibrant community for sharing creative content.

## Current Implementation

### Project Structure

The project follows Expo Router's file-based routing system with a tab-based navigation structure:

```
src/
└── app/
    └── (tabs)/
        ├── _layout.tsx    # Tab navigation layout
        ├── index.tsx      # Home screen
        ├── friends.tsx    # Friends screen
        ├── newPost.tsx    # New post creation screen
        ├── inbox.tsx      # Inbox/messages screen
        └── profile.tsx    # User profile screen
```

### Features Implemented

- **Tab Navigation System**

  - Bottom tab bar with 5 main screens
  - Custom icons using `@expo/vector-icons` (Entypo and FontAwesome)
  - Active/inactive tab color states (black/gray)
  - Centered header titles

- **Screen Components**

  - **Home Screen** (`index.tsx`) - Main feed screen
  - **Friends Screen** (`friends.tsx`) - Social connections
  - **New Post Screen** (`newPost.tsx`) - Content creation
  - **Inbox Screen** (`inbox.tsx`) - Messages and notifications
  - **Profile Screen** (`profile.tsx`) - User profile

- **Technical Stack**

  - **Expo Router** (`~6.0.21`) - File-based routing and navigation
  - **React Native Safe Area Context** (`~5.6.0`) - Safe area handling for all screens
  - **React Native Screens** (`~4.16.0`) - Native screen management
  - **TypeScript** (`~5.9.2`) - Type-safe development
  - **React** (`19.1.0`) - UI library
  - **React Native** (`0.81.5`) - Mobile framework

- **Configuration**
  - TypeScript configuration with path aliases (`@/*` and `@assets/*`)
  - Expo SDK 54 with new architecture enabled
  - Module system: ES2015

### Navigation Structure

The app uses a bottom tab navigator with the following tabs:

1. **Home** - Main video feed (Entypo home icon)
2. **Friends** - Social connections (FontAwesome users icon)
3. **New Post** - Content creation (Entypo plus icon)
4. **Inbox** - Messages (Entypo mail icon)
5. **Profile** - User profile (FontAwesome user icon)

## Future Features

- **Video Feed**

  - Infinite vertical scroll feed
  - Auto-play videos with sound
  - Swipe gestures for navigation
  - Video quality optimization

- **User Profiles**

  - Customizable profile pages
  - User bio and profile pictures
  - Follower/following system
  - User video collections

- **Content Creation**

  - Video recording and editing
  - Filters and effects
  - Music and sound integration
  - Video upload from gallery

- **Social Interactions**

  - Like, comment, and share functionality
  - Follow/unfollow users
  - Direct messaging
  - Notifications system

- **Discovery**

  - Search functionality
  - Trending videos
  - Hashtag exploration
  - Personalized recommendations

- **Additional Features**
  - Live streaming
  - Duet and stitch features
  - Video analytics for creators
  - Privacy and safety controls

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Setup Instructions

1. **Create the project** (if starting fresh):

   ```bash
   npx create-expo-app@latest --template blank-typescript .
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   Or use platform-specific commands:

   ```bash
   npm run android    # For Android
   npm run ios        # For iOS
   npm run web        # For Web
   ```

4. **Run on your device**:
   - Install the Expo Go app on your mobile device
   - Scan the QR code displayed in the terminal or browser
   - The app will load on your device

## Development

This project uses:

- **React Native** - Mobile app framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript
