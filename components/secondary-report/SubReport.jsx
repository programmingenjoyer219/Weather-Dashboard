import Image from "next/image"

export default function SubReport({ name, imgLink, unit, data }) {
    return (
        <div className="sub-report flex flex-col items-center gap-2 py-4 border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-800">
            <span className="text-center">{name}</span>

            <Image
                src={imgLink}
                height={24}
                width={24}
                alt=""
                className="sub-report-icon min-[375px]:h-[36px] min-[375px]:w-[36px] min-[475px]:h-[48px] min-[475px]:w-[48px]"
            />
            <span className="">{data} {unit}</span>
        </div>
    )
}
