import axios from "axios";
import _ from "lodash";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { getCategories } from "services/category-service";

import Chat from "components/Common/Header/Chat"

export default function Navbottom() {
  const { setCategoryWellings } = useStoreActions((action) => action);

  // const categories = useStoreState((state) => state.categoryWellings)

  function isMenuStorageExpiring() {
    const duration = 1000 * 60 * 20; // First two values mean 1 minute.  So this means 20 minutes.
    const previousTimestamp = localStorage.getItem("__menuTimestamp");
    // If no timestamp can be read, immediately assume we need to fetch the menu category.
    if (!previousTimestamp) {
      return true;
    }

    const currentTime = new Date().getTime();
    // To measure, substract current time with previous timestamp.
    // We call this "delta".  If delta exceeds the duration we set, it's time to fetch
    // the menu category.
    if (currentTime - previousTimestamp > duration) {
      return true;
    }

    return false;
  }

  async function getLevelZeroCategory() {
    const categoryData = getCategories(process.env.ID_CATEGORY);
    setCategoryWellings(categoryData);
    localStorage.setItem("__categoryWellings", JSON.stringify(categoryData));

    // Store current timestamp, to track how long time has passed before we need
    // to fetch the menu from API again.
    const currentTime = new Date().getTime();
    localStorage.setItem("__menuTimestamp", currentTime);
  }

  useEffect(() => {
    if (
      localStorage.getItem("__categoryWellings") 
      && !isMenuStorageExpiring()
      && localStorage.getItem("__categoryWellings") !== '{}'
    ) {
      setCategoryWellings(
        JSON.parse(localStorage.getItem("__categoryWellings"))
      );
    } else {
      getLevelZeroCategory();
    }
  }, []);

  return (
    <div className="flex">
      <Chat />
    </div>
  )
}
