// import Navcart from './Navcart'

export default function Navsearch() {
  return (
    <div className="flex items-center relative space-x-2">
      <form className="flex">
        <input
          type="text"
          className="py-3 px-4 w-[300px] text-xs border focus:outline-none text-gray-700 rounded-r-none rounded-l-sm"
          placeholder="Cari produk, kategori atau merek"
        />
        <button
          type="button"
          className="px-7 flex-grow font-semibold text-xs bg-gradient-to-r text-white self-stretch rounded-l-none rounded-r-sm from-mainGreen1 to-mainGreen2"
        >
          Cari
        </button>
      </form>
      {/* <Navcart /> */}
    </div>
  )
}