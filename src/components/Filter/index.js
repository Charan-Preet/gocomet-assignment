import { useContext, useState } from "react";
import DataContext from "../../context";
import Select from "react-select";
import "./style.css";

export default function FilterSearch() {
  const { activeDescMode } = useContext(DataContext);
  const [filterPref, setFilterPref] = useState("");
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
    <div className="flex flex-row justify-center items-center mt-2 ml-1 mr-1 sm:ml-0 sm:mr-0">
      <div className="search-product mr-2">
        <input placeholder="search" />
      </div>
      <div className="filter ml-2">
        <Select
          value={filterPref}
          onChange={(e) => setFilter(e)}
          options={category}
        />
      </div>
    </div>
  );
}
