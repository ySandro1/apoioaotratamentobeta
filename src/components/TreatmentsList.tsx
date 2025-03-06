
import React, { useState } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Edit, 
  Trash2, 
  FileText, 
  Plus, 
  List, 
  Printer,
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TreatmentsList: React.FC = () => {
  const { 
    allTreatments, 
    deleteTreatment, 
    setSelectedTreatment,
    treatmentData,
    resetForm,
    deleteAllTreatments
  } = useTreatment();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleEdit = (treatment: any) => {
    setSelectedTreatment(treatment);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteTreatment(id);
    toast.success("Tratamento removido com sucesso");
  };

  const handlePrintReport = () => {
    // Create a print-friendly environment
    const originalTitle = document.title;
    document.title = `Relatório`;
    
    // Generate report HTML content
    const reportHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <style>
          @media print {
            body { font-family: Arial, sans-serif; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-section { margin-bottom: 15px; }
            .print-label { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .treatment-item { border-bottom: 1px solid #eee; padding: 10px 0; }
            .treatment-item:last-child { border-bottom: none; }
          }
        </style>
        <div class="print-header">
          <h1>Relatório de Tratamentos</h1>
          <p>Data: ${format(new Date(), "PPP", { locale: ptBR })}</p>
        </div>
        
        <div class="print-section">
          <h2>Tratamentos Registrados</h2>
          <p>Total: ${allTreatments.length}</p>
          
          ${allTreatments.map((treatment, index) => `
            <div class="treatment-item">
              <h3>${index + 1}. ${treatment.clientName}</h3>
              <p><span class="print-label">CPF:</span> ${treatment.clientCPF}</p>
              <p><span class="print-label">Telefone:</span> ${treatment.clientPhone}</p>
              <p><span class="print-label">Data do Registro:</span> ${format(new Date(treatment.createdAt), "PPP", { locale: ptBR })}</p>
              
              <p><span class="print-label">Tipo de Tratamento:</span>
                ${treatment.isStartTreatment ? ' Início de Tratamento;' : ''}
                ${treatment.isContinuousTreatment ? ' Tratamento Contínuo;' : ''}
                ${treatment.isAntibioticTreatment ? ' Tratamento com Antibiótico;' : ''}
              </p>
              
              ${treatment.isAntibioticTreatment && !treatment.isCRMV && treatment.birthDate ? 
                `<p><span class="print-label">Data de Nascimento:</span> ${format(new Date(treatment.birthDate), "PPP", { locale: ptBR })}</p>` : ''}
              
              ${treatment.isAntibioticTreatment && treatment.isCRMV ? 
                `<p><span class="print-label">CRMV:</span> Sim</p>` : ''}
              
              ${treatment.product ? 
                `<p><span class="print-label">Produto:</span> ${treatment.product.name} (${treatment.product.code})</p>` : 
                `<p><span class="print-label">Produto:</span> Não informado</p>`}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Open a new window for the report preview
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      
      // Wait for content to load before printing
      printWindow.onload = function() {
        printWindow.print();
        printWindow.onafterprint = function() {
          printWindow.close();
        };
      };
    } else {
      toast.error("Não foi possível abrir a janela de impressão. Verifique se o bloqueador de pop-ups está ativado.");
    }
    
    document.title = originalTitle;
  };

  const handleDeleteAll = () => {
    deleteAllTreatments();
    setIsAlertDialogOpen(false);
    toast.success("Todos os tratamentos foram removidos");
  };

  const filteredTreatments = allTreatments.filter(
    (treatment) =>
      treatment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.clientCPF.includes(searchTerm) ||
      (treatment.product?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (treatment.product?.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="w-full max-w-3xl mx-auto card-shadow animate-fade-in">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl text-center font-medium flex items-center justify-center gap-2">
          <List className="h-5 w-5" />
          Tratamentos Registrados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex flex-col sm:flex-row gap-2 justify-between">
          <Input
            placeholder="Buscar por nome, CPF ou produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-[300px]"
          />
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              className="text-primary"
              onClick={handlePrintReport}
              disabled={allTreatments.length === 0}
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir Relatório
            </Button>
            
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-destructive border-destructive hover:bg-destructive/10"
                  disabled={allTreatments.length === 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Apagar Todos
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmação</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja apagar todos os tratamentos registrados? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAll}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Apagar Todos
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <ScrollArea className="h-[300px] rounded-md border p-4">
          {filteredTreatments.length > 0 ? (
            <div className="space-y-3">
              {filteredTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{treatment.clientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        CPF: {treatment.clientCPF}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(treatment.createdAt), "dd/MM/yy HH:mm")}
                    </p>
                  </div>

                  <div className="text-sm mb-2">
                    <p className="text-muted-foreground">
                      Produto: {treatment.product?.name || "Não informado"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {treatment.isStartTreatment && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          Início
                        </span>
                      )}
                      {treatment.isContinuousTreatment && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          Contínuo
                        </span>
                      )}
                      {treatment.isAntibioticTreatment && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          Antibiótico
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleEdit(treatment)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(treatment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "Nenhum tratamento encontrado para esta busca."
                : "Nenhum tratamento registrado."}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TreatmentsList;
