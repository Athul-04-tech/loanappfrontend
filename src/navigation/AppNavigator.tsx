import React, { useState } from "react";
import LoanDetailsScreen from "../screens/LoanDetailsScreen";
import MakePaymentScreen from "../screens/MakePaymentScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";

type Screen = "loan" | "payment" | "history";

export default function AppNavigator() {
  const [screen, setScreen] = useState<Screen>("loan");

  if (screen === "payment") {
    return <MakePaymentScreen onBack={() => setScreen("loan")} />;
  }

  if (screen === "history") {
    return <PaymentHistoryScreen onBack={() => setScreen("loan")} />;
  }

  return (
    <LoanDetailsScreen
      onHistory={() => setScreen("history")}
      onMakePayment={() => setScreen("payment")}
    />
  );
}
