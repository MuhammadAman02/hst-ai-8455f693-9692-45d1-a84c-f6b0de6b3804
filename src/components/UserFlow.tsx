import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Upload, 
  Search, 
  Brain, 
  BarChart3, 
  UserCheck, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  RefreshCw,
  ArrowDown
} from "lucide-react";

export const UserFlow = () => {
  console.log('UserFlow component rendered');

  const workflowSteps = [
    {
      id: 1,
      title: "User Login",
      description: "Secure authentication with MFA",
      icon: User,
      color: "bg-blue-100 text-blue-600",
      status: "completed"
    },
    {
      id: 2,
      title: "MFA Triggered",
      description: "Multi-factor authentication verification",
      icon: Shield,
      color: "bg-green-100 text-green-600",
      status: "completed"
    },
    {
      id: 3,
      title: "Role-Based Dashboard",
      description: "Access level determined by user role",
      icon: UserCheck,
      color: "bg-purple-100 text-purple-600",
      status: "completed"
    },
    {
      id: 4,
      title: "Upload Documents",
      description: "Bank statements, payslips, tax records",
      icon: Upload,
      color: "bg-orange-100 text-orange-600",
      status: "active"
    },
    {
      id: 5,
      title: "OCR & Preprocessing",
      description: "Document text extraction and preparation",
      icon: Search,
      color: "bg-cyan-100 text-cyan-600",
      status: "pending"
    },
    {
      id: 6,
      title: "AI Analysis",
      description: "Fraud detection algorithms",
      icon: Brain,
      color: "bg-pink-100 text-pink-600",
      status: "pending"
    },
    {
      id: 7,
      title: "Risk Score Generation",
      description: "Calculate fraud probability score",
      icon: BarChart3,
      color: "bg-yellow-100 text-yellow-600",
      status: "pending"
    },
    {
      id: 8,
      title: "Compliance Analyst Review",
      description: "Human review of flagged cases",
      icon: UserCheck,
      color: "bg-indigo-100 text-indigo-600",
      status: "pending"
    }
  ];

  const decisionOutcomes = [
    {
      title: "Case Cleared",
      description: "No fraud detected, approve application",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600 border-green-200"
    },
    {
      title: "Case Escalated",
      description: "Requires additional investigation",
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600 border-yellow-200"
    },
    {
      title: "Case Rejected",
      description: "Fraud confirmed, reject application",
      icon: XCircle,
      color: "bg-red-100 text-red-600 border-red-200"
    }
  ];

  const userRoles = [
    {
      title: "Bank Officer/Loan Processor",
      description: "Primary user for document verification",
      icon: User,
      responsibilities: [
        "Upload customer documents",
        "Review analysis results",
        "Make initial decisions"
      ]
    },
    {
      title: "Compliance Analyst",
      description: "Oversees fraud cases and cross-verification",
      icon: Shield,
      responsibilities: [
        "Review flagged cases",
        "Conduct detailed investigations",
        "Approve/reject applications"
      ]
    },
    {
      title: "System Administrator",
      description: "Manages user access and configurations",
      icon: Settings,
      responsibilities: [
        "User access management",
        "System integrations",
        "Configuration updates"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'active':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fraud Detection System Workflow</h1>
        <p className="text-gray-600 mt-2">Complete user flow and system process overview</p>
      </div>

      {/* User Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Users and Roles</CardTitle>
          <CardDescription>Different user types and their responsibilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {role.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="text-sm text-gray-700 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>System Workflow</CardTitle>
          <CardDescription>Step-by-step fraud detection process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    Step {step.id}
                  </Badge>
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute left-6 mt-12">
                      <ArrowDown className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Decision Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle>Decision Outcomes</CardTitle>
          <CardDescription>Possible results after analysis and review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {decisionOutcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <div key={index} className={`p-4 border rounded-lg ${outcome.color}`}>
                  <div className="flex items-center mb-2">
                    <Icon className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">{outcome.title}</h3>
                  </div>
                  <p className="text-sm">{outcome.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional System Features */}
      <Card>
        <CardHeader>
          <CardTitle>System Features</CardTitle>
          <CardDescription>Key capabilities of the fraud detection platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Document Processing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Bank statements validation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Payslip authenticity checks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Tax document verification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  PPS number validation
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Fraud Detection</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Template matching
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Content consistency checks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Cross-document verification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Behavioral pattern analysis
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};