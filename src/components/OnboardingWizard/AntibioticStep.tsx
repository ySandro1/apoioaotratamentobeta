
import React from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

const AntibioticStep: React.FC = () => {
  const { treatmentData, updateBirthDate, updateIsCRMV } = useTreatment();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Dados do Antibiótico</h3>
        <p className="text-sm text-muted-foreground">
          Forneça informações adicionais para o tratamento com antibiótico.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-3 bg-background/50 p-4 rounded-md hover:bg-background transition-colors shadow-sm">
          <Checkbox
            id="is-crmv"
            checked={treatmentData.isCRMV}
            onCheckedChange={(checked) => updateIsCRMV(checked as boolean)}
            className="h-5 w-5 border-2"
          />
          <Label
            htmlFor="is-crmv"
            className="cursor-pointer text-base"
          >
            Possui prescrição com CRMV
          </Label>
        </div>
        
        {!treatmentData.isCRMV && (
          <div className="space-y-3">
            <Label htmlFor="birthDate" className="flex items-center gap-1 text-base">
              <span>Data de Nascimento</span>
              <span className="text-red-500">*</span>
            </Label>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="birthDate"
                  variant="outline"
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
    </div>
  );
};

export default AntibioticStep;
