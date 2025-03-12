
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";
import { useTreatment } from "@/context/TreatmentContext";
import ClientInfoSection from "./ClientInfoSection";
import TreatmentTypeSection from "./TreatmentTypeSection";
import AntibioticSection from "./AntibioticSection";
import ProductSection from "./ProductSection";

const ClientForm: React.FC = () => {
  const {
    treatmentData,
    saveCurrentTreatment,
    resetForm,
    selectedTreatment
  } = useTreatment();

  const handleSaveTreatment = () => {
    if (!treatmentData.clientName || !treatmentData.clientCPF || !treatmentData.clientPhone) {
      toast.error("Preencha os dados do cliente");
      return;
    }

    if (!treatmentData.isStartTreatment && !treatmentData.isContinuousTreatment && !treatmentData.isAntibioticTreatment) {
      toast.error("Selecione pelo menos um tipo de tratamento");
      return;
    }

    if (treatmentData.isAntibioticTreatment && !treatmentData.isCRMV && !treatmentData.birthDate) {
      toast.error("Informe a data de nascimento para tratamento com antibiótico");
      return;
    }

    saveCurrentTreatment();
    toast.success(selectedTreatment ? "Tratamento atualizado com sucesso" : "Tratamento salvo com sucesso");
  };

  return (
    <Card className="w-full h-full card-shadow animate-fade-in">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl text-center font-medium flex items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          {selectedTreatment ? "Editar Tratamento" : "Novo Tratamento"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <ClientInfoSection />
        <TreatmentTypeSection />
        {treatmentData.isAntibioticTreatment && <AntibioticSection />}
        <ProductSection />
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex justify-between border-t">
        <Button 
          variant="outline"
          onClick={resetForm}
        >
          {selectedTreatment ? "Cancelar" : "Limpar"}
        </Button>
        <Button 
          onClick={handleSaveTreatment}
        >
          <Save className="mr-2 h-4 w-4" />
          {selectedTreatment ? "Atualizar" : "Salvar"} Tratamento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClientForm;
