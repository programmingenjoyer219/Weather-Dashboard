let date = new Date();
let offset = date.getTimezoneOffset();
const nativeTimezoneOffset = Math.abs(offset * 60);

export function utcToStandardTime(unixTime, timezoneOffset) {
    // Convert the unix time to milliseconds
    const unixTimeInMilliseconds = unixTime * 1000;

    // Adjust the unix time by the timezone offset (which is in seconds)
    const localTimeInMilliseconds = unixTimeInMilliseconds + ((timezoneOffset - nativeTimezoneOffset) * 1000);

    // Create a new Date object with the adjusted time
    const dateObject = new Date(localTimeInMilliseconds);

    // Define time formatting options
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: false };

    // Format the date object to a time string
    const formattedTime = dateObject.toLocaleTimeString('en-US', timeOptions);

    return formattedTime;
}

export function getWeekday(dateTimeString) {
    // Parse the date-time string into a Date object
    const dateObject = new Date(dateTimeString);

    // Check if the date is valid
    if (isNaN(dateObject.getTime())) {
        return "Invalid date-time format";
    }

    // Get the day of the week (0-6, where 0 is Sunday)
    const dayOfWeek = dateObject.getDay();

    // Convert the numerical day to a weekday string
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[dayOfWeek];
}

export async function GET(request) {
    let responseString = "The Weather Dashboard API\n\nRoutes:\n/api/current-report?yourLocation=YOUR_LOCATION\n/api/five-day-report?yourLocation=YOUR_LOCATION";
    return new Response(responseString);
}