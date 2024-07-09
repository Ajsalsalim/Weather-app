import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import search from "../assets/icons/search.svg"
import {useStateContext} from "../context/index"
import Backgroundlayout from "./Backgroundlayout"
import Weathercard from './Weathercard'
import Minicard from './Minicard'


const History = () => {
    const navigate = useNavigate();
        
    const [input, setInput] = useState("");
    const { weather, thislocation, values, place, setPlace,loading,setLoading } = useStateContext();

    console.log(values);

    const submitcity = () => {
        setPlace(input);
        setInput("");
        navigate("/weather")
        
    };


    const forecast =()=>{
        setLoading(true)
        navigate("/weather")
    }


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
    </nav>
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
                                <button onClick={forecast} className="bg-blue-500 text-white text-lg py-2 px-4 rounded-md">
                                    Weather Forecast
                                </button>
                            </div>
                        </div>
                       
                                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                                    {values?.map(curr => (
                                        <Minicard
                                            key={curr.datetime}
                                            time={curr.datetime}
                                            temp={curr.temp}
                                            iconString={curr.conditions}
                                        />
                                    ))}
                                </div>
                                <div className='flex justify-center ml-[272px] '>
                                    <h1 className='text-2xl'>This is Weather History</h1>
                                </div>
                           
                        
                    </>
                )}
              
          
        
    </main>
</div>
  )
}

export default History
