export default function TitleSection({title, url, className}) {
  return(
    <div className={`flex justify-between items-end ${className}`}>
      <div>
        <div className="text-3xl font-bold 2xl:text-xl sm:text-base">{ title }</div>
      </div>

      {url && 
        <a href={ url }>
          <div className="cursor-pointer text-base font-bold text-darkGreen 2xl:text-sm sm:text-[11px] sm:leading-5 ">Lihat Semua</div>
        </a>
      }
    </div>
  )
}