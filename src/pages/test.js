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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import { decryptData } from './functions/crypto';
import utils from '../utils.json'


// Test Page Function
function TestPage()
{
    // Getting from location
    const location = useLocation()
    const data = location.state
    // console.log(data)
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
    const [autoSubmitTestModalState, setAutoSubmitTestModalState] = useState(false);

    // // Function to Open or Close End Test Modal
    const [endTestModalState, setEndTestModalState] = useState(false);

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
        setTabSwitchCount((tab)=>tab+1);
        
    }
    useEffect(()=>{
        setForm_data((form_data)=>({...form_data,["tabSwitchCount"]:tabSwitchCount}))
        if(tabSwitchCount==courseDetails.tabSwitchLimit)
        {
            setAutoSubmitTestModalState(true)
            submitData()
        }
    },[tabSwitchCount])
    useEffect(()=>{
        setForm_data((form_data)=>({...form_data,["webcamCount"]:webcamCount}))
        
        if(webcamCount==courseDetails.webcamLimit)
        {
            setAutoSubmitTestModalState(true)
            submitData()
        }
     },[webcamCount])
    
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
    
    const [images,setImages] = useState([])
    useEffect(()=>{
        
        setForm_data((form_data)=>({...form_data,["images"]:images}))
        
     },[images])
    // State Variable to Store Form Data
    const [form_data,setForm_data] = useState(
        {
            tabSwitchCount:tabSwitchCount,
            webcamCount:webcamCount,
            courseId:courseDetails.courseId,
            ip:data.ip,
            platform:data.platform,
            images:images,
            courseId:data.courseId,
            reportId:data.reportId,
            details:{}
        }        
    );
    const [currentDate,setCurrentDate] = useState(Date.now()+ (60000*courseDetails.duration))
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
        
    },[form_data,nextBtnState,previousBtnState])
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
    const [btnLoad,setBtnLoad] = useState(false)
    const [alertState,setAlertState] = useState({
        state:false,
        type:"",
        message:""
    })
    // Function to submit the Details
    const submitData = async(event) =>
    {
        setForm_data((form_data)=>({...form_data,["courseId"]:courseDetails.courseId}))
        // console.log(form_data)
        try
        {
            event.preventDefault()
        }
        catch (err)
        {
            
        }
        setBtnLoad(true)
        try 
        {
            let res = await fetch(utils["url"]+"/api/test/submitDetails",
            {
                crossDomain: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                },
                method: "POST",
                body: JSON.stringify(form_data),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                // console.log(resJson)
                setAlertState({
                    state:true,
                    message:resJson["message"]
                })
                setBtnLoad(false)
                if(resJson['status'])
                {
                    setAlertState((alert)=>({...alert,["type"]:"success"}))
                    setTimeout(()=>{
                        exitFullscreen()
                        handleRoutes("/courses")
                    },2000)
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
    
    // Declaring Ref for Webcam
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    // Function to capture Image
    const capture = React.useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
            
            checkWebcam(imageSrc)
        }
        
        
    }, [webcamRef, setImgSrc]);
    // Function to reset the webcam data
    const captureAgain = React.useCallback(() => {
        webcamRef.current = null;
        setImgSrc(null);
        
    }, [webcamRef, setImgSrc]);
    // useEffect(()=>{
    //     console.log(imgSrc)
    // },[imgSrc])
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
        if(courseDetails['webcam']=="yes")
        {
            setInterval(capture,5000)
            // setInterval(captureAgain,6000)
        }
    }
    // Function to end test
    const openEndTestModal = () => {
        fullScreen();
        setEndTestModalState(true);
    }
    const closeEndTestModal = () => {
        setEndTestModalState(false);
    }
    const [webcamAlert,setWebcamAlert] = useState({
        state:false,
        message:'',
        color:''
    })
    // Function to check person available or not 
    const checkWebcam = async(img) => {
        // capture()
        // console.log("Start")
        try     
        {
            let res = await fetch(utils["url"]+"/api/checkFace",
            {
                crossDomain: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                },
                method: "POST",
                body: JSON.stringify({
                    image:img
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
               
                if(resJson["status"]){
                    if(resJson["count"]!=1)
                    {
                        
                        setWebcamCount((count) => count+1)
                        setImages((image)=>([...image,img]))
                        setWebcamAlert({
                            state:true,
                            message:resJson['message'],
                            color:'red'
                        })
                        setTimeout(()=>{
                            setWebcamAlert({
                                state:false,
                                message:resJson['message'],
                                color:'green'
                            })
                        },4000)
                    }
                    
                }
            }
            else
            {
                // console.log(res)
                localStorage.clear()
                handleRoutes("/",{ replace: true })
            }
        }
        catch (err) {
            console.log(err);
            localStorage.clear()
            handleRoutes("/",{ replace: true })
        }
        // console.log("End")
    }
    // Checking Login State
    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        (async () => {
            // Checking Login Status
            if(localStorage.getItem("utils"))
            {
                try 
                {
                    let res = await fetch(utils["url"]+"/api/test/getDetails",
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
                        setCourseDetails(resJson)
                        setLoginStatus(true)
                        $('.questions').hide();
                        $('#question0').show();
                        
                        
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
    return(
        <div onMouseLeave={addTabSwitchCount}>
             {
                (loginStatus) &&
                <div>
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
                                        <Button variant="contained" color="error" onClick={openEndTestModal}>
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
                                        {
                                            (courseDetails.webcam=="yes")&&
                                            <Webcam
                                                audio={false}
                                                ref={webcamRef}
                                                height={250}
                                                width={250}
                                                screenshotFormat="image/jpeg"
                                            />
                                        }
                                        
                                    </Stack>
                                    {
                                        (webcamAlert.state)&&
                                        <Stack direction="row" justifyContent="center">
                                            <Chip label={webcamAlert.message} style={{background:webcamAlert.color,color:"white"}} />
                                        </Stack>
                                    }
                                    
                                    <Stack direction="row" justifyContent="center">
                                        <TableContainer component={Paper} sx={{ maxWidth: '80%' }}>
                                            <Table >
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Tab Switch Count</TableCell>
                                                        <TableCell>{tabSwitchCount}</TableCell>
                                                    </TableRow>
                                                    {
                                                        (courseDetails.webcam=="yes")&&
                                                        <TableRow>
                                                            <TableCell>Webcam Count</TableCell>
                                                            <TableCell>{webcamCount}</TableCell>
                                                        </TableRow>
                                                    }
                                                    
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
                                <Button variant="contained"  color="error" onClick={openEndTestModal}>
                                    End Test                                    
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    
                    <Modal
                        open={endTestModalState}
                        onClose={closeEndTestModal}
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
                                <TextField name="endTest" variant="outlined" label="End Test" size="small" onInput={checkEndTestData} autoComplete='off' fullWidth />
                            </Stack>
                            <br/>
                            <Stack direction="row" justifyContent="center">
                                
                                
                                <LoadingButton loading={btnLoad} onClick={submitData} variant="contained" color="error" disabled={endTestBtnState}><span>End Test</span></LoadingButton>
                                {
                                    (alertState.state)&&
                                    <Alert severity={alertState.type}>{alertState.message}</Alert>
                                }
                                {/* <Button variant='contained' color='error' onClick={submitData} disabled={endTestBtnState}>
                                    End Test
                                </Button> */}
                            </Stack>
                        </Box>
                    
                    </Modal>

                    <Modal
                        open={autoSubmitTestModalState}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{backgroundColor:'rgba(0,0,0,0.95)'}}
                    >
                        <Box sx={modalStyle}>
                            <ol>
                                <li>Your tab switch or webcam limit reached</li>
                                <li>Submitting the test details</li>
                            </ol>
                            <br/>
                            <br/>
                            <Stack direction="row" justifyContent="center">
                                <LoadingButton loading={true}  variant="contained" color="error" disabled={true}><span>End Test</span></LoadingButton>
                            </Stack>
                            {
                                (alertState.state)&&
                                <Alert severity={alertState.type}>{alertState.message}</Alert>
                            }

                        </Box>
                    
                    </Modal>
                </div>
            }
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
                        <Button variant='contained' onClick={startTest} disabled={!loginStatus} color="success">
                            Start
                        </Button>
                    </Stack>
                    

                </Box>
            
            </Modal>
        </div>
    )
}


export default TestPage;