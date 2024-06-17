import { NextResponse } from "next/server";
import { utcToStandardTime } from "../route";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let yourLocation = searchParams.get("yourLocation");
    console.log(yourLocation);
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${yourLocation}&appid=${apiKey}&units=metric`;

    try {
        let weatherApiData = await axios.get(endpoint);
        let weatherData = weatherApiData.data;

        let dataToSend = {
            locationFound: true,
            cityName: weatherData["name"],
            currentTemp: Math.floor(weatherData["main"]["feels_like"]),
            description: weatherData["weather"][0]["main"],
            icon: weatherData["weather"][0]["icon"],
            windSpeed: Math.floor(weatherData["wind"]["speed"] * 3.6),
            humidity: weatherData["main"]["humidity"],
            pressure: weatherData["main"]["pressure"],
            visibility: weatherData["visibility"] / 1000,
            sunrise: utcToStandardTime(weatherData["sys"]["sunrise"], weatherData["timezone"]),
            sunset: utcToStandardTime(weatherData["sys"]["sunset"], weatherData["timezone"])
        }

        return NextResponse.json(dataToSend);
    } catch (error) {

        console.errpr(error);
        return NextResponse.json({
            locationFound: false
        });

    }
}