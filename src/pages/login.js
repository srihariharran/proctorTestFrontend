// Importing Required Packages
import * as React from 'react';
import { useState } from 'react';
import './static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Logo from './static/images/logo-full.png'
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { encryptData } from './functions/crypto';

// Login Page Function
function LoginPage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path, { replace: true })
    }

    const [form_data,setForm_data] = useState({})
    // Function to update user details
    const updateFormData = (event) => {
        const {name,value} = event.target
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
    }
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
     // Function to login
    const submitLoginFormData = async(event) => {
        event.preventDefault()
        setBtnLoad(true)
        try 
        {
            let res = await fetch("/api/login",
            {
                crossDomain: true,
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(form_data)
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setAlertState({
                    state:true,
                    message:resJson["message"]
                })
                if(resJson['status'])
                {
                    
                    localStorage.setItem("utils",encryptData(resJson["details"]))
                    handleRoutes('/courses')
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                }
                else
                {
                    document.getElementById("form").reset();
                    setBtnLoad(false)
                    setAlertState((alert)=>({...alert,["type"]:"error"}))
                }
                setTimeout(()=>{
                    setAlertState({
                        state:false,
                        type:"",
                        message:""
                    })
                },5000)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            handleRoutes("/courses")
        }
    })

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
                                        <form autoComplete='off' id="form" onSubmit={submitLoginFormData}>
                                            <div>
                                                <TextField variant='outlined' onChange={updateFormData} label="Username" type="email" name="username" size="small" fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField variant='outlined' onChange={updateFormData} label="Password" type="password" name="password" size="small" fullWidth/> 
                                                <div className='text-right'>
                                                    <Button>
                                                        <small onClick={()=>handleRoutes("/forgot-password")}>Forgot Password?</small>
                                                    </Button>
                                                </div>
                                            </div>
                                            <br/>
                                            
                                            <Stack direction="row" justifyContent="space-between">
                                                <Button className="text-main" onClick={()=>handleRoutes("/user-registration")}>New User</Button>
                                                {
                                                    (alertState.state)&&
                                                    <Alert severity={alertState.type}>{alertState.message}</Alert>
                                                }
                                                
                                                <LoadingButton loading={btnLoad} type="submit" variant="contained" className="bg-main"><span>Login</span></LoadingButton>
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


export default LoginPage;