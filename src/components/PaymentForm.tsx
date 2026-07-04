import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isPositiveAmount } from "../utils/validators";

type Props = {
  initialAccountNumber?: string | null;
  accountLocked?: boolean;
  loading?: boolean;
  onSubmit: (accountNumber: string, amount: number) => void;
};

export default function PaymentForm({ initialAccountNumber, accountLocked, loading, onSubmit }: Props) {
  const [accountNumber, setAccountNumber] = useState(initialAccountNumber || "");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function submit() {
    if (!accountNumber.trim()) {
      setError("Account number is required");
      return;
    }

    if (!isPositiveAmount(amount)) {
      setError("Amount must be a positive number");
      return;
    }

    setError("");
    onSubmit(accountNumber.trim(), Number(amount));
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Account number</Text>
      <TextInput
        editable={!accountLocked}
        onChangeText={setAccountNumber}
        style={[styles.input, accountLocked && styles.locked]}
        value={accountNumber}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={setAmount}
        placeholder="Enter EMI amount"
        style={styles.input}
        value={amount}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity disabled={loading} onPress={submit} style={styles.button}>
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Submit Payment</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  label: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 16,
    padding: 12,
  },
  locked: {
    backgroundColor: "#eef2f7",
    color: "#64748b",
  },
  error: {
    color: "#b91c1c",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 6,
    marginTop: 18,
    padding: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
