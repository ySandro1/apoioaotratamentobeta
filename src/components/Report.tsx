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
  return <div className="mt-8 w-full max-w-3xl mx-auto">
      
    </div>;
};
export default Report;