
import React from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Clock, ListChecks, Pill, Calendar, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

        {/* Seção do Antibiótico - aparece quando selecionado */}
        {treatmentData.isAntibioticTreatment && (
          <div className="ml-8 mt-4 p-4 bg-accent/10 rounded-md border-l-4 border-primary space-y-4">
            <h4 className="font-medium text-sm">Informações do Antibiótico</h4>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="has-crmv"
                checked={treatmentData.isCRMV}
                onCheckedChange={(checked) => {
                  updateIsCRMV(checked as boolean);
                  if (checked) {
                    updateBirthDate(undefined);
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor="has-crmv" className="text-sm cursor-pointer">
                Possui receita com CRMV (Médico Veterinário)
              </Label>
            </div>

            {!treatmentData.isCRMV && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Nascimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {treatmentData.birthDate ? (
                        format(treatmentData.birthDate, "PPP", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione a data de nascimento</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={treatmentData.birthDate}
                      onSelect={updateBirthDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentTypeStep;
