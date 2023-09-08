import React, { useReducer } from 'react';
import {Container} from '@mui/material';
import { RouterLinks } from './RouterLInks';
import { Header } from './components/Header';
import { MedicationContext } from './state-management/MedicationContext';
import axios from "axios"
import { useQuery} from 'react-query'
import { IsLoggedIN } from './state-management/IsLoggedIN';

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

  const loggedInReducer = (state:any,action:any)=>{
      if(action.type = 'SetIsLogin'){
        return action.payload
      }
  }

  const [isLoggedIn,loggedInDispatch] = useReducer(loggedInReducer,false)

  return (
    <IsLoggedIN.Provider value={{isLoggedIn,loggedInDispatch }}>
      <MedicationContext.Provider value={{medicationDrugs}}>
                <RouterLinks/>
      </MedicationContext.Provider>
    </IsLoggedIN.Provider>
  );
}

export default App;
