import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { getBlock } from "api/block";
import Slider from "react-slick";

export default function MainBanner() {
  const [staticSectionContent, setStaticSectionContent] = useState(null);

  async function getStaticPageContent(staticBlockIdentifier) {
    const sectionStaticBlock = await getBlock(staticBlockIdentifier);
    if (sectionStaticBlock.data) {
      setStaticSectionContent(sectionStaticBlock.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-main-banner");
  }, []);

  const settings = {
    // autoplay: true,
    dots: true,
    speed: 500,
    infinity: true,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          centerMode: true,
          slidesToShow: 1,
          variableWidth: true,
          centerPadding: "70px"
        }
      }
    ]
  };

  return (
    <div className="md:!block">
      <div className="!hidden md:!hidden sm:px-2" />
      {staticSectionContent ? (
        <Slider {...settings} className="mb-10 sm:mb-0 sm:py-5 dot-inside">
          {parse(staticSectionContent)}
        </Slider>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <img
      src="static/images/icon/arrow-prev.png"
      alt=""
      className="arrow-main-banner prev"
    />
  );
}
function NextArrow({ onClick }) {
  return (
    <img
      src="static/images/icon/arrow-next.png"
      alt=""
      className="arrow-main-banner next"
    />
  );
}
