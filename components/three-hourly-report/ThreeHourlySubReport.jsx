import React from 'react'

export default function ThreeHourlySubReport({ dataSet: { weekday, time, temp } }) {
    return (
        <div className='grid grid-cols-3 grid-rows-1 justify-items-center gap-4 text-lg'>
            <span className='mx-4'>{weekday}</span>
            <span className='mx-4'>{time}</span>
            <span className='mx-4'>{Math.floor(temp)}°C</span>
        </div>
    )
}
