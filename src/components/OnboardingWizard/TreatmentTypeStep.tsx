
import React from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Clock, ListChecks, Pill } from "lucide-react";

const TreatmentTypeStep: React.FC = () => {
  const {
    treatmentData,
    updateIsStartTreatment,
    updateIsContinuousTreatment,
    updateIsAntibioticTreatment,
    updateBirthDate,
    updateIsCRMV
  } = useTreatment();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Tipo de Tratamento</h3>
        <p className="text-sm text-muted-foreground">
          Selecione o tipo de apoio ao tratamento que será realizado.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-3 bg-background/50 p-4 rounded-md hover:bg-background transition-colors shadow-sm">
          <Checkbox
            id="start-treatment"
            checked={treatmentData.isStartTreatment}
            onCheckedChange={(checked) => 
              updateIsStartTreatment(checked as boolean)
            }
            className="h-5 w-5 border-2"
          />
          <Label
            htmlFor="start-treatment"
            className="cursor-pointer flex items-center gap-2 text-base w-full"
          >
            <Clock className="h-5 w-5 text-primary" />
            Início de Tratamento
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 bg-background/50 p-4 rounded-md hover:bg-background transition-colors shadow-sm">
          <Checkbox
            id="continuous-treatment"
            checked={treatmentData.isContinuousTreatment}
            onCheckedChange={(checked) => 
              updateIsContinuousTreatment(checked as boolean)
            }
            className="h-5 w-5 border-2"
          />
          <Label
            htmlFor="continuous-treatment"
            className="cursor-pointer flex items-center gap-2 text-base w-full"
          >
            <ListChecks className="h-5 w-5 text-primary" />
            Tratamento Contínuo
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 bg-background/50 p-4 rounded-md hover:bg-background transition-colors shadow-sm">
          <Checkbox
            id="antibiotic-treatment"
            checked={treatmentData.isAntibioticTreatment}
            onCheckedChange={(checked) => {
              const newValue = checked as boolean;
              updateIsAntibioticTreatment(newValue);
              
              if (!newValue) {
                updateBirthDate(undefined);
                updateIsCRMV(false);
              }
            }}
            className="h-5 w-5 border-2"
          />
          <Label
            htmlFor="antibiotic-treatment"
            className="cursor-pointer flex items-center gap-2 text-base w-full"
          >
            <Pill className="h-5 w-5 text-primary" />
            Tratamento com Antibiótico
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TreatmentTypeStep;
