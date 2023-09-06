import {Paper, InputBase, IconButton,Typography,} from '@mui/material';
import {Search, Clear , Warning} from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import styles from './SearchBar.module.css'
import { SearchList } from './SearchList';
import { MedicationContext } from '../state-management/MedicationContext';

interface IMedicationDrug {
    name: string,
    diseases: string[],
    releases : Date
  }

export const SearchBar = ()=>{
    const {medicationDrugs} = useContext(MedicationContext)
    const [searchText,setSearchText] = useState('')
    const [searchData,setSearchData] = useState<IMedicationDrug[]>([])
    const [textMessage,setTextMessage] = useState('')

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchText(e.target.value)
    }

    const handleClearSearch = ()=>{
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
            setTextMessage('Please enter minimum 3 Characters to view the search results!')
        }
    },[searchText])

    return (
        <div>
            <Typography variant='h4' className={styles.searchPadding} >Search Medication</Typography>
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
                (<Typography className={styles.warning}>
                        {textMessage}
              </Typography>)
            }
        </div>
    )
}