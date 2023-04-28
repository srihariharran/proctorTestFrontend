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

// ForgotPassword Page Function
function ForgotPasswordPage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path, { replace: true })
    }
    const submitFormData = async() => {
        handleRoutes("/courses")
    }

    return(
        <div>
            {/* Forgot Password Box */}
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
                                            <strong>Forgot Password</strong>
                                        </h4>
                                        <br/>
                                        <div>
                                            <TextField variant='outlined' label="Username" type="email" name="username" size="small" fullWidth/>  
                                        </div>
                                        <br/>
                                        
                                        <Stack direction="row" justifyContent="space-between">
                                            <Button className="text-main" onClick={()=>handleRoutes("/")}>Login</Button>
                                            <Button className="bg-main text-white" variant="contained" onClick={submitFormData}>Submit</Button>
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


export default ForgotPasswordPage;