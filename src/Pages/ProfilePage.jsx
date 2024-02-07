import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserState } from "../Recoil/User";
import { useRecoilState } from "recoil";
const defaultTheme = createTheme();

export default function Profile() {
  const [User, setUser] = useRecoilState(UserState);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedata = await axios.put(
      "https://bit-olx-backend.onrender.com/api/v1/User/EditUser",
      {
        FirstName: data.get("firstName"),
        LastName: data.get("lastName"),
        Password: data.get("password"),
        ConfirmPassword: data.get("ConfirmPassword"),
        PhoneNumber: data.get("PhoneNumber"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    toast.success(updatedata.data.message);
    localStorage.setItem("PhoneNumber", updatedata.data.NewUser.PhoneNumber);
    localStorage.setItem(
      "User",
      updatedata.data.NewUser.FirstName + " " + updatedata.data.NewUser.LastName
    );
    setUser(localStorage.getItem("User"));
  };

  return (
    <div className="w-full h-screen mt-10 bg-black flex justify-center items-center nest-hub:pt-10 pb-20 nest-hub:mt-10 nest-hub:h-full sm:mt-12">
      <Container
        component="main"
        maxWidth="xs"
        className="sm:mt-24 md:mt-20 pb-10 lg:pt-14"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#5B5A5A", // Change background color to black
            paddingTop: "4rem",
            padding: "1rem",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            color={"white"}
          >
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className="text-white">
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={localStorage.getItem("User")?.split(" ")[0]}
                  autoFocus
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  defaultValue={localStorage.getItem("User")?.split(" ")[1]}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
                  defaultValue={localStorage.getItem("PhoneNumber")}
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "red",
                color: "white",
                fontWeight: "800",
                ":hover": { backgroundColor: "red", color: "black" },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
