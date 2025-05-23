import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  Shield,
  Activity
} from "lucide-react";

export const Dashboard = () => {
  console.log('Dashboard component rendered');

  const stats = [
    {
      title: "Documents Processed Today",
      value: "247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Fraud Cases Detected",
      value: "23",
      change: "+5%",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Cases Cleared",
      value: "198",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Pending Review",
      value: "26",
      change: "-3%",
      icon: Clock,
      color: "text-yellow-600"
    }
  ];

  const recentCases = [
    {
      id: "FR-2024-001",
      type: "Bank Statement",
      riskLevel: "High",
      status: "Under Review",
      timestamp: "2 hours ago"
    },
    {
      id: "FR-2024-002",
      type: "Payslip",
      riskLevel: "Medium",
      status: "Escalated",
      timestamp: "4 hours ago"
    },
    {
      id: "FR-2024-003",
      type: "Tax Document",
      riskLevel: "Low",
      status: "Cleared",
      timestamp: "6 hours ago"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fraud Analysis Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor document verification and fraud detection activities</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          System Online
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Cases
            </CardTitle>
            <CardDescription>Latest fraud detection activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{case_.id}</p>
                    <p className="text-sm text-gray-600">{case_.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={case_.riskLevel === 'High' ? 'destructive' : 
                              case_.riskLevel === 'Medium' ? 'default' : 'secondary'}
                      className="mb-1"
                    >
                      {case_.riskLevel} Risk
                    </Badge>
                    <p className="text-xs text-gray-500">{case_.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              System Performance
            </CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Processing Speed</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Accuracy Rate</span>
                <span>98.5%</span>
              </div>
              <Progress value={98.5} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>System Load</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Fraud Detection Overview
          </CardTitle>
          <CardDescription>Key validation checks and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900">Document Authenticity</h3>
              <p className="text-sm text-blue-700 mt-1">Template matching, watermarks, seals</p>
              <div className="mt-2 text-2xl font-bold text-blue-600">94%</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900">Content Consistency</h3>
              <p className="text-sm text-green-700 mt-1">Cross-field validation, calculations</p>
              <div className="mt-2 text-2xl font-bold text-green-600">97%</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900">Regulatory Compliance</h3>
              <p className="text-sm text-purple-700 mt-1">PPS numbers, IBAN validation</p>
              <div className="mt-2 text-2xl font-bold text-purple-600">99%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};