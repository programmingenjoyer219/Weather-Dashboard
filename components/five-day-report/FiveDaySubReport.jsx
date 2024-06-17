import React from 'react'
import Image from 'next/image'

function formatDate(dateStr) {
    // Create a Date object from the yyyy-mm-dd string
    const date = new Date(dateStr);

    // Get the month (0-indexed) and day
    const month = date.getMonth();
    const day = date.getDate();

    // Create an array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format the month name (3 letters) and day with leading zero (if needed)
    const formattedMonth = monthNames[month];
    const formattedDay = day.toString().padStart(2, "0");

    // Combine month and day with a hyphen
    return `${formattedMonth} ${formattedDay}`;
}

export default function FiveDaySubReport({ dataSet: { date, weekday, temp, icon } }) {
    return (
        <div class="five-day-sub-report flex flex-col items-center justify-center gap-2 sm:gap-8 sm:bg-gradient-to-r sm:from-slate-800 sm:rounded-xl sm:border sm:border-slate-800 lg:border-none lg:bg-none lg:rounded-none">
            <span className='text-md sm:text-2xl'>{formatDate(date)}</span>
            <span className='text-md sm:text-2xl'>{weekday.substring(0, 3)}</span>
            <Image
                class="five-day-sub-report-icon"
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt="weather-icon"
                height={32}
                width={32}
                className='min-[375px]:h-[48px] min-[375px]:w-[48px] min-[475px]:h-[56px] min-[475px]:w-[56px] sm:h-[64px] sm:w-[64px]'
            />
            <span className='text-md sm:text-2xl'>{Math.floor(temp)}°C</span>
        </div>
    )
}
