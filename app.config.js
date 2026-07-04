export default {
  expo: {
    name: "Payment Collection App",
    slug: "payment-collection-app",
    version: "1.0.0",
    splash: {
      backgroundColor: "#ffffff",
      resizeMode: "contain",
    },
    android: {
      package: "com.athul.loanapp",
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || process.env.API_URL || "http://16.170.238.199",
      eas: {
        projectId: "3cb38d65-badc-45d1-b636-ffb6db0ccc9d",
      },
    },
  },
};
