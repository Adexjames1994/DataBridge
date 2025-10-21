export const userData = {
  name: "John Doe",
  consentGiven: true,
  accounts: [
    {
      id: 1,
      type: "Bank Account",
      bankName: "First Bank",
      balance: 4500,
      transactions: [
        { category: "Groceries", amount: 200 },
        { category: "Transport", amount: 100 },
        { category: "Entertainment", amount: 150 },
      ],
      savings: 800,
    },
    {
      id: 2,
      type: "Fintech Wallet",
      bankName: "FlutterSave",
      balance: 1200,
      transactions: [
        { category: "Food Delivery", amount: 60 },
        { category: "Shopping", amount: 90 },
        { category: "Bills", amount: 110 },
      ],
      savings: 200,
    },
    {
      id: 3,
      type: "Investment Platform",
      bankName: "WealthGrow",
      balance: 3000,
      investments: [
        { type: "Stocks", value: 1800 },
        { type: "Crypto", value: 1200 },
      ],
    },
  ],
};
