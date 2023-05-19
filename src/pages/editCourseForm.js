// Importing Required Packages
import * as React from 'react';
import $ from 'jquery'
import { useState,useEffect,useRef } from 'react';
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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { decryptData } from './functions/crypto';

// For Users Field
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


// Edit Course Form Page Function
function EditCourseForm(props)
{

    
    // Declaring Form Data State
    const [form_data, setForm_data] = useState(
        {
            courseId:props.data.courseId,
            courseName:props.data.courseName,
            mode:props.data.mode,
            noOfQuestion:props.data.noOfQuestion,
            startTime:props.data.startTime,
            endTime:props.data.endTime,
            duration:props.data.duration,
            tabSwitch:props.data.tabSwitch,
            webcam:props.data.webcam,
            webcamLimit:props.data.webcamLimit,
            users:props.data.users
        }
    );
    // Function to update the form data
    const updateFormData = (event) => {
        const { name, value } = event.target;
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
    }
    const updateStartTimeData = (value) => {
        // const { name } = event.target;
        setForm_data((form_data) => ({ ...form_data, ["startTime"]: value.toISOString() }))
    }
    const updateEndTimeData = (value) => {
        // const { name } = event.target;
        setForm_data((form_data) => ({ ...form_data, ["endTime"]: value.toISOString() }))
    }
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    // Function to submit form data
    const submitData = async(event) => {
        event.preventDefault()
        console.log(form_data)
        
        try 
        {
            let res = await fetch("/api/course/editDetails",
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

    var userList = []
    const [allUsers,setAllUsers] = useState([])
    useEffect(()=>{
        (async () => {
 
            try 
            {
                let res = await fetch("/api/user/getDetails",
                {
                    crossDomain: true,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                    },
                    method: "POST"
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setAllUsers(resJson)
                }
               
            }
            catch (err) {
                console.log(err);
                
            }
                
        })();
    },[])


    return(
        <div>
            <form autoComplete="off" id="form" onSubmit={submitData}>

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
                                value={form_data.courseName}
                                name="courseName"
                                size="small"
                                sx={{ width: '100%' }}
                                onChange={updateFormData}
                                disabled={true}
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
                                    value={form_data.mode}
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
                                                value={new Date(form_data.startTime)}
                                                onChange={updateStartTimeData}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        &nbsp;
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="End Time"
                                                name="endTime"
                                                value={new Date(form_data.endTime)}
                                                onChange={updateEndTimeData}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        
                                    </Stack>
                                    
                                    <br/>
                                    <Stack direction="row" >
                                        <TextField
                                            id="question"
                                            label="No. of Questions"
                                            name="noOfQuestion"
                                            value={form_data.noOfQuestion}
                                            size="small"
                                            sx={{ width: '100%' }}
                                            onChange={updateFormData}
                                            required
                                        />
                                    </Stack>
                                    <br/>
                                    <Stack direction="row" >
                                        <TextField
                                            id="duration"
                                            label="Course Duration"
                                            name="duration"
                                            value={form_data.duration}
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
                                            value={form_data.tabSwitch}
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
                                                value={form_data.webcam}
                                                name="webcam"
                                                
                                                onChange={updateFormData}
                                            >
                                                <MenuItem value="yes">Yes</MenuItem>
                                                <MenuItem value="no">No</MenuItem>
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
                                            value={form_data.webcamLimit}
                                            sx={{ width: '100%' }}
                                            onChange={updateFormData}
                                            required
                                        />
                                    </Stack>
                                    <br/>
                                    <Stack direction="row">
                                        <Autocomplete
                                            multiple
                                            id="users"
                                            options={allUsers}
                                            disableCloseOnSelect
                                            value={form_data.users}
                                            getOptionLabel={(option) => option.username}
                                            getOptionSelected={(option, value) => option.username === value.username}
                                            renderOption={(props, option, { selected }) => {
                                            
                                            return (
                                                <li {...props}>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                
                                                {option.name} ({option.username})
                                                </li>
                                            )}}
                                            
                                            fullWidth
                                            size="small"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Users" placeholder="Users" />
                                            )}
                                            onChange={(event,value)=>{ userList=value; setForm_data((form_data) => ({ ...form_data, ["users"]: value }))}}
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
                        {
                            (alertState.state)&&
                            <Alert severity={alertState.type}>{alertState.message}</Alert>
                        }
                        
                        <LoadingButton loading={btnLoad} type="submit" variant="contained" className="bg-main"><span>Edit</span></LoadingButton>
                        
                    </div>
                </div>
                    
                    

            </form>

        </div>
    )
}


export default EditCourseForm;