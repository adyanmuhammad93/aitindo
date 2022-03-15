import { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { BsArrowRight } from "react-icons/bs";

import { useIsLoggedIn } from "hooks/useAuth";
import { apiResolver, apiResolverNewsletter } from "services/common-utils";
import * as CustomerService from "services/customer-service";

import Toggle from "components/Atom/Toggle/toggle-2";
import Preloader from "components/Atom/Preloader";

export default function SectionNewsletter({
  title = "SUBSCRIBE TO OUR NEWSLETTER"
}) {
  const [emailField, setEmailField] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("normal");
  const [showPreloader, setShowPreloader] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const { setShowModal } = useStoreActions(globalAction => globalAction);

  function handleFieldEmailChange(e) {
    setEmailField(e.target.value);
  }

  async function handleSubscribe(e) {
    e.preventDefault();
    setMessage("");

    // This should not trigger when user is logged in but just in case it is,
    // make sure the rest of this function does not execute.
    if (isLoggedIn) {
      return false;
    }

    if (emailField === "") {
      setMessageType("error");
      setMessage("Please enter a valid email address");

      setShowPreloader(false);

      return false;
    }

    setShowModal({
      show: true,
      modalComponent: "LoginPopup"
    });

    return true;
  }

  const getNewsletterStatus = async () => {
    const [res, err] = await apiResolver(() =>
      CustomerService.getCustomerNewsletterStatus()
    );

    if (err) console.error("Error fetching newsletter status ", err);
    if (res) {
      setNewsletterStatus(res.data.isSubscribeNewsletter);
    }
  };

  const subscribeUser = async () => {
    setMessageType("normal");
    setMessage("");

    const [res, err] = await apiResolverNewsletter(() =>
      CustomerService.subscribeCustomerToNewsletter()
    );

    if (err) {
      console.error("Error subscribing user: ", err);
      setMessageType("error");
      setMessage("Gagal mengubah status berlangganan Anda");
      setShowPreloader(false);
    }
    if (res) {
      setMessageType("normal");
      setMessage("Anda telah berlangganan newsletter Wellings");
      setNewsletterStatus(true);
      setShowPreloader(false);
    }
  };

  const unsubscribeUser = async () => {
    setMessageType("normal");
    setMessage("");

    const [res, err] = await apiResolverNewsletter(() =>
      CustomerService.unsubscribeCustomerToNewsletter()
    );

    if (err) {
      console.error("Error unsubscribing user: ", err);
      setMessageType("error");
      setMessage("Gagal mengubah status berlangganan Anda");
      setShowPreloader(false);
    }
    if (res) {
      setMessageType("normal");
      setMessage("Anda telah berhenti berlangganan newsletter Wellings");
      setNewsletterStatus(false);
      setShowPreloader(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const subscribeChangeHandler = async () => {
    setShowPreloader(true);
    // console.log('Current status:', newsletterStatus);
    if (!newsletterStatus) {
      subscribeUser();
    } else {
      unsubscribeUser();
    }
  };

  useEffect(() => {
    const isUserEmail = localStorage.getItem("__email");
    setUserEmail(isUserEmail);
  }, []);

  useEffect(() => {
    getNewsletterStatus();
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <section className="pb-8 sm:pb-3">
        <div className="flex w-full py-8 px-[5%] bg-[#f2f2f2] justify-center sm:pt-5 sm:pb-8">
          <div className="flex flex-col justify-center text-center">
            <div className="text-2xl font-bold sm:text-sm">{title}</div>
            <p className="text-lg py-8 leading-5 font-semibold sm:pb-5 sm:pt-2 sm:text-[11px]">
              Be the first to know about new products, exclusive promotions &
              rewards directly to your inbox.
            </p>
            <form
              className="bg-[#e0e0e0] w-full py-2 px-3 flex  max-w-[700px] mx-auto"
              onSubmit={e => handleSubscribe(e)}
            >
              {isLoggedIn ? (
                <input
                  type="text"
                  id="newsletter-email"
                  name="newsletter-email"
                  className="w-full p-1 bg-transparent z-0 border-none outline-none sm:text-sm"
                  value={userEmail}
                  disabled
                  onChange={e => handleFieldEmailChange(e)}
                />
              ) : (
                <input
                  type="text"
                  id="newsletter-email"
                  name="newsletter-email"
                  className="w-full p-1 bg-transparent z-0 border-none outline-none sm:text-sm"
                  placeholder="Masukkan email Anda"
                  onChange={e => handleFieldEmailChange(e)}
                />
              )}

              {isLoggedIn ? (
                <Toggle
                  checked={newsletterStatus}
                  handler={() => subscribeChangeHandler()}
                />
              ) : (
                <BsArrowRight
                  className="flex items-center h-full text-2xl text-gray-600 sm:text-xl"
                  role="presentation"
                  onClick={e => handleSubscribe(e)}
                />
              )}
            </form>

            {message !== "" && (
              <div
                className={`text-xs py-5 sm:pb-3 sm:pt-2 sm:text-[10px] ${
                  messageType === "normal" ? "text-main-green" : "text-main-red"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
