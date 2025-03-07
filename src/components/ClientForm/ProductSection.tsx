
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTreatment } from "@/context/TreatmentContext";

const ProductSection: React.FC = () => {
  const {
    updateProduct,
    selectedTreatment
  } = useTreatment();
  
  const [productName, setProductName] = useState("");
  
  useEffect(() => {
    if (selectedTreatment && selectedTreatment.product) {
      setProductName(selectedTreatment.product.name);
    } else {
      setProductName("");
    }
  }, [selectedTreatment]);
  
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
    updateProduct(value ? { name: value, code: "" } : null);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Produto (Opcional)</h3>
      
      <div className="space-y-2">
        <Label htmlFor="product" className="flex items-center gap-1">
          <span>Nome do Produto</span>
        </Label>
        <Input
          id="product"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Digite o nome do produto"
        />
      </div>
    </div>
  );
};

export default ProductSection;
