
import React, { useState, useEffect } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatCPF, formatPhone, isValidCPF, formatDate } from "@/utils/formatters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon, 
  User, 
  Phone, 
  FileText, 
  Save, 
  Clock, 
  ListChecks, 
  Pill,
  Sun,
  Moon
} from "lucide-react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const ClientForm: React.FC = () => {
  const {
    treatmentData,
    updateClientName,
    updateClientCPF,
    updateClientPhone,
    updateIsStartTreatment,
    updateIsContinuousTreatment,
    updateIsAntibioticTreatment,
    updateBirthDate,
    updateIsCRMV,
    updateProduct,
    saveCurrentTreatment,
    resetForm,
    selectedTreatment
  } = useTreatment();

  const [formattedCPF, setFormattedCPF] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [productName, setProductName] = useState("");
  const [birthDateInput, setBirthDateInput] = useState("");

  useEffect(() => {
    if (selectedTreatment) {
      setFormattedCPF(selectedTreatment.clientCPF);
      setFormattedPhone(selectedTreatment.clientPhone);
      if (selectedTreatment.product) {
        setProductName(selectedTreatment.product.name);
      } else {
        setProductName("");
      }
      if (selectedTreatment.birthDate) {
        setBirthDateInput(format(selectedTreatment.birthDate, "dd/MM/yyyy"));
      } else {
        setBirthDateInput("");
      }
    } else {
      setBirthDateInput("");
      setProductName("");
    }
  }, [selectedTreatment]);

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormattedCPF(formatted);
    updateClientCPF(formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormattedPhone(formatted);
    updateClientPhone(formatted);
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    updateProduct(value ? { name: value, code: "" } : null);
  };

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
    setFormattedCPF("");
    setFormattedPhone("");
    setProductName("");
    setBirthDateInput("");
  };

  // Display text for the current shift
  const shiftDisplayText = treatmentData.shift === "morning" 
    ? "Manhã (7:00 - 16:00)" 
    : "Tarde/Noite (16:00 - 23:00)";

  // Icon for the current shift
  const ShiftIcon = treatmentData.shift === "morning" ? Sun : Moon;

  return (
    <Card className="w-full max-w-3xl mx-auto card-shadow animate-fade-in">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl text-center font-medium flex items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          {selectedTreatment ? "Editar Tratamento" : "Novo Tratamento"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Informações do Cliente</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf" className="flex items-center gap-1">
                  <span>CPF</span>
                </Label>
                <div className="relative">
                  <Input
                    id="cpf"
                    value={formattedCPF}
                    onChange={handleCPFChange}
                    maxLength={14}
                    placeholder="000.000.000-00"
                    className="pl-8"
                  />
                  <User className="h-4 w-4 text-muted-foreground absolute left-2.5 top-[10px]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <span>Telefone</span>
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={formattedPhone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    placeholder="(00) 00000-0000"
                    className="pl-8"
                  />
                  <Phone className="h-4 w-4 text-muted-foreground absolute left-2.5 top-[10px]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <span>Nome Completo</span>
              </Label>
              <Input
                id="name"
                value={treatmentData.clientName}
                onChange={(e) => updateClientName(e.target.value)}
                placeholder="Nome do cliente"
              />
            </div>
          </div>
        </div>

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
                    setBirthDateInput("");
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

          {treatmentData.isAntibioticTreatment && (
            <div className="ml-6 pt-2 pl-4 border-l-2 border-primary/20 space-y-4 animate-slide-in">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="crmv"
                    checked={treatmentData.isCRMV}
                    onCheckedChange={(checked) => {
                      updateIsCRMV(checked as boolean);
                    }}
                  />
                  <Label htmlFor="crmv" className="cursor-pointer">
                    CRMV
                  </Label>
                </div>

                {!treatmentData.isCRMV && (
                  <div className="space-y-2">
                    <Label htmlFor="birthdate" className="flex items-center gap-1">
                      <span>Data de Nascimento</span>
                    </Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="birthdate-input"
                          value={birthDateInput}
                          onChange={handleDateInputChange}
                          placeholder="DD/MM/AAAA"
                          className="pl-8"
                        />
                        <CalendarIcon className="h-4 w-4 text-muted-foreground absolute left-2.5 top-[10px]" />
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="px-2"
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
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Turno</h3>
          
          <div className="flex items-center space-x-3 p-3 border rounded-md bg-muted/20">
            <ShiftIcon className="h-5 w-5 text-primary" />
            <span className="font-medium">{shiftDisplayText}</span>
            <span className="text-xs text-muted-foreground ml-auto">(Definido automaticamente)</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Produto (Opcional)</h3>
          
          <div className="space-y-2">
            <Label htmlFor="product" className="flex items-center gap-1">
              <span>Nome do Produto</span>
            </Label>
            <Input
              id="product"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                updateProduct(e.target.value ? { name: e.target.value, code: "" } : null);
              }}
              placeholder="Digite o nome do produto"
            />
          </div>
        </div>
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
