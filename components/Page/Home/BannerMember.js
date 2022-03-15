import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { getBlock } from "api/block";

export default function BannerMember({ className }) {
  const [staticSectionContent, setStaticSectionContent] = useState(null);

  async function getStaticPageContent(staticBlockIdentifier) {
    const sectionStaticBlock = await getBlock(staticBlockIdentifier);
    if (sectionStaticBlock.data) {
      setStaticSectionContent(sectionStaticBlock.data.items.content);
    }
  }

  useEffect(() => {
    getStaticPageContent("well-member-banner");
  }, []);

  return (
    <div className={className}>
      {staticSectionContent ? parse(staticSectionContent) : "Loading..."}
    </div>
  );
}
