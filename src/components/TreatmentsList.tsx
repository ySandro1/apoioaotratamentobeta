
import React, { useState } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, Trash2, FileText, Plus, List } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TreatmentsList: React.FC = () => {
  const { 
    allTreatments, 
    deleteTreatment, 
    setSelectedTreatment,
    treatmentData
  } = useTreatment();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (treatment: any) => {
    setSelectedTreatment(treatment);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteTreatment(id);
    toast.success("Tratamento removido com sucesso");
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
        <div className="mb-4 relative">
          <Input
            placeholder="Buscar por nome, CPF ou produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
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
