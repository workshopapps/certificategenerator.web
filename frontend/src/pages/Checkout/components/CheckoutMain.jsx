import CheckoutMainLeft from "./CheckoutMainLeft";
import CheckoutMainRight from "./CheckoutMainRight";

function CheckoutMain({ type, amount, per, header, text, subText }) {
  return (
    <div className="container-fluid" id="CheckoutMain-main-container">
      <h4 id="CheckoutMain-text">Checkout</h4>

      <div className="row" id="CheckoutMain-row">
        <CheckoutMainLeft amount={amount} type={type} />

        <CheckoutMainRight
          type={type}
          amount={amount}
          per={per}
          header={header}
          text={text}
          subText={subText}
        />
      </div>
    </div>
  );
}

export default CheckoutMain;
