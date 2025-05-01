
import React from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle2, User, Phone, Package, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ConfirmationStep: React.FC = () => {
  const { treatmentData } = useTreatment();
  
  const renderShiftName = () => {
    if (treatmentData.shift === "morning") return "Manhã (7:00 - 16:00)";
    if (treatmentData.shift === "evening") return "Tarde/Noite (16:00 - 23:00)";
    return "Não especificado";
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center mb-6">
        <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
        <h3 className="text-xl font-medium">Confirmar Apoio ao Tratamento</h3>
        <p className="text-sm text-muted-foreground">
          Revise as informações abaixo antes de finalizar.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-secondary/30 p-4 rounded-lg">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-primary" />
            Dados do Cliente
          </h4>
          <div className="ml-6 space-y-1 text-sm">
            <p><strong>Nome:</strong> {treatmentData.clientName || "Não informado"}</p>
            <p><strong>CPF:</strong> {treatmentData.clientCPF || "Não informado"}</p>
            <p><strong>Telefone:</strong> {treatmentData.clientPhone || "Não informado"}</p>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-4 rounded-lg">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            Tipo de Tratamento
          </h4>
          <div className="ml-6 space-y-1">
            <div className="flex items-center gap-2">
              {treatmentData.isStartTreatment ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className={!treatmentData.isStartTreatment ? "text-gray-400" : ""}>Início de Tratamento</span>
            </div>
            <div className="flex items-center gap-2">
              {treatmentData.isContinuousTreatment ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className={!treatmentData.isContinuousTreatment ? "text-gray-400" : ""}>Tratamento Contínuo</span>
            </div>
            <div className="flex items-center gap-2">
              {treatmentData.isAntibioticTreatment ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className={!treatmentData.isAntibioticTreatment ? "text-gray-400" : ""}>Tratamento com Antibiótico</span>
            </div>
          </div>
        </div>
        
        {treatmentData.isAntibioticTreatment && (
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              Dados do Antibiótico
            </h4>
            <div className="ml-6 space-y-1 text-sm">
              <p><strong>Possui CRMV:</strong> {treatmentData.isCRMV ? "Sim" : "Não"}</p>
              {!treatmentData.isCRMV && treatmentData.birthDate && (
                <p>
                  <strong>Data de Nascimento:</strong> {format(treatmentData.birthDate, "PPP", { locale: ptBR })}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="bg-secondary/30 p-4 rounded-lg">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-primary" />
            Dados do Produto
          </h4>
          <div className="ml-6 space-y-1 text-sm">
            <p>
              <strong>Produto:</strong> {treatmentData.product?.name || "Não informado"}
            </p>
            <p>
              <strong>Turno:</strong> {renderShiftName()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
