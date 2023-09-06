import { createContext, Dispatch } from "react";

interface IMedicationDrug {
    name: string,
    diseases: string[],
    releases : Date,
    description : String,
  }

interface IMedicationContextType {
    medicationDrugs: IMedicationDrug[];
    // medicationDrugsDispatch: Dispatch<'ADD_MEDICATION'>; 
}

export const MedicationContext = createContext<IMedicationContextType>({
    medicationDrugs: [],
    // medicationDrugsDispatch: () => {}, 
})