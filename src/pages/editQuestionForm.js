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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { decryptData } from './functions/crypto';
import utils from '../utils.json'

// Edit Question Form Page Function
function EditQuestionForm(props)
{
    // Declaring Product Id State
    const [option_ids, setOption_ids] = useState([]);
    const [optioncount,setOptioncount] = useState(3);
    // Function to Add option Fields
    const addOption = () => {
        
        setOption_ids((option_ids) => [...option_ids, optioncount])
        setOptioncount(optioncount+1);

    }
    // Function to Delete Option Fields
    const deleteOption = (removeId) => {
        setOption_ids((option_ids) => option_ids.filter((id) => id !== removeId));
        setOptionsList((option_ids) => option_ids.filter((id) => id !== "option"+removeId));
        setForm_data((prevData) => {
            const newData = {...prevData}
            delete newData["option"+removeId]
            return newData;
        })
    }
    // Declaring Form Data State
    const [form_data, setForm_data] = useState(
        {
            question:props.data.question,
            correctAnswer:props.data.correctAnswer,
            questionId:props.data.questionId,
            courseId:props.data.courseId
        }
    );
   
    
    // Function to update the form data
    const updateFormData = (event) => {
        const { name, value } = event.target;
        setForm_data((form_data) => ({ ...form_data, [name]: value }))
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
        setBtnLoad(true)
        try 
        {
            let res = await fetch(utils["url"]+"/api/question/editDetails",
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
                setBtnLoad(false)
                if(resJson['status'])
                {
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                }
                else
                {
                    document.getElementById("form").reset();
                    
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
    const [optionsList,setOptionsList] = useState([]);
    useEffect(() => {
        var keys = Object.keys(form_data);
        
        keys.forEach(key => {
            if(key.includes("option") && !optionsList.includes(key))
            {
                // console.log(keys);
                setOptionsList((option) => ([...option, key]));
                // console.log(optionsList);
            }
        });
    },[form_data]);
    useEffect(()=>{
        props.data.options.map((option,index)=>(
            setForm_data((form_data) => ({...form_data,["option"+index]:option}))
        ))
    },[])
    return(
        <div>
            <form autoComplete="off" id="form" onSubmit={submitData}>

                {/* Start of Question Details Form */}
                <div>
                    <Paper elevation={0} sx={{ padding: '0%' }}>
                        <div style={{ fontWeight: 'bold' }}>
                            Edit Question
                        </div>
                        <br />
                        <Stack direction="row" >
                            <TextField
                            id="question"
                            label="Question"
                            name="question"
                            value={form_data.question}
                            size="small"
                            sx={{ width: '100%' }}
                            onChange={updateFormData}
                            disabled
                            />
                        </Stack>
                        <br />
                        {
                            props.data.options.map((option,index)=>(
                                <div>
                                    <Stack direction="row" justifyContent="space-between" className="options">
                                        <TextField
                                        id={"option"+index}
                                        label="Option"
                                        name={"option"+index}
                                        value={form_data["option"+index]}
                                        size="small"
                                        sx={{ width: '49.5%' }}
                                        onChange={updateFormData}
                                        required
                                        />
                                        {
                                            (index==0)&&
                                            <Button title="Add Option" variant="contained" type="button" onClick={addOption} color="primary" endIcon={<AddCircleOutlineIcon />}>
                                                Add
                                            </Button>
                                        }
                                        
                                        
                                    </Stack>
                                    <br/>
                                </div>
                                
                            ))
                        }
                        {/* <Stack direction="row" justifyContent="space-between" className="options">
                            <TextField
                            id="option1"
                            label="Option"
                            name="option1"
                            size="small"
                            sx={{ width: '49.5%' }}
                            onChange={updateFormData}
                            required
                            />
                            <Button title="Add Option" variant="contained" type="button" onClick={addOption} color="primary" endIcon={<AddCircleOutlineIcon />}>
                                Add
                            </Button>
                            
                        </Stack>
                        <br />
                        <Stack direction="row" className="options">
                            <TextField
                            id="option2"
                            label="Option"
                            name="option2"
                            size="small"
                            sx={{ width: '49.5%' }}
                            onChange={updateFormData}
                            required
                            />
                        </Stack>
                        <br/>*/}
                        {
                        option_ids.map((id,index) => (
                            <div id={"option"+option_ids[index]}>
                                <Stack direction="row" justifyContent="space-between" key={(id)}>
                                    <TextField
                                    id={"option"+option_ids[index]}
                                    label="Option"
                                    name={"option"+option_ids[index]}
                                    size="small"
                                    sx={{ width: '49.5%' }}
                                    onChange={updateFormData}
                                    required
                                    />
                                    <Button title="Delete Option" variant="contained" type="button" onClick={()=>deleteOption(id)} color="error" endIcon={<DeleteForeverIcon />}>
                                        Delete
                                    </Button>
                                    
                                </Stack>
                                <br/>
                            </div>
                           
                        ))
                        } 
                        
                        <br />
                        <Stack direction="row">
                            <FormControl fullWidth>
                                <InputLabel id="correctAnswer">Correct Answer</InputLabel>
                                <Select
                                    labelId="correctAnswer"
                                    id="correctAnswer"
                                    label="Correct Answer"
                                    name="correctAnswer"
                                    value={form_data.correctAnswer}
                                    onChange={updateFormData}
                                >
                                    {
                                       optionsList.map((option)=>(
                                            <MenuItem value={form_data[option]}>{form_data[option]}</MenuItem>
                                        ))
                                    }
                                    
                                </Select>
                            </FormControl>
                        </Stack>
                        <br />
                        
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


export default EditQuestionForm;