// Importing Required Packages
import * as React from 'react';
import $ from 'jquery'; 
import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Countdown from "react-countdown";
import Webcam from "react-webcam";
import './static/css/style.css'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import Logo from './static/images/logo-full.png'
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';


// Test Page Function
function TestPage()
{
    // Getting from location
    const location = useLocation()
    const data = location.state
    // TO Navigate Page
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path,{replace:true})
    }
    // Modal Style
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {sm:"40%",xs:"90%"},
        maxHeight:'80%',
        overflow:'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    // Function to Open or Close Start Test Modal
    const [startTestModalState, setStartTestModalState] = useState(true);
    // const openStartTestModal = () => {
    //     setStartTestModalState(true);
    // }
    // const closeStartTestModal = () => {
    //     setStartTestModalState(false);
    // }
    // // Function to Open or Close End Test Modal
    const [endTestModalState, setEndTestModalState] = useState(false);
    // const openEndTestModal = () => {
    //     setEndTestModalState(true);
    // }
    // const closeEndTestModal = () => {
    //     setEndTestModalState(false);
    // }
    // State variable for Course Details
    const [courseDetails,setCourseDetails] = useState(
        {
            courseName:data.courseName,
            duration:data.duration,
            tabSwitchLimit:100,
            webcam:data.webcam,
            noOfQuestion:4,
            webcamLimit:"5",
            details:[
            {
                question:'What is HTML1?',
                options:['Web page','mobile page']
            },
            {
                question:'What is HTML2?',
                options:['Web page','mobile page']
            },
            {
                question:'What is HTML3?',
                options:['Web page','mobile page']
            },
            {
                question:'What is HTML4?',
                options:['Web page','mobile page']
            }
            ]
        }
    );
    // Function to display the options for the questions
    const Options = ({option}) => {
        return(
            <React.Fragment>
                 {
                    option.map((data,index)=>(
                        <FormControlLabel value={data} control={<Radio />} label={data} key={index}/>
                    ))
                }
            </React.Fragment>
            
        )
        
        
    }
    // State Variables
    const [questionState,setQuestionState] = useState(0);
    const [nextBtnState,setNextBtnState] = useState(false);
    const [previousBtnState,setPreviousBtnState] = useState(true);
    // Function to Move Next Question
    const nextQuestion = () =>{
        if(courseDetails.noOfQuestion>questionState+1)
        {
            setQuestionState(questionState+1);
            setPreviousBtnState(false);
        }
    }
    // Function to Move Previous Question
    const previousQuestion = () =>{
        if(questionState>0)
        {
            setQuestionState(questionState-1);
            setNextBtnState(false);

        }
    }
    // Function to create the Question List for easy switching to question
    const QuestionList = () => {
        var questionList = Array.apply(null, {length: courseDetails.noOfQuestion}).map(Number.call, Number);
        
        return(
            <React.Fragment>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                {
                    questionList.map((data,index)=>(
                           
                            (form_data.details.hasOwnProperty(index+1))?
                                <Button variant='container' className="border-main bg-main text-white small-btn-font" onClick={()=>MoveToQuestion(index)} type="button" size="small">
                                    {index+1}
                                </Button>
                            :
                                <Button variant='outlined' className="border-main  small-btn-font" onClick={()=>MoveToQuestion(index)} type="button" size="small">
                                    {index+1}
                                </Button>
                        
                    ))
                }
                </Stack>
            </React.Fragment>
        )
    }
    const [tabSwitchCount,setTabSwitchCount] = useState(0);
    const [webcamCount,setWebcamCount] = useState(0);
    // Jquery Function to Count Tab Switch
    const addTabSwitchCount = () => {
        setTabSwitchCount(tabSwitchCount+1);
    }
    useEffect(()=>{
       if(tabSwitchCount==courseDetails.tabSwitchLimit)
       {
        submitData()
       }
    },[tabSwitchCount])
    useEffect(()=>{
        if(webcamCount==courseDetails.webcamLimit)
        {
         submitData()
        }
     },[tabSwitchCount])
    // Funcction to show the current Question
    const MoveToQuestion = (id) => {
        // Hiding all Question div which has classname question using jquery
        $('.questions').hide();
        // Showing the question which match the id
        $('#question'+id).show();
        // Enabling or disabling next and previous button
        setQuestionState(id)
        if(courseDetails.noOfQuestion==id+1)
        {
            setNextBtnState(true);
        }
        else
        {
            setNextBtnState(false);
        }
        if(questionState==0)
        {
            setPreviousBtnState(true);
        }
        else
        {
            setPreviousBtnState(false);
        }
    }
    // UseEffect to update the current Question
    useEffect(()=>{
        MoveToQuestion(questionState);
    },[questionState])
    // Switch to Full Screen
    const fullScreen = () => {
        document.documentElement.requestFullscreen();
    }

    // Exit FullScreen
    const exitFullscreen = () => {
        document.exitFullscreen();
    }
    // Function to start test
    const startTest = () => {
        fullScreen();
        setStartTestModalState(false);
    }
    // Function to end test
    const endTest = () => {
        fullScreen();
        setEndTestModalState(true);
    }

    // State Variable to Store Form Data
    const [form_data,setForm_data] = useState(
        {
            tabSwitchCount:tabSwitchCount,
            webcamCount:webcamCount,
            details:{}
        }        
    );
    const [currentDate,setCurrentDate] = useState(Date.now()+ (1000*3600))
    // Function to update the question and answers
    const updateFormData = (event) => {
        // console.log(event)
        const name = event.target.name
        setForm_data((form_data) => ({ ...form_data, 
            ["details"]:{
                ...form_data.details,
                [questionState+1]:{
                    ["answer"]: event.target.value,
                    ["question"]: name
                }
            }
        })) 
    } 
    // Function to update the answered  question count
    const [answeredQuestions,setAnsweredQuestions] = useState(0);
    useEffect(()=>{
        setAnsweredQuestions(Object.keys(form_data.details).length)
    },[form_data,questionState,nextBtnState,previousBtnState])
    // Function to check end test given by user
    const [endTestBtnState,setEndTestBtnState] = useState(true)
    const checkEndTestData = (event) => {
        const {name,value} = event.target
        if(value.toLowerCase()=="end test")
        {
            setEndTestBtnState(false)
        }
        else
        {
            setEndTestBtnState(true)
        }
    }
    // Function to submit the Details
    const submitData = () =>
    {
        console.log(form_data)
        exitFullscreen()
        handleRoutes("/courses")
    }
    return(
        <div onMouseLeave={addTabSwitchCount} onPageHi>
            {/* Test Page */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AppBar position='sticky' className="bg-white" elevation={1}>
                        <Toolbar>
                            <Typography
                                variant="h6"
                                component="div"
                                className="text-main"
                                sx={{ flexGrow: 1, display: { xs: 'hide', sm: 'block' } }}
                            >
                                <img src={Logo} alt="Logo" className="rounded" />
                                
                            </Typography>
                            
                            <Box sx={{ display: {xs:'none',sm: 'block' } }}>
                                <Button variant="contained" className="bg-main">
                                    Time Left: &nbsp;<Countdown date={currentDate} onComplete={submitData}/>                                   
                                </Button>
                                &nbsp;
                                &nbsp;
                                <Button variant="contained" color="error" onClick={endTest}>
                                    End Test                                    
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Grid>
               
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <h4>
                            <b>{courseDetails.courseName}</b>
                        </h4>
                    </Stack>
                    <Grid container>
                        <Grid item xs={12} sm={3} sx={{maxHeight:"75vh",overflow:'auto'}}>
                            <Stack direction="row" justifyContent="center">
                                {/* <Webcam
                                    audio={false}
                                    // ref={webcamRef}
                                    height={250}
                                    width={250}
                                    screenshotFormat="image/jpeg"
                                /> */}
                            </Stack>
                            <Stack direction="row" justifyContent="center">
                                <TableContainer component={Paper} sx={{ maxWidth: '80%' }}>
                                    <Table >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Tab Switch Count</TableCell>
                                                <TableCell>{tabSwitchCount}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Webcam Count</TableCell>
                                                <TableCell>5</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Questions Answered</TableCell>
                                                <TableCell>{answeredQuestions}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Questions Not Answered</TableCell>
                                                <TableCell>{courseDetails.noOfQuestion-answeredQuestions}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{maxHeight:"75vh",minHeight:"75vh",overflow:'auto',borderLeft:{xs:'none',sm:'1px solid #0e2740'},borderRight:{xs:'none',sm:'1px solid #0e2740'}}} >
                            <AppBar position='static' className="bg-white" elevation={0} sx={{}}>
                                <Toolbar>
                                    <Stack direction="row" justifyContent="space-between" sx={{width:"100%"}} className="text-main">
                                        <Button variant="contained" className="bg-main" disabled={previousBtnState} color="primary" type="button" onClick={previousQuestion}>
                                            Previous                            
                                        </Button>
                                        <div style={{paddingTop:"1%"}}>
                                            Question {questionState+1}/{courseDetails.noOfQuestion}
                                        </div>
                                        <Button variant="contained" className="bg-main" disabled={nextBtnState} color="primary" type="button" onClick={nextQuestion}>
                                            Next                            
                                        </Button>
                                    </Stack>                                        
                                </Toolbar>
                            </AppBar>
                            <Stack direction="row" sx={{padding:"5%",}}>
                                {
                                    courseDetails.details.map((data,index)=>(
                                        <div key={index} id={"question"+index} className="questions">
                                            <FormControl>
                                                <FormLabel id={"option"+index}>{data.question}</FormLabel>
                                                <RadioGroup
                                                    name={data.question}
                                                    onChange={updateFormData}
                                                >
                                                    
                                                    <Options option={data.options} />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        
                                    ))
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{paddingLeft:"1.5%",maxHeight:"75vh",overflow:'auto'}}>
                            <Stack spacing={{ xs: 1, sm: 2 }}  direction="row" justifyContent="center" useFlexGap flexWrap="wrap">
                                <Button variant='container' className="border-main bg-main text-white small-btn-font" type="button" size="small">
                                    Answered
                                </Button>
                            
                                <Button variant='outlined' className="border-main small-btn-font" type="button" size="small">
                                    Not Answered
                                </Button>
                            </Stack>
                            <br/>
                            <QuestionList />
                        </Grid>
                    </Grid>
                    <br/>
                    
                </Grid>
            </Grid>
            <AppBar position='fixed' className="bg-white" sx={{ top: 'auto', bottom: 0, display:{xs:'block',sm:'none'} }}>
                <Toolbar>
                    <Box>
                        <Button variant="contained" className="bg-main">
                            Time Left: &nbsp;<Countdown date={currentDate}  onComplete={submitData}/>                                   
                        </Button>
                        &nbsp;
                        &nbsp;
                        <Button variant="contained"  color="error" onClick={endTest}>
                            End Test                                    
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <br/>
            <Modal
                open={startTestModalState}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{backgroundColor:'rgba(0,0,0,0.95)'}}
            >
                <Box sx={modalStyle}>
                    <h1>All the Best. Do Well</h1>
                    <b>Note: </b> 
                    <ol>
                        <li>Timer already started</li>
                        <li>Don't exit fullscreen. In case you exit the test will submitted automatically and consider this as malpractice.</li>
                    </ol>
                    <br/>
                    <br/>
                    <Stack direction="row" justifyContent="center">
                        <Button variant='contained' onClick={startTest} color="success">
                            Start
                        </Button>
                    </Stack>
                    

                </Box>
               
            </Modal>
            <Modal
                open={endTestModalState}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h5 className="text-main">End Test</h5>
                    <Stack direction="row" justifyContent="center">
                        <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                            <Table >
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Questions Total</TableCell>
                                        <TableCell>{courseDetails.noOfQuestion}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Questions Answered</TableCell>
                                        <TableCell>{answeredQuestions}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Questions Not Answered</TableCell>
                                        <TableCell>{courseDetails.noOfQuestion-answeredQuestions}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <small>
                        <strong>Note:&nbsp;</strong>
                        <p>
                            Type "end test" in the below text field to end the test
                        </p>
                    </small>
                    <Stack direction="row">
                        <TextField name="endTest" variant="outlined" label="End Test" size="small" onInput={checkEndTestData} fullWidth />
                    </Stack>
                    <br/>
                    <Stack direction="row" justifyContent="center">
                        <Button variant='contained' color='error' onClick={submitData} disabled={endTestBtnState}>
                            End Test
                        </Button>
                    </Stack>
                </Box>
               
            </Modal>
            
        </div>
    )
}


export default TestPage;