import { createContext, useEffect, useState } from "react";
import callApi from "../use-ables/CallApi";

const DataContext = createContext();
const DataContextProvider = (props) => {
  //declarations
  const [intialData, setInitialData] = useState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentDetailPageID, setCurrentDetailPageID] = useState();
  const [cartData, setCartData] = useState(null);
  const [inSearchMode, setInSearchMode] = useState(false);
  const [onSearchCalled, setOnSearchCalled] = useState(false);
  const [descMode, setDescMode] = useState(false);
  const [offsetLimit, setOffsetLimit] = useState(1);
  const env = "https://fakestoreapi.com/";
  //async task's
  const setIntialData = async () => {
    try {
      let iniRes;
      let apiToCall;
      if (!descMode) {
        apiToCall = `${env}products?limit=${offsetLimit * 5}`;
      } else {
        setInitialData(null);
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
    if (!cartData) {
      const localData = JSON.parse(localStorage.getItem("cart_data"));
      if (localData) setCartData(localData);
    }
  }, [offsetLimit, descMode, onSearchCalled]);

  // <<----- async task end's ------>>

  function setDetailPageID(id) {
    setCurrentDetailPageID(id);
  }

  function activeDescMode(value) {
    if(value !== descMode)  setInitialData(null)
    setDescMode(value);
  }

  function addToCart(id, size, title, image, coustomId, quantity = 1) {
    const newPayload = { id, quantity, size, title, image, coustomId };
    const localData = JSON.parse(localStorage.getItem("cart_data"));
    if (localData && localData.length > 0) {
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].id === id && localData[i].size === size) {
          localData[i].quantity++;
          localStorage.setItem("cart_data", JSON.stringify(localData));
          setCartData(localData);
          return;
        }
      }
      localData.push(newPayload);
      localStorage.setItem("cart_data", JSON.stringify(localData));
      setCartData(localData);
    } else {
      localStorage.setItem("cart_data", JSON.stringify([newPayload]));
      setCartData([newPayload]);
    }
  }

  function removeProductFromCart(coustomId, size) {
    let temp = [];
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].coustomId === coustomId && size === cartData[i].size) {
        continue;
      } else temp.push(cartData[i]);
    }
    setCartData(temp);
    localStorage.setItem("cart_data", JSON.stringify(temp));
  }

  async function getCategory() {
    const res = await callApi(`${env}products/categories`);
    return res;
  }
  async function getAllData() {
    const res = await callApi(`${env}products`);
    return res;
  }
  async function onSearchClick(val) {
    const searchAble = val.split(" ");
    const temp = [];
    if (intialData) {
      if (val === "") {
        setInitialData(null)
        setInSearchMode(false);
        setOnSearchCalled(!onSearchCalled);
      } else {
        setInitialData(null)
        setInSearchMode(true);
        const data = await getAllData();
        for (let i = 0; i < searchAble.length; i++) {
          for (let j = 0; j < data.length; j++) {
            const title = data[j].title.split(" ");
            for (let k = 0; k < title.length; k++) {
              if (searchAble[i].toLowerCase() === title[k].toLowerCase())
                temp.push(data[j]);
            }
          }
        }
      }
    }
    setInitialData(temp);
  }

  const cartOpenClose = (value) => setIsCartOpen(value);
  // listening to scroll event on page for infinite scroll
  window.addEventListener("scroll", (e) => {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      window.location.pathname === "/" &&
      !descMode &&
      !inSearchMode && offsetLimit<=4
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
        onSearchClick,
        sendSizeDetails,
        inSearchMode,
        addToCart,
        getCategory,
        activeDescMode,
        inSearchMode,
        isCartOpen,
        cartOpenClose,
        removeProductFromCart,
        cartData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataContextProvider };
