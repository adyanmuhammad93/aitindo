import parse from "html-react-parser";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getBlock } from "api/block";
import CardBestSeller from "components/Common/Card/BestSeller";
import CardProduct from "components/Common/Card/Product";

export default function BestSeller({ className }) {
  const bestSeller = [
    {
      title: "Terlaris",
      img: "static/images/home/best-seller.png",
      titleBtn: "Lihat Semua",
      product: [
        {
          img: "static/images/home/best-seller.png",
          link: "/",
          title: "Title Product Title Product Title Product Title Product",
          price: 20000,
          discount: 20,
          cashback: 10000,
          rating: "4/5",
          badgeNew: true,
          badgeClickPickup: false
        },
        {
          img: "static/images/home/best-seller.png",
          link: "/",
          title: "Title Product",
          price: 20000,
          discount: 20,
          cashback: 10000,
          rating: "4/5",
          badgeNew: true,
          badgeClickPickup: false
        },
        {
          img: "static/images/home/best-seller.png",
          link: "/",
          title: "Title Product",
          price: 20000,
          discount: 20,
          cashback: 10000,
          rating: "4/5",
          badgeNew: true,
          badgeClickPickup: false
        },
        {
          img: "static/images/home/best-seller.png",
          link: "/",
          title: "Title Product",
          price: 20000,
          discount: 20,
          cashback: 10000,
          rating: "4/5",
          badgeNew: true,
          badgeClickPickup: false
        },
        {
          img: "static/images/home/best-seller.png",
          link: "/",
          title: "Title Product",
          price: 20000,
          discount: 20,
          cashback: 10000,
          rating: "4/5",
          badgeNew: true,
          badgeClickPickup: false
        }
      ]
    }
  ];

  const [staticSectionContent, setStaticSectionContent] = useState(null);

  async function getStaticPageContent(staticBlockIdentifier) {
    const sectionStaticBlock = await getBlock(staticBlockIdentifier);
    console.log(sectionStaticBlock);
    if (sectionStaticBlock.data) {
      setStaticSectionContent(sectionStaticBlock.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-produk-terlaris");
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
    <div className={`home-kategori-pilihan ${className}`}>
      {/* {staticSectionContent ? parse(staticSectionContent) : "Loading..."} */}

      <Slider {...settings} className="slide-full">
        {bestSeller.map((e, idx) => (
          <div key={idx} className="p-4 md:p-2">
            <CardBestSeller
              key={idx}
              img={e.img}
              title={e.title}
              btnLink={e.url}
              btnBlock
              titleBtn="Lihat Semua"
              classBtn="justify-between text-sm rounded lg:py-[5px] md:text-[11px]"
              classTitle="text-2xl py-5 font-bold text-darkGreen md:text-lg sm:py-3"
              className="w-[320px] h-[450px] text-sm p-4 justify-between border rounded-xl bg-[#C1DFC4] md:p-3 md:w-[260px] md:h-[360px] sm:w-[180px] sm:h-[300px]"
            />
          </div>
        ))}

        {bestSeller[0].product.map((el, i) => (
          <div key={i} className="p-4 md:p-2">
            <CardProduct
              key={i}
              img={el.img}
              title={el.title}
              price={el.price}
              discount={el.discount}
              cashback={el.cashback}
              className="border shadow-main w-[260px] h-[450px] flex flex-col justify-between md:w-[200px] md:h-[360px] sm:w-[150px] sm:h-[300px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
