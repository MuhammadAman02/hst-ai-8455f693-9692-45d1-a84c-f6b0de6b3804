import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Eye,
  Download
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentUploadProps {
  onAnalysisComplete: (data: any) => void;
}

export const DocumentUpload = ({ onAnalysisComplete }: DocumentUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const { toast } = useToast();

  console.log('DocumentUpload component rendered with files:', files.length);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    console.log('Files selected:', selectedFiles);
    setFiles(prev => [...prev, ...selectedFiles]);
    toast({
      title: "Files added",
      description: `${selectedFiles.length} file(s) ready for analysis`,
    });
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragActive(false);
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    console.log('Files dropped:', droppedFiles);
    setFiles(prev => [...prev, ...droppedFiles]);
    toast({
      title: "Files added",
      description: `${droppedFiles.length} file(s) ready for analysis`,
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload documents before starting analysis",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate upload and analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Simulate analysis results
          const mockResults = {
            totalDocuments: files.length,
            fraudDetected: Math.floor(Math.random() * files.length),
            riskScore: Math.floor(Math.random() * 100),
            documents: files.map((file, index) => ({
              name: file.name,
              type: getDocumentType(file.name),
              riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
              issues: generateMockIssues(),
              status: Math.random() > 0.3 ? 'Cleared' : 'Flagged'
            }))
          };

          onAnalysisComplete(mockResults);
          toast({
            title: "Analysis Complete",
            description: "Document fraud analysis has been completed",
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getDocumentType = (filename: string) => {
    if (filename.toLowerCase().includes('bank')) return 'Bank Statement';
    if (filename.toLowerCase().includes('payslip') || filename.toLowerCase().includes('salary')) return 'Payslip';
    if (filename.toLowerCase().includes('tax')) return 'Tax Document';
    if (filename.toLowerCase().includes('pps')) return 'PPS Document';
    return 'Other Document';
  };

  const generateMockIssues = () => {
    const possibleIssues = [
      'Font inconsistency detected',
      'Suspicious balance calculations',
      'Missing watermark',
      'Date format mismatch',
      'Employer details inconsistent',
      'PPS number format invalid'
    ];
    const numIssues = Math.floor(Math.random() * 3);
    return possibleIssues.slice(0, numIssues);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Upload & Analysis</h1>
        <p className="text-gray-600 mt-2">Upload documents for fraud detection analysis</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOC, DOCX, PNG, JPG, JPEG
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-primary-600">Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop documents here, or click to select files
                  </p>
                  <p className="text-sm text-gray-500">
                    Bank statements, payslips, tax documents, ID documents
                  </p>
                </div>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({files.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {getDocumentType(file.name)} • {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{getDocumentType(file.name)}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Progress */}
      {uploading && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis in Progress</CardTitle>
            <CardDescription>Processing documents for fraud detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Analyzing documents...</span>
                <span>{progress}%</span>
              </div>
              <div className="text-sm text-gray-500">
                Running authenticity checks, content validation, and cross-document verification
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={startAnalysis} 
          disabled={files.length === 0 || uploading}
          className="bg-primary-600 hover:bg-primary-700"
        >
          {uploading ? 'Analyzing...' : 'Start Fraud Analysis'}
        </Button>
        <Button variant="outline" onClick={() => setFiles([])}>
          Clear All
        </Button>
      </div>
    </div>
  );
};