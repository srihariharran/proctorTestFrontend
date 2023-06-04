// Importing Required Packages
import * as React from 'react';
import $ from 'jquery'
import { useState,useEffect } from 'react';
import Webcam from "react-webcam";
import { useNavigate,useLocation } from "react-router-dom";
import './static/css/style.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { decryptData } from './functions/crypto';
import utils from '../utils.json'


// Take Test Settings Page Function
function TakeTestSettings(props)
{
    // console.log(props)
    let navigate = useNavigate(); 
    const handleRoutes = (path,state) => {
        navigate(path,state)
    }
    // Declaring Ref for Webcam
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    // Function to capture Image
    const capture = React.useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
            
        }
        
        
    }, [webcamRef, setImgSrc]);
    // Function to reset the webcam data
    const captureAgain = React.useCallback(() => {
        webcamRef.current = null;
        setImgSrc(null);
    }, [webcamRef, setImgSrc]);

    // Declaring Form Data State
    const [form_data, setForm_data] = useState(
        {
            courseId:props.data.courseId,
            courseName:props.data.courseName,
            mode:props.data.mode,
            duration:props.data.duration,
            webcam:props.data.webcam,
            image:imgSrc,
            reportId:props.data.reportId,
            ip:'',
            platform:'',
            noOfQuestion:props.data.noOfQuestion,
        }
    );
    // Function to update the form data
    const updateFormData = (event) => {
        const { name, value } = event.target;
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
        // if(form_data.webcam=="yes")
        // {
        //     setInterval(capture,5000)
            
        // }   
       
    }
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    const [disableField,setDisableField] = useState(false)
    

    // Function to start test
    const startTest = async() => {
        try 
        {
            let res = await fetch(utils["url"]+"/api/test/startDetails",
            {
                crossDomain: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                },
                method: "POST",
                body: JSON.stringify(form_data),
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
                    setTimeout(()=>{
                        fullScreen()
                        handleRoutes("/course/test-instructions",{state:{form_data},replace:true});
                    },2000)
                }
                else
                {
                    setBtnLoad(false)
                    setAlertState((alert)=>({...alert,["type"]:"error"}))
                }
                
                
            }
            else
            {
                localStorage.clear()
                handleRoutes("/",{ replace: true })
            }
        }
        catch (err) {
            console.log(err);
            localStorage.clear()
            handleRoutes("/",{ replace: true })
        }
    }
    // Function to submit form data
    const submitData = async(event) => {
        event.preventDefault()
        // console.log(form_data)
        if(form_data.webcam=="yes")
        {
            if(form_data.image)
            {
                setBtnLoad(true)
                
                if(props.data.startedOn!=null && props.data.submittedOn==null)
                {
                    setAlertState({
                        state:true,
                        message:"Test Started Successfully",
                        type:"success"
                    })
                    setTimeout(()=>{
                        fullScreen()
                        handleRoutes("/course/test-instructions",{state:{form_data},replace:true});
                    },2000)
                    
                }
                else
                {
                    startTest()
                }
                
            }
            else
            {
                setBtnLoad(false)
                setAlertState({
                    state:true,
                    message:"Capture Photo",
                    type:"error"
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
        else
        {
            setBtnLoad(true)
            if(props.data.startedOn!=null && props.data.submittedOn==null)
            {
                setAlertState({
                    state:true,
                    message:"Test Started Successfully",
                    type:"success"
                })
                setTimeout(()=>{
                    fullScreen()
                    handleRoutes("/course/test-instructions",{state:{form_data},replace:true});
                },2000)
                
            }
            else
            {
                startTest()
            }
            
        }
    }
    // Switch to Full Screen
    const fullScreen = () => {
        document.documentElement.requestFullscreen();
    }
    useEffect(()=>{
        setForm_data((form_data) => ({ ...form_data, ["image"]: imgSrc }))
    },[imgSrc])

    useEffect(()=>{
         // Getting Ip Address and Platform
                        
         if(props.data.startedOn!=null && props.data.submittedOn==null)
         {
             setDisableField(true)
         }
        (async () => {
            try 
            {
                let res = await fetch("https://api.ipify.org/?format=json",
                {
                    crossDomain: true,
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    method: "GET",
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setForm_data((form_data)=>({...form_data,["ip"]:resJson["ip"]}))
                    setForm_data((form_data)=>({...form_data,["platform"]:window.navigator.platform}))
                }
            }
            catch (err) {
                console.log(err);
            }

           
        })();
        
        
    },[])
    useEffect(()=>{
        // console.log(form_data)
       
    },[form_data])
    return(
        <div>
            <form autoComplete="off" onSubmit={submitData}>

                {/* Start of Settings Details Form */}
                <div>
                    <Paper elevation={0} sx={{ padding: '0%' }}>
                        <div style={{ fontWeight: 'bold' }}>
                            Test Settings
                        </div>
                        <br />
                        <Stack direction="row" >
                            <TextField
                                id="courseName"
                                label="Course Name"
                                name="courseName"
                                size="small"
                                sx={{ width: '100%' }}
                                onChange={updateFormData}
                                value={form_data.courseName}
                                disabled={true}
                            />
                        </Stack>
                        <br />
                        <Stack direction="row">
                            <FormControl fullWidth size="small">
                                <InputLabel id="mode">Mode</InputLabel>
                                <Select
                                    labelId="mode"
                                    id="mode"
                                    label="Mode"
                                    name="mode"
                                    value={form_data.mode}
                                    onChange={updateFormData}
                                    disabled={true}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <br/>
                        {
                            (form_data.mode=="public")?
                                <div>
                                    <Stack direction="row" >
                                        <TextField
                                            id="duration"
                                            label="Course Duration (Minutes)"
                                            name="duration"
                                            type="number"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            value={form_data.duration}
                                            onChange={updateFormData}
                                            disabled={disableField}
                                        />
                                    </Stack>
                                    <br/>
                                    <Stack direction="row" >
                                        <TextField
                                            id="noOfQuestion"
                                            label="No. of Questions"
                                            name="noOfQuestion"
                                            type="number"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            value={form_data.noOfQuestion}
                                            onChange={updateFormData}
                                            disabled={disableField}
                                        />
                                    </Stack>
                                    <br/>
                                    <Stack direction="row" >
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="webcam">Webcam</InputLabel>
                                            <Select
                                                labelId="webcam"
                                                id="webcam"
                                                label="Webcam"
                                                name="webcam"
                                                value={form_data.webcam}
                                                onChange={updateFormData}
                                                disabled={disableField}
                                            >
                                                <MenuItem value="yes">Yes</MenuItem>
                                                <MenuItem value="no">No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>

                                    <br/>
                                </div>
                                
                            :
                            ''
                        }
                        {
                            (form_data.webcam=="yes") &&
                            (
                                <div>
                                    <h6>
                                        Capture yourself and take test
                                    </h6>
                                    <Stack direction="row" justifyContent="center">
                                        {imgSrc && (
                                            <img
                                            src={imgSrc}
                                            />
                                        ) ||
                                        (<Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            height={250}
                                            width={250}
                                            screenshotFormat="image/jpeg"
                                        />)
                                        }
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        {imgSrc && (
                                            <Button variant="contained" onClick={captureAgain} type="button" color="error">
                                                Capture Again
                                            </Button>
                                        )
                                        ||
                                        (
                                            <Button variant="contained" onClick={capture} type="button" color="secondary">
                                                Capture
                                            </Button>
                                        )
                                        }
                                    </Stack> 
                                </div>
                            )
                        }
                    </Paper>

                    {/* End of Settings Details Form */}
                    
                    <br />
                    <div style={{ textAlign: 'right', marginRight: '1%' }}>
                        {
                            (alertState.state)&&
                            <Alert severity={alertState.type}>{alertState.message}</Alert>
                        }
                        
                        <LoadingButton loading={btnLoad} type="submit" variant="contained" color="success"><span>Take Test</span></LoadingButton>
                        {/* <Button variant="contained" type="submit" color="success">
                            Take Test
                        </Button> */}
                    </div>
                </div>
                    
                    

            </form>

        </div>
    )
}


export default TakeTestSettings;