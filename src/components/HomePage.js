import DataContext from "../context";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const { intialData, setDetailPageID } = useContext(DataContext);
  const ref = useRef(null);

  useEffect(() => {
    const el2 = ref.current;
    //event deligation
    el2?.addEventListener("click", (event) => {
      if (event.target.matches(".checkout-button")) {
        const id = event.target.id;
        setDetailPageID(id);
        navigate(`/product/${id}`);
      }
    });
  }, []);
  const loadingMessage = () => {
    return(
      <>
      <div className='text-center'>
        Loading...
        <br/>
        This is not us it depends upon internet speed and responce time of api
        </div>
       
      </>
    )  
  }
  
  const displayData = intialData?.map((data) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg ml-6 mr-6 mt-8">
        <img className="w-full" src={data.image} alt={`${data.image} image`} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">{data.description}</p>
        </div>
        <div className="ml-5">
          <strong>Price: </strong>
          <span>₹{data.price}</span>
        </div>
        <br />
        <div className="ml-5">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span
              id={data.id}
              className="checkout-button relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
            >
              Check out!
            </span>
          </button>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #category:
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`#${data.category}`}
          </span>
        </div>
      </div>
    );
  });
  return (
    <div
      className="flex flex-wrap justify-around items-center mt-4"
      id="mainPage"
      ref={ref}
    >
      {
        intialData?(
          displayData
        ):(loadingMessage())
      }
    </div>
  );
}
