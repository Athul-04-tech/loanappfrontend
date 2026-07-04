export type UserRole = "customer" | "collector" | "admin";

export type User = {
  id: number;
  accountNumber: string | null;
  email: string;
  role: UserRole;
};

export type Customer = {
  id: number;
  account_number: string;
  issue_date: string;
  interest_rate: string;
  tenure_months: number;
  loan_amount: string;
  emi_due: string;
  total_amount_paid: string;
  remaining_amount: string;
  is_paid_off: number | boolean;
  is_overpaid: number | boolean;
  balance_status: "ACTIVE" | "PAID_OFF" | "OVERPAID";
};

export type Payment = {
  id: number;
  customer_id: number;
  transaction_reference: string;
  payment_date: string;
  payment_amount: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
};

export type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: Pagination;
  error?: string;
};
