import { useEffect, useState } from "react";
import "./style.css";

function App() {
    const [city, setCity] = useState("delhi");
    const [weatherData, setWeatherData] = useState(null);
    const currentDate = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDay();
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${day},${year}`;

    const API_KEY = "ae831fdc4f19843dcd865e51a09aedca";
    const fetchWeatherData = async() => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

            const data = await response.json();
            console.log(data);
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleInputChange = (event) => {

        console.log(event.target.value);
        setCity(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    }


    const getWeatherIconUrl = (main) => {
        switch (main) {
            case "Clouds":
                return "./images/cloudy.jpeg";
            case "Rain":
                return "./images/rainy.jpeg";
            case "Mist":
                return "./images/winter.jpeg";
            case "Haze":
                return "./images/sunny.jpeg";
            default:
                return null;
        }
    };


    return ( <
        >
        <
        div className = "container" >
        <
        div className = "sub-container" > {
            weatherData && ( < >
                <
                h1 > { formattedDate } < /h1> <
                h2 > { weatherData.name } < /h2> 




                <
                img src = { getWeatherIconUrl(weatherData.weather[0].main) }
                / >

                <
                p > { weatherData.main.temp } < /p> <
                h4 > { weatherData.weather[0].main } <
                /h4> <
                form className = "form-div" > <
                input type = "text"
                placeholder = "Enter city name"
                onChange = { handleInputChange }
                / > <
                button onClick = { handleSubmit } > Get < /button> < /
                form >
                <
                />)
            }


            <
            /div> < /
            div > < / >
        )
    }

    export default App;