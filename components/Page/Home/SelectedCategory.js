import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { getBlock } from "api/block";
import Slider from "react-slick";
import CardCategory from "components/Common/Card/Category";

export default function SelectedCategory({ className }) {
  const category = [
    {
      title: "Suplemen",
      url: "/",
      img: "static/images/home/category1/suplemen.png"
    },
    {
      title: "Personal Care",
      url: "/",
      img: "static/images/home/category1/personal-care.png"
    },
    {
      title: "Fitness",
      url: "/",
      img: "static/images/home/category1/fitnes.png"
    },
    {
      title: "Mom & Baby",
      url: "/",
      img: "static/images/home/category1/mom-&-baby.png"
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

  const settings = {
    infinite: false,
    dots: false,
    arrows: false,
    variableWidth: true,
    slidesToShow: 4,
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

  useEffect(() => {
    getStaticPageContent("well-kategori-pilihan-top");
  }, []);

  return (
    <div className={`home-kategori-pilihan py-8 md:py-4 ${className}`}>
      {/* {staticSectionContent ? parse(staticSectionContent) : "Loading..."} */}

      <Slider {...settings} className="slide-full">
        {category.map((e, idx) => (
          <div key={idx} className="p-2 md:p-1">
            <CardCategory
              key={idx}
              img={e.img}
              title={e.title}
              btnLink={e.url}
              btnBlock
              titleBtn="Lihat Semua"
              classBtn="justify-between text-sm rounded lg:py-[5px] md:text-[11px]"
              classTitle="text-3xl py-5 font-bold text-darkGreen 2xl:text-2xl md:text-lg sm:py-3"
              className="w-[22vw] h-[450px] p-8 justify-between border rounded-xl rounded-tl-[60px] rounded-br-[60px] shadow-xl md:p-4 sm:p-3 md:w-[200px] md:h-[320px] sm:w-[120px] sm:h-[180px] md:bg-[#C1DFC4] sm:rounded-br-[40px] sm:rounded-tl-[40px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
