import React, { useEffect, useState } from "react";
import { RestaurantMenu_API, SWIGGY_API } from "../utils/constant";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
  const [RestaurantMenuData, setRestaurantMenuData] = useState(null);
  useEffect(() => {
    fetchRestaurantMenu();
  }, []);

  const fetchRestaurantMenu = async () => {
    try {
      const response = await fetch(SWIGGY_API);

      if (!response.ok) {
        throw new Error("API responded with status " + response.status);
      }

      const json = await response.json();
      console.log(json);
      //   console.log(json);
      //   setRestaurantMenuData(json);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  return (
    <div className="menuContainer">
      <div>Restaurant Menu</div>
    </div>
  );
};
export default RestaurantMenu;
