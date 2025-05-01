
import React from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCPF, formatPhone } from "@/utils/formatters";
import { User, Phone, UserCircle } from "lucide-react";

const ClientInfoStep: React.FC = () => {
  const {
    treatmentData,
    updateClientName,
    updateClientCPF,
    updateClientPhone
  } = useTreatment();
  
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    updateClientCPF(formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    updateClientPhone(formatted);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Informações do Cliente</h3>
        <p className="text-sm text-muted-foreground">
          Preencha os dados do cliente para iniciar o apoio ao tratamento.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-3">
          <Label htmlFor="name" className="flex items-center gap-1 text-base">
            <span>Nome Completo</span>
            <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="name"
              value={treatmentData.clientName}
              onChange={(e) => updateClientName(e.target.value)}
              placeholder="Nome do cliente"
              className="bg-background border-2 focus-visible:border-primary/50 pl-9"
            />
            <UserCircle className="h-4 w-4 text-muted-foreground absolute left-3 top-[13px]" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label htmlFor="cpf" className="flex items-center gap-1 text-base">
              <span>CPF</span>
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="cpf"
                value={treatmentData.clientCPF}
                onChange={handleCPFChange}
                maxLength={14}
                placeholder="000.000.000-00"
                className="bg-background border-2 focus-visible:border-primary/50 pl-9"
              />
              <User className="h-4 w-4 text-muted-foreground absolute left-3 top-[13px]" />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone" className="flex items-center gap-1 text-base">
              <span>Telefone</span>
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                value={treatmentData.clientPhone}
                onChange={handlePhoneChange}
                maxLength={15}
                placeholder="(00) 00000-0000"
                className="bg-background border-2 focus-visible:border-primary/50 pl-9"
              />
              <Phone className="h-4 w-4 text-muted-foreground absolute left-3 top-[13px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoStep;
