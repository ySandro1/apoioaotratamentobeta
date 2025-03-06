
export interface Product {
  code: string;
  name: string;
}

export interface TreatmentData {
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
