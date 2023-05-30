// Importing Required Packages
import * as React from 'react';
import { useState } from 'react';
import './static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Logo from './static/images/logo-full.png'
import Navbar from './components/navbar'
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { decryptData } from './functions/crypto';

// Profile Page Function
function ProfilePage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path, { replace: true })
    }
    const [form_data,setForm_data] = useState({
        confirm_password:''
    })
    // Function to update user details
    const updateFormData = (event) => {
        const {name,value} = event.target
        if(name=="twoFactorAuth")
        {   
            setForm_data((form_data) => ({ ...form_data, [name]: event.target.checked})) 
        }
        else
        {
            setForm_data((form_data) => ({ ...form_data, [name]: value }))
        }
    }
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    // Function to register user
    const submitUpdateFormData = async(event) => {
        event.preventDefault()
        if(!mobile_state.state)
        {
            setBtnLoad(true)
            try 
            {
                let res = await fetch("/api/update/user",
                {
                    crossDomain: true,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                    },
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
    }
    
    const [mobile_state, setMobile_state] = useState({ text: '', state: false })

    // Function to Check Mobile
    const checkMobile = async(event) => {
        event.preventDefault()
        
        // API Call to Check Mobile
        try 
        {
          let res = await fetch("/api/checkMobileNoExists",
            {
              crossDomain: true,
              headers: { 
                'Content-Type': 'application/json',
               
              },
              method: "POST",
              body: JSON.stringify({
                mobile: event.target.value
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
        // console.log(form_data)
        if(form_data.password!=form_data.confirm_password && form_data.password!="password")
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
    const [username,setUsername] = useState(decryptData(localStorage.getItem("utils"))["username"])
    const getUserDetails = async() => {
        try 
        {
          let res = await fetch("/api/user/getAllDetails",
            {
              crossDomain: true,
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
              },
              method: "POST",
              body: JSON.stringify({
                username:username
              })
            });
          let resJson = await res.json();
          if (res.status === 200) 
          {
             setForm_data(resJson)
             console.log(resJson)
             setForm_data((form_data)=>({...form_data,["confirm_password"]:''}))
             setLoginStatus(true)
          }
        }
        catch (err) {
          console.log(err);
        }
    }

    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        (async () => {
            // Checking Login Status
            if(localStorage.getItem("utils"))
            {
                getUserDetails()
                
            }
            else
            {
                setLoginStatus(false)
                localStorage.clear()
                handleRoutes("/",{ replace: true })
            }
        })();
        
        
    },[])

    return(
        <div>
           <div>
            {
                (loginStatus) &&
                <div>
                    {/* Courses List */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Navbar />
                        </Grid>
                        <Grid item xs={12}>
                            <Container maxWidth="sm">
                             
                                    {/* Login Form */}
                                    <div className="pt-3 pb-5 p-3">
                                        <h4 className="text-main ">
                                            <strong>Profile</strong>
                                        </h4>
                                        <br/>
                                        <form id="userRegisterForm" autoComplete='off' onSubmit={submitUpdateFormData}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <div style={{paddingTop:'1%'}}>
                                                    <b>
                                                    Two Factor Authentication
                                                    </b>
                                                </div>
                                                
                                                <div>
                                                    <Switch checked={form_data["twoFactorAuth"]} name="twoFactorAuth" onChange={updateFormData} />
                                                </div>
                                            </Stack>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} value={form_data.username} disabled="true" variant='outlined' label="Email" type="email" name="username" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} variant='outlined' value={form_data.name} label="Name" type="text" name="name" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={passwordState.state}  onChange={updateFormData} value={form_data.password} variant='outlined' label="Password" type="password" name="password" size="small" required fullWidth/> 
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={passwordState.state} helperText={passwordState.text} onChange={updateFormData} variant='outlined' label="Confirm Password" type="password" name="confirm_password" size="small" fullWidth/>   
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} variant='outlined' label="School/College/Company" value={form_data.organisation} type="text" name="organisation" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField onChange={updateFormData} variant='outlined' label="Designation" type="text" value={form_data.designation} name="designation" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            <div>
                                                <TextField error={mobile_state.state} helperText={mobile_state.text} onChange={updateFormData} value={form_data.mobile} onInput={checkMobile} variant='outlined' label="Mobile" type="text" name="mobile" size="small" required fullWidth/>  
                                            </div>
                                            <br/>
                                            
                                            <Stack direction="row" justifyContent="right">
                                                
                                                {
                                                    (alertState.state)&&
                                                    <Alert severity={alertState.type}>{alertState.message}</Alert>
                                                }
                                                &nbsp;
                                                <LoadingButton loading={btnLoad} type="submit" variant="contained" className="bg-main"><span>Update</span></LoadingButton>

                                            </Stack>
                                            
                                        </form>
                                    </div>
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            }
            </div>
        </div>
    )
}


export default ProfilePage;