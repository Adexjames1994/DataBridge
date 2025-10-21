export const mockBankAccounts = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountType: "Checking",
    balance: 5420.5,
    accountNumber: "****1234",
    connectedDate: "2024-01-15",
  },
  {
    id: "2",
    bankName: "Wells Fargo",
    accountType: "Savings",
    balance: 12350.0,
    accountNumber: "****5678",
    connectedDate: "2024-02-01",
  },
  {
    id: "3",
    bankName: "Bank of America",
    accountType: "Credit Card",
    balance: -1240.75,
    accountNumber: "****9012",
    connectedDate: "2024-03-10",
  },
];

export const mockTransactions = [
  // Recent transactions
  {
    id: "1",
    accountId: "1",
    date: "2025-10-20",
    description: "Grocery Store",
    amount: -85.32,
    category: "Food & Dining",
    type: "debit",
  },
  {
    id: "2",
    accountId: "1",
    date: "2025-10-19",
    description: "Salary Deposit",
    amount: 3500.0,
    category: "Income",
    type: "credit",
  },
  {
    id: "3",
    accountId: "3",
    date: "2025-10-18",
    description: "Amazon Purchase",
    amount: -124.99,
    category: "Shopping",
    type: "debit",
  },
  {
    id: "4",
    accountId: "1",
    date: "2025-10-17",
    description: "Coffee Shop",
    amount: -5.5,
    category: "Food & Dining",
    type: "debit",
  },
  {
    id: "5",
    accountId: "2",
    date: "2025-10-15",
    description: "Interest",
    amount: 12.5,
    category: "Income",
    type: "credit",
  },
  {
    id: "6",
    accountId: "1",
    date: "2025-10-14",
    description: "Gas Station",
    amount: -45.0,
    category: "Transportation",
    type: "debit",
  },
  {
    id: "7",
    accountId: "3",
    date: "2025-10-13",
    description: "Netflix",
    amount: -15.99,
    category: "Entertainment",
    type: "debit",
  },
  {
    id: "8",
    accountId: "1",
    date: "2025-10-12",
    description: "Electricity Bill",
    amount: -120.0,
    category: "Bills & Utilities",
    type: "debit",
  },
  {
    id: "9",
    accountId: "1",
    date: "2025-10-10",
    description: "Restaurant",
    amount: -67.5,
    category: "Food & Dining",
    type: "debit",
  },
  {
    id: "10",
    accountId: "3",
    date: "2025-10-09",
    description: "Uber Ride",
    amount: -18.75,
    category: "Transportation",
    type: "debit",
  },
  {
    id: "11",
    accountId: "1",
    date: "2025-10-08",
    description: "Gym Membership",
    amount: -50.0,
    category: "Health & Fitness",
    type: "debit",
  },
  {
    id: "12",
    accountId: "2",
    date: "2025-10-05",
    description: "Transfer from Checking",
    amount: 500.0,
    category: "Transfer",
    type: "credit",
  },
  {
    id: "13",
    accountId: "1",
    date: "2025-10-05",
    description: "Transfer to Savings",
    amount: -500.0,
    category: "Transfer",
    type: "debit",
  },
  {
    id: "14",
    accountId: "1",
    date: "2025-10-03",
    description: "Grocery Store",
    amount: -92.15,
    category: "Food & Dining",
    type: "debit",
  },
  {
    id: "15",
    accountId: "3",
    date: "2025-10-01",
    description: "Online Shopping",
    amount: -210.0,
    category: "Shopping",
    type: "debit",
  },
];

export const mockSpendingCategories = [
  {
    category: "Food & Dining",
    amount: 250.47,
    percentage: 31,
    color: "#FF6B6B",
  },
  {
    category: "Shopping",
    amount: 334.99,
    percentage: 42,
    color: "#4ECDC4",
  },
  {
    category: "Transportation",
    amount: 63.75,
    percentage: 8,
    color: "#45B7D1",
  },
  {
    category: "Bills & Utilities",
    amount: 120.0,
    percentage: 15,
    color: "#FFA07A",
  },
  {
    category: "Entertainment",
    amount: 15.99,
    percentage: 2,
    color: "#98D8C8",
  },
  {
    category: "Health & Fitness",
    amount: 50.0,
    percentage: 2,
    color: "#F7B731",
  },
];

export const mockInsights = [
  {
    id: "1",
    type: "tip",
    title: "Save on Shopping",
    description:
      "Your shopping expenses are 42% of total spending. Consider setting a monthly budget of $250 to save $85/month.",
    action: "Set Budget",
  },
  {
    id: "2",
    type: "achievement",
    title: "Great Savings Habit!",
    description:
      "You transferred $500 to savings this month. You're on track to save $6,000 this year!",
  },
  {
    id: "3",
    type: "warning",
    title: "Credit Card Balance",
    description:
      "Your credit card balance is $1,240.75. Pay it off to avoid interest charges.",
    action: "Make Payment",
  },
  {
    id: "4",
    type: "tip",
    title: "Recurring Subscriptions",
    description:
      "We detected recurring payments (Netflix, Gym). Review if you're using all services.",
    action: "Review Subscriptions",
  },
];

export const calculateCreditScore = (transactions, accounts) => {
  // Payment History (40 points) - Based on regular income and no overdrafts
  const incomeTransactions = transactions.filter(
    (t) => t.category === "Income"
  );
  const paymentHistory = Math.min(40, incomeTransactions.length * 10);

  // Savings Rate (30 points) - Based on savings account balance and transfers
  const savingsAccount = accounts.find((a) => a.accountType === "Savings");
  const savingsRate = savingsAccount
    ? Math.min(30, (savingsAccount.balance / 15000) * 30)
    : 0;

  // Spending Behavior (20 points) - Lower spending variability is better
  const debitTransactions = transactions.filter((t) => t.type === "debit");
  const avgSpending =
    debitTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) /
    debitTransactions.length;
  const spendingBehavior = avgSpending < 100 ? 20 : 15;

  // Account Diversity (10 points)
  const accountDiversity = Math.min(10, accounts.length * 3);

  const score = Math.round(
    300 + // Base score
      paymentHistory * 3.5 + // Max 140
      savingsRate * 5 + // Max 150
      spendingBehavior * 13 + // Max 260
      accountDiversity * 15 // Max 150
  );

  return {
    score: Math.min(850, Math.max(300, score)),
    factors: {
      paymentHistory,
      savingsRate,
      spendingBehavior,
      accountDiversity,
    },
  };
};
