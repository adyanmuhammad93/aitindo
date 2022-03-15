import Slider from "react-slick";
import parse from "html-react-parser";
import TitleSection from "components/Atom/TitleSection";
import { useEffect, useState } from "react";
import { getBlock } from "api/block";

export default function Testimony({ className }) {
  const [staticTextContent, setStaticTextContent] = useState(null);
  const [staticPhotoContent, setStaticPhotoContent] = useState(null);
  const [slider1, setSlider1] = useState();
  const [slider2, setSlider2] = useState();

  async function getStaticPageContent(staticBlockIdentifier) {
    const identifierText = `${staticBlockIdentifier}-text`;
    const identifierFoto = `${staticBlockIdentifier}-foto`;

    const sectionStaticBlockText = await getBlock(identifierText);
    if (sectionStaticBlockText.data) {
      setStaticTextContent(sectionStaticBlockText.data.items.content);
    }

    const sectionStaticBlockFoto = await getBlock(identifierFoto);
    if (sectionStaticBlockFoto.data) {
      setStaticPhotoContent(sectionStaticBlockFoto.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-apa-kata-mereka");
  }, []);

  const settingsText = {
    asNavFor: slider2
  };
  const settingsImg = {
    arrows: true,
    asNavFor: slider1,
    centerMode: true,
    swipeToSlide: true,
    variableWidth: true,
    focusOnSelect: true,
    slidesToScroll: 3
  };

  return (
    <div className={className}>
      <div className="hidden mx-2 text-lg" />
      <TitleSection title="Apa Kata Mereka" className="py-5 sm:py-3" />

      <div className="home-testimoni flex md:flex-col">
        {staticTextContent ? (
          <Slider
            {...settingsText}
            ref={s1 => setSlider1(s1)}
            className="w-[65%] pr-[5%] pb-5 md:w-full md:pr-0"
          >
            {parse(staticTextContent)}
          </Slider>
        ) : (
          "Loading..."
        )}

        {staticPhotoContent ? (
          <Slider
            {...settingsImg}
            ref={s2 => setSlider2(s2)}
            className="testimony w-[35%] md:w-[50%] md:mx-auto md:mt-5 sm:w-full"
          >
            {parse(staticPhotoContent)}
          </Slider>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
