// Importing Required Packages
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './static/css/style.css'
import Navbar from './components/navbar'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { decryptData } from './functions/crypto';
import { Button,Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import utils from '../utils.json'

// Test Report Function
function TestReportDetailsPage()
{

    // Getting from location
    const location = useLocation()
    const cdata = location.state


    // TO navigate Pages
    let navigate = useNavigate(); 
    const handleRoutes = (path,state) => {
        navigate(path,state)
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

    
    // State variable for Report Details
    const [reportDetails,setReportDetails] = useState([
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
                    let res = await fetch(utils["url"]+"/api/test/report/all/getDetails",
                    {
                        crossDomain: true,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                        },
                        method: "POST",
                        body: JSON.stringify(cdata),
                    });
                    let resJson = await res.json();
                    if (res.status === 200) {
                        // console.log(resJson)
                        setReportDetails(resJson)
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
            
            <div>
                {/* Courses List */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Navbar />
                    </Grid>
                
                    <Grid item xs={12}>
                        <Container maxWidth="lg">
                            <div style={{width:"100%"}}>
                                <h2 className="text-center">{cdata.courseName} Test Report Details</h2>
                            </div>
                            <Divider />
                            <br/>
                            {
                            (loginStatus) &&
                                
                                <Grid container spacing={2}>
                                {
                                     (reportDetails.length==0)?
                                        
                                        <Container className='text-center'>Reports not available</Container>
                                    :
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Started On</TableCell>
                                                    <TableCell>Submitted On</TableCell>
                                                    <TableCell>No. of Questions</TableCell>
                                                    <TableCell>Duration</TableCell>
                                                    <TableCell>Webcam</TableCell>
                                                    <TableCell>Score</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                reportDetails.map((data,index)=> (
                                                    <React.Fragment>
                                                        <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell>
                                                                {new Date(data.startedOn).toLocaleString()}
                                                            </TableCell>
                                                            <TableCell>{new Date(data.submittedOn).toLocaleString()}</TableCell>
                                                            <TableCell>{data.noOfQuestion}</TableCell>
                                                            <TableCell>{data.duration}</TableCell>
                                                            <TableCell>{data.webcam}</TableCell>
                                                            <TableCell>{data.score}</TableCell>
                                                            <TableCell>
                                                                <Button variant='outlined' type="button" onClick={()=>handleRoutes('/test/report',{state:{"courseId":cdata.courseId,"coursename":cdata.courseName,"reportId":data.reportId}})}>
                                                                    View
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    
                                                    </React.Fragment>
                                                ))
                                            }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                                
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
                
            </div>
            
            
            
        </div>
    )
}


export default TestReportDetailsPage;