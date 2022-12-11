import CheckoutMainRightComp from "./CheckoutMainRightComp";

function CheckoutMainRight({ type, amount, per, header, text, subText }) {
  return (
    <div
      className="col-xs-12 col-12-sm col-md-12 col-lg-4 col-xl-4 col-xxl-4"
      id="CheckoutMainRight-container"
    >
      <div
        className="container-fluid"
        id="CheckoutMainRight-container-sub"
        style={{ paddingBottom: "2rem" }}
      >
        <p id="CheckoutMainRight-text-container">
          <span id="CheckoutMainRight-text-1">Order Summary</span> <br /> <br />{" "}
          <br />
          <span id="CheckoutMainRight-text-2">{`${type}`}</span> <br />
          <span id="CheckoutMainRight-text-3">{`${header}`}</span> <br /> <br />
          <span id="CheckoutMainRight-text-4">
            {`${amount}`}{" "}
            <sub id="CheckoutMainRight-text-4-sub">{`${per}`}</sub>
          </span>{" "}
          <br /> <br />
          <span id="CheckoutMainRight-text-5">{`${text}`}</span> <br /> <br />
        </p>

        {subText.map(item => (
          <CheckoutMainRightComp
            text={item.txt}
            id="CheckoutMainRightComp-main"
          />
        ))}
      </div>
    </div>
  );
}

export default CheckoutMainRight;
