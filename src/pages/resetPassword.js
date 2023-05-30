// Importing Required Packages
import * as React from 'react';
import { useState } from 'react';
import './static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Logo from './static/images/logo-full.png'
import { useNavigate,useLocation } from "react-router-dom";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { encryptData } from './functions/crypto';

// ResetPassword Page Function
function ResetPasswordPage()
{
    // Getting from location
    const location = useLocation()
    
    

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
    const [passwordState,setPasswordState] = useState({
        state:false,
        text:''
    })
    useEffect(()=>{
        if(form_data.password!=form_data.confirm_password)
        {
            setPasswordState({
                state:true,
                text:"Password not same"
            })
        }
        else
        {
            setPasswordState({
                state:false,
                text:""
            })
        }
    },[form_data])

     // Function to login
    const submitLoginFormData = async(event) => {
        event.preventDefault()
        setBtnLoad(true)
        try 
        {
            let res = await fetch("/api/resetPassword",
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
                   
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                }
                else
                {
                    document.getElementById("form").reset();
                    setBtnLoad(false)
                    setAlertState((alert)=>({...alert,["type"]:"error"}))
                }
                setTimeout(()=>{
                    handleRoutes('/')
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
    const resendOTP = async(event) => {
        event.preventDefault()
        try 
        {
            let res = await fetch("/api/resendOTP",
            {
                crossDomain: true,
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({
                    username:form_data.username
                })
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setAlertState({
                    state:true,
                    message:resJson["message"]
                })
                if(resJson['status'])
                {
                   
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                }
                else
                {
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
        else
        {
            if(location.state)
            {
                setForm_data((form_data)=>({...form_data,["username"]:location.state.username}))
                setForm_data((form_data)=>({...form_data,["maskedEmail"]:location.state.maskedEmail}))
            }
            else
            {
                handleRoutes('/')
            }
        }
    },[])

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
                                            <strong>Two Factor Authentication</strong>
                                        </h4>
                                        <h5 className="text-center text-main ">
                                            <strong>OTP Verification</strong>
                                        </h5>
                                        <p className="text-center">
                                           <small>OTP sent to your Email {form_data.maskedEmail}</small>
                                        </p>
                                        
                                        <br/>
                                        <form autoComplete='off' id="form" onSubmit={submitLoginFormData}>
                                            <div>
                                                <TextField variant='outlined' onChange={updateFormData} label="One Time Password" type="text" name="otp" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={passwordState.state}  onChange={updateFormData} variant='outlined' label="Password" type="password" name="password" size="small" required fullWidth/> 
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={passwordState.state} helperText={passwordState.text} onChange={updateFormData} variant='outlined' label="Confirm Password" type="password" name="confirm_password" size="small" required fullWidth/>   
                                            </div>
                                            <br/>
                                            
                                            <Stack direction="row" justifyContent="space-between">
                                                <Button variant='outlined' type="button" onClick={resendOTP}>Resend OTP</Button>
                                                {
                                                    (alertState.state)&&
                                                    <Alert severity={alertState.type}>{alertState.message}</Alert>
                                                }
                                                
                                                <LoadingButton loading={btnLoad} type="submit" variant="contained" className="bg-main"><span>Reset Password</span></LoadingButton>
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


export default ResetPasswordPage;