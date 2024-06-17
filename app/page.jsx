"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PrimaryReport from "@/components/PrimaryReport";
import SecondaryReport from "@/components/SecondaryReport";
import ThreeHourlyReport from "@/components/ThreeHourlyReport";
import FiveDayReport from "@/components/FiveDayReport";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

async function getFiveDayReport(yourLocation) {
  const endpoint = `http://localhost:3000/api/five-day-report?yourLocation=${yourLocation}`
  try {
    const fiveDayData = await axios.get(endpoint);
    // Note that the Three Hourly Report is included in the fiveDayData
    return fiveDayData.data;
  } catch (error) {
    console.error(error);
  }
}

async function getCurrentReport(yourLocation) {
  const endpoint = `http://localhost:3000/api/current-report?yourLocation=${yourLocation}`
  try {
    const currentData = await axios.get(endpoint);
    return currentData.data;
  } catch (error) {
    console.error(error);
  }
}

function getGreeting() {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

export default function Home() {
  const [currentWeatherData, setCurrentWeatherData] = useState({ locationFound: false });
  const [fiveDayWeatherData, setFiveDayWeatherData] = useState({ locationFound: false });
  const [location, setLocation] = useState({ lat: null, lon: null });

  async function updateReports(yourLocation) {
    console.log(yourLocation);
    if (yourLocation.trim().length === 0) {
      console.log("Show pop-up -> empty input provided");
      alert("Please enter the city's name");
    } else {
      const currentReport = await getCurrentReport(yourLocation);
      const fiveDayReport = await getFiveDayReport(yourLocation)
      if (!(currentReport.locationFound && fiveDayReport.locationFound)) {
        console.log("Show pop-up -> city not found");
        alert("City not found");
      } else {
        setCurrentWeatherData(currentReport);
        setFiveDayWeatherData(fiveDayReport);
      }
    }
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      (error) => {
        console.error(error);
        console.log("Show pop up => Location not found");
        alert("Location not found");
      },
      { enableHighAccuracy: true }
    );
  }

  useEffect(() => {
    if (location.lat && location.lon) {
      // Fetch weather data using the latitude and longitude
      async function getLocationData() {
        let endpoint = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=5&appid=${apiKey}`;
        const cityDataResult = await axios.get(endpoint);
        let stateName = cityDataResult.data[0]["state"];
        console.log(stateName);
        updateReports(stateName);
      }
      getLocationData();
    }
  }, [location]);

  return (
    <>
      <Navbar updateReports={updateReports} getLocation={getLocation} />
      <h1 className="py-4 text-3xl sm:text-5xl text-center font-semibold">{getGreeting()}</h1>
      <main className="container flex flex-col gap-2 my-2 sm:grid sm:grid-cols-2 sm:grid-rows-3 lg:grid-rows-2">
        {
          (currentWeatherData.locationFound && fiveDayWeatherData.locationFound) ?
            (
              <>
                <PrimaryReport report={currentWeatherData} />
                <SecondaryReport report={currentWeatherData} />
                <ThreeHourlyReport report={fiveDayWeatherData} />
                <FiveDayReport report={fiveDayWeatherData} />
              </>
            ) : (
              // <div className="h-[75vh] px-4 flex flex-col items-center justify-center border-4 border-slate-500 rounded-2xl bg-gradient-to-r from-slate-800 sm:row-span-full sm:col-span-2">
              //   <p className="text-xl">
              //     Search for a city / state to get relevant weather report or press the location-pin button.
              //   </p>
              // </div>
              <div className="h-[75vh] px-6 py-8 flex flex-col items-center justify-center border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-800 shadow-lg sm:row-span-full sm:col-span-2">
                <p className="text-2xl text-center text-white font-semibold">
                  Enter a city or state to get the latest weather updates, or use the location button for current weather reports.
                </p>
              </div>

            )
        }

      </main>
    </>
  );
}
