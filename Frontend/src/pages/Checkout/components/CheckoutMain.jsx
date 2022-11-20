import 'bootstrap/dist/css/bootstrap.min.css'
import CheckoutMainLeft from './CheckoutMainLeft'
import CheckoutMainRight from './CheckoutMainRight'

function CheckoutMain() {
  return (
    <div className="container-fluid" id='CheckoutMain-main-container'>
        
        <h4 id='CheckoutMain-text'>Checkout</h4>

        <div className="row" id='CheckoutMain-row'>

            <CheckoutMainLeft />

            <CheckoutMainRight />

        </div>

    </div>
  )
}

export default CheckoutMain
