import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pagination } from "../types";

type Props = {
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
};

export default function PaginationControls({ pagination, onPageChange }: Props) {
  if (!pagination) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        disabled={!pagination.hasPrevPage}
        onPress={() => onPageChange(pagination.page - 1)}
      >
        <Text style={[styles.link, !pagination.hasPrevPage && styles.disabled]}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.page}>
        Page {pagination.page} of {pagination.totalPages || 1}
      </Text>
      <TouchableOpacity
        disabled={!pagination.hasNextPage}
        onPress={() => onPageChange(pagination.page + 1)}
      >
        <Text style={[styles.link, !pagination.hasNextPage && styles.disabled]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },
  link: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    color: "#94a3b8",
  },
  page: {
    color: "#374151",
    fontSize: 15,
  },
});
