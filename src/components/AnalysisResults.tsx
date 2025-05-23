import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Download, 
  Eye,
  Shield,
  TrendingUp,
  Clock
} from "lucide-react";

interface AnalysisResultsProps {
  data: any;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  console.log('AnalysisResults component rendered with data:', data);

  if (!data) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">No Analysis Results</h2>
        <p className="text-gray-500 mt-2">Upload and analyze documents to see results here</p>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'Cleared' ? 
      <CheckCircle className="w-4 h-4 text-green-600" /> : 
      <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <p className="text-gray-600 mt-2">Fraud detection analysis completed</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data.totalDocuments}</div>
            <p className="text-xs text-gray-500 mt-1">Processed successfully</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Fraud Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{data.fraudDetected}</div>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{data.riskScore}%</div>
            <Progress value={data.riskScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.3s</div>
            <p className="text-xs text-gray-500 mt-1">Average per document</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Document Analysis Details
          </CardTitle>
          <CardDescription>Individual document fraud detection results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.documents.map((doc: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(doc.status)}
                    <Badge className={getRiskColor(doc.riskLevel)}>
                      {doc.riskLevel} Risk
                    </Badge>
                    <Badge variant={doc.status === 'Cleared' ? 'default' : 'destructive'}>
                      {doc.status}
                    </Badge>
                  </div>
                </div>

                {doc.issues.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-medium text-yellow-800 mb-2">Issues Detected:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {doc.issues.map((issue: string, issueIndex: number) => (
                        <li key={issueIndex} className="flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-2" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Detection Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Fraud Detection Categories
          </CardTitle>
          <CardDescription>Analysis breakdown by validation type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900">Document Authenticity</h3>
              <p className="text-sm text-blue-700 mt-1">Template, watermarks, seals</p>
              <div className="mt-2">
                <div className="text-lg font-bold text-blue-600">94% Pass</div>
                <Progress value={94} className="h-2 mt-1" />
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900">Content Consistency</h3>
              <p className="text-sm text-green-700 mt-1">Cross-field validation</p>
              <div className="mt-2">
                <div className="text-lg font-bold text-green-600">97% Pass</div>
                <Progress value={97} className="h-2 mt-1" />
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900">Cross-Document</h3>
              <p className="text-sm text-purple-700 mt-1">Inter-document checks</p>
              <div className="mt-2">
                <div className="text-lg font-bold text-purple-600">89% Pass</div>
                <Progress value={89} className="h-2 mt-1" />
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-900">Regulatory</h3>
              <p className="text-sm text-orange-700 mt-1">Format compliance</p>
              <div className="mt-2">
                <div className="text-lg font-bold text-orange-600">99% Pass</div>
                <Progress value={99} className="h-2 mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};