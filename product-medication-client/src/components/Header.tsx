import {AppBar, Toolbar , Typography} from '@mui/material';
import logo from '../images/Logo.png'
import styles from './Header.module.css';

export const Header = (props : any)=>{

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#e4d6d6' }}>
        <Toolbar>
            <Typography variant="h6" component="div">
                <img src={logo} alt="Logo" className={styles.imageHeight}/>
            </Typography>
        </Toolbar>
        </AppBar>
    )
}