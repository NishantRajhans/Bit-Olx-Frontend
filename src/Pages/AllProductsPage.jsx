import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { ProductData } from "../Recoil/Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();
export default function AllProducts() {
  const [Product, setProduct] = useRecoilState(ProductData);
  const navigate = useNavigate();
  const AllProduct = async () => {
    const Productdata = await axios.get(
      "https://bit-olx-backend.onrender.com/api/v1/Product/GetAllProducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setProduct(Productdata.data.Products);
  };
  React.useEffect(() => {
    if(localStorage.getItem("Token")===null)navigate("/LogIn")
    AllProduct();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main className="bg-black min-h-screen cursor-pointer">
        <Box
          sx={{
            pt: 15,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "800",
                  textTransform: "none",
                  ":hover": { backgroundColor: "red", color: "black" },
                }}
              >
                All Products
              </Button>
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "800",
                  textTransform: "none",
                  ":hover": { backgroundColor: "red", color: "black" },
                }}
              >
                Dress
              </Button>
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "800",
                  textTransform: "none",
                  ":hover": { backgroundColor: "red", color: "black" },
                }}
              >
                Calculator
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid className="flex justify-center items-center flex-wrap">
            {Product?.map((product) => (
              <Card
                key={product._id}
                sx={{
                  maxWidth: 345,
                  m: 3,
                  backgroundColor: "rgba(255, 255, 255,.1)",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      <Avatar>
                        {product.ProductSeller.FirstName.split(
                          ""
                        )[0].toUpperCase()}
                        {product.ProductSeller.LastName.split(
                          ""
                        )[0].toUpperCase()}
                      </Avatar>
                    </Avatar>
                  }
                  title={
                    <span className="text-white font-bold">
                      {product.ProductSeller.FirstName + " "}
                      {" " + product.ProductSeller.LastName}
                    </span>
                  }
                  subheader={
                    <span className=" text-warning-100">
                      {product.ProductCreatedAt}
                    </span>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={product.ProductImage}
                  alt="Paella dish"
                  className=" text-white font-bold"
                  onClick={() => {
                    navigate(`/Product/${product._id}`);
                  }}
                />
                <CardContent
                onClick={() => {
                  navigate(`/Product/${product._id}`);
                }}
                >
                  <Typography className=" text-white">
                    {product.ProductTitle}
                  </Typography>
                  <Typography className=" text-warning-100">
                    {product.ProductDescription}
                  </Typography>
                  <Typography className=" text-warning-100">
                    {product.ProductPrice}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
