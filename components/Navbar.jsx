import Link from "next/link"
import Searchbar from "./navbar/Searchbar"
import ModeToggleButton from "./navbar/ModeToggleButton"
import LocationButton from "./navbar/LocationButton"

export default function Navbar({ updateReports, getLocation }) {
    return (
        <nav className="flex items-center justify-between gap-2 px-1 py-4">
            <Link href={"/"}>
                <svg className="h-[36px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                </svg>
            </Link>
            <Searchbar updateReports={updateReports} />
            {/* <LocationButton getLocation={getLocation} /> */}
            {/* <ModeToggleButton /> */}
        </nav>
    )
}
