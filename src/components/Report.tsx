
import React, { useRef } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PrinterIcon, Clock, ListChecks, Pill } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const Report: React.FC = () => {
  const {
    treatmentData,
    selectedTreatment
  } = useTreatment();
  const reportRef = useRef<HTMLDivElement>(null);

  // Use selected treatment if available, otherwise use current form data
  const dataToDisplay = selectedTreatment || treatmentData;

  const printReport = () => {
    // Validation before printing
    if (!dataToDisplay.clientName || !dataToDisplay.clientCPF || !dataToDisplay.clientPhone) {
      toast.error("Preencha os dados do cliente antes de gerar o relatório");
      return;
    }
    if (!dataToDisplay.isStartTreatment && !dataToDisplay.isContinuousTreatment && !dataToDisplay.isAntibioticTreatment) {
      toast.error("Selecione pelo menos um tipo de tratamento");
      return;
    }
    if (dataToDisplay.isAntibioticTreatment && !dataToDisplay.isCRMV && !dataToDisplay.birthDate) {
      toast.error("Informe a data de nascimento para tratamento com antibiótico");
      return;
    }
    const originalTitle = document.title;
    document.title = `Relatório - ${dataToDisplay.clientName}`;

    // Create a print-friendly environment
    const originalContents = document.body.innerHTML;
    const printContents = reportRef.current?.innerHTML;
    document.body.innerHTML = `
      <div style="padding: 10px; font-size: 12px; max-width: 800px; margin: 0 auto;">
        <style>
          @media print {
            body { font-family: Arial, sans-serif; font-size: 10px; }
            .print-header { text-align: center; margin-bottom: 5px; }
            .print-header h1 { font-size: 14px; margin: 0; }
            .print-header p { font-size: 10px; margin: 3px 0; }
            .print-section { margin-bottom: 5px; }
            .print-label { font-weight: bold; }
            .compact-layout { display: flex; flex-wrap: wrap; }
            .compact-layout > div { margin-right: 20px; margin-bottom: 5px; }
            .customer-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
            .treatment-types { display: flex; flex-wrap: wrap; gap: 10px; }
            .treatment-types div { margin-right: 5px; }
            .product-info { margin-top: 3px; }
            table { width: 100%; border-collapse: collapse; margin: 5px 0; }
            th, td { border: 1px solid #ddd; padding: 3px; text-align: left; font-size: 10px; }
            th { background-color: #f2f2f2; }
            .support-check { 
              width: 12px; 
              height: 12px; 
              border: 1px solid #000; 
              display: inline-block;
              vertical-align: middle;
            }
          }
        </style>
        <div class="print-header">
          <h1>Relatório de Tratamento</h1>
          <p>Data: ${format(new Date(), "PPP", {
            locale: ptBR
          })}</p>
          <p>Turno: ${dataToDisplay.shift === "morning" ? "Manhã (7:00 - 16:00)" : dataToDisplay.shift === "evening" ? "Tarde/Noite (16:00 - 23:00)" : "Não especificado"}</p>
        </div>
        ${printContents}
        <div style="margin-top: 10px">
          <p><strong>Apoio feito?</strong> <span class="support-check"></span></p>
        </div>
      </div>
    `;
    window.print();

    // Restore the original contents
    document.body.innerHTML = originalContents;
    document.title = originalTitle;
    toast.success("Relatório impresso com sucesso!");
  };

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      <Card className="card-shadow animate-fade-in">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xl font-medium flex items-center justify-center gap-2">
            <PrinterIcon className="h-5 w-5" />
            Relatório de Tratamento
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6" ref={reportRef}>
          <div className="space-y-5">
            {/* Cliente */}
            <div>
              <h3 className="font-medium mb-2 text-lg">Dados do Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Nome:</span>
                  <p className="font-medium">{dataToDisplay.clientName || "Não informado"}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">CPF:</span>
                  <p className="font-medium">{dataToDisplay.clientCPF || "Não informado"}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Telefone:</span>
                  <p className="font-medium">{dataToDisplay.clientPhone || "Não informado"}</p>
                </div>
              </div>
            </div>
            
            {/* Tipo de Tratamento */}
            <div>
              <h3 className="font-medium mb-2 text-lg">Tipo de Tratamento</h3>
              <div className="flex flex-wrap gap-3">
                <div className={`px-3 py-1 rounded-full text-sm ${dataToDisplay.isStartTreatment ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                  Início de Tratamento
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${dataToDisplay.isContinuousTreatment ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-muted text-muted-foreground"}`}>
                  Tratamento Contínuo
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${dataToDisplay.isAntibioticTreatment ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" : "bg-muted text-muted-foreground"}`}>
                  Tratamento com Antibiótico
                </div>
              </div>
            </div>
            
            {/* Antibiótico (conditional) */}
            {dataToDisplay.isAntibioticTreatment && (
              <div>
                <h3 className="font-medium mb-2 text-lg">Informações de Antibiótico</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dataToDisplay.isCRMV ? (
                    <div>
                      <span className="text-sm text-muted-foreground">Preenchimento:</span>
                      <p className="font-medium">CRMV (Médico Veterinário)</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm text-muted-foreground">Data de Nascimento:</span>
                      <p className="font-medium">
                        {dataToDisplay.birthDate 
                          ? format(dataToDisplay.birthDate, "dd/MM/yyyy") 
                          : "Não informada"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Produto (conditional) */}
            {dataToDisplay.product && (
              <div>
                <h3 className="font-medium mb-2 text-lg">Produto</h3>
                <div>
                  <span className="text-sm text-muted-foreground">Nome do Produto:</span>
                  <p className="font-medium">{dataToDisplay.product.name}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted/50 p-4 border-t">
          <Button 
            className="w-full" 
            onClick={printReport}
          >
            <PrinterIcon className="mr-2 h-4 w-4" />
            Imprimir Relatório
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Report;
