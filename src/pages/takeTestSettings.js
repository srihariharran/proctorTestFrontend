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
import Container from '@mui/material/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


// Take Test Settings Page Function
function TakeTestSettings(props)
{

    let navigate = useNavigate(); 
    const handleRoutes = (path,state) => {
        navigate(path,state)
    }
    // Declaring Ref for Webcam
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    // Function to capture Image
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
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
            noOfQuestion:props.data.noOfQuestion,
            cookie:''
        }
    );
    // Function to update the form data
    const updateFormData = (event) => {
        const { name, value } = event.target;
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
    }
    // Function to submit form data
    const submitData = async(event) => {
        event.preventDefault()
        console.log(form_data);
        if(form_data.webcam=="yes")
        {
            if(form_data.image)
            {
                fullScreen()
                handleRoutes("/course/test-instructions",{state:{form_data},replace:true});
            }
            else
            {
                alert("Capture Photo");
            }
        }
        else
        {
            fullScreen()
            handleRoutes("/course/test-instructions",{state:{form_data},replace:true});
        }
    }
    // Switch to Full Screen
    const fullScreen = () => {
        document.documentElement.requestFullscreen();
    }
    useEffect(()=>{
        setForm_data((form_data) => ({ ...form_data, ["image"]: imgSrc }))
    },[imgSrc])
    
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
                                            >
                                                <MenuItem value="yes">Yes</MenuItem>
                                                <MenuItem value="no">No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    {
                                        (form_data.webcam=="yes") &&
                                        (
                                            <div>
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
                                    
                                </div>
                                
                            :
                            ''
                        }
                    </Paper>

                    {/* End of Settings Details Form */}
                    
                    <br />
                    <div style={{ textAlign: 'right', marginRight: '1%' }}>
                        <Button variant="contained" type="submit" color="success">
                            Take Test
                        </Button>
                    </div>
                </div>
                    
                    

            </form>

        </div>
    )
}


export default TakeTestSettings;