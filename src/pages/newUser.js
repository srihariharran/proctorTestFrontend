// Importing Required Packages
import * as React from 'react';
import { useState } from 'react';
import './static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Logo from './static/images/logo-full.png'
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import utils from '../utils.json'

// New User Page Function
function NewUserPage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path, { replace: true })
    }
    const [form_data,setForm_data] = useState({})
    const [passwordValidState,setPasswordValidState] = useState({
        state:false,
        text:''
    })
    const [username_state, setUsername_state] = useState({ text: '', state: false })
    const [mobile_state, setMobile_state] = useState({ text: '', state: false })
    // Function to update user details
    const updateFormData = (event) => {
        const {name,value} = event.target
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
        
        
        if(name=="password")
        {
            const reg =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            
            if(!reg.test(value))
            {
                setPasswordValidState({
                    state:true,
                    text:"Must contain at least 1 number and 1 uppercase and lowercase letter, and at least 8 or more characters"
                })
            }
            else
            {
                setPasswordValidState({
                    state:false,
                    text:""
                })
            }
            
        }
        if(name=="mobile")
        {
            const reg =/^(\+|\d)[0-9]{7,16}$/;;
            
            if(!reg.test(value))
            {
                setMobile_state({
                    state:true,
                    text:"Invalid Mobile No."
                })
            }
            else
            {
                setMobile_state({
                    state:false,
                    text:""
                })
            }
            
        }
    }
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    // Function to register user
    const submitNewUserFormData = async(event) => {
        
        event.preventDefault()
        setBtnLoad(true)
        await checkUsername()
        await checkMobile()
        
        if(!username_state.state && !mobile_state.state && !passwordState.state && !passwordValidState.state)
        {
            
            try 
            {
                let res = await fetch(utils["url"]+"/api/register/user",
                {
                    crossDomain: true,
                    headers: { 'Content-Type': 'application/json' },
                    method: "POST",
                    body: JSON.stringify(form_data)
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    document.getElementById("userRegisterForm").reset();
                    setBtnLoad(false)
                    if(resJson['status'])
                    {
                        setAlertState((alert)=>({...alert,["type"]:"success"}))
                    }
                    else
                    {
                        setAlertState((alert)=>({...alert,["type"]:"error"}))
                    }
                    setAlertState({
                        state:true,
                        message:resJson["message"]
                    })
                    
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
        else
        {
            setBtnLoad(false)
        }
    }
    
    // Function to check username exists
    const checkUsername = async(event) => {
        
        // API Call to Check Username
        try 
        {
          let res = await fetch(utils["url"]+"/api/checkUsernameExists",
            {
              crossDomain: true,
              headers: { 'Content-Type': 'application/json' },
              method: "POST",
              body: JSON.stringify({
                username: form_data.username
              })
            });
          let resJson = await res.json();
          if (res.status === 200) {
            if(!resJson.status)
            {
              setUsername_state({ text: 'Username Exists', state: true })
            }
            else
            {
              setUsername_state({ text: '', state: false })
            }
          }
        }
        catch (err) {
          console.log(err);
        }
    }
    
    // Function to Check Mobile
    const checkMobile = async(event) => {
        
        
        // API Call to Check Mobile
        try 
        {
          let res = await fetch(utils["url"]+"/api/checkMobileNoExists",
            {
              crossDomain: true,
              headers: { 'Content-Type': 'application/json' },
              method: "POST",
              body: JSON.stringify({
                mobile: form_data.mobile
              })
            });
          let resJson = await res.json();
          if (res.status === 200) 
          {
            if(!resJson.status)
            {
            setMobile_state({ text: 'Mobile No Exists', state: true })
            }
            else
            {
            setMobile_state({ text: '', state: false })
            }
          }
        }
        catch (err) {
          console.log(err);
        }
    }
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
                                        <form id="userRegisterForm" autoComplete='off' onSubmit={submitNewUserFormData}>
                                            <div>
                                                <TextField error={username_state.state} helperText={username_state.text} onChange={updateFormData}  variant='outlined' label="Email" type="email" name="username" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} variant='outlined' label="Name" type="text" name="name" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={passwordValidState.state} helperText={passwordValidState.text}  onChange={updateFormData} variant='outlined' label="Password" type="password" name="password" size="small" required fullWidth/> 
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={passwordState.state} helperText={passwordState.text} onChange={updateFormData} variant='outlined' label="Confirm Password" type="password" name="confirm_password" size="small" required fullWidth/>   
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} variant='outlined' label="School/College/Company" type="text" name="organisation" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} variant='outlined' label="Designation" type="text" name="designation" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={mobile_state.state} helperText={mobile_state.text} onChange={updateFormData}  variant='outlined' label="Mobile" type="text" name="mobile" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            
                                            <Stack direction="row" justifyContent="space-between">
                                                <Button className="text-main" type='button' onClick={()=>handleRoutes("/")}>Login</Button>
                                                {
                                                    (alertState.state)&&
                                                    <Alert severity={alertState.type}>{alertState.message}</Alert>
                                                }
                                                
                                                <LoadingButton loading={btnLoad} type="submit" variant="contained" className="bg-main"><span>Register</span></LoadingButton>

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