import React from "react";

const Button = ({ loading, title, onClick }) => {
  return (
    <button
      type="Submit"
      className="cursor-pointer  bg-gradient-to-r from-[#20BF55] to-[#01BAEF]  rounded-full px-5 py-1   hover:bg-gradient-to-r  hover:from-purple-400  hover:via-pink-500  hover:to-red-500 text-white font-bold"
      onClick={onClick}
    >
      {loading ? (
        <div className="grid gap-1">
          <div className="flex items-center justify-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
