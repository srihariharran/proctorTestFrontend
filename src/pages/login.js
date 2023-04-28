// Importing Required Packages
import * as React from 'react';
import './static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Logo from './static/images/logo-full.png'
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Login Page Function
function LoginPage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path, { replace: true })
    }
    const submitLoginFormData = async() => {
        handleRoutes("/courses")
    }

    return(
        <div>
            {/* Login Box */}
           <div className="login-box-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-5 pt-5 p-5 mt-5">
                            <div className="row justify-content-center">
                                <div className="col-sm-12 box p-0 m-5">
                                    {/* Logo */}
                                    <div className="col-sm-12 border p-0 text-center">
                                        <div className='p-2'>
                                            <img src={Logo} alt="Logo" loading="lazy" className="p-3 rounded" draggable="false"></img>
                                        </div>
                                    </div>
                             
                                    {/* Login Form */}
                                    <div className="pt-3 pb-5 p-3">
                                        <h4 className="text-center text-main ">
                                            <strong>User Login</strong>
                                        </h4>
                                        <br/>
                                        <div>
                                            <TextField variant='outlined' label="Username" type="email" name="username" size="small" fullWidth/>  
                                        </div>
                                        <br/>
                                        <div>
                                            <TextField variant='outlined' label="Password" type="password" name="password" size="small" fullWidth/> 
                                            <div className='text-right'>
                                                <Button>
                                                    <small onClick={()=>handleRoutes("/forgot-password")}>Forgot Password?</small>
                                                </Button>
                                            </div>
                                        </div>
                                        <br/>
                                        
                                        <Stack direction="row" justifyContent="space-between">
                                            <Button className="text-main" onClick={()=>handleRoutes("/user-registration")}>New User</Button>
                                            <Button className="bg-main text-white" variant="contained" onClick={submitLoginFormData}>Login</Button>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}


export default LoginPage;