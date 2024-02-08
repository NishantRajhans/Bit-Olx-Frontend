import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Button from '@mui/material/Button';
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { WishListNumber } from "../Recoil/WishListNumber";
const reviews = { href: "#", average: 4, totalCount: 117 };
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [Product, setProduct] = useState();
  const[WishListCount,setWistListCount]=useRecoilState(WishListNumber)
  const location = useLocation();
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
  const handleClick=async (id) => {
    const product = await axios.put(
      `https://bit-olx-backend.onrender.com/api/v1/User/AddToWishList`,
      {
        ProductId:id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    if(product.data.success==false)toast.error(product.data.message)
        else toast.success(product.data.message)
    if(product.data.message!="Product already present in wish list")setWistListCount(WishListCount+1)
  }
  useEffect(() => {
    ProductDetail();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <div className=" pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-20 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
            <img
              src={Product?.ProductImage}
              alt={Product?.ProductImage}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* product? info */}
        <div className="bg-[#5B5A5A] mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Product Title
            </h1>
            <h3 className=" text-warning-100">{Product?.ProductTitle}</h3>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h3 className=" text-white">Product Price</h3>
            <p className="text-3xl tracking-tight text-warning-100">
              {Product?.ProductPrice+" Rs"}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="text-white">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-warning-100"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              sx={{ mt:5, mb: 2,backgroundColor:"red",color:"white",fontWeight:"800",":hover":{backgroundColor:"red",color:"black"}}}
              onClick={()=>{
                handleClick(Product?._id)
              }}
            >
              Add To WishList
            </Button>
          </div>

          <div className="py-4 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="text-white">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-warning-100">
                  {Product?.ProductDescription}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-white">Product Created On</h3>
              <div className="space-y-6">
                <p className="text-base text-warning-100">
                  {Product?.ProductCreatedAt}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-white" >Seller Details</h3>
              <div className=" space-y-1">
                <p className=" text-warning-100">
                  {Product?.ProductSeller.FirstName}{" "}
                  {Product?.ProductSeller.LastName}
                </p>
                <p className="text-base text-white">
                   Phone Number: <span className="text-black font-semibold">{Product?.ProductSeller.PhoneNumber}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
