// Importing Required Packages
import * as React from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { useState,useEffect } from 'react';
import './static/css/style.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Logo from './static/images/logo-full.png'



// TestInstructions Page Function, It will act as Home Page
function TestInstructionsPage()
{
    
    
    // Getting from location
    const location = useLocation()
    const data = location.state.form_data
    // const handle = useFullScreenHandle().enter;
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path,{state:data,replace:true})
    }

    // Switch to Full Screen
    const fullScreen = () => {
        document.documentElement.requestFullscreen();
        handleRoutes('/course/test',{replace:true})
    }

    // Exit FullScreen
    const exitFullscreen = () => {
        document.exitFullscreen();
    }
    // State for Button Timer
    const [timer,setTimer] = useState(10);
    const [btnState,setBtnState] = useState(true)
    
    useEffect(()=>{
        if (!timer) {
            setBtnState(false)
            return
        };
        // Function to Count Seconds
        const timerFunc = setInterval(()=>{
            setTimer(timer-1);
        },1000)
        // Funtion to clear counter
        return () => clearInterval(timerFunc);
    },[timer,btnState])
    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        (async () => {
            // Checking Login Status
            if(localStorage.getItem("utils"))
            {
                setLoginStatus(true)
            }
            else
            {
                setLoginStatus(false)
                localStorage.clear()
                handleRoutes("/",{ replace: true })
            }
        })();
        
        
    },[])
    return(
        <div>
             {
                (loginStatus) &&
                <div>
                    {/* Test Instructions */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Container maxWidth="md">
                                <Stack direction="row" justifyContent="center">
                                    <img src={Logo} width="40%" alt="Logo" loading="lazy" className=" rounded" draggable="false" />
                                </Stack>
                                <br/>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: '100%' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Course Name</TableCell>
                                                <TableCell>No. of Question</TableCell>
                                                <TableCell>Duration</TableCell>
                                                <TableCell>Webcam</TableCell>
                                                {
                                                    (data.webcam=="yes")?
                                                        <TableCell>Photo</TableCell>
                                                    :
                                                    ''
                                                }
                                                
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {data.courseName}
                                                </TableCell>
                                                <TableCell>{data.noOfQuestion}</TableCell>
                                                <TableCell>{data.duration}</TableCell>
                                                <TableCell>{data.webcam}</TableCell>
                                                {
                                                    (data.webcam=="yes")?
                                                        <TableCell><img src={data.image} alt="photo" width={"10%"}/></TableCell>
                                                    :
                                                    ''
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <br/>
                                <h4 className="text-main"><b>Instructions</b></h4>
                                <ol>
                                    <li>
                                    You should be clearly visible at all times. Through the setup process, you will be able to see what your webcam is sharing. Make sure that lighting is sufficient and no backlighting.
                                    </li>
                                    <li>
                                    You should be the only one taking the exam, having someone else in the room is a serious violation. Make sure to cover any irrelevant private information you would not like to show, such as pictures or private objects.
                                    </li>
                                    <li>
                                    We need to be able to see you and your surroundings well. Check the video feeds which are presented on your screen once you start your exam, they will show you exactly what is recorded and how.
                                    </li>
                                    <li>
                                    We need to be able to hear what you are hearing in order for the exam to be valid.
                                    </li>
                                    <li>
                                    Any noise and talking will be analysed for suspicious behaviour, so make sure you are in a quiet environment and that you refrain from talking out loud.
                                    </li>
                                    <li>
                                    You will need to remain within the camera frame during the exam, so toilet breaks are not allowed. Make sure you go before starting the exam.
                                    </li>
                                    <li>
                                    You're are not allowed to use additional devices such as second screens or phones/tablets.
                                    </li>
                                </ol>
                                <br/>
                                <Stack  direction="row" justifyContent="center">
                                    <Button variant="contained" color="success" disabled={btnState} onClick={fullScreen}>
                                        {
                                            (timer>0)?
                                            <i>You can start your test in {timer} seconds</i>
                                            :
                                            'Start'
                                        }
                                        
                                    </Button>
                                </Stack>
                            </Container>
                            
                            
                            
                        </Grid>

                    </Grid>
                </div>
            }
        </div>
    )
}


export default TestInstructionsPage;