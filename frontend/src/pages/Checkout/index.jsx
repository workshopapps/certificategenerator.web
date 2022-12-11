import "./pagescss/CheckoutPage.css";
import "./pagesresponsivecss/CheckoutPageResponsive.css";
import CheckoutMain from "./components/CheckoutMain";

function Checkout({ type, amount, per, header, text, subText }) {
  return (
    <div className="container-fluid" id="CheckoutPage-main-container">
      <CheckoutMain
        type={type}
        amount={amount}
        per={per}
        header={header}
        text={text}
        subText={subText}
      />
    </div>
  );
}

export default Checkout;
