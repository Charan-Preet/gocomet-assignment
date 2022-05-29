import { createContext, useEffect, useState } from "react";
import callApi from "../use-ables/CallApi";

const DataContext = createContext();
const DataContextProvider = (props) => {
  //declarations
  const [intialData, setInitialData] = useState();
  const [currentDetailPageID, setCurrentDetailPageID] = useState();
  const [descMode, setDescMode] = useState(false);
  const [offsetLimit, setOffsetLimit] = useState(1);
  const env = "https://fakestoreapi.com/";
  //async task's
  const setIntialData = async () => {
    try {
      setInitialData(null);
      let iniRes;
      let apiToCall;
      if (!descMode) {
        apiToCall = `${env}products?limit=${offsetLimit * 5}`;
      } else {
        apiToCall = `${env}products?sort=desc`;
      }
      iniRes = await callApi(apiToCall);
      setInitialData(iniRes);
    } catch (e) {
      console.error(e);
    }
  };

  const getSingleProduct = async (id) => {
    const res = await callApi(`${env}products/${id}`);
    return res;
  };

  useEffect(() => {
    setIntialData();
  }, [offsetLimit, descMode]);

  // <<----- async task end's ------>>

  function setDetailPageID(id) {
    setCurrentDetailPageID(id);
  }

  function activeDescMode(value) {
    setDescMode(value);
  }

  function addToCart(id, size, quantity = 1) {
    const newPayload = { id, quantity, size };
    const localData = JSON.parse(localStorage.getItem("cart_data"));
    if (localData && localData.length > 0) {
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].id === id && localData[i].size === size) {
          localData[i].quantity++;
          localStorage.setItem("cart_data", JSON.stringify(localData));
          return;
        }
      }
      localData.push(newPayload);
      localStorage.setItem("cart_data", JSON.stringify(localData));
    } else {
      localStorage.setItem("cart_data", JSON.stringify([newPayload]));
    }
  }

  async function getCategory() {
    const res = await callApi(`${env}products/categories`);
    return res;
  }
  // listening to scroll event on page for infinite scroll
  window.addEventListener("scroll", (e) => {
    e.preventDefault();
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      window.location.pathname === "/" &&
      !descMode
    ) {
      setOffsetLimit(offsetLimit + 1);
    }
  });
  function sendSizeDetails() {
    return ["xs", "x", "m", "l", "xl"];
  }
  return (
    <DataContext.Provider
      value={{
        intialData,
        setDetailPageID,
        getSingleProduct,
        sendSizeDetails,
        addToCart,
        getCategory,
        activeDescMode,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataContextProvider };
