import axios from "axios";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import CardProduct from "components/Common/Card/Product";

export default function FlashSale({ className }) {
  const [flashSaleData, setFlashSaleData] = useState(null);
  const [flashSaleListProduct, setFlashSaleListProduct] = useState(null);
  const getFlashSaleData = async () => {
    // const endpointFS = `${process.env.HOST_API}/api/v1/flashsale/`;
    const endpointFS = `https://api-dev.eraspace.com/products/api/v1/flashsale/?store_id=46&category_id=267&banner_only=0&product_count=12&show_upcoming=1&list_only=1`;
    const fsResult = await axios.get(endpointFS);

    // console.log(fsResult.data.status);
    if (fsResult?.data.status !== 404) {
      setFlashSaleData(fsResult.data.data);
      setFlashSaleListProduct(fsResult.data.data.listProducts);
    }
  };

  useEffect(() => {
    getFlashSaleData();
  }, []);

  const settings = {
    infinite: false,
    dots: false,
    arrows: false,
    variableWidth: true,
    slidesToShow: 6,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  return (
    flashSaleData && (
      <div
        className={`home-kategori-pilihan ${className} bg-[#FFD94D] py-10 relative`}
      >
        <div className="px-[4%] pb-5 flex items-center md:flex-col md:items-start">
          <p className="text-4xl text-[#FF4C00] sm:text-3xl md:pb-2">
            Flash<span className="font-bold pl-2">Sale</span>
          </p>

          <div className="flex items-center font-bold px-5 md:px-0">
            <p className="font-normal pr-2 sm:text-xs">Berakhir Dalam</p>
            <div className="w-8 h-8 m-1 text-base bg-[#FF5C00] text-white flex items-center justify-center rounded-md sm:w-6 sm:h-6 sm:text-xs sm:rounded">
              00
            </div>
            <span>:</span>
            <div className="w-8 h-8 m-1 text-base bg-[#FF5C00] text-white flex items-center justify-center rounded-md sm:w-6 sm:h-6 sm:text-xs sm:rounded">
              00
            </div>
            <span>:</span>
            <div className="w-8 h-8 m-1 text-base bg-[#FF5C00] text-white flex items-center justify-center rounded-md sm:w-6 sm:h-6 sm:text-xs sm:rounded">
              00
            </div>
            <a
              href="/"
              className="text-white text-sm h-8 px-5 ml-4 flex items-center rounded-md bg-[#FF4C00] sm:text-[10px] sm:px-3 sm:h-6 sm:rounded"
            >
              Lihat semua
            </a>
          </div>
        </div>

        <img
          src="static/images/home/flashsale.png"
          alt="flash sale wellings"
          className="absolute left-[4%] h-[60%] top-[55%] transform translate-y-[-50%] md:top-[64%] sm:h-[50%]"
        />

        <Slider {...settings} className="slide-full">
          <span>
            <div className="w-[320px] md:w-[240px] sm:w-[150px]"> </div>
          </span>
          {flashSaleListProduct &&
            flashSaleListProduct.map((el, i) => (
              <div className="p-4 md:p-2">
                <CardProduct
                  key={i}
                  img={
                    el.thumbnail ? el.thumbnail : "/images/wellings-default.jpg"
                  }
                  title={el.name}
                  price={el.price}
                  specialPrice={el.special_price}
                  cashback="50000"
                  footer="false"
                  btnBuy
                  className="border bg-white overflow-hidden w-[260px] h-[450px] flex flex-col justify-between md:w-[200px] md:h-[360px] sm:w-[150px] sm:h-[300px]"
                />
              </div>
            ))}
        </Slider>
      </div>
    )
  );
}
