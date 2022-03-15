import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { getBlock } from "api/block";

export default function OtherCategory({ className }) {
  const [staticSectionContent, setStaticSectionContent] = useState(null);
  const otherCategory = [
    {
      title: "category",
      url: "",
      img: "static/images/home/category2/category.png"
    },
    {
      title: "suplement",
      url: "/",
      img: "static/images/home/category2/suplement.png"
    },
    {
      title: "personal care",
      url: "/",
      img: "static/images/home/category2/personal-care.png"
    },
    {
      title: "treatment",
      url: "/",
      img: "static/images/home/category2/treatment.png"
    },
    {
      title: "wound care",
      url: "/",
      img: "static/images/home/category2/wound-care.png"
    },
    {
      title: "lifestyle",
      url: "/",
      img: "static/images/home/category2/lifestyle.png"
    },
    {
      title: "food & drink",
      url: "/",
      img: "static/images/home/category2/food-drink.png"
    },
    {
      title: "respiratory",
      url: "/",
      img: "static/images/home/category2/respiratory.png"
    },
    {
      title: "nursing care",
      url: "/",
      img: "static/images/home/category2/nursing-care.png"
    }
  ];

  async function getStaticPageContent(staticBlockIdentifier) {
    const sectionStaticBlock = await getBlock(staticBlockIdentifier);
    console.log(sectionStaticBlock);
    if (sectionStaticBlock.data) {
      setStaticSectionContent(sectionStaticBlock.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-kategori-pilihan-lainnya");
  }, []);

  // to print other category content, you can use line below & place it in return()
  // {staticSectionContentDesktop ? parse(staticSectionContentDesktop) : "Loading..."}

  return (
    <div className={`py-8 ${className}`}>
      <Swiper
        slidesPerView={4}
        breakpoints={{ "@1.00": { slidesPerView: 3 } }}
        className="!overflow-visible"
      >
        {otherCategory.map((e, idx) => (
          <SwiperSlide key={idx} className="!w-auto mr-[50px] sm:mr-[20px]">
            <a href={e.url} className="flex flex-col justify-center">
              <div className="h-14 md:h-10 sm:h-8">
                <img src={e.img} alt="" className="h-full mx-auto" />
              </div>
              <p className="text-center text-base pt-4 uppercase font-bold md:text-xs sm:text-[11px] sm:pt-3 sm:font-semibold">
                {e.title}
              </p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
