import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { isValidEmail, isValidPassword } from "../utils/validators";

type Props = {
  onLoginPress: () => void;
};

export default function RegisterScreen({ onLoginPress }: Props) {
  const { register } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!accountNumber.trim() || !isValidEmail(email) || !isValidPassword(password)) {
      setError("Enter account number, valid email, and 8 character password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await register(accountNumber.trim(), email.trim(), password);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.eyebrow}>New access</Text>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create a customer login using an existing loan account number.</Text>
        <TextInput
          onChangeText={setAccountNumber}
          placeholder="Account number"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={accountNumber}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity disabled={loading} onPress={submit} style={[styles.button, loading && styles.buttonDisabled]}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Register</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={onLoginPress}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#eef4f8",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#dbe4ec",
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: 420,
    padding: 24,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    width: "100%",
  },
  eyebrow: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#0f172a",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderColor: "#d6e0ea",
    borderRadius: 6,
    borderWidth: 1,
    color: "#0f172a",
    fontSize: 16,
    marginBottom: 12,
    padding: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    borderRadius: 6,
    marginTop: 6,
    padding: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  link: {
    color: "#1d4ed8",
    fontSize: 16,
    marginTop: 18,
    textAlign: "center",
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
    marginBottom: 10,
  },
});
