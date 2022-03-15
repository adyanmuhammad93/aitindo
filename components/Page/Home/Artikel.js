import parse from "html-react-parser";
import Slider from "react-slick";
import TitleSection from "components/Atom/TitleSection";

import { useEffect, useState } from "react";
import { getBlock } from "api/block";

export default function Brands({ className }) {
  const [staticSectionContent, setStaticSectionContent] = useState(null);

  async function getStaticPageContent(staticBlockIdentifier) {
    const sectionStaticBlock = await getBlock(staticBlockIdentifier);
    if (sectionStaticBlock.data) {
      setStaticSectionContent(sectionStaticBlock.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-artikel-pilihan");
  }, []);

  const settings = {
    infinite: false,
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          variableWidth: true
        }
      }
    ]
  };

  return (
    <div className={className}>
      <TitleSection title="Artikel" url="/" className="py-5 sm:py-3" />
      <div className="home-artikel">
        {staticSectionContent ? (
          <Slider {...settings} className="slide-full">
            {parse(staticSectionContent)}
          </Slider>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
