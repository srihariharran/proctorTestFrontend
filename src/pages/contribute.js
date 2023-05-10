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
import AddCourseForm from './addCourseForm';
import CourseImg from './static/images/course.jpg';
import { decryptData } from './functions/crypto';

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


    const getCourseDetails = async() => {
        try 
        {
            let res = await fetch("/api/course/getDetails",
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
                console.log(resJson)
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

    return(
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
                            <Container maxWidth="lg">
                                <Stack direction="row" justifyContent="space-between">
                                    <h2 className='text-main'>Contribute</h2>
                                    <Button variant='contained' size="small" onClick={openAddCourseModal} className="bg-main text-white text-bold" sx={{margin:"5px"}}>Add Course</Button>
                                </Stack>
                                
                                <Divider />
                                <br/>
                                <Grid container spacing={2}>
                                {
                                    (courseDetails.length==0)?
                                        <Container className='text-center'>Courses not available</Container>
                                    :
                                    courseDetails.map(data=> (
                                        <Grid item xs={12} sm={4}>
                                            <Card sx={{ maxWidth: "100%"}} elevation={3}>
                                                <CardMedia
                                                    sx={{ height: 140 }}
                                                    image={CourseImg}
                                                    title={data.courseName}
                                                />
                                                <CardContent>
                                                    <Stack direction={"row"}>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                        {data.courseName}
                                                        </Typography>
                                                        &nbsp;
                                                        -
                                                        &nbsp;
                                                        <Chip label={data.mode} variant="outlined" size="small" sx={{marginTop:"4px"}} />
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
                                                    <Stack direction="row" justifyContent="right">
                                                        <Button variant="outlined" size="small" className='text-main border-main' onClick={()=>handleRoutes("/contribute/questions",{state:{courseId:data.courseId,courseName:data.courseName}})}>View</Button>
                                                    </Stack>
                                                </CardContent>
                                                    
                                            </Card>
                                        </Grid>
                                        
                                    ))
                                }
                                </Grid>
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
                </div>
            }
        </div>
    )
}


export default ContributePage;