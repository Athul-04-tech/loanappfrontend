import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default function AuthNavigator() {
  const [screen, setScreen] = useState<"login" | "register">("login");

  if (screen === "register") {
    return <RegisterScreen onLoginPress={() => setScreen("login")} />;
  }

  return <LoginScreen onRegisterPress={() => setScreen("register")} />;
}
