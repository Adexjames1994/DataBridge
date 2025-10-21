import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Shield,
  PieChart,
  TrendingUp,
  Lock,
  CreditCard,
  BarChart3,
} from "lucide-react";

export function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Your Data, Your Control</span>
          </div>

          <h1 className="text-5xl text-gray-900 mb-6">Open Banking Hub</h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take control of your financial future. Aggregate all your accounts,
            gain powerful insights, and make smarter money decisions - all in
            one secure place.
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={onGetStarted} size="lg" className="px-8">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Account Aggregation</h3>
            <p className="text-gray-600">
              Connect multiple bank accounts and view all your finances in one
              unified dashboard.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Smart Insights</h3>
            <p className="text-gray-600">
              Get personalized recommendations and actionable insights to
              improve your financial health.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Credit Score</h3>
            <p className="text-gray-600">
              Transparent credit scoring based on your actual spending and
              saving behavior.
            </p>
          </Card>
        </div>

        {/* Security Section */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Bank-Level Security</span>
              </div>

              <h2 className="text-3xl text-gray-900 mb-4">
                Your Data Security is Our Priority
              </h2>

              <p className="text-gray-600 mb-6">
                We use industry-leading encryption and security measures to
                protect your financial data. You maintain full control over what
                data is shared and can revoke access at any time.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    256-bit encryption for all data transfers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Granular consent management
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Read-only access to your accounts
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <BarChart3 className="w-full h-48 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl text-gray-900 mb-4">
            Ready to solve your financial puzzle?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users taking control of their finances
          </p>
          <Button onClick={onGetStarted} size="lg" className="px-8">
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
