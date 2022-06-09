import { useContext, useState } from "react";
import DataContext from "../../context";
import Select from "react-select";
import "./style.css";

export default function FilterSearch() {
  const { activeDescMode, onSearchClick, inSearchMode,intialData } =
    useContext(DataContext);
  const [filterPref, setFilterPref] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const category = [
    { value: "Price high to low", label: "Price high to low" },
    { value: "Price low to high", label: "Price low to high" },
  ];
  const setFilter = (e) => {
    const value = e.value;
    setFilterPref(value);
    if (e.value === "Price high to low") activeDescMode(true);
    else activeDescMode(false);
  };
  return (
    <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center items-center mt-2 ml-1 mr-1 sm:ml-0 sm:mr-0">
      <div className="flex justify-between search-product mr-2">
        <form className="flex flex-row">
          <input
          onKeyDown={(e) => {
            if(intialData){
              if(e.key === "Enter"){
                e.preventDefault();
                if(inSearchMode){ onSearchClick("")
                setSearchValue("")
              }
                else onSearchClick(searchValue)
              }
            }
          }}
            value={searchValue}
            onChange={(e) => {
              e.preventDefault();
              setSearchValue(e.target.value);
            }}
            placeholder="search"
          />
          <div className="flex item-center">
            <button
              type="button"
              onClick={() => {
                  if(inSearchMode){ onSearchClick("")
                  setSearchValue("")
                }
                  else onSearchClick(searchValue)
              }}
              class={`${!intialData && "disable-button"} text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-7 py-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              {!inSearchMode ? (
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
                  d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                  fill="currentColor"
                />
              </svg>
              ):(<span>Clear</span>)}
            </button>
          </div>
        </form>
      </div>
      <div className="filter ml-2 mt-4 sm:mt-0 w-full sm:w-auto mr-11 ml-11 sm:mr-0 sm:ml-0">
          <Select
            value={filterPref}
            onChange={(e) => {
              if(intialData) setFilter(e)
            }}
            options={category}
          />
      </div>
    </div>
  );
}
