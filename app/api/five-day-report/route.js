import { NextResponse } from "next/server";
import { getWeekday } from "../route";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let yourLocation = searchParams.get("yourLocation");
    console.log(yourLocation);
    let endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${yourLocation}&appid=${apiKey}&units=metric`;

    try {
        let weatherApiData = await axios.get(endpoint);
        let weatherData = weatherApiData.data;
        let threeHourlyDataSet = [];
        let fiveDayDataSet = [];

        weatherData["list"].forEach(element => {
            let currentDateObj = new Date();
            let elementDateObj = new Date(element["dt_txt"]);
            let dt = element["dt_txt"].split(" ");

            const millisecondsPerDay = 1000 * 60 * 60 * 24;
            const currentTimeInMilliseconds = currentDateObj.getTime();
            const newTimeInMilliseconds = currentTimeInMilliseconds + (5 * millisecondsPerDay);
            const fiveDaysLater = new Date(newTimeInMilliseconds);

            if (elementDateObj >= currentDateObj) {
                let threeHourlyData = {
                    weekday: getWeekday(elementDateObj),
                    date: dt[0],
                    time: dt[1],
                    temp: element["main"]["feels_like"]
                }
                threeHourlyDataSet.push(threeHourlyData);
            }

            if (elementDateObj < fiveDaysLater) {
                if (dt[1] === "12:00:00") {
                    let fiveDayData = {
                        weekday: getWeekday(elementDateObj),
                        date: dt[0],
                        time: dt[1],
                        temp: element["main"]["feels_like"],
                        icon: element["weather"][0]["icon"]
                    }

                    fiveDayDataSet.push(fiveDayData);
                }
            }
        });

        return NextResponse.json({
            "locationFound": true,
            "threeHourlyDataSet": threeHourlyDataSet.slice(0, 5),
            fiveDayDataSet
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json({ locationFound: false });
    }
}