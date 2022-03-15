import parse from "html-react-parser";
import useResponsive from "hooks/useResponsive";
import Newsletter from "components/Common/Footer/Newsletter";

import { useEffect, useState } from "react";
import { getBlock } from "api/block";

export default function Footer() {
  const { isMobile } = useResponsive();
  const [footerAboutUs, setFooterAboutUs] = useState(null);
  const [footerQuickLinks, setFooterQuickLinks] = useState(null);
  const [footerContactUs, setFooterContactUs] = useState(null);

  async function getFooterContent(staticBlockIdentifier) {
    const identifierAbout = `${staticBlockIdentifier}-about-us`;
    const identifierLinks = `${staticBlockIdentifier}-quick-links`;
    const identifierContact = `${staticBlockIdentifier}-contact-us`;

    const footerAboutContent = await getBlock(identifierAbout);
    if (footerAboutContent.data) {
      setFooterAboutUs(footerAboutContent.data.items.content);
    }

    const footerLinksContent = await getBlock(identifierLinks);
    if (footerLinksContent.data) {
      setFooterQuickLinks(footerLinksContent.data.items.content);
    }

    const footerContactContent = await getBlock(identifierContact);
    if (footerContactContent.data) {
      setFooterContactUs(footerContactContent.data.items.content);
    }
  }

  useEffect(() => {
    getFooterContent("well-footer");
  }, []);

  return (
    <>
      <Newsletter />
      <div className="text-sm text-xs font-semibold leading-6 hidden" />
      <div className="flex flex-wrap py-16 px-[4%]">
        <div className="w-[45%] pr-[10%] sm:w-[60%] sm:pr-[6%]">
          <div className="w-full">
            {footerAboutUs ? parse(footerAboutUs) : "Loading..."}
          </div>

          {isMobile && (
            <div className="w-full pt-10">
              {footerContactUs ? parse(footerContactUs) : "Loading..."}
            </div>
          )}
        </div>

        <div className="w-[25%] sm:w-[40%] sm:pr-0">
          {footerQuickLinks ? parse(footerQuickLinks) : "Loading..."}
        </div>

        <div className="w-[30%] pr-[10%] sm:hidden">
          {footerContactUs ? parse(footerContactUs) : "Loading..."}
        </div>
      </div>
    </>
  );
}
