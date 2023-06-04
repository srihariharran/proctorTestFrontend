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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddQuestionForm from './addQuestionForm';
import EditQuestionForm from './editQuestionForm';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { decryptData } from './functions/crypto';
import CircularProgress from '@mui/material/CircularProgress';
import utils from '../utils.json'

// Course Page Function, It will act as Home Page
function ContributeQuestionsPage()
{

    const location = useLocation()
    const courseId=location.state.courseId
    const courseName=location.state.courseName

    let navigate = useNavigate(); 

    const handleRoutes = (path,state) => {
        navigate(path,state)
    }

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
        getQuestionDetails()
    }

    const [editQuestionModalState, setEditQuestionModalState] = useState({
        state:false,
        data:null
    });
    const openEditQuestionModal = (data) => {
        setEditQuestionModalState({
            state:true,
            data:data
        });
    }
    const closeEditQuestionModal = () => {
        setEditQuestionModalState({
            state:false,
            data:null
        });
        getQuestionDetails()
    }

    const [deleteQuestionModalState, setDeleteQuestionModalState] = useState({
        state:false,
        data:null
    });
    const openDeleteQuestionModal = (data) => {
        setDeleteQuestionModalState({
            state:true,
            data:data
        });
    }
    const closeDeleteQuestionModal = () => {
        setDeleteQuestionModalState({
            state:false,
            data:null
        });
        getQuestionDetails()
    }

   
    // State variable for Question Details
    const [questionsDetails,setQuestionsDetails] = useState([
        {
            
        },
       
    ]);
    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        (async () => {
            // Checking Login Status
            if(localStorage.getItem("utils"))
            {
                getQuestionDetails()
            }
            else
            {
                setLoginStatus(false)
                localStorage.clear()
                handleRoutes("/",{ replace: true })
            }
        })();
        
        
    },[])

    const [username,setUsername] = useState(decryptData(localStorage.getItem("utils"))["username"])
    const getQuestionDetails = async() => {
        try 
        {
            let res = await fetch(utils["url"]+"/api/question/getDetails",
            {
                crossDomain: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                },
                method: "POST",
                body: JSON.stringify(
                    {
                        courseId:courseId
                    }
                ),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setQuestionsDetails(resJson)
                setLoginStatus(true)
               
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
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    // Function to submit form data
    const DeleteQuestionData = async(event,data) => {
        event.preventDefault()
        setBtnLoad(true)
        try 
        {
            let res = await fetch(utils["url"]+"/api/question/deleteDetails",
            {
                crossDomain: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                },
                method: "POST",
                body: JSON.stringify(data),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                closeDeleteQuestionModal()
                setAlertState({
                    state:true,
                    message:resJson["message"]
                })
                setBtnLoad(false)
                if(resJson['status'])
                {
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                    getQuestionDetails()
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
                            <h2 className='text-main'>Contribute - {courseName}</h2>
                            {
                                (alertState.state)&&
                                <Alert severity={alertState.type}>{alertState.message}</Alert>
                            }
                            <Button variant='contained' size="small" onClick={openAddQuestionModal} className="bg-main text-white text-bold" sx={{margin:"5px"}}>
                                Add Question
                            </Button>
                        </Stack>
                        
                        <Divider />
                        {
                        (loginStatus) &&
                            <div>
                                <div  className='text-center'>
                                    <small>No. of Questions {questionsDetails.length}</small>
                                </div>
                                
                                <br/>
                                <Grid container spacing={2}>
                                {
                                    questionsDetails.map((data,index)=> (
                                        <Grid key={index} item xs={12} sm={12}>
                                            <Paper elevation={3} sx={{padding:"10px"}}>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <h6>{data.question}</h6>
                                                    {
                                                        (username==data.createdBy)&&
                                                        <div >
                                                            <EditIcon onClick={()=>openEditQuestionModal(data)} title="Edit "  sx={{fontSize:"18px",color:"#b38f00",cursor:"pointer"}}/>
                                                            <DeleteIcon onClick={()=>openDeleteQuestionModal(data)} title="Delete" sx={{fontSize:"18px",color:"#b30000",cursor:"pointer"}}/>
                                                        </div>

                                                    }
                                                </Stack>
                                                
                                                <Stack direction="row" justifyContent="space-between" sx={{fontSize:"12px"}}>
                                                    <div className="text-left">
                                                        Created: {new Date(data.createdOn).toLocaleString('en-US',{hour12:true,dateStyle:"long",timeStyle:"long"})}
                                                        {
                                                            (data.lastUpdated)&&
                                                            <div>
                                                                Last updated: {new Date(data.lastUpdated).toLocaleString('en-US',{hour12:true,dateStyle:"long",timeStyle:"long"})}
                                                            </div>
                                                        }
                                                        
                                                    </div>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <div className="text-right">
                                                            Credits: {data.createdBy}
                                                        </div>
                                                        
                                                    </Stack>
                                                    
                                                </Stack>
                                                
                                            </Paper>
                                        </Grid>
                                        
                                    ))
                                }
                                </Grid>
                            </div>
                        ||
                        <Stack direction="row" justifyContent="center">
                            <CircularProgress />
                        </Stack>
                    }
                        
                        
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
                    <AddQuestionForm courseId={courseId} />

                </Box>
               
            </Modal>

            <Modal
                open={editQuestionModalState.state}
                onClose={closeEditQuestionModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <EditQuestionForm data={editQuestionModalState.data} />

                </Box>
               
            </Modal>

            <Modal
                open={deleteQuestionModalState.state}
                onClose={closeDeleteQuestionModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div style={{ fontWeight: 'bold' }}>
                        Delete Question
                    </div>
                    <div>
                        Are you sure, you want to delete this question
                        {
                            (deleteQuestionModalState.state)&&
                            <b>
                                ({deleteQuestionModalState.data.question})
                            </b>
                        }
                        
                    </div>
                   
                    <br/>
                    <div style={{ textAlign: 'right', marginRight: '1%' }}>
                        <Stack direction="row" justifyContent="center">
                            <LoadingButton onClick={(event)=>DeleteQuestionData(event,{courseId:deleteQuestionModalState.data.courseId,questionId:deleteQuestionModalState.data.questionId})} loading={btnLoad} type="submit" variant="contained" color="success"><span>Yes</span></LoadingButton>
                            &nbsp;
                            <Button onClick={closeDeleteQuestionModal} variant="contained" color="error">No</Button>
                        </Stack>
                        
                        
                    </div>
                </Box>
               
            </Modal>
            
        </div>
    )
}


export default ContributeQuestionsPage;