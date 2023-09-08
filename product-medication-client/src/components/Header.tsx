import {AppBar, Toolbar , Container} from '@mui/material';
import logo from '../images/Logo.png';
import styles from './Header.module.css';
import Button from '@mui/material-next/Button';
import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { IsLoggedIN } from '../state-management/IsLoggedIN';
import { useNavigate } from 'react-router-dom';

export const Header = ()=>{

    const {isLoggedIn,loggedInDispatch} = useContext(IsLoggedIN)
    const navigate = useNavigate()

    const handleLogOut = ()=>{
        loggedInDispatch({type:'SetIsLogin',payload:!isLoggedIn})
        navigate("/")
    }

    return (
        <Container maxWidth="sm" sx={{padding:'0px'}}>
                <AppBar position="sticky" sx={{ backgroundColor: '#e4d6d6' }}>
                <Toolbar className={styles.headerFlex}>
                        <Link to='/'>
                            <img src={logo} alt="Logo" className={styles.imageHeight}/>
                        </Link>
                        {
                            (isLoggedIn) ? 
                            (
                                <Button color="tertiary" variant="outlined" onClick={handleLogOut}>Logout</Button>
                            ):
                            (
                                <Link to='/login' className={styles.decoration}>
                                    <Button color="tertiary" variant="outlined">Login</Button>
                                </Link>
                            )
                        }
                </Toolbar>
                </AppBar>
                <Outlet/>
        </Container>
    )
}