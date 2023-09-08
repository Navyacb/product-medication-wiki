
import axios from "axios"
export const fetchResponseData = async(api)=>{
    try{
       //API for fetching all the medication drug 
      const response = await axios.get('http://localhost:3030/medication')
      return response.data[0].drugs
    }
    catch(error){
      console.log('error while fetching medication details from API',error)
    }
  }