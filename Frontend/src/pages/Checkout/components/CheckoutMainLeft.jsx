import 'bootstrap/dist/css/bootstrap.min.css'
import SecurePay from '../icons/Secure Pay.svg'
import CreditCard from '../icons/Credit Card.svg'
import BankTransfer from '../icons/Bank Transfer.svg'
import Card from '../icons/Card.svg'
import CheckoutMainLeftInput from './CheckoutMainLeftInput'
import CheckoutMainLeftComp from './CheckoutMainLeftComp'
import { useState } from 'react'

function CheckoutMainLeft() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const [firstNameCheck, setFirstNameCheck] = useState(false)
  const [lastNameCheck, setLastNameCheck] = useState(false)
  const [countryCheck, setCountryCheck] = useState(false)
  const [zipCodeCheck, setZipCodeCheck] = useState(false)
  const [cardNameCheck, setCardNameCheck] = useState(false)
  const [cardNumberCheck, setCardNumberCheck] = useState(false)
  const [expiryCheck, setExpiryCheck] = useState(false)
  const [cvvCheck, setCvvCheck] = useState(false)

  const [icon, setIcon] = useState()

  function firstNamef(value){
    setFirstName(value);
    if(value === ''){
      setFirstNameCheck(true);
    }else{
      setFirstNameCheck(false);
    }
  }

  function lastNamef(value){
    setLastName(value);
    if(value === ''){
      setLastNameCheck(true);
    }else{
      setLastNameCheck(false);
    }
  }

  function countryf(value){
    setCountry(value);
    if(value === ''){
      setCountryCheck(true);
    }else{
      setCountryCheck(false);
    }
  }

  function zipCodef(value){
    setZipCode(value);
    if(value === ''){
      setZipCodeCheck(true);
    }else{
      setZipCodeCheck(false);
    }
  }

  function cardNamef(value){
    setCardName(value);
    if(value === ''){
      setCardNameCheck(true);
    }else{
      setCardNameCheck(false);
    }
  }

  function cardNumberf(value){
    setCardNumber(value);
    if(value === ''){
      setCardNumberCheck(true);
      setIcon();
    }else{
      setCardNumberCheck(false);
      setIcon(Card);
    }
  }

  function expiryf(value){
    setExpiry(value);
    if(value === ''){
      setExpiryCheck(true);
    }else{
      setExpiryCheck(false);
    }
  }

  function cvvf(value){
    setCvv(value);
    if(value === ''){
      setCvvCheck(true);
    }else{
      setCvvCheck(false);
    }
  }

  return (
    <div className="col-xs-12 col-12-sm col-md-12 col-lg-8 col-lxl-8 col-xxl-8" id='CheckoutMainLeft-container'>

      <h4 id='CheckoutMainLeft-text-1'>Billing Details</h4>

      <div id='CheckoutMainLeft-main-div-1'>

        <div className='row' id='CheckoutMainLeft-main-div-1-sub-div-1'>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col-space-com'>
            <CheckoutMainLeftInput label='First name' placeholder='Bassey' value={firstName} functions={e => firstNamef(e.target.value)}
            class={firstNameCheck ? 'firstname-error' : 'firstname-ok'} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col'>
            <CheckoutMainLeftInput label='Last name' placeholder='John' value={lastName} functions={e => lastNamef(e.target.value)}
            class={lastNameCheck ? 'lastname-error' : 'lastname-ok'} />
          </div>
          
        </div>

        <div className='row' id='CheckoutMainLeft-main-div-1-sub-div-2'>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col-space'>
            <CheckoutMainLeftInput label='Country' placeholder='Your country' value={country} functions={e => countryf(e.target.value)}
            class={countryCheck ? 'country-error' : 'country-ok'} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col'>
            <CheckoutMainLeftInput label='ZIP/Postal code' placeholder='Your postal code' value={zipCode} functions={e => zipCodef(e.target.value)}
            class={zipCodeCheck ? 'zipcode-error' : 'zipcode-ok'} />
          </div>
          
        </div>

      </div>

      <h4 id='CheckoutMainLeft-text-2'>Payment Method</h4>
      
      <div id='CheckoutMainLeft-main-div-2'>

        <div className='row' id='CheckoutMainLeft-main-div-2-div-1'>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col-space-com'>
            <CheckoutMainLeftComp text='Credit Card' icon1={CreditCard} space='1vw' border='1px solid #01AA6E' />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col'>
            <CheckoutMainLeftComp text='Bank Transfer' icon1={BankTransfer} border='1px solid #222222' />
          </div>

        </div>

        <CheckoutMainLeftInput label='Cardholder name' placeholder='' value={cardName} functions={e => cardNamef(e.target.value)}
        class={cardNameCheck ? 'cardname-error' : 'cardname-ok'} />

        <div className='row gx-5' id='CheckoutMainLeft-main-div-2-div-2'>

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" id='CheckoutMainLeft-col-space'>
            <CheckoutMainLeftInput label='Card number' placeholder='' class={cardNumberCheck ? 'cardnumber-error' : 'cardnumber-ok'}
            value={cardNumber} functions={e => cardNumberf(e.target.value)} icon={icon} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" id='CheckoutMainLeft-col-space-com'>
            <CheckoutMainLeftInput label='Expiry' placeholder='DD/MM/YYYY' value={expiry} functions={e => expiryf(e.target.value)}
            class={expiryCheck ? 'expiry-error' : 'expiry-ok'} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" id='CheckoutMainLeft-col'>
            <CheckoutMainLeftInput label='CVV' placeholder='' value={cvv} functions={e => cvvf(e.target.value)}
            class={cvvCheck ? 'cvv-error' : 'cvv-ok'} />
          </div>
          
        </div>

      </div>

      <div id='CheckoutMainLeft-icon-div'>
        <img src={SecurePay} alt="SecurePay" id='CheckoutMainLeft-icon' />
      </div>

      <button id='CheckoutMainLeft-btn'>Pay $23.99</button>

    </div>
  )
}

export default CheckoutMainLeft
