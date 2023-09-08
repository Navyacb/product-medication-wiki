import {Paper, InputBase, IconButton,Typography,} from '@mui/material';
import {Search, Clear} from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import styles from './SearchBar.module.css'
import { SearchList } from './SearchList';
import Button from '@mui/material-next/Button';
import { MedicationContext } from '../state-management/MedicationContext';
import { IsLoggedIN } from '../state-management/IsLoggedIN';

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
    const {isLoggedIn} = useContext(IsLoggedIN)

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
        <div className={styles.mobilePadding}>
            <div className={styles.heading}>
                <Typography variant='h5' className={styles.searchPadding} >Search Medication</Typography>
                {(isLoggedIn) && <Button color="tertiary"  size="large"  variant="text">Add Medication</Button>}
            </div>
            <Paper elevation={3}>
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