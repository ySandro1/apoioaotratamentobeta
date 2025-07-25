
import React, { useState } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { toast } from "sonner";
import ClientInfoStep from "./ClientInfoStep";
import TreatmentTypeStep from "./TreatmentTypeStep";
import ProductStep from "./ProductStep";
import ConfirmationStep from "./ConfirmationStep";

interface OnboardingWizardProps {
  onClose: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { 
    treatmentData, 
    saveCurrentTreatment,
    resetForm
  } = useTreatment();

  const steps = [
    { title: "Dados do Cliente", component: ClientInfoStep },
    { title: "Tipo de Tratamento", component: TreatmentTypeStep },
    { title: "Produto", component: ProductStep },
    { title: "Confirmação", component: ConfirmationStep }
  ];

  const goToNextStep = () => {
    // Validate step before proceeding
    if (currentStep === 0 && (!treatmentData.clientName || !treatmentData.clientCPF || !treatmentData.clientPhone)) {
      toast.error("Preencha todos os dados do cliente para continuar");
      return;
    }

    if (currentStep === 1 && !treatmentData.isStartTreatment && !treatmentData.isContinuousTreatment && !treatmentData.isAntibioticTreatment) {
      toast.error("Selecione pelo menos um tipo de tratamento");
      return;
    }

    if (treatmentData.isAntibioticTreatment && currentStep === 1 && !treatmentData.isCRMV && !treatmentData.birthDate) {
      toast.error("Informe a data de nascimento para tratamento com antibiótico");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    saveCurrentTreatment();
    toast.success("Apoio ao tratamento registrado com sucesso!");
    resetForm();
    onClose();
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card className="max-w-3xl mx-auto animate-fade-in shadow-lg">
      <CardHeader className="bg-primary/5 border-b relative">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="text-xl font-medium">
          {steps[currentStep].title}
        </CardTitle>
        <div className="flex items-center mt-4">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 ${index === currentStep ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"} 
                ${index === 0 ? "rounded-l-full" : ""} 
                ${index === steps.length - 1 ? "rounded-r-full" : ""} 
                flex-grow transition-colors duration-300`}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6 min-h-[400px]">
        <CurrentStepComponent />
      </CardContent>

      <CardFooter className="flex justify-between p-6 border-t">
        <div>
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
          )}
        </div>
        
        <div>
          {currentStep < steps.length - 1 ? (
            <Button onClick={goToNextStep} className="flex items-center">
              Próximo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} className="flex items-center">
              <Save className="mr-2 h-4 w-4" /> Finalizar
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OnboardingWizard;
