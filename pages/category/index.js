import {
  useLocalStore,
  thunk,
  action,
  useStoreActions,
  useStoreState,
  createContextStore
} from "easy-peasy";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";

import Head from "components/Common/MetaHead";
import Preloader from "components/Atom/Preloader";
import Banner from "components/Page/Category/Banner";
import Products from "components/Page/Category/Products";
import Breadcrumb from "components/Atom/Breadcrumb";
import Pagination from "components/Atom/Pagination";
import PaginationMobile from "components/Atom/Pagination/Mobile";

// import useResponsive from "hooks/useResponsive";
import useResponsive from "hooks/useResponsiveAlt";
import usePreventScroll from "hooks/usePreventScroll";
import useCloseMenu from "hooks/useCloseMenu";

import { makeUrlKey } from "api/slug";

export const DetailCategoryStore = createContextStore({
  grid: 3,
  showPopup: false,
  categoryId: 0,
  page: 1,
  limit: 48,
  limitMultiplier: 2,
  sort: "0",
  minPrice: 0,
  maxPrice: 0,
  priceFilter: "",
  filters: [],
  products: [],
  total: 0,
  activeFilters: [],
  isShowPreloader: false,
  isShowProductListBanner: false,
  contentProductListBanner: "",
  currentCategoryFromSlug: "",
  categoryName: "",
  amplienceImages: [],

  setGrid: action((state, payload) => {
    state.grid = payload;
  }),
  setLimit: action((state, payload) => {
    state.limit = payload;
  }),
  setCategoryId: action((state, payload) => {
    state.categoryId = payload;
  }),
  setShowPopup: action((state, payload) => {
    state.showPopup = payload;
  }),
  setSort: action((state, payload) => {
    state.sort = payload;
  }),
  setFilters: action((state, payload) => {
    state.filters = payload;
  }),
  setPriceRange: action((state, payload) => {
    state.minPrice = payload.minPrice;
    state.maxPrice = payload.maxPrice;
  }),
  setPriceFilter: action((state, payload) => {
    state.priceFilter = payload;
  }),
  setProducts: action((state, payload) => {
    state.products = payload;
  }),
  setTotal: action((state, payload) => {
    state.total = payload;
  }),
  setCurrentPage: action((state, payload) => {
    state.page = payload;
  }),
  setCurrentCategoryFromSlug: action((state, payload) => {
    state.currentCategoryFromSlug = payload;
  }),
  setCategoryName: action((state, payload) => {
    state.categoryName = payload;
  }),
  addActiveFilter: action((state, payload) => {
    if (
      _.findIndex(state.activeFilters, {
        type: payload.type,
        value: payload.value
      }) < 0
    ) {
      state.activeFilters.push({
        label: payload.label,
        type: payload.type,
        display: payload.display,
        value: payload.value
      });
    }
  }),
  removeActiveFilter: action((state, payload) => {
    _.remove(
      state.activeFilters,
      filter => filter.type === payload.type && filter.value === payload.value
    );
  }),
  removeAllActiveFilter: action(state => {
    state.activeFilters = [];
  }),
  setShowPreloader: action((state, payload) => {
    state.isShowPreloader = payload;
  }),
  setShowProductListBanner: action((state, payload) => {
    state.isShowProductListBanner = payload;
  }),
  setContentProductListBanner: action((state, payload) => {
    state.contentProductListBanner = payload;
  }),
  setAmplienceImages: action((state, payload) => {
    state.amplienceImages = payload;
  })
});

export default function DetailCategoryWrapper() {
  return (
    <DetailCategoryStore.Provider>
      <DetailCategory />
    </DetailCategoryStore.Provider>
  );
}

