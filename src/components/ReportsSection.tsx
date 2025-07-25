import React from "react";
import TreatmentsList from "./TreatmentsList";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText } from "lucide-react";

const ReportsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerar Relatórios
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TreatmentsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;