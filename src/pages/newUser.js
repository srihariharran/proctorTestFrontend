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

// New User Page Function
function NewUserPage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path, { replace: true })
    }
    const submitNewUserFormData = async() => {
        handleRoutes("/")
    }

    return(
        <div>
            {/* NewUser Box */}
           <div className="login-box-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-5 m-2">
                            <div className="row justify-content-center">
                                <div className="col-sm-12 box p-0">
                                    {/* Logo */}
                                    <div className="col-sm-12 border p-0 text-center">
                                        <div className='p-2'>
                                            <img src={Logo} alt="Logo" loading="lazy" className="p-3 rounded" draggable="false"></img>
                                        </div>
                                    </div>
                             
                                    {/* Login Form */}
                                    <div className="pt-3 pb-5 p-3">
                                        <h4 className="text-center text-main ">
                                            <strong>User Registration</strong>
                                        </h4>
                                        <br/>
                                        <form autoComplete='off' onSubmit={submitNewUserFormData}>
                                            <div>
                                                <TextField variant='outlined' label="Email" type="email" name="username" size="small" fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' label="Name" type="email" name="name" size="small" fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' label="Password" type="password" name="password" size="small" fullWidth/> 
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' label="Confirm Password" type="password" name="confirm_password" size="small" fullWidth/> 
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' label="School/College/Company" type="text" name="organisation" size="small" fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' label="Designation" type="text" name="designation" size="small" fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' label="Mobile" type="text" name="mobile" size="small" fullWidth/>  
                                            </div>
                                            <br/>
                                            
                                            <Stack direction="row" justifyContent="space-between">
                                                <Button className="text-main" type='button' onClick={()=>handleRoutes("/")}>Login</Button>
                                                <Button className="bg-main text-white" variant="contained" onClick={submitNewUserFormData}>Register</Button>
                                            </Stack>
                                        </form>
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


export default NewUserPage;