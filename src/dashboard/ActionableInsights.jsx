import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Lightbulb, Trophy } from "lucide-react";

export function ActionableInsights({ insights }) {
  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-green-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-200";
      case "achievement":
        return "bg-green-50 border-green-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-gray-900 mb-6">Personalized Recommendations</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 border rounded-lg ${getBgColor(insight.type)}`}
          >
            <div className="flex items-start gap-3 mb-3">
              {getIcon(insight.type)}
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
            {insight.action && (
              <Button size="sm" variant="outline" className="w-full">
                {insight.action}
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
