
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTreatment } from "@/context/TreatmentContext";
import { Clock, ListChecks, Pill } from "lucide-react";

const TreatmentTypeSection: React.FC = () => {
  const {
    treatmentData,
    updateIsStartTreatment,
    updateIsContinuousTreatment,
    updateIsAntibioticTreatment,
    updateBirthDate,
    updateIsCRMV
  } = useTreatment();
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Tipo de Tratamento</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="start-treatment"
            checked={treatmentData.isStartTreatment}
            onCheckedChange={(checked) => 
              updateIsStartTreatment(checked as boolean)
            }
          />
          <Label
            htmlFor="start-treatment"
            className="cursor-pointer flex items-center gap-2"
          >
            <Clock className="h-4 w-4 text-primary" />
            Início de Tratamento
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="continuous-treatment"
            checked={treatmentData.isContinuousTreatment}
            onCheckedChange={(checked) => 
              updateIsContinuousTreatment(checked as boolean)
            }
          />
          <Label
            htmlFor="continuous-treatment"
            className="cursor-pointer flex items-center gap-2"
          >
            <ListChecks className="h-4 w-4 text-primary" />
            Tratamento Contínuo
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
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
          />
          <Label
            htmlFor="antibiotic-treatment"
            className="cursor-pointer flex items-center gap-2"
          >
            <Pill className="h-4 w-4 text-primary" />
            Tratamento com Antibiótico
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TreatmentTypeSection;
