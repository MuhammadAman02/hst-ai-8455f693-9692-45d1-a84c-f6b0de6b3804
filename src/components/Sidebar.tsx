import { 
  LayoutDashboard, 
  Upload, 
  FileSearch, 
  GitBranch, 
  Users, 
  Settings,
  BarChart3,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: 'dashboard' | 'upload' | 'analysis' | 'workflow') => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  console.log('Sidebar rendered with activeView:', activeView);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Documents', icon: Upload },
    { id: 'analysis', label: 'Analysis Results', icon: FileSearch },
    { id: 'workflow', label: 'User Flow', icon: GitBranch },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Navigation
          </h2>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeView === item.id && "bg-primary-100 text-primary-900 hover:bg-primary-200"
                )}
                onClick={() => onViewChange(item.id as any)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>

        <div className="border-t pt-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Tools
          </h2>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="w-4 h-4 mr-3" />
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-4 h-4 mr-3" />
            User Management
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <AlertTriangle className="w-4 h-4 mr-3" />
            Fraud Alerts
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </div>
      </nav>
    </aside>
  );
};