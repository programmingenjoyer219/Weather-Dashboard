import SubReport from "./secondary-report/SubReport"

export default function SecondaryReport({ report: { locationFound, windSpeed, humidity, pressure, visibility, sunrise, sunset } }) {
    return (
        <div id='secondary-report' className="sm:row-start-2 sm:row-end-3 sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-2">
            <SubReport name="Wind Speed" imgLink="/wind-speed-icon.svg" unit="km/h" data={windSpeed} />
            <SubReport name="Humidity" imgLink="/humidity-icon.svg" unit="%" data={humidity} />
            <SubReport name="Pressure" imgLink="/pressure-icon.svg" unit="hPa" data={pressure} />
            <SubReport name="Visibility" imgLink="/visibility-icon.svg" unit="km" data={visibility} />
            <SubReport name="Sunrise" imgLink="/sunrise-icon.svg" unit="" data={sunrise} />
            <SubReport name="Sunset" imgLink="/sunset-icon.svg" unit="" data={sunset} />
        </div>
    )
}
