import CardProduct from "components/Common/Card/Product";

export default function Products({ filter, title, total, handleSortChange, products }) {
  return (
    <div>
      {filter && filter !== "false" && (
        <div className="flex flex-row-reverse justify-between py-5 md:md:flex-col">
          <div className="flex justify-center md:py-4 md:space-x-6">
            <div
              role="presentation"
              className="hidden filterToggle border border-gray-500 py-3 w-32 text-center font-bold text-xs text-gray-600 uppercase md:block"
              // onClick={() => setShowPopup(true)}
            >
              Filter
            </div>

            <select
              name="sort"
              id="sort"
              className="border p-2 w-32 uppercase text-xs font-bold md:border-gray-500 md:text-gray-600"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option disabled selected>Urutkan</option>
              <option value="0">Best Seller</option>
              <option value="1">Terbaru</option>
              <option value="2">Abjad A-Z</option>
              <option value="3">Abjad Z-A</option>
              <option value="4">Termurah</option>
              <option value="5">Termahal</option>
            </select>
          </div>

          <p className="text-lg font-bold sm:text-base flex items-center md:flex-col md:pt-5">
            Semua Produk
            <span className="font-normal pl-5 text-mainGreen2 text-sm sm:text-xs md:pl-0 md:pt-2">
              {total} Produk
            </span>
          </p>
        </div>
      )}

      {title && (
        <p className="text-lg font-bold sm:text-base flex items-center md:flex-col ">{title}</p>
      )}

      <div className="category flex flex-wrap">
        {/* {[
          Array(12)
            .fill("")
            .map((e, idx) => (
              <CardProduct
                key={idx}
                img="static/images/home/product.jpg"
                title="Title Product Title Product Title Product Title Product"
                price={20000}
                discount={15}
                cashback={13000}
                className="card-product w-[21%] m-[2%] md:w-[21%] sm:w-[46%]"
              />
            ))
        ]} */}
        {[
          products
            .map((product, idx) => (
              <CardProduct
                key={idx}
                img={product.thumbnail ? product.thumbnail : "/images/wellings-default.jpg"}
                title={product.name}
                price={product.price}
                discount={15}
                cashback={product.cashback}
                className="card-product w-[21%] m-[2%] md:w-[21%] sm:w-[46%]"
                btnBuy
                url_key={product.url_key}
                product_raw_data={product}
              />
            ))
        ]}
      </div>
    </div>
  );
}
