import { useState } from 'react';

export default function Searchbar({ updateReports }) {
    const [location, setLocation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        updateReports(location);
        setLocation("");
    }

    function handleChange(e) {
        setLocation(e.target.value);
    }

    return (
        <form id='search-bar' onSubmit={handleSubmit} className="flex-1 flex items-center justify-center gap-2">
            <button id='search-button' className='' type='submit'>
                <svg id='search-icon' className='h-[36px]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
            <input id='search-input' onChange={handleChange} value={location} className='w-[60%] h-[36px] font-medium flex-1 text-center rounded-sm text-black' type="text" placeholder='Search city...' />
        </form>
    )
}
