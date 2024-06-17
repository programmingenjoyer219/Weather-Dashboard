import React from 'react'
import FiveDaySubReport from './five-day-report/FiveDaySubReport'

export default function FiveDayReport({ report: { locationFound, fiveDayDataSet } }) {
    return (
        locationFound &&
        <div id='five-day-report' className='sm:col-span-2 grid grid-cols-5 py-4 border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-800 sm:border-none sm:bg-none sm:gap-4 sm:p-0 lg:col-span-1 lg:border lg:border-slate-800 lg:gap-0 lg:rounded-2xl lg:bg-gradient-to-r lg:from-slate-800'>
            {
                fiveDayDataSet.map((dataSet, index) => {
                    return <FiveDaySubReport key={index} dataSet={dataSet} />
                })
            }
        </div>
    )
}
