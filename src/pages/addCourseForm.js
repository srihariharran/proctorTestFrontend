// Importing Required Packages
import * as React from 'react';
import $ from 'jquery'
import { useState,useEffect } from 'react';
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


// Add Course Form Page Function
function AddCourseForm()
{


    // Declaring Form Data State
    const [form_data, setForm_data] = useState(
        {
            courseName:'',
            mode:'public',
            startDate:'',
            startTime:'',
            endDate:'',
            endTime:'',
            duration:'',
            tabSwitch:'',
            webcam:'',
            webcamLimit:'',
            cookie:''
        }
    );
    // Function to update the form data
    const updateFormData = (event) => {
        const { name, value } = event.target;
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
    }
    const updateStartTimeData = (value) => {
        // const { name } = event.target;
        console.log(new Date(value).toISOString());
        setForm_data((form_data) => ({ ...form_data, ["startTime"]: value }))
    }
    const updateEndTimeData = (value) => {
        // const { name } = event.target;
        console.log(new Date(value));
        setForm_data((form_data) => ({ ...form_data, ["endTime"]: value }))
    }
    // Function to submit form data
    const submitData = async(event) => {
        event.preventDefault()
        console.log(form_data);
    }
    
    return(
        <div>
            <form autoComplete="off" onSubmit={submitData}>

                {/* Start of Question Details Form */}
                <div>
                    <Paper elevation={0} sx={{ padding: '0%' }}>
                        <div style={{ fontWeight: 'bold' }}>
                            Add Course
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
                                required
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
                                    
                                    onChange={updateFormData}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <br/>
                        {
                            (form_data.mode=="private")?
                                <div>
                                    <small>Course Availability</small>
                                    <Stack direction="row">
                                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="Start Time"
                                                name="startTime"
                                                onChange={updateStartTimeData}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        &nbsp;
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="End Time"
                                                name="endTime"
                                                onChange={updateEndTimeData}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        
                                    </Stack>
                                    
                                    <br/>
                                    <Stack direction="row" >
                                        <TextField
                                            id="duration"
                                            label="Course Duration"
                                            name="duration"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            onChange={updateFormData}
                                            required
                                        />
                                    </Stack>
                                    <br/>
                                    <Stack direction="row" >
                                        <TextField
                                            id="tabSwitch"
                                            label="Tab Switch Limit"
                                            name="tabSwitch"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            onChange={updateFormData}
                                            required
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
                                                
                                                onChange={updateFormData}
                                            >
                                                <MenuItem value="public">Public</MenuItem>
                                                <MenuItem value="private">Private</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <br/>
                                    <Stack direction="row" >
                                        <TextField
                                            id="webcam"
                                            label="Webcam Limit"
                                            name="webcamLimit"
                                            size="small"
                                            sx={{ width: '100%' }}
                                            onChange={updateFormData}
                                            required
                                        />
                                    </Stack>
                                </div>
                                
                            :
                            ''
                        }
                    </Paper>

                    {/* End of Question Details Form */}
                    
                    <br />
                    <div style={{ textAlign: 'right', marginRight: '1%' }}>
                        <Button variant="contained" type="submit" color="success" endIcon={<AddCircleOutlineIcon />}>
                        Submit
                        </Button>
                    </div>
                </div>
                    
                    

            </form>

        </div>
    )
}


export default AddCourseForm;