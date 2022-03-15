import useResponsive from "hooks/useResponsive";
import LinkGroup from "components/Atom/LinkGroup";
import User from "components/Atom/Icon/User";
import Hearth from "components/Atom/Icon/Hearth";
import Basket from "components/Atom/Icon/Basket";
import NavSearch from "./Navbar/NavSearch";

export default function HeaderTop() {
  const { isTablet, isMobile } = useResponsive();

  return (
    <div className="flex px-[5%] py-3 justify-between border-b">
      <a href="/">
        {isMobile ? (
          <img
            src="static/images/icon/wellings.png"
            className="h-14 lg:h-10"
            alt=""
          />
        ) : (
          <img
            src="static/images/logo/wellings.png"
            className="h-14 lg:h-10"
            alt=""
          />
        )}
      </a>

      {!isTablet && <NavSearch />}

      <div className="flex space-x-5">
        <LinkGroup href="/login" className="flex items-center">
          <User className="pr-3" />
          {!isTablet && (
            <p className="font-semibold text-xs leading-5">
              Akun <br /> Masuk/Daftar
            </p>
          )}
        </LinkGroup>

        <LinkGroup href="/" className="flex items-center">
          <Hearth className="pr-3" />
          {!isTablet && (
            <p className="font-semibold text-xs leading-5">
              Favorit <br /> Produk Favorit
            </p>
          )}
        </LinkGroup>

        <LinkGroup href="/" className="flex items-center">
          <Basket className="pr-3" />
          {!isTablet && (
            <p className="font-semibold text-xs leading-5">
              Keranjang <br /> Belum ada produk
            </p>
          )}
        </LinkGroup>
      </div>
    </div>
  );
}
