import parse from "html-react-parser";
import { getBlock } from "api/block";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { HiOutlineChevronRight } from "react-icons/hi";
import TitleSection from "components/Atom/TitleSection";
import CardProduct from "components/Common/Card/Product";
import Button from "components/Atom/Button";

export default function BrandPromo() {
  const [miniBanner, setMiniBanner] = useState(null);
  const [promoAktif, setPromoAktif] = useState(null);
  const [listProduct, setListProduct] = useState(null);

  async function getBrandPromo(staticBlockIdentifier) {
    let response;

    response = await getBlock(`${staticBlockIdentifier}-top`);
    if (response.data) {
      setMiniBanner(response.data.items.content);
    }

    response = await getBlock(`${staticBlockIdentifier}-middle`);
    if (response.data) {
      setPromoAktif(response.data.items.content);
    }

    response = await getBlock(`${staticBlockIdentifier}-bottom`);
    if (response.data) {
      setListProduct(response.data.items.content);
    }
  }

  useEffect(() => {
    getBrandPromo("well-promo-pilihan");
  }, []);

  // const promo = [
  //   { img: "static/images/home/promo/promo1.jpg", url: "/" },
  //   { img: "static/images/home/promo/promo2.jpg", url: "/" },
  //   { img: "static/images/home/promo/promo1.jpg", url: "/" },
  //   { img: "static/images/home/promo/promo3.jpg", url: "/" }
  // ]

  // const choice = [
  //   { img: "static/images/home/promo/opsi1.png", url: "/" },
  //   { img: "static/images/home/promo/opsi2.png", url: "/" },
  //   { img: "static/images/home/promo/opsi3.png", url: "/" },
  //   { img: "static/images/home/promo/opsi4.png", url: "/" },
  //   { img: "static/images/home/promo/opsi4.png", url: "/" }
  // ]

  const settings1 = {
    infinite: false,
    dots: false,
    arrows: false,
    variableWidth: true,
    swipeToSlide: true,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const settings2 = {
    infinite: false,
    dots: false,
    arrows: false,
    variableWidth: true,
    swipeToSlide: true,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 5
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
    <>
      <TitleSection title="Promo Pilihan" url="/" className="py-5 sm:py-3" />

      {/* <Slider {...settings1} className="slide-full py-1">
        {promo.map(e => (
          <div className="py-2 pr-8 2xl:pr-6 md:pr-4">
            <a href={e.url} className="w-full rounded-lg">
              <img src={e.img} alt="" className="w-full md:w-[300px] sm:w-[200px]" />
            </a>
          </div>
        ))}
      </Slider> */}
      <Slider {...settings1} className="slide-full py-1">
        {miniBanner ? parse(miniBanner) : <div>Loading...</div>}
      </Slider>

      {/* <Slider {...settings2} className="slide-full py-1">
        {choice.map(e => (
          <div className="py-2 pr-8 2xl:pr-6 md:pr-2">
            <a href={e.url} className="w-full">
              <img src={e.img} alt="" className="w-full md:w-[200px] sm:w-[120px]" />
            </a>
          </div>
        ))}
      </Slider> */}
      <Slider {...settings2} className="slide-full py-1">
        {promoAktif ? parse(promoAktif) : <div>Loading...</div>}
      </Slider>

      <div className="brand-promo flex flex-wrap py-5">
        {[
          Array(15)
            .fill("")
            .map((e, idx) => (
              <CardProduct
                key={idx}
                img="static/images/home/product.jpg"
                title="Title Product Title Product Title Product Title Product"
                price={20000}
                discount={15}
                cashback={13000}
                className="card-product w-[16%] m-[2%] md:w-[21%] sm:w-[46%]"
              />
            ))
        ]}
      </div>
      {/* {listProduct ? parse(listProduct) : "Loading..."} */}

      <Button
        color="main"
        title="Lihat Semua"
        iconRight={<HiOutlineChevronRight className="text-sm" />}
        className="text-sm py-3 mt-4 mb-6 mx-auto w-[180px] rounded sm:w-[160px] sm:text-[11px]"
      />
    </>
  );
}
