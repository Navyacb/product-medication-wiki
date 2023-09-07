import {AppBar, Toolbar , Typography} from '@mui/material';
import logo from '../images/Logo.png'
import styles from './Header.module.css';

export const Header = ()=>{

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#e4d6d6' }}>
        <Toolbar>
                <img src={logo} alt="Logo" className={styles.imageHeight}/>
        </Toolbar>
        </AppBar>
    )
}