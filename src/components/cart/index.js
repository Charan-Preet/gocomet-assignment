import { useContext, useEffect, useState } from "react";
import DataContext from "../../context";
import "./style.css";

export default function Cart() {
  const { cartOpenClose, cartData, removeProductFromCart } =
    useContext(DataContext);
  const [data, setData] = useState(null);
  const check = cartData;
  useEffect(() => {
    setData(cartData);
  }, [check]);

  document
    .querySelector("#cart-data-table")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.matches(".remove-button")) {
        const size = event.target.attributes.class.nodeValue.split(" ")[0];
        const id = event.target.id;
        removeProductFromCart(id, size);
      }
    });

  const closeIcon = () => (
    <div className="cursor-pointer" onClick={() => cartOpenClose(false)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );

  const displayCartData = data?.map((ele) => (
    <tr>
      {" "}
      <td>{ele.title}</td>
      <td>{ele.quantity}</td>
      <td>{ele.size}</td>
      <td>
        <img src={ele.image} />
      </td>
      <td>
        <button
          type="button"
          id={ele.coustomId}
          className={`${ele.size} remove-button text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
        >
          Remove
        </button>
      </td>
    </tr>
  ));

  const displayTable = () => {
    return (
      <table id="cart-data-table">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Image</th>
          <th>
            <div />
          </th>
        </tr>
        {displayCartData}
      </table>
    );
  };

  return data?.length > 0 ? (
    <div>
      <div className="header flex flex-row w-full justify-between">
        <div>
          <h4 className="font-medium leading-tight text-3xl mt-0 mb-2 text-black-600 mt-2 ml-3 text-center">
            Cart
          </h4>
        </div>

        {closeIcon()}
      </div>
      <div className="flex justify-center">{displayTable()}</div>
    </div>
  ) : (
    <>
      <div className="flex justify-between">
        <div />
        {closeIcon()}
      </div>
      <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-black-600 mt-2 text-center">
        Add items to the cart
      </h2>
    </>
  );
}
