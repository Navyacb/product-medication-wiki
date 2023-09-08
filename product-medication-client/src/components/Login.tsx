import { Box ,FormControl,InputLabel, OutlinedInput,InputAdornment,IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import {VisibilityOff,Visibility, Password} from '@mui/icons-material'
import styles from './Login.module.css'
import Button from '@mui/material-next/Button';
import axios from 'axios'
import { IsLoggedIN } from '../state-management/IsLoggedIN';
import { useNavigate } from "react-router-dom"

export const Login = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {loggedInDispatch,isLoggedIn} = useContext(IsLoggedIN)
    const navigate = useNavigate()

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.id === 'email'){
            setEmail(e.target.value)
        }
        if(e.target.id === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleLogin = async()=>{
         try{
            const response = await axios.post('http://localhost:3030/login',{
                email,
                password
            })
            if(response.hasOwnProperty('errors')){
                console.log('The response from the api as errors',response)
            }else{
                localStorage.setItem('token',response.data.token)
                loggedInDispatch({type:'SetIsLogin',payload:!isLoggedIn})
                navigate("/")
            }
         }
         catch(error){
            console.log('error while trying user to get loggedIn', error)
         }
    }

    return (
        <div className={`${styles.container} ${styles.displayFlex}`}>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl sx={{ m: 1,margin:'15px', display : 'flex' }} variant="outlined" className={styles.inputField}>
                <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        value={email}
                        onChange={handleChange}
                        id="email"
                        label="Email"
                        multiline
                        maxRows={4}
                    />
            </FormControl>
            <FormControl sx={{ m: 1, margin:'15px',display : 'flex' }} variant="outlined" className={styles.inputField}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                value={password}
                onChange={handleChange}
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            </FormControl>
            <div className={styles.buttonIcon}>
                <Button color="tertiary" variant="outlined" onClick={handleLogin}>Sign In</Button>
            </div>
        </Box>
        </div>
    )
}