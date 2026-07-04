# Payment Collection App Frontend

React Native and Expo frontend for the Payment Collection App.

## Prerequisites

- Node.js 20+
- npm
- Expo CLI through `npx expo`

## Local Setup

1. Copy `.env.example` to `.env`.
2. Set `EXPO_PUBLIC_API_URL` to the backend URL.
   - Android emulator: usually `http://10.0.2.2:3000`
   - iOS simulator: usually `http://localhost:3000`
   - Physical device: use your machine's LAN IP, for example `http://192.168.1.20:3000`
3. Install dependencies:

```bash
npm install
```

4. Start Expo:

```bash
npm start
```

## Screens

- Login
- Register
- Loan Details
- Make Payment
- Confirmation Modal
- Payment History

## API Flow

The app calls the backend through `src/api/client.ts`. JWTs are stored with `expo-secure-store` and attached as `Authorization: Bearer <token>` on authenticated requests.

End-to-end flow:

1. Register a customer account with an existing account number.
2. Login.
3. View loan details.
4. Submit an EMI payment.
5. See the confirmation modal.
6. View paginated payment history.

## CI/CD Pipeline

A production pipeline should run `npm ci`, validate the app, build with EAS Build or native build tools, inject `API_URL`, and publish the APK/IPA or Expo update artifact.

Required secrets include `API_URL` and any platform signing credentials used by the chosen Expo build flow.

## AWS EC2 Deployment

The mobile app points at the deployed backend API URL. The backend can be served from EC2 through Nginx and PM2, with MySQL on EC2 or RDS.

## Future Improvements

- Refresh token support.
- Password reset flow.
- OpenAPI-driven typed API client.
- More production-grade observability.
