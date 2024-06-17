import React from 'react'
import ThreeHourlySubReport from './three-hourly-report/ThreeHourlySubReport'

export default function ThreeHourlyReport({ report: { locationFound, threeHourlyDataSet } }) {
    return (
        locationFound &&
        <div className='grid grid-rows-5 items-center gap-2 py-4 border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-800'>
            {
                threeHourlyDataSet.map((dataSet, index) => {
                    return <ThreeHourlySubReport key={index} dataSet={dataSet} />
                })
            }
        </div>
    )
}
