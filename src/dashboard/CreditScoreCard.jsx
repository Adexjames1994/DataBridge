import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { TrendingUp, Info } from "lucide-react";
import { calculateCreditScore } from "../data/mockData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Card } from "../components/ui/card";

export function CreditScoreCard({ transactions, accounts }) {
  const { score, factors } = calculateCreditScore(transactions, accounts);

  const getScoreRating = (score) => {
    if (score >= 800) return { label: "Excellent", color: "bg-green-600" };
    if (score >= 740) return { label: "Very Good", color: "bg-blue-600" };
    if (score >= 670) return { label: "Good", color: "bg-yellow-600" };
    if (score >= 580) return { label: "Fair", color: "bg-orange-600" };
    return { label: "Poor", color: "bg-red-600" };
  };

  const rating = getScoreRating(score);
  const scorePercentage = ((score - 300) / (850 - 300)) * 100;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Score Display */}
      <Card className="p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Open Banking Score</span>
          </div>

          <div className="mb-6">
            <div className="text-6xl text-gray-900 mb-2">{score}</div>
            <Badge className={rating.color}>{rating.label}</Badge>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>300</span>
              <span>850</span>
            </div>
            <Progress value={scorePercentage} className="h-3" />
          </div>

          <p className="text-sm text-gray-600">
            Your score is calculated using transparent, fair criteria based on
            your actual financial behavior.
          </p>
        </div>
      </Card>

      {/* Score Factors */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-6">Score Breakdown</h3>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">Payment History</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Regular income deposits and no overdrafts improve this
                        score
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-600">
                {factors.paymentHistory}/40
              </span>
            </div>
            <Progress value={(factors.paymentHistory / 40) * 100} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">Savings Rate</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Higher savings balances and regular transfers improve
                        this score
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(factors.savingsRate)}/30
              </span>
            </div>
            <Progress value={(factors.savingsRate / 30) * 100} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">Spending Behavior</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Consistent spending patterns without large fluctuations
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-600">
                {factors.spendingBehavior}/20
              </span>
            </div>
            <Progress value={(factors.spendingBehavior / 20) * 100} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">Account Diversity</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Having multiple account types (checking, savings, etc.)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-600">
                {factors.accountDiversity}/10
              </span>
            </div>
            <Progress value={(factors.accountDiversity / 10) * 100} />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm text-gray-900 mb-2">
            How to improve your score
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Maintain regular income deposits</li>
            <li>• Increase your savings rate</li>
            <li>• Keep spending consistent</li>
            <li>• Diversify your account types</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
