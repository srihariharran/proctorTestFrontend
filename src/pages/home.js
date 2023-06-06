// Importing Required Packages
import * as React from 'react';
import './static/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Logo from './static/images/logo-full.png'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Carousel from 'react-bootstrap/Carousel';
import About1 from './static/images/about1.jpg'
import About2 from './static/images/about2.jpg'
import About3 from './static/images/about3.jpg'


// Home Page Function
function HomePage()
{
    let navigate = useNavigate(); 
    const handleRoutes = (path) => {
        navigate(path)
    }
    

    return(
        <div>
           <div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AppBar position='static' className='bg-white' elevation={1}>
                            <Toolbar>
                                <Container>
                                    <Stack direction="row" justifyContent="space-between"  useFlexGap flexWrap="wrap">
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                                        >
                                            <img src={Logo} alt="Logo" className="rounded" />
                                            
                                        </Typography>
                                        <Box sx={{ display: { xs: 'block', sm: 'block' },paddingTop:"10px" }}>
                                            <Button variant="outlined" className='text-main' onClick={()=>handleRoutes("/login")}>
                                                Login
                                            </Button>
                                            &nbsp;
                                            <Button variant="contained" className='bg-main text-white' onClick={()=>handleRoutes("/user-registration")}>
                                                Register
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Container>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item xs={12}>
                        <Container >
                                <br/>
                                <h2 className='text-center text-main'>
                                    Free Online Training & Assessment Platform
                                </h2>
                                <br/>   
                                <br/>
                                <Stack direction="row" useFlexGap flexWrap="wrap">
                                    <Paper elevation={0} sx={{width:{xs:"100%",sm:"50%"},paddingTop:'2%'}}>
                                        <div>
                                            <h5>Maximise your online test using Protctor Test to:</h5>
                                            <ul style={{fontSize:'17px'}}>
                                                <li>Create & customize exams</li>
                                                <li>Webcam monitoring and process recording</li>
                                                <li>Randomize questions & shuffle answer options</li>
                                                <li>Fully Automated Score & Delightful Reports</li>
                                            </ul>
                                            <h5>Maximise your prepration for online test using Protctor Test to:</h5>
                                            <ul style={{fontSize:'17px'}}>
                                                <li>Assess your prepration</li>
                                                <li>Review your performance by taking tests </li>
                                            </ul>
                                        </div>
                                        <br/>
                                        <div className='text-center'>
                                            <Button variant='outlined' className='border-main text-main' onClick={()=>handleRoutes("/user-registration")}>
                                                Get Started for Free
                                            </Button> 
                                        </div>
                                    </Paper>
                                    <Paper elevation={0} sx={{width:{sm:"50%",xs:"100%"}}}>
                                        <Carousel>
                                            <Carousel.Item interval={1500}>
                                                <img
                                                    className="d-block"
                                                    src={About1}
                                                    alt="About 1"
                                                    width="100%"
                                                    height="80%"
                                                />
                                                
                                            </Carousel.Item>
                                            <Carousel.Item interval={1500}>
                                                <img
                                                    className="d-block"
                                                    src={About2}
                                                    alt="About 2"
                                                    width="100%"
                                                    height="80%"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item interval={1500}>
                                                <img
                                                    className="d-block"
                                                    src={About3}
                                                    alt="About 3"
                                                    width="100%"
                                                    height="80%"
                                                />
                                            </Carousel.Item>
                                        </Carousel>

                                    </Paper>
                                </Stack>
                        </Container>
                            
                    </Grid>
                </Grid>
            </div>
            </div>
        </div>
    )
}


export default HomePage;