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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate=useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signupdata=await axios.post("https://bit-olx-backend.onrender.com/api/v1/auth/signup",{
      FirstName:data.get('firstName'),
      LastName:data.get('lastName'),
      Email: data.get('email'),
      Password: data.get('password'),
      ConfirmPassword: data.get('ConfirmPassword'),
      PhoneNumber: data.get('PhoneNumber')
    })
    toast.success(signupdata.data.message)
    if(signupdata.data.message!=="User already exists")navigate("/LogIn")
  };

  return (
    <div className='w-full min-h-screen mt-10 bg-black flex justify-center items-center nest-hub:pt-10 pb-20 nest-hub:mt-10 nest-hub:h-full sm:mt-12'>
      <Container component="main" maxWidth="xs" className='sm:mt-24 md:mt-20 pb-10 lg:pt-14'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#5B5A5A', // Change background color to black
            paddingTop:"4rem",padding:"1rem",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight="bold" color={'white'}>
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className='text-white'>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  sx={{color:"white"}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="ConfirmPassword"
                  autoComplete="new-confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="PhoneNumber"
                  label="Phone Number"
                  id="PhoneNumber"
                  autoComplete="new-phonenumber"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2,backgroundColor:"red",color:"white",fontWeight:"800",":hover":{backgroundColor:"red",color:"black"}}}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link sx={{color:"white"}} onClick={()=>{navigate('/LogIn')}} style={{ cursor: 'pointer'}}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>  
  );
}