import { Card } from "../components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export function SpendingInsights({
  categories,
  totalSpending,
  expanded = false,
}) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Spending Breakdown</h2>
        <p className="text-sm text-gray-600">
          Total spending: $
          {totalSpending.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className={expanded ? "grid md:grid-cols-2 gap-6" : ""}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
              {!expanded && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        </div>

        {expanded && (
          <div className="space-y-3">
            <h3 className="text-gray-900 mb-4">Category Details</h3>
            {categories.map((category) => (
              <div
                key={category.category}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-900">
                    {category.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">
                    ${category.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {category.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
