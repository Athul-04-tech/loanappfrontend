export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(password: string) {
  return password.length >= 8;
}

export function isPositiveAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0;
}
