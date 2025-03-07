
export interface Product {
  code: string;
  name: string;
}

export interface TreatmentData {
  id: string;
  createdAt: Date;
  clientName: string;
  clientCPF: string;
  clientPhone: string;
  isStartTreatment: boolean;
  isContinuousTreatment: boolean;
  isAntibioticTreatment: boolean;
  birthDate: Date | undefined;
  isCRMV: boolean;
  product: Product | null;
  shift: "morning" | "evening" | null;
}

export const initialTreatmentData: TreatmentData = {
  id: "",
  createdAt: new Date(),
  clientName: "",
  clientCPF: "",
  clientPhone: "",
  isStartTreatment: false,
  isContinuousTreatment: false,
  isAntibioticTreatment: false,
  birthDate: undefined,
  isCRMV: false,
  product: null,
  shift: null
};

// Helper function to determine the current shift based on time
export const determineCurrentShift = (): "morning" | "evening" => {
  const currentHour = new Date().getHours();
  return currentHour >= 7 && currentHour < 16 ? "morning" : "evening";
};
