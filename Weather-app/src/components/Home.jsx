import React,{useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import search from "../assets/icons/search.svg"
import {useStateContext} from "../context/index"
import Backgroundlayout from "./Backgroundlayout"
import Weathercard from './Weathercard'
import Minicard from './Minicard'
import {getCurrentDateTime} from '../Utils/Currentdate'
import Animation from "../assets/Animation - 1706622572822 (1).json"
import  Lottie  from 'lottie-react';




const Home = () => {
    const navigate = useNavigate();
    const userid = localStorage.getItem("authuserid")
    const [input, setInput] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);
    const [showfavourites,setShowfavourites]= useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { weather, thislocation, values, place, setPlace,loading,setLoading } = useStateContext();


   

    const submitcity = () => {
        setPlace(input);
        setInput("");
        
    };
    const handleCityClick = (city) => {
        console.log("fjsdhgkjhb");
        setPlace(city); 
        
      };

    const Addfavourite=async()=>{
        const response = await axios.post("http://localhost:5000/addfavourite",{
            thislocation,
            userid
        })
        if(response.data.message){
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 3000);


        }


    }

    const Showfavourite=async()=>{
        const response = await axios.get("http://localhost:5000/showfavourite",{
            params: { userid: userid },
            
        });
        if(response.data){
            console.log(response.data.cities);
            setShowfavourites(response.data.cities);
        }




    }
    const toggleDropdown = async () => {
        if (!dropdownVisible) {
          await Showfavourite();
        }
        setDropdownVisible(!dropdownVisible);
      };
      

    const history = () => {
        console.log("gdsfggsgsg");
        function convertToISO(dateString) {
            const date = new Date(dateString);
            console.log(date);
            date.setDate(date.getDate()+1);
            const year = date.getFullYear();
            const month = String(date.getMonth()-1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}T00:00:00`;
        }
        function convertToISO2(dateString) {
            const date = new Date(dateString);
          
            
            date.setDate(date.getDate() - 5);
          
            const year = date.getFullYear();
            const month = String(date.getMonth()-1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
          
            return `${year}-${month}-${day}T00:00:00`;
          }


        let time = getCurrentDateTime(); // Assuming getCurrentDateTime is defined elsewhere
        console.log(time);
        const isoDate = convertToISO(time);
        const startDate = convertToISO2(time)    
        console.log(isoDate);
        console.log(startDate);
        setLoading(true)
        navigate(`/history?enddate=${isoDate}&startdate=${startDate}`);
    };

    return (
        <div className='w-full h-screen text-white px-8'>
            <nav className='w-full p-3 flex justify-between items-center'>
                <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
                <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
                    <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
                    
                    <input
                        type="text"
                        placeholder='Search city'
                        className='focus:outline-none w-full text-[#212121] text-lg'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button onClick={submitcity} className="bg-blue-500 text-white py-1 px-4 rounded-md">
                        Search
                    </button>
                    
                    
                </div>
                <button className="focus:outline-none">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                </div>
                </button>
                   
            </nav>
             <div className="mt-2 flex space-x-2 flex justify-end">
          <button onClick={Addfavourite} className="bg-blue-500 text-white px-4 py-2 rounded">Add Favourite</button>
          <div class="relative inline-block text-left">
  <div>
    
  <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button"
        aria-expanded={dropdownVisible}
        aria-haspopup="true"
      >
        Show Favourites
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
  </div>
  {dropdownVisible&&(
            <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <ul>
                {showfavourites.map((city, index) => (
                  <li key={index}>
                    <button>
                    <a
                      
                      className="block p-2 bg-white text-black rounded shadow"
                      onClick={() => handleCityClick(city)}
                    >
                      {city}
                    </a>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  

  )}
  
  
</div>

          <div>
          <div style={{height:"50px",width:"100px"}}>
                {showAnimation && (
                    <Lottie animationData={Animation} loop={false} />
                )}

                </div>
       
      
    </div>
    
        </div>
        <div className='flex justify-end'>
       <ul>
       
      </ul>

       </div>
            <Backgroundlayout />
            <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
               

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div>
                            <Weathercard
                                place={thislocation}
                                windspeed={weather.wspd}
                                humidity={weather.humidity}
                                temperature={weather.temp}
                                heatIndex={weather.heatindex}
                                iconString={weather.conditions}
                                conditions={weather.conditions}
                            />
                            <div className='flex justify-center'>
                                <button onClick={history} className="bg-blue-500 text-white text-lg py-2 px-4 rounded-md">
                                    Weather History
                                </button>
                            </div>
                        </div>
                       
                                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                                    {values?.slice(1, 8).map(curr => (
                                        <Minicard
                                            key={curr.datetime}
                                            time={curr.datetime}
                                            temp={curr.temp}
                                            iconString={curr.conditions}
                                        />
                                    ))}
                                </div>
                                <div className='flex justify-center ml-[272px] '>
                                    <h1 className='text-2xl'>This is Weather Forecast</h1>
                                </div>
                           
                        
                    </>
                )}
            </main>
            
        </div>
        
    );
};

export default Home;
