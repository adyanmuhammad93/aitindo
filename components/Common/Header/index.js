import { useStoreState } from "easy-peasy";
import LoginPopup from "components/Common/Modal/Login";
import useResponsive from "hooks/useResponsive";
import HeaderTop from "components/Common/Header/HeaderTop";
import HeaderBottom from "components/Common/Header/HeaderBottom";

export default function Header() {
  const { isTablet } = useResponsive();
  const { modal, showNavbarMenu, isHoldingPage } = useStoreState(
    state => state
  );

  return (
    <div>
      {modal.show && modal.modalComponent === "LoginPopup" && <LoginPopup />}
      <HeaderTop />

      {!isTablet && <HeaderBottom />}
    </div>
  );
}
