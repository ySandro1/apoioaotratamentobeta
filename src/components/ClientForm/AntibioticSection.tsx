
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, LucideShieldAlert } from "lucide-react";
import { useTreatment } from "@/context/TreatmentContext";
import { formatDate } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";

const AntibioticSection: React.FC = () => {
  const {
    treatmentData,
    updateBirthDate,
    updateIsCRMV,
    selectedTreatment
  } = useTreatment();
  
  const [birthDateInput, setBirthDateInput] = useState("");
  
  useEffect(() => {
    if (selectedTreatment && selectedTreatment.birthDate) {
      setBirthDateInput(format(selectedTreatment.birthDate, "dd/MM/yyyy"));
    } else {
      setBirthDateInput("");
    }
  }, [selectedTreatment]);
  
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const rawValue = value.replace(/\D/g, '');
    const formatted = formatDate(rawValue);
    setBirthDateInput(formatted);
    
    if (formatted.length === 10) {
      try {
        const parsedDate = parse(formatted, "dd/MM/yyyy", new Date());
        if (!isNaN(parsedDate.getTime())) {
          updateBirthDate(parsedDate);
        }
      } catch (error) {
        console.error("Erro ao converter data:", error);
      }
    }
  };
  
  return (
    <div className="ml-6 pt-3 pl-5 border-l-2 border-primary/30 space-y-5 animate-slide-in bg-secondary/10 p-4 rounded-md">
      <div className="space-y-4">
        <div className="flex items-center space-x-3 bg-background/50 p-3 rounded-md hover:bg-background transition-colors">
          <Checkbox
            id="crmv"
            checked={treatmentData.isCRMV}
            onCheckedChange={(checked) => {
              updateIsCRMV(checked as boolean);
            }}
            className="h-5 w-5 border-2"
          />
          <Label htmlFor="crmv" className="cursor-pointer text-base flex items-center gap-2">
            <LucideShieldAlert className="h-5 w-5 text-primary" />
            CRMV
          </Label>
        </div>

        {!treatmentData.isCRMV && (
          <div className="space-y-3 p-3">
            <Label htmlFor="birthdate" className="flex items-center gap-1 text-base">
              <span>Data de Nascimento</span>
            </Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  id="birthdate-input"
                  value={birthDateInput}
                  onChange={handleDateInputChange}
                  placeholder="DD/MM/AAAA"
                  className="bg-background border-2 focus-visible:border-primary/50 pl-9"
                />
                <CalendarIcon className="h-4 w-4 text-muted-foreground absolute left-3 top-[13px]" />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-2 border-2"
                    type="button"
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={treatmentData.birthDate}
                    onSelect={(date) => {
                      updateBirthDate(date);
                      if (date) {
                        setBirthDateInput(format(date, "dd/MM/yyyy"));
                      }
                    }}
                    initialFocus
                    disabled={(date) => date > new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AntibioticSection;
