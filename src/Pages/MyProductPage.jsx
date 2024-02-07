import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MyProduct() {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  const MyProduct = async () => {
    const Productdata = await axios.get(
      "https://bit-olx-backend.onrender.com/api/v1/Product/GetMyProducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setProduct(Productdata.data.Products);
  };
  const handleClick = async (id) => {
      const response = await axios.delete(`https://bit-olx-backend.onrender.com/api/v1/Product/DeletProduct/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
    toast.success(response.data.message)
    setProduct(Product.filter((prod)=>prod._id!=id))
  }
  useEffect(() => {
    if(localStorage.getItem("Token")===null)navigate("/LogIn")
    MyProduct();
  }, []);
  return (
    <div className=" bg-black min-h-screen">
      <div className=" mx-auto w-3/4 bg-black sm:pb-8">
        <ul role="list" className="divide-y divide-gray-100 pt-24">
          {Product?.map((product) => (
            <li
              key={product.ProductCreatedAt}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={product.ProductImage}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white">
                    {product.ProductCreatedAt}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-warning-100">
                    {product.ProductDescription}
                  </p>
                </div>
              </div>
              <div className=" shrink-0 sm:flex sm:flex-col sm:items-end flex flex-col justify-end items-center gap-2">
                <Button
                onClick={()=>{handleClick(product._id)}}
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "800",
                    ":hover": { color: "black", backgroundColor: "white" },
                  }}
                  endIcon={<DeleteIcon />}
                  fullWidth
                >
                  Delete
                </Button>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "red",
                    fontWeight: "800",
                    ":hover": { color: "black", backgroundColor: "red" },
                  }}
                  endIcon={<EditIcon />}
                  fullWidth
                  onClick={()=>{navigate(`/EditProduct/${
                    product._id
                  }`)}}
                >
                  Edit
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
