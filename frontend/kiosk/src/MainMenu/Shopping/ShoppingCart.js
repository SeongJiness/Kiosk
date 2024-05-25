import React, { useState } from "react";
import "./ShoppingCss/ShoppingCart.css";
import PackageSelect from "./PackageSelect.js";

function ShoppingCart({ items, removeFromCart, onCheckout }) {
  console.log("Received onCheckout prop:", onCheckout);

  const [itemCounts, setItemCounts] = useState({});
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [packageSelectOpen, setPackageSelectOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = (itemName) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: (prevCounts[itemName] || 1) + 1,
    }));
  };

  const handleDecrement = (itemName) => {
    if ((itemCounts[itemName] || 0) <= 1) {
      const updatedCounts = { ...itemCounts };
      delete updatedCounts[itemName];
      setItemCounts(updatedCounts);
    } else {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemName]: prevCounts[itemName] - 1,
      }));
    }
  };

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
    setPackageSelectOpen(true);
  };

  const handlePackageSelectClose = () => {
    setPackageSelectOpen(false);
  };

  const renderItems = () => {
    if (!items || items.length === 0) {
      return <p>장바구니에 담긴 상품이 없습니다.</p>;
    } else {
      return items.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.price}원</p>
          <div>
            <button onClick={() => removeFromCart(item)}>메뉴 빼기</button>
            <button onClick={() => handleDecrement(item.name)}>-</button>
            <span>{itemCounts[item.name] || 1}</span>
            <button onClick={() => handleIncrement(item.name)}>+</button>
          </div>
        </div>
      ));
    }
  };

  const calculateTotalPrice = () => {
    return items && items.length > 0
      ? items.reduce(
          (total, item) =>
            total + parseInt(item.price) * (itemCounts[item.name] || 1),
          0
        )
      : 0;
  };

  return (
    <div className="ShoppingCart-Container">
      {!paymentCompleted && (
        <div>
          <div className="ShoppingCart-Header">
            <h2>주문 내역</h2>
          </div>
          <div className="ShoppingCart-Main">
            <h3>주문 메뉴:</h3>
            {renderItems()}
            <h3>합계: {totalPrice}원</h3>
          </div>
          <div className="ShoppingCart-Pay">
            <button onClick={handleCheckout}>결제하기</button>
          </div>
        </div>
      )}
      {packageSelectOpen && (
        <PackageSelect
          onClose={handlePackageSelectClose}
          totalPrice={totalPrice}
          onCheckout={onCheckout}
        />
      )}
    </div>
  );
}

export default ShoppingCart;
