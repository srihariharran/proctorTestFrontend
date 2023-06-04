// Importing Required Packages
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './static/css/style.css'
import { styled } from '@mui/material/styles';
import Navbar from './components/navbar'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCourseForm from './addCourseForm';
import CourseImg from './static/images/course.jpg';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import EditCourseForm from './editCourseForm';
import { decryptData } from './functions/crypto';
import CircularProgress from '@mui/material/CircularProgress';
import utils from '../utils.json'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// Course Page Function, It will act as Home Page
function ContributePage()
{


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

    const [addCourseModalState, setAddCourseModalState] = useState(false);
    const openAddCourseModal = () => {
        setAddCourseModalState(true);
    }
    const closeAddCourseModal = () => {
        setAddCourseModalState(false);
        getCourseDetails()
    }
    // State variable for Course Details
    const [courseDetails,setCourseDetails] = useState([
        {
            
        }
    ]);


    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        (async () => {
            // Checking Login Status
            if(localStorage.getItem("utils"))
            {
                getCourseDetails()
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
    const getCourseDetails = async() => {
        try 
        {
            let res = await fetch(utils["url"]+"/api/course/getDetails",
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
                setCourseDetails(resJson)
                setLoginStatus(true)
                // console.log(resJson)
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

    const [editCourseModalState, setEditCourseModalState] = useState({
        state:false,
        data:null
    });
    const openEditCourseModal = (data) => {
        // console.log(data)
        setEditCourseModalState({
            state:true,
            data:data
        });
    }
    const closeEditCourseModal = () => {
        setEditCourseModalState({
            state:false,
            data:null
        });
        getCourseDetails()
    }

    const [deleteCourseModalState, setDeleteCourseModalState] = useState({
        state:false,
        data:null
    });
    const openDeleteCourseModal = (data) => {
        setDeleteCourseModalState({
            state:true,
            data:data
        });
    }
    const closeDeleteCourseModal = () => {
        setDeleteCourseModalState({
            state:false,
            data:null
        });
        getCourseDetails()
    }

    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    // Function to submit form data
    const DeleteCourseData = async(event,data) => {
        event.preventDefault()
        setBtnLoad(true)
        try 
        {
            let res = await fetch(utils["url"]+"/api/course/deleteDetails",
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
                closeDeleteCourseModal()
                setAlertState({
                    state:true,
                    message:resJson["message"]
                })
                setBtnLoad(false)
                if(resJson['status'])
                {
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                    getCourseDetails()
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
            
            <div>
                {/* Courses List */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Navbar />
                    </Grid>
                    <Grid item xs={12}>
                        <Container maxWidth="lg">
                            <Stack direction="row" justifyContent="space-between">
                                <h2 className='text-main'>Contribute</h2>
                                {
                                    (alertState.state)&&
                                    <Alert severity={alertState.type}>{alertState.message}</Alert>
                                }
                                <Button variant='contained' size="small" onClick={openAddCourseModal} className="bg-main text-white text-bold" sx={{margin:"5px"}}>Add Course</Button>
                            </Stack>
                            
                            <Divider />
                            <br/>
                            {
                            (loginStatus) &&
                                
                                <Grid container spacing={2}>
                                {
                                    (courseDetails.length==0)?
                                        <Container className='text-center'>Courses not available</Container>
                                    :
                                    courseDetails.map(data=> (
                                        <React.Fragment>
                                            {
                                                (data.mode=="public" || data.createdBy==username)&&
                                                    <Grid item xs={12} sm={4}>
                                                        <Card sx={{ maxWidth: "100%"}} elevation={3}>
                                                            <CardMedia
                                                                sx={{ height: 140 }}
                                                                image={CourseImg}
                                                                title={data.courseName}
                                                            />
                                                            <CardContent>
                                                                <Stack direction="row" justifyContent="space-between">
                                                                    <div>
                                                                        <Stack direction={"row"}>
                                                                            <Typography gutterBottom variant="h5" component="div">
                                                                            {data.courseName}
                                                                            </Typography>
                                                                            &nbsp;
                                                                            -
                                                                            &nbsp;
                                                                            <Chip label={data.mode} variant="outlined" size="small" sx={{marginTop:"4px"}} />
                                                                        </Stack>
                                                                    </div>
            
                                                                    {
                                                                        (username==data.createdBy)&&
                                                                        <div >
                                                                            {
                                                                                (data.mode=="private")&&
                                                                                    <EditIcon onClick={()=>openEditCourseModal(data)} title="Edit "  sx={{fontSize:"18px",color:"#b38f00",cursor:"pointer"}}/>
                                                                            }
                                                                            
                                                                            <DeleteIcon onClick={()=>openDeleteCourseModal(data)} title="Delete" sx={{fontSize:"18px",color:"#b30000",cursor:"pointer"}}/>
                                                                        </div>
            
                                                                    }
            
                                                                </Stack>
            
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {data.totalNoOfQuestion} questions
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <small>Created on {new Date(data.createdOn).toLocaleString('en-US',{hour12:true,dateStyle:"long",timeStyle:"long"})}</small>
                                                                </Typography>       
                                                                
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <small>Credits {data.createdBy}</small>
                                                                </Typography>          
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <small>{data.testTaken} users taken this course</small>
                                                                </Typography>      
                                                                <Typography variant="body2" color="text.secondary">
                                                                
                                                                        <small>
                                                                            <b>Minimum {data.noOfQuestion} questions required to publish in courses page </b>
                                                                        </small>
                                                                        
                                                                </Typography>                       
                                                                <br/>                     
                                                                <Stack direction="row" justifyContent="center" spacing={1}>
                                                                    <Button variant="outlined" size="small" className='text-main border-main' onClick={()=>handleRoutes("/contribute/questions",{state:{courseId:data.courseId,courseName:data.courseName}})}>Questions</Button>
                                                                    
                                                                    {
                                                                        (data.mode=="private")&&
                                                                        
                                                                            <Button variant="outlined" size="small" className='text-main border-main' onClick={()=>handleRoutes("/contribute/reports",{state:{courseId:data.courseId,courseName:data.courseName}})}>Reports</Button>
                                                                    }
                                                                    
                                                                    
                                                                </Stack>
                                                            </CardContent>
                                                                
                                                        </Card>
                                                    </Grid>
                                            }
                                        </React.Fragment>

                                        
                                    ))
                                }
                                </Grid>
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
                    open={addCourseModalState}
                    onClose={closeAddCourseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <AddCourseForm />

                    </Box>
                
                </Modal>

                <Modal
                    open={editCourseModalState.state}
                    onClose={closeEditCourseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <EditCourseForm data={editCourseModalState.data} />

                    </Box>
                
                </Modal>

                <Modal
                    open={deleteCourseModalState.state}
                    onClose={closeDeleteCourseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <div style={{ fontWeight: 'bold' }}>
                            Delete Course
                        </div>
                        <div>
                            Are you sure, you want to delete this course
                            {
                                (deleteCourseModalState.state)&&
                                <b>
                                    ({deleteCourseModalState.data.courseName})
                                </b>
                            }
                            
                        </div>
                    
                        <br/>
                        <div style={{ textAlign: 'right', marginRight: '1%' }}>
                            <Stack direction="row" justifyContent="center">
                                <LoadingButton onClick={(event)=>DeleteCourseData(event,{courseId:deleteCourseModalState.data.courseId})} loading={btnLoad} type="submit" variant="contained" color="success"><span>Yes</span></LoadingButton>
                                &nbsp;
                                <Button onClick={closeDeleteCourseModal} variant="contained" color="error">No</Button>
                            </Stack>
                            
                            
                        </div>
                    </Box>
                
                </Modal>
            </div>
            
        </div>
    )
}


export default ContributePage;