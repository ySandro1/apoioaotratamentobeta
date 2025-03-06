
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

    if (!dataToDisplay.product) {
      toast.error("Selecione um produto");
      return;
    }

    const originalTitle = document.title;
    document.title = `Relatório - ${dataToDisplay.clientName}`;

    // Create a print-friendly environment
    const originalContents = document.body.innerHTML;
    const printContents = reportRef.current?.innerHTML;
    
    document.body.innerHTML = `
      <div style="padding: 20px;">
        <style>
          @media print {
            body { font-family: Arial, sans-serif; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-section { margin-bottom: 15px; }
            .print-label { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
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
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Dados do Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome:</p>
                    <p className="font-medium">{dataToDisplay.clientName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CPF:</p>
                    <p className="font-medium">{dataToDisplay.clientCPF || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone:</p>
                    <p className="font-medium">{dataToDisplay.clientPhone || "-"}</p>
                  </div>
                  {dataToDisplay.isAntibioticTreatment && !dataToDisplay.isCRMV && dataToDisplay.birthDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Data de Nascimento:</p>
                      <p className="font-medium">
                        {format(dataToDisplay.birthDate, "PPP", { locale: ptBR })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Tipo de Tratamento</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {dataToDisplay.isStartTreatment && (
                    <li>Início de Tratamento</li>
                  )}
                  {dataToDisplay.isContinuousTreatment && (
                    <li>Tratamento Contínuo</li>
                  )}
                  {dataToDisplay.isAntibioticTreatment && (
                    <li>
                      Tratamento com Antibiótico
                      {dataToDisplay.isCRMV && " (CRMV)"}
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Produto Utilizado</h3>
                {dataToDisplay.product ? (
                  <div className="border rounded-md p-3 bg-secondary/50">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Código:</p>
                        <p className="font-medium">{dataToDisplay.product.code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nome:</p>
                        <p className="font-medium">{dataToDisplay.product.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhum produto selecionado</p>
                )}
              </div>
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
