import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Shield, Eye, Lock, Database } from "lucide-react";
import { Badge } from "./ui/badge";

export function ConsentModal({ open, onConsent, onCancel }) {
  const [consents, setConsents] = useState({
    readAccounts: true,
    readTransactions: true,
    analyzeSpending: true,
    creditScoring: true,
  });

  const handleConsentChange = (key) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    onConsent(consents);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <DialogTitle>Data Access Consent</DialogTitle>
          </div>
          <DialogDescription>
            Review and control what data Open Banking Hub can access. You can
            change these settings at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-900 mb-1">
                  Your Privacy Matters
                </p>
                <p className="text-sm text-gray-600">
                  We only access data with your explicit permission. All data is
                  encrypted and never shared with third parties.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="consent-accounts"
                checked={consents.readAccounts}
                onCheckedChange={() => handleConsentChange("readAccounts")}
              />
              <div className="flex-1">
                <Label htmlFor="consent-accounts" className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Read Account Information</span>
                    <Badge variant="secondary">Required</Badge>
                  </div>
                </Label>
                <p className="text-sm text-gray-600">
                  Access basic account details including balance, account type,
                  and account numbers (masked).
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>Read-only access</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="consent-transactions"
                checked={consents.readTransactions}
                onCheckedChange={() => handleConsentChange("readTransactions")}
              />
              <div className="flex-1">
                <Label
                  htmlFor="consent-transactions"
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>Read Transaction History</span>
                    <Badge variant="secondary">Required</Badge>
                  </div>
                </Label>
                <p className="text-sm text-gray-600">
                  Access your transaction history for the past 12 months to
                  provide spending insights.
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Database className="w-3 h-3" />
                  <span>Last 12 months only</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="consent-analyze"
                checked={consents.analyzeSpending}
                onCheckedChange={() => handleConsentChange("analyzeSpending")}
              />
              <div className="flex-1">
                <Label htmlFor="consent-analyze" className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Analyze Spending Patterns</span>
                    <Badge>Optional</Badge>
                  </div>
                </Label>
                <p className="text-sm text-gray-600">
                  Use AI to categorize transactions and provide personalized
                  recommendations for saving money.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="consent-credit"
                checked={consents.creditScoring}
                onCheckedChange={() => handleConsentChange("creditScoring")}
              />
              <div className="flex-1">
                <Label htmlFor="consent-credit" className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Credit Score Calculation</span>
                    <Badge>Optional</Badge>
                  </div>
                </Label>
                <p className="text-sm text-gray-600">
                  Calculate a fair credit score based on your spending and
                  saving behavior, not just credit history.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm mb-2">What we DON'T do:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>❌ Never sell your data to third parties</li>
              <li>❌ Never make transactions on your behalf</li>
              <li>❌ Never share your personal information</li>
              <li>✓ Only read-only access to your financial data</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={!consents.readAccounts || !consents.readTransactions}
          >
            Grant Access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
