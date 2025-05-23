import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DocumentUpload } from "@/components/DocumentUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { UserFlow } from "@/components/UserFlow";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'upload' | 'analysis' | 'workflow'>('dashboard');
  const [analysisData, setAnalysisData] = useState(null);

  console.log('Index component rendered with activeView:', activeView);

  const handleAnalysisComplete = (data: any) => {
    console.log('Analysis completed with data:', data);
    setAnalysisData(data);
    setActiveView('analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' && <Dashboard />}
            {activeView === 'upload' && (
              <DocumentUpload onAnalysisComplete={handleAnalysisComplete} />
            )}
            {activeView === 'analysis' && <AnalysisResults data={analysisData} />}
            {activeView === 'workflow' && <UserFlow />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;