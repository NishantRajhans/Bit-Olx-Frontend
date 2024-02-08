import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState } from "recoil";
import { WishListNumber } from "../Recoil/WishListNumber";
export default function WishList() {
  const [WishList, setWishList] =useState([])
  const [WistListCount, setWistListCount] =useRecoilState(WishListNumber)
  const navigate=useNavigate()
  const WishListCall=async()=>{
    const WishListData=await axios.get(
      "https://bit-olx-backend.onrender.com/api/v1/User/GetAllWishListProducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setWishList(WishListData?.data.User[0].WishList);
    setWistListCount(WishListData?.data.User[0].WishList?.length);
  }
  const handleclick=async(id)=>{
    const WishListData = await axios.delete(
      `https://bit-olx-backend.onrender.com/api/v1/User/RemoveFromWishList/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    if(WishListData.data.success==false)toast.error(WishListData.data.message)
        else toast.success(WishListData.data.message)
    setWistListCount(WishListData?.data.User.WishList?.length);
    WishListCall();
  }
  useEffect(() => {
    WishListCall()
  }, []);
  return (
    <div className=" bg-black mt-0 h-screen">
      <div className=" mx-auto w-3/4 bg-black sm:pb-8">
        <ul role="list" className="divide-y divide-gray-100 pt-24">
          {WishList?.map((wishlist) => (
            <li
              key={wishlist.ProductCreatedAt}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={wishlist.ProductImage}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white">
                    {wishlist.ProductCreatedAt}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-warning-100">
                    {wishlist.ProductDescription}
                  </p>
                </div>
              </div>
              <div className=" shrink-0 sm:flex sm:flex-col sm:items-end flex flex-col justify-end items-center gap-2">
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "red",
                    fontWeight: "800",
                    ":hover": { color: "black", backgroundColor: "red" },
                  }}
                  onClick={()=>handleclick(wishlist._id)}
                  endIcon={<CancelIcon />}
                  fullWidth
                >
                  Remove
                </Button>
                <Button
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "800",
                    ":hover": { color: "black", backgroundColor: "white" },
                  }}
                  onClick={()=>{navigate(`/Product/${wishlist._id}`)}}
                  endIcon={<SearchIcon  />}
                  fullWidth
                >
                  View
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
