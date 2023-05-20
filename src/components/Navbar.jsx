import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch, IoMdCreate } from "react-icons/io";
import { BsFillMoonFill, BsSun } from "react-icons/bs";

const Navbar = ({
  searchTerm,
  setSearchTerm,
  user,
  toggleTheme,
  isDarkTheme,
}) => {
  const navigate = useNavigate();
  

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <button
          onClick={toggleTheme}
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center dark:bg-[#00ADB5] uppercase outline-none focus:outline-none"
        >
          {isDarkTheme ? <BsSun /> : <BsFillMoonFill />}
        </button>
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white dark:bg-[#222831] border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="p-2 w-full bg-white dark:bg-[#222831] outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user?.image}
              alt="user-pic"
              className="w-14 h-12 rounded-lg "
            />
          </Link>
          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center dark:bg-[#00ADB5]"
          >
            <IoMdAdd />
          </Link>
          <Link
            to="/get-creative"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center dark:bg-[#00ADB5]"
          >
            <IoMdCreate />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
