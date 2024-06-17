import React from 'react'
import Image from 'next/image'

export default function PrimaryReport({ report: { locationFound, icon, cityName, currentTemp, description } }) {
    return (
        <div id='primary-report' className='flex flex-col items-center justify-center py-4 border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-800'>
            <Image id='current-weather-icon' className='min-[375px]:h-[150px] min-[375px]:w-[150px]' width={100} height={100} src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather-icon" />
            <span id='city-name' className='text-lg min-[475px]:text-xl font-medium'>{cityName}</span>
            <span id='current-temp' className='text-3xl min-[475px]:text-4xl font-medium'>{currentTemp}°C</span>
            <span id='description' className='text-lg min-[475px]:text-xl font-medium'>{description}</span>
        </div>
    )
}
