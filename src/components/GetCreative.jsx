import React, { useState } from "react";
import { categories } from "../utils/data";
import axios from "axios";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { FaMagic } from "react-icons/fa";

const Create = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const createHandler = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/dalle/generate/${title}`
    );
    if (res.data) {
      setLoading(false);
      setDestination(imageurl);
      setImageurl(res.data.image.src);
      setShowModal(true);
    }
  };

  const generateText = async () => {
    setLoading(true);

    const res = axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/dalle/generate-text`
    );
    const response = await res;
    console.log(response.data);
    setTitle(response.data);
    setLoading(false);
  };

  const savePin = () => {
    if (title && about && imageurl && category) {
      setError(false);
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        imageURL: imageurl,
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
      setError(false);
    } else {
      setError(true);
      setTimeout(() => {}, 2000);
    }
  };

  return (
    <div className="flex flex-col  items-center mt-5 lg:h-4/5  ">
      <div className=" bg-white dark:bg-[#222831] flex items-center lg:p-5 p-3 lg:w-4/5 w-full mb-2 text-black ">
        <input
          type="text"
          placeholder="Add your text"
          value={title}
          className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 w-full dark:bg-[#101314] dark:border-blue-900"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="button"
          className="bg-red-500 dark:bg-[#00ADB5] text-white font-bold p-2 rounded-full w-28 outline-none"
          onClick={createHandler}
        >
          Create
        </button>
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 dark:bg-[#00ADB5] mx-3 text-white font-bold p-3 rounded-full outline-none "
          onClick={generateText}
        >
          <FaMagic />
        </button>
      </div>
      {loading && <Spinner />}
      {showModal && (
        <div className=" flex lg:flex-row flex-col justify-center items-center  lg:p-5 p-3 lg:w-4/5  w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7  w-full">
            <div className="w-full flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3   h-420 ">
              <img
                src={imageurl}
                alt="Generated img"
                className="w-full h-full text-black text-center "
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
              type="text"
              placeholder="Add your title"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 dark:bg-[#101314]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tell everyone what your Pin is about"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 dark:bg-[#101314] "
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <input
              type="url"
              placeholder="Add a destination link"
              onChange={(e) => setDestination(e.target.value)}
              value={imageurl}
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 dark:bg-[#101314]"
            />

            <div className="flex flex-col text-black">
              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">
                  Choose Pin Category
                </p>
                <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                  className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 dark:bg-[#101314] rounded-md cursor-pointer"
                >
                  <option
                    value="others"
                    className="sm:text-bg bg-white dark:bg-[#222831]"
                  >
                    Select Category
                  </option>
                  {categories.map((item) => (
                    <option
                      key={item.name}
                      className="text-base border-0 outline-none capitalize bg-white  dark:bg-[#222831] text-black "
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end items-end mt-5">
                <button
                  type="button"
                  onClick={savePin}
                  className="bg-red-500 dark:bg-[#00ADB5] text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                  Save Pin
                </button>
              </div>
              {error && (
                <p className="text-red-600 text-center">
                  Please fill all the fields
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
