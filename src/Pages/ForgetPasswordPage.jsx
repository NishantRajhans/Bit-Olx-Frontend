import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserState } from "../Recoil/User";
import { useRecoilState } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';
const defaultTheme = createTheme();

export default function ForgetPassword() {
  const [User,setUser]=useRecoilState(UserState)
  const navigate=useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const data = new FormData(event.currentTarget);
    const logindata=await axios.post("https://bit-olx-backend.onrender.com/api/v1/auth/login",{
      Email: data.get('email'),
      Password: data.get('password'),
      ConfirmPassword: data.get('confirmpassword'),
    })
    console.log(logindata);
    toast.success(logindata.data.message)
    if(logindata.data.User.Token!=null){
      localStorage.setItem("Token",logindata.data.User.Token)
      localStorage.setItem("User",logindata.data.User.FirstName+" "+logindata.data.User.LastName);
      setUser(localStorage.getItem("User"));
      navigate("/")
    }else{
      navigate("/SignUp")
    }
    }catch(err){
    }
  };
  return (
    <div className=' w-full min-h-screen mt-5 bg-black flex justify-center items-center nest-hub:pt-10 pb-20 nest-hub:mt-5 nest-hub:h-full sm:pt-12'>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className='mt-4 pb-10 lg:pt-14 nest-hub:pt-24'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#5B5A5A', // Change background color to black
            paddingTop:"4rem",padding:"1rem",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight="bold" color={'white'}>
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor:"red",color:"white",fontWeight:"800",":hover":{backgroundColor:"red",color:"black"}}}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-center">
              <Grid item>
                <Link sx={{color:"white"}} onClick={()=>{navigate('/SignUp')}} style={{ cursor: 'pointer' }}>
                Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}