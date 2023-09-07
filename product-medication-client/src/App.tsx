import React from 'react';
import {Container} from '@mui/material';
import { RouterLinks } from './RouterLInks';
import { Header } from './components/Header';
import { MedicationContext } from './state-management/MedicationContext';
import axios from "axios"
import { useQuery} from 'react-query'
import styles from './App.module.css'

const App = ()=>{

  const fetchMedication = async()=>{
    try{
       //API for fetching all the medication drug 
      const response = await axios.get('http://localhost:3030/medication')
      return response.data[0].drugs
    }
    catch(error){
      console.log('error while fetching medication details from API',error)
    }
  }

  const {data:medicationDrugs,isLoading} = useQuery({
    queryFn : ()=>fetchMedication(),
    queryKey : ["MedicationData"]
  })

  return (
      <MedicationContext.Provider value={{medicationDrugs}}>
          <Container maxWidth="sm" sx={{padding:'0px'}}>
              <div className="center">
                <Header />
                <RouterLinks/>
              </div>
          </Container>
      </MedicationContext.Provider>
  );
}

export default App;
