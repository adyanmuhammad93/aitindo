// import { useRouter } from "next/router";

import Head from "components/Common/MetaHead";
import Banner from "components/Page/Category/Banner";
import Products from "components/Page/Category/Products";
import Breadcrumb from "components/Atom/Breadcrumb";

export default function pageCategory() {
  // const router = useRouter();

  return (
    <>
      <Head title="Category" />
      <div className="px-[4%] py-5">
        <Breadcrumb
          bread={[
            { label: "Home", href: "/" },
            // { label: categoryName, href: asPath }
            { label: "Kategori", href: "/" },
            { label: "Flash Sale", href: "/" }
          ]}
        />

        <div className="flex space-x-5 pt-4 border-t md:space-x-0">
          <div className="w-[25%] md:hidden">filter</div>
          <div className="w-[75%] mt-5 md:w-full">
            <Banner empty />
            <Products title="Rekomendasi Untuk Anda" filter="false" />
          </div>
        </div>
      </div>
    </>
  );
}
