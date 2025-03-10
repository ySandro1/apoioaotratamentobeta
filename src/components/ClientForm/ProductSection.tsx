
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTreatment } from "@/context/TreatmentContext";
import { Package } from "lucide-react";

const ProductSection: React.FC = () => {
  const {
    treatmentData,
    updateProduct,
    selectedTreatment
  } = useTreatment();
  
  const [productName, setProductName] = useState("");
  
  useEffect(() => {
    if (selectedTreatment && selectedTreatment.product) {
      setProductName(selectedTreatment.product.name);
    } else {
      setProductName(treatmentData.product?.name || "");
    }
  }, [selectedTreatment, treatmentData.product]);
  
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    updateProduct(value ? { name: value, code: "" } : null);
  };
  
  return (
    <div className="space-y-5 bg-secondary/30 p-5 rounded-lg border border-border/40">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Package className="h-5 w-5 text-primary" />
        Produto (Opcional)
      </h3>
      
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
    </div>
  );
};

export default ProductSection;
