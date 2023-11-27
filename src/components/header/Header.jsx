import React, { useEffect, useRef, useState,useContext } from "react";
import { useSelector } from "react-redux";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { allItems } from "../../constants";
import { logo, egyptFlag, CartIcon } from "../../assets/index";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsData } from "../../firebase/getProducts";
import { authContext } from "../../Contexts/isAuth";
import {logout} from "../../firebase/auth"
import MenuPopupState from '../../utils/Dropdown';

const Header = () => {

  const products = useSelector((state) => state.amazonReducer.products);
  const [loading, setLoading] = useState(true);
const {isLogin,setLogin,displayName }= useContext(authContext)
// const navigate = useNavigate();
const dispatch = useDispatch();
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });
  }, [ref, showAll]);

  // const handleLogout = async () => {
  //   await logout();
  //   localStorage.removeItem('token');
  //   setLogin(false); 
  //   navigate('/signin');
  // };


  return (
    <div className="sticky top-0 z-50 bg-black">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex md:justify-between items-center gap-2 md:gap-4 lgl:gap-2 xl:gap-4">
        {/* ===================== Header Image Start here ======================== */}
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logoImage" />
          </div>
        </Link>
        {/* ===================== Header Image End here ========================== */}
        {/* ===================== Header Deliver Start here ====================== */}
        <div className="hidden md:inline-flex headerHover">
          <LocationOnOutlinedIcon />
          <p className="flex flex-col text-xs text-lightText font-light">
            Deliver to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              Egypt
            </span>
          </p>
        </div>
        {/* ===================== Header Deliver End here ======================== */}
        {/* ===================== Header Search Start here ======================== */}
        <div className="hidden lgl:inline-flex h-10 rounded-md flex-grow relative">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All{" "}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </span>
          {showAll && (
            <div>
              <ul
                ref={ref}
                className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50"
              >
                {allItems.map((item) => (
                  <li
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                    key={item._id}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
            placeholder="Search Amazon.eg"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        {/* ===================== Header Search End here ========================== */}
        {/* ===================== Header Signin Start here ======================== */}
        <div className="flex flex-col items-start justify-center headerHover">
          <p></p>
          <p className="hidden md:inline-flex text-sm font-semibold -mt-1 text-whiteText">
            <img src={egyptFlag} alt="Egypt Flag" width="20px" height="20px" />
            EN{" "}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </p>
        </div>
                    {(isLogin)?(
                   
          <div className="flex flex-col items-start justify-center headerHover">
            <p className="text-xs text-lightText font-light"></p>
             
            <p className="hidden md:inline-flex text-sm font-semibold -mt-1 text-whiteText">
              
              <span>
              <MenuPopupState logout={logout} setLogin={setLogin}/>
              </span>
            </p>
           

          </div>)
        :(<Link to="/signin">
          <div className="flex flex-col items-start justify-center headerHover">
            <p className="text-xs text-lightText font-light">Hello,sign in </p>
            <p className="hidden md:inline-flex text-sm font-semibold -mt-1 text-whiteText">
              Accounts & Lists{" "}
              
              <span>
              </span>
            </p>
          </div>
        </Link> )}

{/* 

      





        {/* ===================== Header Signin End here ========================== */}
        {/* ===================== Header Orders Start here ======================== */}
        <Link to="/orders">
          <div className="hidden mdl:flex flex-col items-start justify-center headerHover">
            <p className="text-xs text-lightText font-light">Returns</p>
            <p className="text-sm font-semibold -mt-1 text-whiteText">
              & Orders
            </p>
          </div>
        </Link>
        {/* ===================== Header Orders End here ========================== */}
        {/* ===================== Header Cart Start here ========================== */}
        <Link to="/cart">
          <div className="relative flex items-center headerHover">
            <img
              src={CartIcon}
              alt="cartImg"
              className="w-auto object-cover h-8"
            />
            <span
              className="absolute text-amazon_yellow text-sm top-0 left-1/3 transform -translate-x-1/2 font-semibold ml-1"
              style={{ fontSize: "16px" }}
            >
              {products.length > 0 ? products.length : 0}
            </span>
            <p className="text-sm text-white font-bold">Cart</p>
          </div>
        </Link>

        {/* ===================== Header Cart End here ============================ */}
        {/* ===================== Header Logout Start here ======================== */}

        {/* <div className="flex flex-col justify-center items-center headerHover relative">
          <LogoutIcon />
          <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">
            Log out
          </p>
        </div> */}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
