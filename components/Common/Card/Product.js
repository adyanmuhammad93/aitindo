import setRupiah from "lib/rupiah";

export default function CardProduct({
  img,
  title,
  price,
  specialPrice,
  cashback,
  wishlist,
  rating,
  className,
  footer,
  btnBuy,
  url_key,
  product_raw_data
}) {
  // for testing purpose
  if( cashback == 0 ) cashback = 12345;
  // 

  return (
    <div className={`p-3 ${className} md:p-2`}>
      <div>
        <img src={img} alt="" className="w-full h-full object-contain" />
      </div>
      <p className="text-sm mt-2 mb-1 h-10 font-semibold uppercase ellipsis list-2 md:text-xs md:h-8">
        {title}
      </p>

      <div className="h-44px">
        {specialPrice < price ? (
          <>
            <div className="flex items-center lg:items-start">
              <span className="text-md line-through text-gray-500 md:text-xs sm:text-[10px]">
                {setRupiah(price)}
              </span>
              <span className="text-sm pl-2 text-red-600 md:text-xs">{`[${Math.floor(
                ((price - specialPrice) / price) * 100
              )}%]`}</span>
            </div>
            <div className="text-mainGreen1 leading-5 font-bold text-lg md:text-sm">
              {setRupiah(specialPrice)}
            </div>
          </>
        ) : (
          <div className="font-bold">{setRupiah(price)}</div>
        )}
      </div>

      {cashback && cashback > 0 ? (
        <div className="text-mainGreen1 my-3 py-[2px] px-1 text-[11px] font-bold border border-mainGreen1 rounded-sm w-fit md:text-[9px] md:my-2">
          + Cashback {setRupiah(cashback)}
        </div>
      ) : ""}

      {footer !== "false" && (
        <div className="flex pt-2 justify-between">
          <div className="flex">
            <img
              className="w-[18px] object-contain md:w-4"
              src="static/images/icon/star.png"
              alt=""
            />
            <span className="pl-2 text-sm sm:text-xs">{rating || 4 / 5}</span>
          </div>
          {wishlist ? (
            <img
              className="w-[18px] object-contain md:w-4"
              src="static/images/icon/whishlist-block.png"
              alt=""
            />
          ) : (
            <img
              className="w-[18px] object-contain md:w-4"
              src="static/images/icon/whishlist-light.png"
              alt=""
            />
          )}
        </div>
      )}

      {btnBuy && (
        <a
          href={`/product/${url_key}`}
          className="w-full text-xs py-2 font-bold mt-2 rounded text-center text-mainGreen2 border border-mainGreen2 sm:py-1 sm:text-[10px]"
        >
          Beli
        </a>
      )}
    </div>
  );
}
