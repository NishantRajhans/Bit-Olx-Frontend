import {Route,Routes}from"react-router-dom"
import "./App.css"
import AllProductsPage from "./Pages/AllProductsPage"
import CreateProductPage from "./Pages/CreateProductPage"
import ForgetPasswordPage from "./Pages/ForgetPasswordPage"
import HomePage from "./Pages/HomePage"
import LogInPage from "./Pages/LogInPage"
import MyProductPage from "./Pages/MyProductPage"
import ProductPage from "./Pages/ProductPage"
import ProfilePage from "./Pages/ProfilePage"
import SignUpPage from "./Pages/SignUpPage"
import WishListPage from "./Pages/WishListPage"
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
       <Toaster/>
      <NavBar></NavBar>
      <Routes>
        <Route path='/Home' element={<HomePage></HomePage>}></Route>
        <Route path='/LogIn' element={<LogInPage></LogInPage>}></Route>
        <Route path='/SignUp' element={<SignUpPage></SignUpPage>}></Route>
        <Route path='/ForgetPassword' element={<ForgetPasswordPage></ForgetPasswordPage>}></Route>
        <Route path='/CreateProduct' element={<CreateProductPage></CreateProductPage>}></Route>
        <Route path='/AllProducts' element={<AllProductsPage></AllProductsPage>}></Route>
        <Route path='/Product/:id' element={<ProductPage></ProductPage>}></Route>
        <Route path='/MyProduct' element={<MyProductPage></MyProductPage>}></Route>
        <Route path='/Profile' element={<ProfilePage></ProfilePage>}></Route>
        <Route path='/WishList' element={<WishListPage></WishListPage>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
