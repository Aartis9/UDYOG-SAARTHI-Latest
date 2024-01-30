import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import './Navbar.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useState, useEffect } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import { FiLogOut, FiSettings, FiBookmark, FiHelpCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';

import { Link, NavLink, useNavigate } from "react-router-dom";
// const page2=[{name:'Home',link:'/'},{name:'Private Jobs',link:'/private'},{name:'Goverment Jobs',link:'/goverment'},{name:'Trainings & Courses',link:'/courses'},{name:'About us',link:'/about'},{name:'Contact',link:'/contact'}]
// const pages = ['Home', 'Private Jobs', 'Goverment Jobs', 'Trainings & Courses', 'About us', 'Contact'];
// const links=['/','/private','/goverment','/courses','/about','/contact']
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [page2,setpage2]=React.useState([{name:'Home',link:'/'},{name:'Private Jobs',link:'/login'},{name:'Goverment Jobs',link:'/login'},{name:'Trainings & Courses',link:'/courses'},{name:'About us',link:'/about'},{name:'Contact',link:'/contact'}]);

  const navigate = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };




// navbar code

const token = sessionStorage.getItem('token');
  // const isLoggedIn = props.isLoggedIn;
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked((prev) => {
      return !prev;
    });
  }

  // /profile/getuserdetails

  useEffect(() => {
    fetchProfile();
    // Fetch use profile when token is available
    if(token){
      setpage2([{name:'Home',link:'/'},{name:'Private Jobs',link:'/private'},{name:'Goverment Jobs',link:'/goverment'},{name:'Trainings & Courses',link:'/courses'},{name:'About us',link:'/about'},{name:'Contact',link:'/contact'}])
    }
  }, [token]);
  const fetchProfile = async () => {
    try {
      console.log(token);
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/profile/getuserdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      const data = await response.json();
      console.log("res", data);
      const id = data.data._id;
      sessionStorage.setItem("id", id)

      const name = `${data.data.firstName} ${data.data.lastName}`;

      const { firstName, lastName, image, email, assistiveDevice, dateOfBirth, disabilityType, education, gender, mobileNumber, institute, udid, skills } = data.data;


      setImage(image);
      setName(name);
      setEmail(email);
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
    navigate(0);
    setImage()
    setName()
    setEmail()


  }

  const handleSignout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn69',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Logging Out',
          'You are being logged out...',
          'success',
        )
        logout();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You are still logged in :)',
          'info'
        )
      }
    })
  }

  const handleEdit = () => {
    try {

    } catch (error) {

    }
  }




/////////////////////////////////////////////




  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/'><img className='navlogo11' src="https://res.cloudinary.com/drtqzmu2n/image/upload/v1696852577/Add_a_heading__1_-removebg-preview_chi4xt.png" /></Link>
 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{color:'black',fontSize:'30px'}}  />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {page2.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to={page.link}><div className='linkname'>{page.name}</div></Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/'><img className='navlogo11' src="https://res.cloudinary.com/drtqzmu2n/image/upload/v1696852577/Add_a_heading__1_-removebg-preview_chi4xt.png" /></Link>
 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {page2.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.link}><div className='linkname'>{page.name}</div></Link>
              </Button>
            ))}
            
            {token &&
                <div className='profile88'>
                  <img className='navlogo11' src={image} onClick={handleClick} />
                </div>
                }


                {
                clicked &&
                <div className='menu-wrap' onMouseLeave={handleClick}>

                  <div className='image_sec'>
                    <div className='image_sec_img88'>
                      <img className='navlogo11' src={image} />
                    </div>
                    <h3>Hii, {name}</h3>
                    <p>{email}</p>
                    <Link to="/profile"><button className='edit-btn' onClick={handleEdit}>Edit Profile</button></Link>
                  </div>

                {/* <div className='menu_sec'> */}
                    {/* <Link className='menu-link' to="/jobs"><FiBookmark /> Bookmarks</Link> */ }
                    {/* <Link className='menu-link' to="/jobs"><FiSettings /> Settings</Link> */}
                    {/* <Link className='menu-link' to="/jobs"><FiHelpCircle /> Help</Link> */}
                {/* </div> */}

                  <button className='sign-out' onClick={handleSignout}><FiLogOut size={15} /> Sign Out</button>

                </div>
                }
                          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;