import DataContext from "../context";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./common.style.css";

export default function DetailView() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [getSize, setGetSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null);
  const { getSingleProduct, sendSizeDetails, addToCart } = useContext(
    DataContext
  );

  const getData = async (id) => {
    const data = await getSingleProduct(id);
    setData(data);
  };

  useEffect(() => {
    const sizeData = sendSizeDetails();
    setGetSize(sizeData);
    const id = location.pathname.split("/")[2];
    setCurrentItemId(id);
    getData(id);
  }, []);

  const displaySizeChart = getSize?.map((ele) => {
    return (
      <div
        id={(Math.random() * 49 + 1).toFixed(3)}
        className="size-select-container size-circle-border rounded-full w-10 h-10 border-2 flex justify-center items-center cursor-pointer"
      >
        {ele.toUpperCase()}
      </div>
    );
  });
  //event handelings
  document.querySelector("#select-size")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.matches(".size-select-container")) {
      const id = e.target.id.toString();
      const collection = [];
      const element = document.getElementById(id);
      setSelectedSize(element.textContent);
      element.classList.add("selected-size");
      if (document.getElementsByClassName("selected-size").length > 1) {
        let temp = document.getElementsByClassName("selected-size");
        collection.push(...temp);
        for (let i = 0; i < collection.length; i++) {
          if (collection[i].attributes.id.value !== id)
            document
              .getElementById(collection[i].attributes.id.value)
              .classList.remove("selected-size");
        }
      }
    }
  });
  //event handeling end's

  const deliveryOptions = () => (
    <>
      <div className="flex flex-row">
        <h2 className="mt-1 font-bold leading-normal text-stone-800">
          Delivery Options
        </h2>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
            fill="currentColor"
          />
          <path
            d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
            fill="currentColor"
          />
          <path
            d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <br />
      <form className="pincode-collector" onsubmit="">
        <div className="flex">
          <div className="mb-3 xl:w-96">
            <div className="input-group relative flex w-full mb-4">
              <input
                type="number"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="enter pincode for validation"
                aria-label="enter pincode"
                aria-describedby="pincode"
                pattern="^[1-9][0-9]{5}$"
              />
              <button
                className="btn inline-block px-6 py-2.5 bg-pink-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                id="button-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  class="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
  const detailsDisplay = () => (
    <div className="w-70 flex flex-row justify-around flex-wrap">
      <div>
        {data ? (
          <img alt={data?.title} src={data?.image} width="350" />
        ) : (
          <span>Loading...</span>
        )}
      </div>
      <div className="md:ml-5">
        <div>
          <h1 className="text-2xl font-bold leading-normal mt-0 mb-1 text-stone-800 mt-8 text-center md:text-left">
            {data?.title}
          </h1>
          <p className="text-stone-400 mb-1">
            Category: <b>{data?.category}</b>
          </p>
          <div className="w-fit border flex flex-row justify-around p-1">
            <b>4.8</b>
            <div className="line-seperator ml-1 mr-1">|</div>
            <div className="line-seperator whitespace-nowrap">10 Ratings</div>
          </div>
          <br />
          <hr />
          <h1 className="mt-1 text-1xl font-bold leading-normal text-stone-600">
            Rs. {data?.price}
          </h1>
          <b className="small-details text-xs b">inclusive of all taxes</b>
          <h2 className="mt-1 font-bold leading-normal text-stone-600">
            Select Size
            <span className="ml-5 font-normal size-chart-text">Size Chart</span>
            <span className="ml-1 font-normal size-chart-text">{">"}</span>
          </h2>
          <br />
          <div
            id="select-size"
            className="flex flex-row md:space-x-4 set-size-selector-buttons"
          >
            {displaySizeChart}
          </div>
          <br />
          <div className="flex justify-center set-button-order">
            <button
              type="button"
              onClick={() => addToCart(currentItemId, selectedSize)}
              className={`add-to-cart sm:w-50 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${selectedSize ===
                "" && "opacity-50 pointer-events-none"}`}
            >
              <div className="flex flex-row sm:justify-start">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44771 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM12 12C9.23858 12 7 9.31371 7 6H9C9 8.56606 10.6691 10 12 10C13.3309 10 15 8.56606 15 6H17C17 9.31371 14.7614 12 12 12Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="ml-2">Add To Cart</div>
              </div>
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="checkout-cart inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              View Cart
            </button>
          </div>
          {deliveryOptions()}
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex justify-center mt-4 ml-2">{detailsDisplay()}</div>
  );
}
