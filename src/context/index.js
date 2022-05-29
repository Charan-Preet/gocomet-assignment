import { createContext, useEffect, useState } from "react";
import callApi from "../use-ables/CallApi";

const DataContext = createContext();
const DataContextProvider = (props) => {
  //declarations
  const [intialData, setInitialData] = useState();
  const [currentDetailPageID, setCurrentDetailPageID] = useState();
  const [descMode, setDescMode] = useState(false);
  const [filterPref, setFilterPref] = useState("");
  const [offsetLimit, setOffsetLimit] = useState(1);
  const env = "https://fakestoreapi.com/";
  //async task's
  const setIntialData = async () => {
    try {
      // if (!filterMode) {
      const iniRes = await callApi(`${env}products?limit=${offsetLimit * 5}`);
      setInitialData(iniRes);
      // } else {
      // return;
      // }
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
  }, [offsetLimit]);

  // <<----- async task end's ------>>

  function setDetailPageID(id) {
    setCurrentDetailPageID(id);
  }

  function activeDescMode() {
    setFilterPref("");
    setDescMode(true);
  }

  function activeFilterMode(value) {
    setDescMode(false);
    setFilterPref(value);
  }

  function addToCart(id, quantity = 1, size) {
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
  // listening to scroll event on page for infinite scroll
  window.addEventListener("scroll", (e) => {
    e.preventDefault();
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataContextProvider };
