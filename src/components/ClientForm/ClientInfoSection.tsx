
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTreatment } from "@/context/TreatmentContext";
import { formatCPF, formatPhone } from "@/utils/formatters";
import { User, Phone, UserCircle } from "lucide-react";

const ClientInfoSection: React.FC = () => {
  const {
    treatmentData,
    updateClientName,
    updateClientCPF,
    updateClientPhone,
    selectedTreatment
  } = useTreatment();
  
  const [formattedCPF, setFormattedCPF] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  
  useEffect(() => {
    if (selectedTreatment) {
      setFormattedCPF(selectedTreatment.clientCPF);
      setFormattedPhone(selectedTreatment.clientPhone);
    } else {
      setFormattedCPF(treatmentData.clientCPF);
      setFormattedPhone(treatmentData.clientPhone);
    }
  }, [selectedTreatment, treatmentData]);
  
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
  
  return (
    <div className="space-y-5 bg-secondary/30 p-5 rounded-lg border border-border/40">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <UserCircle className="h-5 w-5 text-primary" />
        Informações do Cliente
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label htmlFor="cpf" className="flex items-center gap-1 text-base">
              <span>CPF</span>
            </Label>
            <div className="relative">
              <Input
                id="cpf"
                value={formattedCPF}
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
            </Label>
            <div className="relative">
              <Input
                id="phone"
                value={formattedPhone}
                onChange={handlePhoneChange}
                maxLength={15}
                placeholder="(00) 00000-0000"
                className="bg-background border-2 focus-visible:border-primary/50 pl-9"
              />
              <Phone className="h-4 w-4 text-muted-foreground absolute left-3 top-[13px]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="name" className="flex items-center gap-1 text-base">
            <span>Nome Completo</span>
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
      </div>
    </div>
  );
};

export default ClientInfoSection;
