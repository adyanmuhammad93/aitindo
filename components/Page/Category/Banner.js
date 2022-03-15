import Button from "components/Atom/Button";
import { HiOutlineChevronRight } from "react-icons/hi";

export default function BannerCategory({ empty }) {
  const button = [
    { title: "ANTIOXIDANT & HEALTHY AGING" },
    { title: "BONE & MUSCLE" },
    { title: "COLD, FLU & IMMUNITY" },
    { title: "HEART & BLOOD" },
    { title: "COLD, FLU & IMMUNITY" },
    { title: "ENERGY & STAMINA" }
  ];

  return (
    <div className="relative w-full">
      {empty ? (
        <div className="flex pb-8 flex-col items-center">
          <img src="static/images/category-empty.png" alt="" />
          <p className="text-xs py-1 font-bold">Maaf, Produk telah habis.</p>
          <p className="text-xs pb-5 px-5 text-center">Masih banyak produk rekomendasi lainnya yang cocok untuk Anda.</p>
          <Button
            title="Cari Produk Lain"
            color="main"
            iconRight={<HiOutlineChevronRight />}
            className="rounded text-sm font-bold py-3 px-4"
          />
        </div>
      ) : (
        <>
          <img
            src="static/images/category/banner-category.jpg"
            alt=""
            className="w-full z-0"
          />
          <div className="absolute z-10 p-6 top-0 left-0 w-full h-full flex flex-col justify-between md:p-2">
            <p className="text-4xl font-bold pt-2 sm:text-base sm:pt-0">
              SUPPLEMENT
            </p>
            <div className="flex flex-wrap pt-5 sm:pt-0">
              {button.map((e, idx) => (
                <a
                  href="/"
                  key={idx}
                  className="text-sm font-semibold p-1 rounded bg-white mr-3 my-3 md:my-2 sm:text-[8px] sm:py-[2px] sm:my-[2px] sm:mr-1 sm:leading-3"
                >
                  {e.title}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
