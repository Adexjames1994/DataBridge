import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Building2, Plus } from "lucide-react";
import { Button } from "../components/ui/button";

export function AccountsOverview({ accounts }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Connected Accounts</h2>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">{account.bankName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-gray-500">
                    {account.accountNumber}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {account.accountType}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-lg ${
                  account.balance < 0 ? "text-red-600" : "text-gray-900"
                }`}
              >
                $
                {Math.abs(account.balance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-gray-500">
                Connected {new Date(account.connectedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
