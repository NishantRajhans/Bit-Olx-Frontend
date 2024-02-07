import * as React from "react";
import "../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { UserState } from "../Recoil/User";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRecoilState } from "recoil";
import { WishListNumber } from "../Recoil/WishListNumber";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const pages = [
  { title: "AllProducts", link: "/AllProducts" },
  { title: "CreateProduct", link: "/CreateProduct" },
  { title: "MyProduct", link: "/MyProduct" },
];
const settings = ["Profile", "Logout"];

function Navbar() {
  const [User, setUser] =useRecoilState(UserState)
  const[WishListCount,setWistListCount]=useRecoilState(WishListNumber)
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(page.link);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting == "Logout") {
      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      localStorage.removeItem("UserInfo");
      navigate("/LogIn");
    }
    if(setting == "Profile")navigate("/Profile");
  };
  const handleWishlist=()=>{
    navigate("/WishList")
  }
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    color:"black",
    backgroundColor:"white",
    fontSize:15,
    boxShadow:"none",
    "&:hover": {
      color: "white",
      backgroundColor:"black"
    },
  }));
  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#FA0707",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "black",
      backgroundColor: "red"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#6E7DF0",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

  React.useEffect(() => {
    if (!localStorage.getItem("User")) {
      localStorage.removeItem("Token");
    }
  }, []);
  return (
    <AppBar position="static">
      <Container maxWidth="xl"sx={{background: "red" ,position:"fixed",zIndex:"10"}}>
        <Toolbar disableGutters>
          <RecyclingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 ,color:"black"}} />
          <Typography
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer", color: "black"}}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            BitOlx
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              
              sx={{
                display: { xs: "block", md: "none"},
                color:"black"
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu(page);
                  }}
                  sx={{ xs: "none",my:3,mx:"auto", color: "white", display: "block" ,color:"black",fontWeight:900,fontSize:"1rem"}}
                >
                  <Typography textAlign="center" sx={{textTransform:"none"}}>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RecyclingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 ,color:"black"}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".2rem",
              color:"black",
              fontSize:"1rem"
            }}
          >
            BitOlx
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  handleCloseNavMenu(page);
                }}
                sx={{ xs: "none",my:3,mx:"auto", color: "white", display: "block" ,color:"black",fontWeight:900,fontSize:"1rem",textTransform:"none"}}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {localStorage.getItem("Token") != null ? (
            <Box className="flex gap-4">
              <IconButton aria-label="cart" onClick={handleWishlist}>
                  <StyledBadge badgeContent={WishListCount} color="secondary">
                    <ShoppingCartIcon  className=" to-black"/>
                  </StyledBadge>
                </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {User?.split(" ")[0][0].toUpperCase()}
                    {User?.split(" ")[1][0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu(setting);
                    }}
                  >
                    <Typography textAlign="center" sx={{textTransform:"none"}}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Stack spacing={2} direction="row">
              <ColorButton
                variant="contained"
                onClick={() => {
                  navigate("/SignUp");
                }}
                sx={{fontWeight:800,textTransform:"none"}}
              >
                Sign Up
              </ColorButton>
              <BootstrapButton
                variant="contained"
                disableRipple
                onClick={() => {
                  navigate("/LogIn");
                }}
                sx={{color:"white",fontWeight:800,borderColor:"black"}}
              >
                Log In
              </BootstrapButton>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
