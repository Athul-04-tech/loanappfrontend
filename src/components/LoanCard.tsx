import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Customer } from "../types";

type Props = {
  customer: Customer;
};

export default function LoanCard({ customer }: Props) {
  const paidOff = customer.is_paid_off === true || customer.is_paid_off === 1;
  const overpaid = customer.is_overpaid === true || customer.is_overpaid === 1;
  const statusText = overpaid ? "Overpaid" : paidOff ? "Paid Off" : "Active";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Loan Details</Text>
        <Text style={[styles.status, paidOff && styles.statusPaid]}>{statusText}</Text>
      </View>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Remaining Balance</Text>
        <Text style={styles.balanceAmount}>{customer.remaining_amount}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Total Loan Amount</Text>
          <Text style={styles.metricValue}>{customer.loan_amount}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Amount Paid</Text>
          <Text style={styles.metricValue}>{customer.total_amount_paid}</Text>
        </View>
      </View>

      <View style={styles.detailList}>
        <Text style={styles.row}>Account: {customer.account_number}</Text>
        <Text style={styles.row}>Issue date: {String(customer.issue_date).slice(0, 10)}</Text>
        <Text style={styles.row}>Interest rate: {customer.interest_rate}%</Text>
        <Text style={styles.row}>Tenure: {customer.tenure_months} months</Text>
        <Text style={styles.emi}>EMI due: {customer.emi_due}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#d8dee9",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    width: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "700",
  },
  status: {
    backgroundColor: "#e0f2fe",
    borderRadius: 6,
    color: "#0369a1",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusPaid: {
    backgroundColor: "#dcfce7",
    color: "#15803d",
  },
  balanceBox: {
    backgroundColor: "#f0fdfa",
    borderColor: "#99f6e4",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  balanceLabel: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  balanceAmount: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  metric: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  metricLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  metricValue: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
  },
  detailList: {
    borderTopColor: "#e5e7eb",
    borderTopWidth: 1,
    paddingTop: 12,
  },
  row: {
    color: "#374151",
    fontSize: 16,
    marginBottom: 8,
  },
  emi: {
    color: "#0f766e",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
});
