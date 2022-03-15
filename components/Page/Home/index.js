import TitleSection from "components/Atom/TitleSection";
import Brands from "components/Page/Home/Brands";
import Artikel from "components/Page/Home/Artikel";
import FlashSale from "components/Page/Home/FlashSale";
import Testimoni from "components/Page/Home/Testimony";
import BannerMember from "components/Page/Home/BannerMember";
import BestSeller from "components/Page/Home/BestSeller";
import BrandPromo from "components/Page/Home/BrandPromo";
import MainBanner from "components/Page/Home/MainBanner";
import OtherCategory from "components/Page/Home/OtherCategory";
import SelectedCategory from "components/Page/Home/SelectedCategory";

export default function Home() {
  return (
    <div>
      <MainBanner />
      <div className="flex flex-col md:flex-col-reverse">
        <FlashSale />
        <div>
          <TitleSection
            title="Kategori Pilihan"
            className="py-5 sm:py-3 px-[4%] md:hidden"
          />
          <SelectedCategory className="px-[4%] bg-[#C1DFC4]" />
          <OtherCategory className="px-[4%]" />
        </div>
      </div>

      <div className="px-[4%]">
        <BannerMember className="w-full" />
        <BestSeller className="pt-8 pb-4 sm:pt-6" />
        <BrandPromo className="py-6 sm:py-4" />
      </div>

      <Brands className="px-[4%] py-12" />
      <Testimoni className="px-[4%] py-5 sm:py-3" />
      <Artikel className="px-[4%] py-5 sm:py-3" />
    </div>
  );
}
