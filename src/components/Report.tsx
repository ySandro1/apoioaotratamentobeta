
import React, { useRef } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PrinterIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const Report: React.FC = () => {
  const { treatmentData, selectedTreatment } = useTreatment();
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
            body { font-family: Arial, sans-serif; font-size: 12px; }
            .print-header { text-align: center; margin-bottom: 10px; }
            .print-header h1 { font-size: 16px; margin: 0; }
            .print-header p { font-size: 12px; margin: 5px 0; }
            .print-section { margin-bottom: 10px; }
            .print-label { font-weight: bold; }
            .compact-layout { display: flex; flex-wrap: wrap; }
            .compact-layout > div { margin-right: 20px; margin-bottom: 5px; }
            .customer-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; }
            .treatment-types { display: flex; flex-wrap: wrap; gap: 15px; }
            .treatment-types div { margin-right: 10px; }
            .product-info { margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 5px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; }
          }
        </style>
        <div class="print-header">
          <h1>Relatório de Tratamento</h1>
          <p>Data: ${format(new Date(), "PPP", { locale: ptBR })}</p>
        </div>
        ${printContents}
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
      <Card className="card-shadow">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xl text-center font-medium flex items-center justify-center gap-2">
            <PrinterIcon className="h-5 w-5" />
            Relatório
          </CardTitle>
        </CardHeader>
        
        <div ref={reportRef}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Dados do Cliente</h3>
                <div className="customer-info grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Nome:</p>
                    <p className="font-medium">{dataToDisplay.clientName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">CPF:</p>
                    <p className="font-medium">{dataToDisplay.clientCPF || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Telefone:</p>
                    <p className="font-medium">{dataToDisplay.clientPhone || "-"}</p>
                  </div>
                  {dataToDisplay.isAntibioticTreatment && !dataToDisplay.isCRMV && dataToDisplay.birthDate && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Data de Nascimento:</p>
                      <p className="font-medium">
                        {format(dataToDisplay.birthDate, "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Tipo de Tratamento</h3>
                <div className="treatment-types flex flex-wrap gap-3">
                  {dataToDisplay.isStartTreatment && (
                    <div className="inline-flex items-center bg-secondary/30 px-2 py-1 rounded text-sm">
                      Início de Tratamento
                    </div>
                  )}
                  {dataToDisplay.isContinuousTreatment && (
                    <div className="inline-flex items-center bg-secondary/30 px-2 py-1 rounded text-sm">
                      Tratamento Contínuo
                    </div>
                  )}
                  {dataToDisplay.isAntibioticTreatment && (
                    <div className="inline-flex items-center bg-secondary/30 px-2 py-1 rounded text-sm">
                      Tratamento com Antibiótico
                      {dataToDisplay.isCRMV && " (CRMV)"}
                    </div>
                  )}
                </div>
              </div>

              {dataToDisplay.product && dataToDisplay.product.name && (
                <div>
                  <h3 className="font-medium text-lg mb-2">Produto</h3>
                  <p className="font-medium">{dataToDisplay.product.name}</p>
                </div>
              )}
            </div>
          </CardContent>
        </div>
        
        <CardFooter className="bg-muted/50 p-4 flex justify-center border-t">
          <Button 
            onClick={printReport} 
            className="w-full sm:w-auto"
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
