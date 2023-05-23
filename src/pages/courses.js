// Importing Required Packages
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { decryptData } from './functions/crypto';


// Course Page Function, It will act as Home Page
function CoursePage()
{

    let navigate = useNavigate(); 
    const handleRoutes = (path,direct) => {
        navigate(path, direct)
    }

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

    const [takeTestModalState, setTakeTestModalState] = useState({
        state:false,
        data:null
    });
    const [testStatus,setTestStatus] = useState(false)
    const openTakeTestModal = (data) => {
        var startTime=new Date(data.startTime)
        var endTime=new Date(data.endTime)
        var currentTime=new Date()
        if(data.mode=="public" || (startTime<=currentTime) && (endTime>=currentTime))
        {
            setTakeTestModalState({
                state:true,
                data:data
            });
        }
        else
        {
            setTestStatus(true)
            setTimeout(()=>{
                setTestStatus(false)
            },3000)
        }
    }
    const closeTakeTestModal = () => {
        setTakeTestModalState({
            state:false,
            data:null
        });
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
                        console.log(resJson)
                        setCourseDetails(resJson)
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
            else
            {
                setLoginStatus(false)
                localStorage.clear()
                handleRoutes("/",{ replace: true })
            }
            
        })();
        
        
    },[])
    const [username,setUsername] = useState(decryptData(localStorage.getItem("utils"))["username"])
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
                                <div style={{width:"100%"}}>
                                    <h2 className="text-center">Courses</h2>
                                </div>
                                <Divider />
                                <br/>
                                
                                <Grid container spacing={2}>
                                {
                                     (courseDetails.length==0)?
                                        
                                        <Container className='text-center'>Courses not available</Container>
                                    :
                                    courseDetails.map((data,index)=> (
                                        <React.Fragment>
                                        {
                                            (data.mode=="public" || (JSON.stringify(data.users).includes(username) || data.createdBy==username))&&
                                                <Grid key={index} item xs={12} sm={4}>
                                                    <Card sx={{ maxWidth: "100%"}} elevation={3}>
                                                        <CardMedia
                                                            sx={{ height: 140 }}
                                                            image={CourseImg}
                                                            title={data.courseName}
                                                        />
                                                        <CardContent>
                                                            
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    {data.courseName}
                                                                </Typography>
                                                                {
                                                                    (data.mode=="private" && testStatus)&&
                                                                        <div className='text-center text-red'>
                                                                            <small>Test not started or Expired</small>
                                                                        </div>
                                                                }
                                                            </Stack>
                                                            
                                                            
                                                            <Typography variant="body2" color="text.secondary">
                                                                Duration: {data.duration} minutes 
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Question: {data.noOfQuestion}
                                                            </Typography>
                                                            {
                                                                (data.mode=="private") &&
                                                                <div>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        Starts on {new Date(data.startTime).toLocaleString('en-US',{hour12:true,dateStyle:"long",timeStyle:"long"})}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        Ends on {new Date(data.endTime).toLocaleString('en-US',{hour12:true,dateStyle:"long",timeStyle:"long"})}
                                                                    </Typography>
                                                                </div>
                                                                ||
                                                                <div>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        Available all time
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        &nbsp;
                                                                    </Typography>
                                                                </div>
                                                                
                                                            }
                                                            
                                                            
                                                            <br/>
                                                            <Stack direction="row" justifyContent="center">
                                                                {
                                                                    (data.startedOn==null && data.submittedOn==null)?
                                                                        
                                                                        <Button variant='contained' color="success" size="small" onClick={()=>openTakeTestModal(data)}>Take Test</Button>
                                                                    :
                                                                        (data.submittedOn==null)?
                                                                            <Button variant='contained' color="warning" size="small" onClick={()=>openTakeTestModal(data)}>Resume Test</Button>
                                                                        :
                                                                            (data.mode=="public")&&
                                                                                <Button variant='contained' color="success" size="small" onClick={()=>openTakeTestModal(data)}>Take Test</Button>
                                                                }
                                                                &nbsp;
                                                                {
                                                                    (data.mode=="private")?
                                                                        (data.submittedOn!=null)&&
                                                                            
                                                                            <Button variant='outlined' size="small" type="button" onClick={()=>handleRoutes('/test/report',{state:{"courseId":data.courseId,"coursename":data.courseName,"reportId":data.reportId}})}>Report</Button>
                                                                        
                                                                    :
                                                                        <Button variant='outlined' size="small" type="button" onClick={()=>handleRoutes('/test/report/details',{state:{courseId:data.courseId,courseName:data.courseName}})}>Report</Button>
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
                            </Container>
                        </Grid>
                    </Grid>
                    <br/>
                    <Modal
                        open={takeTestModalState.state}
                        onClose={closeTakeTestModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <TakeTestSettings data={takeTestModalState.data}

                            />

                        </Box>
                    
                    </Modal>
                </div>
            }
            
            
        </div>
    )
}


export default CoursePage;