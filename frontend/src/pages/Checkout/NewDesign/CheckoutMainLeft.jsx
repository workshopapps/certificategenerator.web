import React from "react";
import "./CheckoutMainLeft.style.scss";

const CheckoutMainLeft = () => {
  return (
    <div className="checkout-container">
      <h2>Billing Details</h2>
      <form>
        <div className=" checkout-input">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>
      </form>
    </div>
  );
};

export default CheckoutMainLeft;
