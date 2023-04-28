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
    }
    // State variable for Course Details
    const [courseDetails,setCourseDetails] = useState([
        {
            title:"HTML",
            question:30,
            visible:"Public",
            createdBy:"Hari"
        },
        {
            title:"CSS",
            question:50,
            visible:"Public",
            createdBy:"Hari"
        }
        ,
        {
            title:"Javascript",
            question:30,
            visible:"Public",
            createdBy:"Hari"
        },
        {
            title:"Python",
            question:40,
            visible:"Public",
            createdBy:"Hari"
        }
    ]);

    return(
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
                            <Button variant='contained' size="small" onClick={openAddCourseModal} className="bg-main text-white text-bold" sx={{margin:"5px"}}>Create Course</Button>
                        </Stack>
                        
                        <Divider />
                        <br/>
                        <Grid container spacing={2}>
                        {
                            courseDetails.map(data=> (
                                <Grid item xs={12} sm={4}>
                                    <Card sx={{ maxWidth: "100%"}} elevation={3}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={CourseImg}
                                            title={data.title}
                                        />
                                        <CardContent>
                                            <Stack direction={"row"}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                {data.title}
                                                </Typography>
                                                &nbsp;
                                                -
                                                &nbsp;
                                                <Chip label={data.visible} variant="outlined" size="small" sx={{marginTop:"4px"}} />
                                            </Stack>

                                            <Typography variant="body2" color="text.secondary">
                                               {data.question} questions
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                               Created by {data.createdBy}
                                            </Typography>                                            
                                            <Stack direction="row" justifyContent="right">
                                                <Button variant="outlined" size="small" className='text-main border-main' onClick={()=>handleRoutes("/contribute/questions",{state:{title:data.title}})}>View</Button>
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
    )
}


export default ContributePage;