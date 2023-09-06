import React from 'react';
import {Container} from '@mui/material';
import { RouterLinks } from './RouterLInks';
import { Header } from './components/Header';
import { useEffect, useReducer } from 'react';
import { MedicationContext } from './state-management/MedicationContext';
import axios from "axios"

function App() {

  const medicationDrugsReducer = (state:any,action:any)=>{
    if(action.type === 'ADD_MEDICATION'){
        return action.payload
    }
  }
  const [medicationDrugs,medicationDrugsDispatch] = useReducer(medicationDrugsReducer,[])

    useEffect(()=>{
        (async function(){
            try{
                //API for fetching all the medication drug 
                const response = await axios.get('http://localhost:3030/medication')
                medicationDrugsDispatch({type:'ADD_MEDICATION',payload:response.data[0].drugs})
            }
            catch(error){
                console.log('error while fetching medication details from API',error)
            }
        })()
    },[])

  return (
    <MedicationContext.Provider value={{medicationDrugs}}>
        <Container maxWidth="sm">
            <div className="center">
              <Header />
              <RouterLinks/>
            </div>
        </Container>
    </MedicationContext.Provider>
  );
}

export default App;
