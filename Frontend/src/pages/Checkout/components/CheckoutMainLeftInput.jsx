import 'bootstrap/dist/css/bootstrap.min.css'

function CheckoutMainLeftInput(props) {
  return (
    <div id='CheckoutMainLeftInput-main' >
        <label htmlFor="" id="CheckoutMainLeftInput-label">{props.label}</label>
        <div id='CheckoutMainLeftInput-div' className={props.class}>
          <input type="text" name="" id="CheckoutMainLeftInput-input" placeholder={props.placeholder} 
            value={props.value} onInput={props.functions} />
            <img src={props.icon} alt={props.icon} />
        </div>
        
    </div>
  )
}

export default CheckoutMainLeftInput
