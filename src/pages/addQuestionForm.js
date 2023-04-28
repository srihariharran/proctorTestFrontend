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


// Add Question Form Page Function
function AddQuestionForm()
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
            question:'',
            correctAnswer:'',
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
    }
    const [optionsList,setOptionsList] = useState([]);
    useEffect(() => {
        var keys = Object.keys(form_data);
        
        keys.forEach(key => {
            if(key.includes("option") && !optionsList.includes(key))
            {
                console.log(keys);
                setOptionsList((option) => ([...option, key]));
                console.log(optionsList);
            }
        });
    },[form_data]);
    return(
        <div>
            <form autoComplete="off" onSubmit={submitData}>

                {/* Start of Question Details Form */}
                <div>
                    <Paper elevation={0} sx={{ padding: '0%' }}>
                        <div style={{ fontWeight: 'bold' }}>
                            Add Question
                        </div>
                        <br />
                        <Stack direction="row" >
                            <TextField
                            id="question"
                            label="Question"
                            name="question"
                            size="small"
                            sx={{ width: '100%' }}
                            onChange={updateFormData}
                            required
                            />
                        </Stack>
                        <br />
                        
                        <Stack direction="row" justifyContent="space-between" className="options">
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
                        <br/>
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
                        <Button variant="contained" type="submit" color="success" endIcon={<AddCircleOutlineIcon />}>
                        Submit
                        </Button>
                    </div>
                </div>
                    
                    

            </form>

        </div>
    )
}


export default AddQuestionForm;