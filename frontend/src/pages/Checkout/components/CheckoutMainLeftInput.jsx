import CountryList from "./CountryList";
import { FiChevronDown } from "react-icons/fi";

function CheckoutMainLeftInput(props) {
  if (props.label === "Country") {
    return (
      <div id="CheckoutMainLeftInput-main">
        <label htmlFor="" id="CheckoutMainLeftInput-label">
          {props.label}
        </label>
        <div
          id="CheckoutMainLeftInput-div"
          style={{ width: "100%", height: "110%", overflow: "hidden" }}
          className={props.class}
        >
          <div>
            <CountryList value={props.label} />
            <FiChevronDown size={20} className="select_dropdown_icon" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="CheckoutMainLeftInput-main">
        <label htmlFor="" id="CheckoutMainLeftInput-label">
          {props.label}
        </label>
        <div id="CheckoutMainLeftInput-div" className={props.class}>
          <input
            type="text"
            name=""
            id="CheckoutMainLeftInput-input"
            placeholder={props.placeholder}
            value={props.value}
            onInput={props.functions}
          />
          <img
            src={props.icon}
            alt={props.icon}
            id="CheckoutMainLeftInput-icon"
          />
        </div>
      </div>
    );
  }
}

export default CheckoutMainLeftInput;
