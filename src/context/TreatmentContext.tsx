
import React, { createContext, useState, useContext, ReactNode } from "react";
import { TreatmentData, initialTreatmentData, Product } from "../types/client";

interface TreatmentContextType {
  treatmentData: TreatmentData;
  updateClientName: (name: string) => void;
  updateClientCPF: (cpf: string) => void;
  updateClientPhone: (phone: string) => void;
  updateIsStartTreatment: (value: boolean) => void;
  updateIsContinuousTreatment: (value: boolean) => void;
  updateIsAntibioticTreatment: (value: boolean) => void;
  updateBirthDate: (date: Date | undefined) => void;
  updateIsCRMV: (value: boolean) => void;
  updateProduct: (product: Product | null) => void;
  resetForm: () => void;
}

const TreatmentContext = createContext<TreatmentContextType | undefined>(undefined);

export const TreatmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [treatmentData, setTreatmentData] = useState<TreatmentData>(initialTreatmentData);

  const updateClientName = (name: string) => {
    setTreatmentData(prev => ({ ...prev, clientName: name }));
  };

  const updateClientCPF = (cpf: string) => {
    setTreatmentData(prev => ({ ...prev, clientCPF: cpf }));
  };

  const updateClientPhone = (phone: string) => {
    setTreatmentData(prev => ({ ...prev, clientPhone: phone }));
  };

  const updateIsStartTreatment = (value: boolean) => {
    setTreatmentData(prev => ({ ...prev, isStartTreatment: value }));
  };

  const updateIsContinuousTreatment = (value: boolean) => {
    setTreatmentData(prev => ({ ...prev, isContinuousTreatment: value }));
  };

  const updateIsAntibioticTreatment = (value: boolean) => {
    setTreatmentData(prev => ({ ...prev, isAntibioticTreatment: value }));
  };

  const updateBirthDate = (date: Date | undefined) => {
    setTreatmentData(prev => ({ ...prev, birthDate: date }));
  };

  const updateIsCRMV = (value: boolean) => {
    setTreatmentData(prev => ({ ...prev, isCRMV: value }));
  };

  const updateProduct = (product: Product | null) => {
    setTreatmentData(prev => ({ ...prev, product }));
  };

  const resetForm = () => {
    setTreatmentData(initialTreatmentData);
  };

  return (
    <TreatmentContext.Provider value={{
      treatmentData,
      updateClientName,
      updateClientCPF,
      updateClientPhone,
      updateIsStartTreatment,
      updateIsContinuousTreatment,
      updateIsAntibioticTreatment,
      updateBirthDate,
      updateIsCRMV,
      updateProduct,
      resetForm
    }}>
      {children}
    </TreatmentContext.Provider>
  );
};

export const useTreatment = (): TreatmentContextType => {
  const context = useContext(TreatmentContext);
  if (!context) {
    throw new Error("useTreatment must be used within a TreatmentProvider");
  }
  return context;
};
