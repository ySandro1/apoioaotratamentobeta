
import React, { useState, useEffect } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatCPF, formatPhone, isValidCPF } from "@/utils/formatters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, User, Phone, FileText, Save } from "lucide-react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Product } from "@/types/client";

// Mock products for demonstration
const mockProducts: Product[] = [
  { code: "P001", name: "Amoxicilina 500mg" },
  { code: "P002", name: "Dipirona 1g" },
  { code: "P003", name: "Cefalexina 500mg" },
  { code: "P004", name: "Doxiciclina 100mg" },
  { code: "P005", name: "Metronidazol 400mg" },
];

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
  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [birthDateInput, setBirthDateInput] = useState("");

  // Carregar dados do tratamento selecionado para edição
  useEffect(() => {
    if (selectedTreatment) {
      setFormattedCPF(selectedTreatment.clientCPF);
      setFormattedPhone(selectedTreatment.clientPhone);
      if (selectedTreatment.product) {
        setProductSearch(selectedTreatment.product.name);
      }
      if (selectedTreatment.birthDate) {
        setBirthDateInput(format(selectedTreatment.birthDate, "dd/MM/yyyy"));
      }
    } else {
      setBirthDateInput("");
    }
  }, [selectedTreatment]);

  // Handle CPF changes with formatting
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormattedCPF(formatted);
    updateClientCPF(formatted);
  };

  // Handle phone changes with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormattedPhone(formatted);
    updateClientPhone(formatted);
  };

  // Filter products based on search term
  useEffect(() => {
    if (productSearch.trim()) {
      const searchTerm = productSearch.toLowerCase();
      const filtered = mockProducts.filter(
        (product) =>
          product.code.toLowerCase().includes(searchTerm) ||
          product.name.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [productSearch]);

  // Select a product
  const selectProduct = (product: Product) => {
    updateProduct(product);
    setProductSearch(product.name);
    setIsSearching(false);
  };

  // Handle date input change
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDateInput(value);
    
    // Tentar converter a string de data para objeto Date
    if (value.length === 10) { // Espera-se formato DD/MM/YYYY
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        if (!isNaN(parsedDate.getTime())) {
          updateBirthDate(parsedDate);
        }
      } catch (error) {
        console.error("Erro ao converter data:", error);
      }
    }
  };

  const handleSaveTreatment = () => {
    // Validações básicas
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

    // Produto não é mais obrigatório
    saveCurrentTreatment();
    toast.success(selectedTreatment ? "Tratamento atualizado com sucesso" : "Tratamento salvo com sucesso");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto card-shadow animate-fade-in">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl text-center font-medium flex items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          {selectedTreatment ? "Editar Tratamento" : "Novo Tratamento"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Client Information Section */}
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

        {/* Treatment Type Section */}
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
                className="cursor-pointer"
              >
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
                className="cursor-pointer"
              >
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
                  
                  // If unchecking antibiotic treatment, reset related fields
                  if (!newValue) {
                    updateBirthDate(undefined);
                    updateIsCRMV(false);
                    setBirthDateInput("");
                  }
                }}
              />
              <Label
                htmlFor="antibiotic-treatment"
                className="cursor-pointer"
              >
                Tratamento com Antibiótico
              </Label>
            </div>
          </div>

          {/* Conditional Antibiotic Treatment Section */}
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

        {/* Product Selection Section (now optional) */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Produto (Opcional)</h3>
          
          <div className="space-y-2">
            <Label htmlFor="product" className="flex items-center gap-1">
              <span>Código ou Nome do Produto</span>
            </Label>
            <div className="relative">
              <Input
                id="product"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setIsSearching(true);
                }}
                placeholder="Buscar por código ou nome"
                onFocus={() => setIsSearching(true)}
                onBlur={() => {
                  // Delay hiding the dropdown to allow for clicks
                  setTimeout(() => setIsSearching(false), 150);
                }}
              />
              {isSearching && filteredProducts.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 border rounded-md bg-background shadow-md z-10 max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.code}
                      className="p-2 hover:bg-muted cursor-pointer flex justify-between"
                      onMouseDown={() => selectProduct(product)}
                    >
                      <span>{product.name}</span>
                      <span className="text-muted-foreground text-sm">{product.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {treatmentData.product && (
              <p className="text-sm text-muted-foreground mt-1">
                Produto selecionado: {treatmentData.product.name} ({treatmentData.product.code})
              </p>
            )}
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
