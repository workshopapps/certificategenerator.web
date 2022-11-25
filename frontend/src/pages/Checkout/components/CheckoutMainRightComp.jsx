import Good from "../../../assets/svgs/checkout/Good.svg";

function CheckoutMainRightComp(props) {
  return (
    <div className="container-fluid" id={props.id}>
      <img src={Good} alt="Good" />
      <div id="CheckoutMainRightComp-div">
        <p id="CheckoutMainRightComp-text">{props.text}</p>
      </div>
    </div>
  );
}

export default CheckoutMainRightComp;