// export default function pageCategory() {
function DetailCategory() {
  const {
    showPopup,
    sort,
    filters,
    activeFilters,
    categoryId,
    priceFilter,
    products,
    limit,
    page,
    total,
    minPrice,
    maxPrice,
    isShowPreloader,
    isShowProductListBanner,
    contentProductListBanner,
    categoryName
  } = DetailCategoryStore.useStoreState(state => state);

  const {
    setShowPopup,
    setFilters,
    setSort,
    setCategoryId,
    setPriceRange,
    setPriceFilter,
    addActiveFilter,
    removeActiveFilter,
    removeAllActiveFilter,
    setProducts,
    setTotal,
    setCurrentPage,
    setShowPreloader,
    setShowProductListBanner,
    setContentProductListBanner,
    setCurrentCategoryFromSlug,
    setCategoryName
  } = DetailCategoryStore.useStoreActions(act => act);

  const router = useRouter();

  const { isTablet, isMobile } = useResponsive();
  // const { categorySlug } = router.query
  // const { asPath } = router

  // function normalizeStringFromURL(string) {
  //   return string.replace(/[_-]/g, ' ').replace(/[0-9]/g, '')
  // }

  // if (categorySlug && categorySlug.length && categorySlug.length > 1) {
  //   const detailCategorySlug = categorySlug.pop()
  //   const categoryIdFromSlug = parseInt(detailCategorySlug.split('-').pop(), 10)
  //   const getCurrentCategoryFromSlug = normalizeStringFromURL(asPath.split('/').pop())
  //   setCurrentCategoryFromSlug(getCurrentCategoryFromSlug)

  //   if (Number.isInteger(categoryIdFromSlug) && categoryIdFromSlug > 0) {
  //     setCategoryId(categoryIdFromSlug)
  //   }
  // }

  // usePreventScroll(showPopup)

  // useCloseMenu()

  //
  //
  // const { categoryWellings, currentMenuPosition, currentMenuIdWhileHover } = useStoreState(
  const { categoryWellings } = useStoreState(state => state);

  const [filterByCategory, setFilterByCategory] = useState(false);

  const handleOnClick = (e, id) => {
    // console.log(e, id)
    e.preventDefault();
    // populateProducts(categoryId, 1)
    setCategoryId(id);
    populateProducts();
    // console.log(categoryId)
  };
  //
  //

  // async function populateFilter() {
  //   const url = `${process.env.HOST_API}/api/v1/filters/?category_id=${categoryId}`
  //   if (!categoryId) {
  //     return
  //   }

  //   try {
  //     const result = await axios.get(url)
  //     if (result.data.data.data) {
  //       const availableFilters = result.data.data.data
  //       setFilters(availableFilters)
  //       let currentMinPrice = 0
  //       let currentMaxPrice = 0

  //       const filterPrice = availableFilters.find((filter) => filter.type === 'price')
  //       if (filterPrice && filterPrice.data) {
  //         filterPrice.data.forEach((filterData) => {
  //           const [min, max] = filterData.value.split('-')
  //           const intMin = parseInt(min, 10)
  //           const intMax = parseInt(max, 10)

  //           if (currentMinPrice === 0) {
  //             currentMinPrice = intMin
  //           } else {
  //             currentMinPrice = Math.min(intMin, currentMinPrice)
  //           }

  //           currentMaxPrice = Math.max(currentMaxPrice, intMax)
  //         })

  //         setPriceRange({ minPrice: currentMinPrice, maxPrice: currentMaxPrice })
  //       }
  //     }
  //   } catch (error) {
  //     throw Error(error)
  //   }
  // }

  // async function populateProducts(categoryId, page, sort, limit=12) {
  async function populateProducts() {
    // let url = `${process.env.HOST_API}/api/v1/products/?category_id=${categoryId}&page=${page}&limit=${limit}`
    let url = `https://api-dev.eraspace.com/jds-products/api/v1/products/?category_id=9&page=${page}&limit=${limit}`;
    if (!categoryId) {
      return;
    }

    // if (activeFilters.length > 0) {
    //   activeFilters.forEach((filter) => {
    //     let filterUrlPart = '&'
    //     if (filter.type !== 'child_category') {
    //       filterUrlPart += 'f_'
    //     }
    //     url += `${filterUrlPart}${filter.type}[]=${filter.value}`
    //   })
    // }

    // if (priceFilter) {
    //   url += `&f_filter_price=${priceFilter.join('-')}`
    // }

    switch (sort) {
      case "0":
        url += "&dir=position&order=asc";
        break;
      case "1":
        url += "&dir=newest&order=desc";
        break;
      case "2":
        url += "&dir=name&order=asc";
        break;
      case "3":
        url += "&dir=name&order=desc";
        break;
      case "4":
        url += "&dir=price&order=asc";
        break;
      case "5":
        url += "&dir=price&order=desc";
        break;
      default:
        break;
    }

    try {
      setShowPreloader(true);
      const result = await axios.get(url);
      setCategoryName(result.data.data.category.name);
      // if (result.data.data.category.landing_page) {
      //   setShowProductListBanner(result.data.data.category.landing_page)
      //   const blockContent = await getBlock(result.data.data.category.landing_page)
      //   setContentProductListBanner(blockContent.data.items.content)
      // } else {
      //   setShowProductListBanner(false)
      // }
      setProducts(result.data.data.items);
      setTotal(result.data.data.total_count);
    } catch (error) {
      throw Error(error);
    } finally {
      setShowPreloader(false);
    }
  }

  useEffect(() => {
    let categoryIsReady = localStorage.getItem("__categoryWellings");

    if (categoryIsReady === null || categoryIsReady === "{}") {
      setFilterByCategory(false);
    } else {
      // let filterList = '<br />' + JSON.parse(categoryIsReady).map(function(item){ return item.name; }).join('<br />')
      // setFilterByCategory(filterList)

      let filterList = JSON.parse(categoryIsReady).map(function (item) {
        return { name: item.name, id: item.id };
      });
      setFilterByCategory(filterList);
      // console.log(filterList)

      setCategoryId(JSON.parse(categoryIsReady)[0].id);
    }
  }, []);

  // useEffect(() => {
  //   populateFilter()
  // }, [categoryId, activeFilters])

  // useEffect(() => {
  //   populateProducts()
  // }, [categoryId, activeFilters, priceFilter, page, sort, limit])

  useEffect(() => {
    populateProducts();
  }, [categoryId, page, sort, limit]);

  return (
    <>
      <Head title="Category" />
      {isShowPreloader && <Preloader />}
      <div className="px-[4%] py-5">
        <Breadcrumb
          bread={[
            { label: "Home", href: "/" },
            { label: "Kategori", href: "/category" }
          ]}
        />

        <div className="flex border-t space-x-5 pt-4 md:space-x-0">
          <div className="w-[25%] md:hidden">
            <span className="font-bold">FILTER</span>
            <br />
            <br />
            {/* <div>{filterByCategory === false ? 'Loading...' : parse(filterByCategory)}</div> */}
            <div>
              {filterByCategory === false ? (
                "Loading..."
              ) : (
                <ul>
                  {filterByCategory.map((item, index) => (
                    <li>
                      <a
                        href="#"
                        key={index}
                        data-href={`/category/${makeUrlKey(item.name)}-${
                          item.id
                        }`}
                        onClick={e => handleOnClick(e, item.id)}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-[75%] md:w-full">
            <Banner />
            <Products
              filter
              total={total}
              handleSortChange={setSort}
              products={products}
            />
            <Pagination
              page={page}
              limit={limit}
              total={total}
              onPageChanged={setCurrentPage}
              // slotRight={<TotalProduct total={total} />}
            />

            {isTablet && (
              <PaginationMobile
                page={page}
                limit={limit}
                total={total}
                onPageChanged={setCurrentPage}
                // slotRight={<TotalProduct total={total} />}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
