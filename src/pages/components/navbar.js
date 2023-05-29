// Importing Required Packages
import * as React from 'react';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../static/css/style.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../static/images/logo-full.png'
import { decryptData } from '../functions/crypto';

const drawerWidth = 240;
const navItems = ["courses","contribute"];

function Navbar()
{
    let navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRoutes = (path) => {
        if(path=='/')
        {
            navigate(path, { replace: true })
        }
        else
        {   
            navigate(path)
        }
        
    }
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const logout = async() => {
        try{
            let res = await fetch('/api/logout',
            {
                crossDomain: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+decryptData(localStorage.getItem("utils"))["token"],
                },
                method: "POST",
                
            });
            let resJson = await res.json();
            if (res.status === 200) {
                if(resJson["status"])
                {
                    localStorage.clear()
                    handleRoutes('/')
                }
                else
                {
                    console.log(resJson)
                }
            }
        }
        catch (err) {
            console.log(err);
        }
        
    }
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <img src={Logo} alt="Logo" className="rounded" width="100%" />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>handleRoutes("/"+item)}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>
    );
    return(
        <div>
           
            <AppBar position='static' className="bg-main" elevation={1}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    >
                        <img src={Logo} alt="Logo" className="rounded" />
                        
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#ffffff' }} onClick={()=>handleRoutes("/"+item)}>
                                {item}
                            </Button>
                        ))}
                        <Button>
                            <Avatar
                                sx={{
                                    bgcolor: '#ffffff',
                                    width: { xs: 20, md: 30 },
                                    height: { xs: 20, md: 30 },
                                    marginTop: { xs: '5%' },
                                    cursor:'pointer'
                                }}
                                className='text-main'
                                src=""
                                alt="Username"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                id="userMenu"
                            >

                            </Avatar>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={()=>handleRoutes('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </Button>
                        
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    )
}


export default Navbar;