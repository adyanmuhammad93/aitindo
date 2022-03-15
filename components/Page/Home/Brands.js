import parse from "html-react-parser";
import TitleSection from "components/Atom/TitleSection";

import { useEffect, useState } from "react";
import { getBlock } from "api/block";

export default function Brands({ className }) {
  const [staticSectionContent, setStaticSectionContent] = useState(null);

  async function getStaticPageContent(staticBlockIdentifier) {
    const sectionStaticBlock = await getBlock(staticBlockIdentifier);
    console.log(sectionStaticBlock);
    if (sectionStaticBlock.data) {
      setStaticSectionContent(sectionStaticBlock.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-brand-pilihan");
  }, []);

  return (
    <div className={`bg-[#F7F9FB] ${className}`}>
      <TitleSection title="Brand Pilihan" url="/" />

      <div className="home-brands pt-10 grid grid-cols-6 gap-x-20 gap-y-10 md:gap-10 md:grid-cols-4 sm:gap-6">
        {staticSectionContent ? parse(staticSectionContent) : "Loading..."}
      </div>
    </div>
  );
}
