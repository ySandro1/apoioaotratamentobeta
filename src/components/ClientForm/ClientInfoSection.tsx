
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTreatment } from "@/context/TreatmentContext";
import { formatCPF, formatPhone } from "@/utils/formatters";
import { User, Phone } from "lucide-react";

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
      setFormattedCPF("");
      setFormattedPhone("");
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
  
  return (
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
  );
};

export default ClientInfoSection;
