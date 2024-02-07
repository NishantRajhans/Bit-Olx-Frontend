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
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useState } from "react";
import { ProductData } from "../Recoil/Product";
import { useEffect } from "react";
export default function EditProduct() {
  const [Product,setProduct]=useState()
  const location=useLocation()
  const Id = location.pathname.split("/")[2];
  const ProductDetail = async () => {
    const product = await axios.get(
      `https://bit-olx-backend.onrender.com/api/v1/Product/GetProduct/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setProduct(product.data.Product);
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
        if(!file)toast.error("Image is not available")
        const ProductInfo=await axios.put(`https://bit-olx-backend.onrender.com/api/v1/Product/EditProduct/${Id}`,
        {
          ProductImage:data.get("ProductImage"),
          ProductDescription:data.get("Description"),
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
        toast.success("Product Edited successfully")
      } catch (err) {
        console.log("Error in Fetching data:", err)
      }
    }
  };
  useEffect(() => {
    ProductDetail();
  }, []);
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
            Edit Product
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
                  defaultValue={Product?.ProductTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="Product Description"
                  placeholder="Write In Detail About Your Product"
                  id="Description"
                  name="Description"
                  autoComplete="Title"
                  defaultValue={Product?.ProductDescription}
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
                  defaultValue={Product?.ProductPrice}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="File"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  defaultValue={Product?.ProductImage}
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
              Edit Product
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
