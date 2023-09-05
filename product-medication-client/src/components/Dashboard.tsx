import {Container} from '@mui/material';
import { RouterLinks } from '../RouterLInks';
import { Header } from './Header';
import { useEffect, useReducer } from 'react';
import { MedicationContext } from '../state-management/MedicationContext';
import axios from "axios"

export const Dashboard = (props : any)=>{
    const [medicationDrugs,medicationDrugsDispatch] = useReducer(medicationDrugsReducer,[])

    function medicationDrugsReducer(state:any,action:any){
        if(action.type === 'ADD_MEDICATION'){
            return action.payload
        }
    }

    useEffect(()=>{
        (async function(){
            try{
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
    )
}