import {Paper, InputBase, IconButton,} from '@mui/material';
import {Search, Clear} from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import styles from './SearchBar.module.css'
import { SearchList } from './SearchList';
import { MedicationContext } from '../state-management/MedicationContext';
interface medicationDrug {
    name: string,
    diseases: string[],
    releases : Date
  }

export const SearchBar = (props:any)=>{
    const {medicationDrugs} = useContext(MedicationContext)
    const [searchText,setSearchText] = useState('')
    const [searchData,setSearchData] = useState<medicationDrug[]>([])
    const [errorText,setErrorText] = useState('')

    function handleSearch(e:any){
        setSearchText(e.target.value)
    }

    function handleClearSearch(){
        setSearchText('')
    }

    useEffect(()=>{
        if(searchText.length>2){
            const result = medicationDrugs.filter((drug)=>{
                const containsSubstring = drug.diseases.some(ele => ele.toLowerCase().includes(searchText.toLowerCase()));
                const name = drug.name.toLowerCase()
                return (name.includes(searchText.toLowerCase()) || containsSubstring)
            })
            setSearchData(result)
        }else{
            setErrorText('Please enter minimum 3 Characters to view the search results!')
        }
    },[searchText])

    return (
        <div>
            <h3>Search Medication</h3>
            <Paper elevation={3} className={styles.padding}>
                <InputBase className={styles.width100}
                    placeholder="You can search by drug name or disease..."
                    inputProps={{ 'aria-label': 'You can search by drug name or disease...' }}
                    value={searchText}
                    onChange={handleSearch}
                    startAdornment={
                        <IconButton type="button" aria-label="search">
                          <Search />
                        </IconButton>
                    }
                    endAdornment={
                        searchText && (
                          <IconButton aria-label="clear search" onClick={handleClearSearch}>
                            <Clear />
                          </IconButton>
                        )
                      }
                />
            </Paper>
            {
                (searchText.length>2) ? 
                (<SearchList searchData={searchData} />):
                (<p>{errorText}</p>)
            }
        </div>
    )
}