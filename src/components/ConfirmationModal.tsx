import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Payment } from "../types";

type Props = {
  payment: Payment | null;
  visible: boolean;
  onClose: () => void;
};

export default function ConfirmationModal({ payment, visible, onClose }: Props) {
  if (!payment) {
    return null;
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.stamp}>{payment.status}</Text>
          <Text style={styles.title}>Payment Confirmed</Text>
          <Text style={styles.row}>Payment ID: {payment.id}</Text>
          <Text style={styles.row}>Amount: {payment.payment_amount}</Text>
          <Text style={styles.row}>Reference: {payment.transaction_reference}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    width: "100%",
  },
  stamp: {
    alignSelf: "flex-start",
    borderColor: "#16a34a",
    borderRadius: 6,
    borderWidth: 2,
    color: "#15803d",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  title: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    color: "#374151",
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 6,
    marginTop: 14,
    padding: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
