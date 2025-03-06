
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
  product: null
};
