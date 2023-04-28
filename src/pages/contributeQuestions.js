// Importing Required Packages
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import './static/css/style.css'
import Navbar from './components/navbar'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AddQuestionForm from './addQuestionForm';

// Course Page Function, It will act as Home Page
function ContributeQuestionsPage()
{

    const location = useLocation()
    const title=location.state.title
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
      
    const [addQuestionModalState, setAddQuestionModalState] = useState(false);
    const openAddQuestionModal = () => {
        setAddQuestionModalState(true);
    }
    const closeAddQuestionModal = () => {
        setAddQuestionModalState(false);
    }

   
    // State variable for Question Details
    const [questionsDetails,setQuestionsDetails] = useState([
        {
            question:"What is html?",
            createdBy:"Hari",
            createdDate:"20.04.2023",
        },
        {
            question:"What is html?",
            createdBy:"Hari",
            createdDate:"20.04.2023",
        }
        ,
        {
            question:"What is html?",
            createdBy:"Hari",
            createdDate:"20.04.2023",
        },
        {
            question:"What is html?",
            createdBy:"Hari",
            createdDate:"20.04.2023",
        }
    ]);

    return(
        <div>
            {/* Question List */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="lg">
                        <Stack direction="row" justifyContent="space-between">
                            <h2 className='text-main'>Contribute - {title}</h2>
                            <Button variant='contained' size="small" onClick={openAddQuestionModal} className="bg-main text-white text-bold" sx={{margin:"5px"}}>
                                Add Question
                            </Button>
                        </Stack>
                        
                        <Divider />
                        <br/>
                        <Grid container spacing={2}>
                        {
                            questionsDetails.map((data,index)=> (
                                <Grid key={index} item xs={12} sm={12}>
                                    <Paper elevation={3} sx={{padding:"10px"}}>
                                        <h6>{data.question}</h6>
                                        <Stack direction="row" justifyContent="space-between" sx={{fontSize:"12px"}}>
                                            <div className="text-right">
                                                Created on {data.createdDate}
                                            </div>
                                            <div className="text-right">
                                                Credits: {data.createdBy}

                                            </div>
                                        </Stack>
                                        
                                    </Paper>
                                </Grid>
                                
                            ))
                        }
                        </Grid>
                        
                        
                    </Container>
                    
                </Grid>
            </Grid>
            <br/>
            <Modal
                open={addQuestionModalState}
                onClose={closeAddQuestionModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <AddQuestionForm />

                </Box>
               
            </Modal>
            
        </div>
    )
}


export default ContributeQuestionsPage;