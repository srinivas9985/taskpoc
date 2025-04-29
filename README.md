# E-commerce Mobile App

A modern React Native e-commerce application with features like product browsing, shopping cart, and service booking.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### iOS Setup

For iOS development, you need to install CocoaPods dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### Environment Setup

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for your operating system.

## 🏃‍♂️ Running the App

### Start Metro Server

First, start the Metro bundler:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

### Run on iOS

```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

### Run on Android

```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

## 📱 Features

- Product browsing and search
- Shopping cart functionality
- Service booking system
- Category-based navigation
- User authentication
- Responsive design for both phones and tablets

## 🛠 Tech Stack

- React Native
- React Navigation
- React Native Vector Icons
- React Native Linear Gradient
- React Native Responsive Screen

## 📂 Project Structure

```
src/
├── components/         # Reusable components
├── screens/           # Screen components
├── navigation/        # Navigation configuration
├── constants/         # Constants and configurations
├── theme/            # Theme configuration
└── assets/           # Images, fonts, etc.
```

## 🔨 Development

### Code Style

The project uses ESLint and Prettier for code formatting. To format your code:

```bash
# Using npm
npm run lint
npm run format

# OR using Yarn
yarn lint
yarn format
```

### Building for Production

#### Android

```bash
# Generate APK
cd android
./gradlew assembleRelease
```

The APK will be available at `android/app/build/outputs/apk/release/app-release.apk`

#### iOS

Build the app using Xcode by selecting Product > Archive

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🆘 Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed
2. Clean and rebuild the project
3. Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)

### Common Issues

#### iOS Build Fails
```bash
cd ios
pod deintegrate
pod install
```

#### Android Build Fails
```bash
cd android
./gradlew clean
```

## 📞 Support

For support, please open an issue in the repository or contact the development team.
