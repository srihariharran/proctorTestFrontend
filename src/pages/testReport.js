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
import { Button, Stack,Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgressWithLabel from './components/CircularProgressWithLabel';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import utils from '../utils.json'


// Test Report Function
function TestReportPage()
{

    // Getting from location
    const location = useLocation()
    const data = location.state


    // TO navigate Pages
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path)
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
            // console.log(data)
            // Checking Login Status
            if(localStorage.getItem("utils"))
            {
                
                try 
                {
                    let res = await fetch(utils["url"]+"/api/test/report/getDetails",
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
                        console.log(resJson)
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
    // Generating tickIcon for Options
    const tickIcon = (data) => {
        return(
            <Stack direction="row">
                <div>{data}</div>
                &nbsp;
                <CheckIcon fontSize='medium' color='success'/>
            </Stack>
        )
    }
    // Generating CLearIcon for options
    const clearIcon = (data) => {
        return(
            <Stack direction="row">
                <div>{data}</div>
                &nbsp;
                <ClearIcon fontSize='medium' color='error'/>
            </Stack>
        )
    }
    // Function to display the options for the questions
    const Options = ({option,answer,correctAnswer}) => {
        return(
            <React.Fragment>
                 {
                    option.map((data,index)=>(
                        <React.Fragment>

                            {
                                
                                (answer==data && data==correctAnswer)?
                                    <FormControlLabel value={data} control={<Radio checked/>} label={tickIcon(data)} key={index}/>
                                :
                                    (answer==data)&&
                                        <FormControlLabel value={data} control={<Radio checked/>} label={clearIcon(data)} key={index}/>
                                    ||
                                        (data==correctAnswer)&&
                                            <FormControlLabel value={data} control={<Radio />} label={tickIcon(data)} key={index}/>
                                        ||
                                            <FormControlLabel value={data} control={<Radio />} label={data} key={index}/>
                                    
                                   
                            }
                            
                        </React.Fragment>
                    ))
                }
            </React.Fragment>
            
        )
        
        
    }

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
                                <h2 className="text-center">{data.courseName} Test Report Details</h2>
                            </div>
                            <Divider />
                            <br/>
                            {
                                (loginStatus) &&
                                <div>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <div>
                                                <h5>
                                                    Score
                                                </h5>
                                                <CircularProgressWithLabel size={100} score={reportDetails.score} value={(reportDetails.score/reportDetails.noOfQuestion)*100} total={reportDetails.noOfQuestion} />
                                            </div>
                                        </Grid>
                                        
                                        <Grid item xs={6}>
                                            <div style={{textAlign:"right"}}>
                                                {
                                                    (reportDetails.webcam=="yes")&&
                                                        <img src={reportDetails.image} width="200px"/>
                                                }
                                            
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Grid container     >
                                        
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Started On</TableCell>
                                                        <TableCell>Submitted On</TableCell>
                                                        <TableCell>No. of Questions</TableCell>
                                                        <TableCell>Duration</TableCell>
                                                        <TableCell>Webcam</TableCell>
                                                        <TableCell>IP Address</TableCell>
                                                        <TableCell>Platform</TableCell>
                                                        
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                            
                                                    <TableRow
                                                        
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell>
                                                            {new Date(reportDetails.startedOn).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell>{new Date(reportDetails.submittedOn).toLocaleString()}</TableCell>
                                                        <TableCell>{reportDetails.noOfQuestion}</TableCell>
                                                        <TableCell>{reportDetails.duration}</TableCell>
                                                        <TableCell>{reportDetails.webcam}</TableCell>
                                                        <TableCell>{reportDetails.ip}</TableCell>
                                                            <TableCell>{reportDetails.platform}</TableCell>
                                                    </TableRow>
                                                        
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <br/>
                                    {
                                        (reportDetails.mode!="private")&&
                                        <Grid container >
                                            <Grid item xs={12}>
                                                <Accordion>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="suspicious-activity"
                                                    id="suspicious-activity-head"
                                                    >
                                                        <Typography>Suspicious Activity</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                            <Stack direction="row" spacing={1}> 
                                                                <Chip label={"Tab Switch Count: "+reportDetails.tabSwitchCount} variant="outlined" />
                                                                <Chip label={"Webcam Count: "+reportDetails.webcamCount} variant="outlined" />
                                                            </Stack>
                                                            <br/>
                                                            <Stack direction="row" spacing={1} justifyContent="center" useFlexGap flexWrap="wrap"> 
                                                                {
                                                                    (reportDetails.doubtImages).map((data,index)=> (
                                                                        <img src={data} />
                                                                    ))
                                                                }
                                                            </Stack>
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Grid>
                                        </Grid>
                                    }
                                    
                                    <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div>
                                                <h5 >
                                                    Your Answers
                                                </h5>
                                            </div>
                                            <br/>
                                            {
                                                reportDetails.questionDetails.map((data,index)=>(
                                                    <React.Fragment>
                                                        <div key={index} id={"question"+index} className="questions">
                                                            <FormControl disabled>
                                                                <FormLabel id={"option"+index}>{data.question}</FormLabel>
                                                                <RadioGroup
                                                                    name={data.question}
                                                                    
                                                                >
                                                                    
                                                                    <Options option={data.options} answer={data.answer} correctAnswer={data.correctAnswer} />
                                                                </RadioGroup>
                                                            </FormControl>
                                                            
                                                        </div>
                                                        <br/>
                                                    </React.Fragment>
                                                    
                                                    
                                                    
                                                ))
                                            }
                                        </Grid>

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
                
            </div>
            
            
            
        </div>
    )
}


export default TestReportPage;