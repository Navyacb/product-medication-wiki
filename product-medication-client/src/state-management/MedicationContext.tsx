import { createContext, Dispatch } from "react";

interface medicationDrug {
    name: string,
    diseases: string[],
    releases : Date
  }

interface MedicationContextType {
    medicationDrugs: medicationDrug[];
    // medicationDrugsDispatch: Dispatch<'ADD_MEDICATION'>; 
}

export const MedicationContext = createContext<MedicationContextType>({
    medicationDrugs: [],
    // medicationDrugsDispatch: () => {}, 
})