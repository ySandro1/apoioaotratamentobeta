
import React, { useState } from "react";
import { useTreatment } from "@/context/TreatmentContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Package, Clock } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductStep: React.FC = () => {
  const { treatmentData, updateProduct, updateShift } = useTreatment();
  const [productName, setProductName] = useState(treatmentData.product?.name || "");
  
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    updateProduct(value ? { name: value, code: "" } : null);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Produto</h3>
        <p className="text-sm text-muted-foreground">
          Informe o produto relacionado ao tratamento e o turno de apoio.
        </p>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="product" className="flex items-center gap-1 text-base">
            <span>Nome do Produto</span>
          </Label>
          <div className="relative">
            <Input
              id="product"
              value={productName}
              onChange={handleProductNameChange}
              placeholder="Digite o nome do produto"
              className="bg-background border-2 focus-visible:border-primary/50 pl-9"
            />
            <Package className="h-4 w-4 text-muted-foreground absolute left-3 top-[13px]" />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="shift" className="flex items-center gap-1 text-base">
            <span>Turno</span>
            <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Auto
            </span>
          </Label>
          <Select 
            value={treatmentData.shift || "unspecified"} 
            onValueChange={(value: string) => updateShift(value === "unspecified" ? null : (value as "morning" | "evening"))}
          >
            <SelectTrigger id="shift" className="w-full bg-background border-2">
              <SelectValue placeholder="Selecione o turno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unspecified">Não especificado</SelectItem>
              <SelectItem value="morning">Manhã (7:00 - 16:00)</SelectItem>
              <SelectItem value="evening">Tarde/Noite (16:00 - 23:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductStep;
