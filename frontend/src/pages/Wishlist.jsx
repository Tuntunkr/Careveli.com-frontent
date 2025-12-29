
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Wishlist = () => {
  const { products, wishlistItems } = useContext(ShopContext);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in wishlistItems) {
      if (wishlistItems[itemId]) {
        const item = products.find((product) => product._id === itemId);
        if (item) {
          tempData.push(item);
        }
      }
    }
    setWishlistData(tempData);
  }, [wishlistItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {wishlistData.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            soldOut={item.soldOut}
          />
        ))}
      </div>
      {wishlistData.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          Your wishlist is empty.
        </div>
      )}
    </div>
  );
};

export default Wishlist;
