
import React from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Clock, ListChecks, Pill, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

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
        
        <div className="space-y-4">
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
          
          {treatmentData.isAntibioticTreatment && (
            <div className="ml-8 space-y-4 bg-muted/30 p-4 rounded-md border-l-4 border-primary">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="is-crmv"
                  checked={treatmentData.isCRMV}
                  onCheckedChange={(checked) => updateIsCRMV(checked as boolean)}
                  className="h-4 w-4 border-2"
                />
                <Label
                  htmlFor="is-crmv"
                  className="cursor-pointer text-sm"
                >
                  Possui prescrição com CRMV
                </Label>
              </div>
              
              {!treatmentData.isCRMV && (
                <div className="space-y-3">
                  <Label htmlFor="birthDate" className="flex items-center gap-1 text-sm">
                    <span>Data de Nascimento</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="birthDate"
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full justify-start text-left font-normal border-2",
                          !treatmentData.birthDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {treatmentData.birthDate ? (
                          format(treatmentData.birthDate, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={treatmentData.birthDate}
                        onSelect={updateBirthDate}
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentTypeStep;
