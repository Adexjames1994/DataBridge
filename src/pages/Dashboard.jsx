// import { useState } from "react";
// import { userData } from "../data/dummyData";
// import ConsentModal from "../components/ConsentModal";

// export default function Dashboard() {
//   const [showConsent, setShowConsent] = useState(!userData.consentGiven);

//   const totalBalance = userData.accounts.reduce(
//     (sum, acc) => sum + (acc.balance || 0),
//     0
//   );
//   const totalSavings = userData.accounts.reduce(
//     (sum, acc) => sum + (acc.savings || 0),
//     0
//   );

//   const totalSpending = userData.accounts
//     .flatMap((acc) => acc.transactions || [])
//     .reduce((sum, tx) => sum + tx.amount, 0);

//   const creditScore = Math.min(
//     850,
//     300 + Math.floor((userData.accounts.length * totalSavings) / totalSpending)
//   );

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">Welcome, {userData.name}</h2>

//       {showConsent && <ConsentModal onClose={() => setShowConsent(false)} />}

//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Total Balance</h3>
//           <p className="text-2xl text-green-600">${totalBalance}</p>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Total Savings</h3>
//           <p className="text-2xl text-blue-600">${totalSavings}</p>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="font-semibold text-gray-700 mb-2">Credit Score</h3>
//           <p className="text-2xl text-purple-600">{creditScore}</p>
//         </div>
//       </div>

//       <div className="mt-8 bg-white p-6 rounded shadow">
//         <h3 className="text-xl font-semibold mb-4">Spending Insights</h3>
//         <ul className="space-y-2">
//           {userData.accounts.flatMap((acc) =>
//             (acc.transactions || []).map((tx, i) => (
//               <li
//                 key={`${acc.bankName}-${i}`}
//                 className="flex justify-between border-b py-1 text-sm"
//               >
//                 <span>
//                   {tx.category} ({acc.bankName})
//                 </span>
//                 <span>${tx.amount}</span>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       <div className="mt-6 text-sm text-gray-600">
//         💡 <strong>Tip:</strong> Try saving at least 10% of your income every
//         month to boost your credit score.
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  LogOut,
  Settings,
  Wallet,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Shield,
  Plus,
} from "lucide-react";

import {
  mockBankAccounts,
  mockTransactions,
  mockSpendingCategories,
  mockInsights,
} from "../data/mockData";
import { AccountsOverview } from "../dashboard/AccountsOverview";
import { SpendingInsights } from "../dashboard/SpendingInsights";
import { ActionableInsights } from "../dashboard/ActionableInsights";
import { CreditScoreCard } from "../dashboard/CreditScoreCard";
import { ConsentModal } from "../components/ConsentModal";

export function Dashboard({ user, onLogout }) {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consents, setConsents] = useState(null);

  const handleConsent = (newConsents) => {
    setConsents(newConsents);
    setShowConsentModal(false);
  };

  const totalBalance = mockBankAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );
  const totalSpending = mockTransactions
    .filter((t) => t.type === "debit" && t.category !== "Transfer")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalIncome = mockTransactions
    .filter((t) => t.type === "credit" && t.category === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-xl text-gray-900">Open Banking Hub</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowConsentModal(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-600">
            Here's your financial overview for October 2025
          </p>
        </div>

        {/* Consent Status */}
        {!consents && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-900">
                    Grant data access to unlock all features
                  </p>
                  <p className="text-xs text-gray-600">
                    Review what data we can access
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowConsentModal(true)} size="sm">
                Review Permissions
              </Button>
            </div>
          </Card>
        )}

        {consents && (
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-900">All systems active</p>
                <p className="text-xs text-gray-600">
                  Your data permissions are up to date
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Balance</span>
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl text-gray-900">
              $
              {totalBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Across {mockBankAccounts.length} accounts
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Monthly Income</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl text-gray-900">
              $
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Monthly Spending</span>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl text-gray-900">
              $
              {totalSpending.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="credit">Credit Score</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <AccountsOverview accounts={mockBankAccounts} />
              <SpendingInsights
                categories={mockSpendingCategories}
                totalSpending={totalSpending}
              />
            </div>

            <ActionableInsights insights={mockInsights} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <SpendingInsights
              categories={mockSpendingCategories}
              totalSpending={totalSpending}
              expanded
            />
            <ActionableInsights insights={mockInsights} />
          </TabsContent>

          <TabsContent value="credit">
            <CreditScoreCard
              transactions={mockTransactions}
              accounts={mockBankAccounts}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ConsentModal
        open={showConsentModal}
        onConsent={handleConsent}
        onCancel={() => setShowConsentModal(false)}
      />
    </div>
  );
}
