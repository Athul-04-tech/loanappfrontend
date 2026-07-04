import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../api/client";
import ConfirmationModal from "../components/ConfirmationModal";
import PaymentForm from "../components/PaymentForm";
import { useAuth } from "../context/AuthContext";
import { ApiResponse, Payment } from "../types";

type Props = {
  onBack: () => void;
};

export default function MakePaymentScreen({ onBack }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<Payment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function submit(accountNumber: string, amount: number) {
    try {
      setLoading(true);
      setError("");
      const response = await api.post<ApiResponse<Payment>>("/api/payments", { accountNumber, amount });
      setPayment(response.data.data || null);
      setModalVisible(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  function closeConfirmation() {
    setModalVisible(false);
    onBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Make Payment</Text>
      <PaymentForm
        accountLocked={user?.role === "customer"}
        initialAccountNumber={user?.accountNumber}
        loading={loading}
        onSubmit={submit}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ConfirmationModal onClose={closeConfirmation} payment={payment} visible={modalVisible} />
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
    marginBottom: 12,
  },
  error: {
    color: "#b91c1c",
    marginTop: 12,
  },
});
