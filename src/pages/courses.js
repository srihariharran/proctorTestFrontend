// Importing Required Packages
import * as React from 'react';
import { useState } from 'react';
import './static/css/style.css'
import Navbar from './components/navbar'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TakeTestSettings from './takeTestSettings';
import CourseImg from './static/images/course.jpg';



// Course Page Function, It will act as Home Page
function CoursePage()
{

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {sm:"60%",xs:"90%"},
        maxHeight:'80%',
        overflow:'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [takeTestModalState, setTakeTestModalState] = useState(false);
    const openTakeTestModal = (id) => {
        setTakeTestModalState(true);
    }
    const closeTakeTestModal = () => {
        setTakeTestModalState(false);
    }

    // State variable for Course Details
    const [courseDetails,setCourseDetails] = useState([
        {
            title:"HTML",
            startDate:"20-04-2023",
            endDate:"20-04-2023",
            startTime:"12:00 AM",
            endTime:"11:59 PM",
            duration:"60 Mins",
        },
        {
            title:"CSS",
            startDate:"20-04-2023",
            endDate:"20-04-2023",
            startTime:"12:00 AM",
            endTime:"11:59 PM",
            duration:"60 Mins",
        }
        ,
        {
            title:"Javascript",
            startDate:"20-04-2023",
            endDate:"20-04-2023",
            startTime:"12:00 AM",
            endTime:"11:59 PM",
            duration:"60 Mins",
        },
        {
            title:"Python",
            startDate:"20-04-2023",
            endDate:"20-04-2023",
            startTime:"12:00 AM",
            endTime:"11:59 PM",
            duration:"60 Mins",
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
                        <div style={{width:"100%"}}>
                            <h2 className="text-center">Courses</h2>
                        </div>
                        <Divider />
                        <br/>
                        <Grid container spacing={2}>
                        {
                            courseDetails.map((data,index)=> (
                                <Grid key={index} item xs={12} sm={4}>
                                    <Card sx={{ maxWidth: "100%"}} elevation={3}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={CourseImg}
                                            title={data.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            {data.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Starts at {data.startDate} {data.startTime}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Ends at {data.endDate} {data.endTime}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Duration: {data.duration}
                                            </Typography>
                                            <br/>
                                            <Stack direction="row" justifyContent="right">
                                                <Button variant='outlined' size="small" onClick={()=>openTakeTestModal(data.title)}>Take Test</Button>
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
                open={takeTestModalState}
                onClose={closeTakeTestModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <TakeTestSettings data={{
                        courseName:"HTML",
                        mode:"public",
                        duration:"60",
                        noOfQuestion:"30",
                        webcam:"no",
                    }}

                    />

                </Box>
               
            </Modal>
            
        </div>
    )
}


export default CoursePage;