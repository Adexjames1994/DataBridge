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
  Shield,
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-lg sm:text-xl font-semibold text-gray-900">
                Open Banking Hub
              </span>
            </div>

            {/* User Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowConsentModal(true)}
                className="sm:w-9 sm:h-9"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
                className="flex items-center gap-1 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Here’s your financial overview for October 2025
          </p>
        </div>

        {/* Consent Status */}
        {!consents ? (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">
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
        ) : (
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-900 font-medium">
                  All systems active
                </p>
                <p className="text-xs text-gray-600">
                  Your data permissions are up to date
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Balance</span>
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
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

          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Monthly Income</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
              $
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Monthly Spending</span>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
              $
              {totalSpending.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto">
            <TabsTrigger value="overview" className="flex-1 sm:flex-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex-1 sm:flex-none">
              Insights
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex-1 sm:flex-none">
              Credit Score
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </main>

      <ConsentModal
        open={showConsentModal}
        onConsent={handleConsent}
        onCancel={() => setShowConsentModal(false)}
      />
    </div>
  );
}
