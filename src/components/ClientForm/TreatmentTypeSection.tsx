
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
    <div className="space-y-5 bg-secondary/30 p-5 rounded-lg border border-border/40">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <ListChecks className="h-5 w-5 text-primary" />
        Tipo de Tratamento
      </h3>
      
      <div className="space-y-5">
        <div className="flex items-center space-x-3 bg-background/50 p-3 rounded-md hover:bg-background transition-colors">
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
            className="cursor-pointer flex items-center gap-2 text-base"
          >
            <Clock className="h-5 w-5 text-primary" />
            Início de Tratamento
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 bg-background/50 p-3 rounded-md hover:bg-background transition-colors">
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
            className="cursor-pointer flex items-center gap-2 text-base"
          >
            <ListChecks className="h-5 w-5 text-primary" />
            Tratamento Contínuo
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 bg-background/50 p-3 rounded-md hover:bg-background transition-colors">
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
            className="cursor-pointer flex items-center gap-2 text-base"
          >
            <Pill className="h-5 w-5 text-primary" />
            Tratamento com Antibiótico
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TreatmentTypeSection;
