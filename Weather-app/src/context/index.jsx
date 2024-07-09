import {useContext, createContext,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useLocation } from "react-router-dom";

const StateContext = createContext();

export const StateContextProvider = ({children})=>{

    const navigate = useNavigate()
    const token = localStorage.getItem("authToken");
    if(!token){
        navigate("/")
    } 
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState("Trivandrum");
    const [thislocation, setLocation] = useState("");
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const enddate = searchParams.get('enddate');
    const startdate= searchParams.get("startdate")

    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': "52132b5e3fmsh1f3d8b908280c98p1afc51jsn996fdac2e794",
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = Object.values(response.data.locations)[0];
            console.log(thisData);
            setLocation(thisData.address);
            console.log(thislocation);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (e) {
            console.error(e);
            // If the API throws an error
            alert('This place does not exist');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherHistory = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/history',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
                endDateTime: enddate,
                startDateTime: startdate
            },
            headers: {
                'X-RapidAPI-Key': "52132b5e3fmsh1f3d8b908280c98p1afc51jsn996fdac2e794",
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = Object.values(response.data.locations)[0];
            console.log(thisData);
            setLocation(thisData.address);
            console.log(thislocation);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (e) {
            console.error(e);
            // If the API throws an error
            alert('This place does not exist');
        }  finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (enddate&&startdate) {
            
            fetchWeatherHistory();
            
        } else {
            fetchWeather();
            
        }
    }, [place, enddate,startdate]);

  


        return(
            <StateContext.Provider value ={{
            weather,
            setPlace,
            setLoading,
            values,
            thislocation,
            place,
            loading
            }}>
                {children}
            </StateContext.Provider>
        )
    


    

    




}
export const useStateContext = () => useContext(StateContext)