import CheckoutMainLeftInput from './CheckoutMainLeftInput'

function PaymentSwitch(props) {
  return (
    <div className="container-fluid" id='PaymentSwitch-main'>
        
        <CheckoutMainLeftInput label='Cardholder name' placeholder='' value={props.cardName} functions={props.cardNamef}
            class={props.cardNameCheck ? 'cardname-error' : 'cardname-ok'} />

        <div className='row gx-5' id='CheckoutMainLeft-main-div-2-div-2'>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col-space'>
            <CheckoutMainLeftInput label='Card number' placeholder='' class={props.cardNumberCheck ? 'cardnumber-error' : 'cardnumber-ok'}
            value={props.cardNumber} functions={props.cardNumberf} icon={props.icon} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" id='CheckoutMainLeft-col-space-com'>
            <CheckoutMainLeftInput label='Expiry' placeholder='DD/MM/YYYY' value={props.expiry} functions={props.expiryf}
            class={props.expiryCheck ? 'expiry-error' : 'expiry-ok'} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" id='CheckoutMainLeft-col'>
            <CheckoutMainLeftInput label='CVV' placeholder='' value={props.cvv} functions={props.cvvf}
            class={props.cvvCheck ? 'cvv-error' : 'cvv-ok'} />
          </div>
          
        </div>

        <div id='CheckoutMainLeft-icon-div'>
          <img src={props.SecurePay} alt="SecurePay" id='CheckoutMainLeft-icon' />
        </div>

    </div>
  )
}

export default PaymentSwitch
