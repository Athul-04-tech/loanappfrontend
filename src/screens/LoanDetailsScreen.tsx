import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../api/client";
import LoanCard from "../components/LoanCard";
import { useAuth } from "../context/AuthContext";
import { ApiResponse, Customer } from "../types";

type Props = {
  onMakePayment: () => void;
  onHistory: () => void;
};

export default function LoanDetailsScreen({ onMakePayment, onHistory }: Props) {
  const { user, logout } = useAuth();
  const [accountNumber, setAccountNumber] = useState(user?.accountNumber || "");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCustomer(nextAccountNumber = accountNumber) {
    if (!nextAccountNumber.trim()) {
      setError("Account number is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.get<ApiResponse<Customer>>(`/api/customers/${nextAccountNumber.trim()}`);
      setCustomer(response.data.data || null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unable to load loan details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.accountNumber) {
      fetchCustomer(user.accountNumber);
    }
  }, [user?.accountNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Loan Details</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.link}>Logout</Text>
        </TouchableOpacity>
      </View>

      {user?.role !== "customer" ? (
        <View style={styles.lookup}>
          <TextInput onChangeText={setAccountNumber} placeholder="Account number" style={styles.input} value={accountNumber} />
          <TouchableOpacity onPress={() => fetchCustomer()} style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {loading ? <ActivityIndicator /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {customer ? <LoanCard customer={customer} /> : null}

      <TouchableOpacity onPress={onMakePayment} style={styles.button}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onHistory} style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>Payment History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    flex: 1,
    padding: 20,
    paddingTop: 56,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "800",
  },
  link: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
  },
  lookup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    padding: 12,
  },
  smallButton: {
    backgroundColor: "#2563eb",
    borderRadius: 6,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  smallButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 6,
    marginTop: 20,
    padding: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  outlineButton: {
    alignItems: "center",
    borderColor: "#2563eb",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 12,
    padding: 14,
  },
  outlineButtonText: {
    color: "#2563eb",
    fontWeight: "700",
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
  },
});
