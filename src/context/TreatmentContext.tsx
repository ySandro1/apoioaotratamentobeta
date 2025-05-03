import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { TreatmentData, initialTreatmentData, Product, determineCurrentShift } from "../types/client";
import { v4 as uuidv4 } from "uuid";

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
  updateShift: (shift: "morning" | "evening" | null) => void;
  resetForm: () => void;
  saveCurrentTreatment: () => void;
  allTreatments: TreatmentData[];
  deleteTreatment: (id: string) => void;
  deleteAllTreatments: () => void;
  selectedTreatment: TreatmentData | null;
  setSelectedTreatment: (treatment: TreatmentData | null) => void;
}

const STORAGE_KEY = "treatmentsList";

const TreatmentContext = createContext<TreatmentContextType | undefined>(undefined);

export const TreatmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [treatmentData, setTreatmentData] = useState<TreatmentData>({
    ...initialTreatmentData,
    id: uuidv4(),
    shift: determineCurrentShift() // Set the initial shift based on current time
  });
  const [allTreatments, setAllTreatments] = useState<TreatmentData[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentData | null>(null);

  useEffect(() => {
    const savedTreatments = localStorage.getItem(STORAGE_KEY);
    if (savedTreatments) {
      try {
        const parsedTreatments = JSON.parse(savedTreatments);
        const treatmentsWithDates = parsedTreatments.map((treatment: any) => ({
          ...treatment,
          createdAt: new Date(treatment.createdAt),
          birthDate: treatment.birthDate ? new Date(treatment.birthDate) : undefined,
        }));
        setAllTreatments(treatmentsWithDates);
      } catch (error) {
        console.error("Erro ao carregar tratamentos:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTreatments));
  }, [allTreatments]);

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

  const updateShift = (shift: "morning" | "evening" | null) => {
    setTreatmentData(prev => ({ ...prev, shift }));
  };

  const resetForm = () => {
    setTreatmentData({
      ...initialTreatmentData,
      id: uuidv4(),
      createdAt: new Date(),
      shift: determineCurrentShift() // Reset with the current shift
    });
    setSelectedTreatment(null);
  };

  const saveCurrentTreatment = () => {
    const treatmentToSave = {
      ...treatmentData,
      createdAt: new Date()
    };
    
    if (selectedTreatment) {
      setAllTreatments(prev => 
        prev.map(item => item.id === selectedTreatment.id ? treatmentToSave : item)
      );
    } else {
      setAllTreatments(prev => [...prev, treatmentToSave]);
    }
    
    resetForm();
  };

  const deleteTreatment = (id: string) => {
    setAllTreatments(prev => prev.filter(treatment => treatment.id !== id));
    
    if (selectedTreatment && selectedTreatment.id === id) {
      setSelectedTreatment(null);
      resetForm();
    }
  };

  const deleteAllTreatments = () => {
    setAllTreatments([]);
    setSelectedTreatment(null);
    resetForm();
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
      updateShift,
      resetForm,
      saveCurrentTreatment,
      allTreatments,
      deleteTreatment,
      deleteAllTreatments,
      selectedTreatment,
      setSelectedTreatment
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
