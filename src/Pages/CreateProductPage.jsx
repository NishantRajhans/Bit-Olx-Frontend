import * as React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import toast, { Toaster } from "react-hot-toast";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useState } from "react";

export default function CreateProduct() {
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [file,setfile]=useState()
  const handleFileUpload = (event) => {
    setfile(event.target.files[0])
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(localStorage.getItem("Token")==null){
      navigate("/LogIn")
    }else{
      try {
        const data = new FormData(event.currentTarget);
        data.append("ProductImage",file)
        const ProductInfo=await axios.post("https://bit-olx-backend.onrender.com/api/v1/Product/CreateProduct",
        {
          ProductImage:data.get("ProductImage"),
          ProductDescription:data.get("Description"),
          ProductCategory:data.get("Select"),
          ProductPrice:data.get("Price"),
          ProductTitle:data.get("Title")
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
        )
        if(ProductInfo.data.success==false)toast.error(ProductInfo.data.message)
        else toast.success(ProductInfo.data.message)
      } catch (err) {
        console.log("Error in Fetching data:", err)
      }
    }
  };
  return (
    <div className=" w-full min-h-screen mt-14 bg-black flex justify-center items-center nest-hub:pt-10 pb-20 nest-hub:mt-10 nest-hub:h-full sm:mt-12">
      <Container
        component="main"
        maxWidth="xs"
        className="sm:mt-20 md:mt-20 pb-10 lg:pt-14"
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
            Create Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Tile"
                  label="Title Of Your Product"
                  name="Title"
                  autoComplete="Title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="Product Description"
                  placeholder="Write In Detail About Your Product"
                  id="Description"
                  name="Description"
                  autoComplete="Title"
                  style={{
                    width: "100%",
                    backgroundColor: "#5B5A5A",
                    border: "solid 1px rgba(0, 0, 0, 0.5)",
                    borderRadius: "4px",
                    height: "10rem",
                    color: "black",
                    padding: "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Price"
                  label="Price Of Your Product"
                  type="string"
                  id="Price"
                  autoComplete="new-price"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="Select">
                    Select Option
                  </InputLabel>
                  <Select
                    labelId="Select"
                    name="Select"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <MenuItem value="Dress">Dress</MenuItem>
                    <MenuItem value="Calculator">Calculator</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="File"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="File">
                  <Button
                    component="span"
                    fullWidth
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: "800",
                    }}
                  >
                    Upload Image
                  </Button>
                </label>
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
              Create Product
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
