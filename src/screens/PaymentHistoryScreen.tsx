import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../api/client";
import PaginationControls from "../components/PaginationControls";
import { useAuth } from "../context/AuthContext";
import { ApiResponse, Pagination, Payment } from "../types";

type Props = {
  onBack: () => void;
};

export default function PaymentHistoryScreen({ onBack }: Props) {
  const { user } = useAuth();
  const [accountNumber, setAccountNumber] = useState(user?.accountNumber || "");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPayments(nextPage = page, nextAccountNumber = accountNumber) {
    if (!nextAccountNumber.trim()) {
      setError("Account number is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.get<ApiResponse<Payment[]>>(
        `/api/customers/${nextAccountNumber.trim()}/payments?page=${nextPage}&limit=20&sort=payment_date&order=desc`
      );
      setPayments(response.data.data || []);
      setPagination(response.data.pagination || null);
      setPage(nextPage);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unable to load payment history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.accountNumber) {
      fetchPayments(1, user.accountNumber);
    }
  }, [user?.accountNumber]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Payment History</Text>

      {user?.role !== "customer" ? (
        <View style={styles.lookup}>
          <TextInput onChangeText={setAccountNumber} placeholder="Account number" style={styles.input} value={accountNumber} />
          <TouchableOpacity onPress={() => fetchPayments(1)} style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {loading ? <ActivityIndicator /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={payments}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={!loading ? <Text style={styles.empty}>No payments found</Text> : null}
        renderItem={({ item }) => (
          <View style={styles.payment}>
            <Text style={styles.paymentTitle}>Payment #{item.id}</Text>
            <Text style={styles.row}>Amount: {item.payment_amount}</Text>
            <Text style={styles.row}>Status: {item.status}</Text>
            <Text style={styles.row}>Date: {String(item.payment_date).slice(0, 10)}</Text>
          </View>
        )}
      />

      <PaginationControls pagination={pagination} onPageChange={(nextPage) => fetchPayments(nextPage)} />
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
  link: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },
  title: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
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
  payment: {
    backgroundColor: "#ffffff",
    borderColor: "#d8dee9",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  paymentTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  row: {
    color: "#374151",
    marginBottom: 4,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
  },
  empty: {
    color: "#64748b",
    fontSize: 16,
  },
});
