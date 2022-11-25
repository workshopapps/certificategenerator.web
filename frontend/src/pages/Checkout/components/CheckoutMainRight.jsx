import CheckoutMainRightComp from './CheckoutMainRightComp'

function CheckoutMainRight() {
  return (
    <div className="col-xs-12 col-12-sm col-md-12 col-lg-4 col-xl-4 col-xxl-4" id='CheckoutMainRight-container'>

        <div className="container-fluid" id='CheckoutMainRight-container-sub'>

          <p id='CheckoutMainRight-text-container'>

            <span id='CheckoutMainRight-text-1'>Order Summary</span> <br /> <br /> <br />

            <span id='CheckoutMainRight-text-2'>Standard</span> <br />

            <span id='CheckoutMainRight-text-3'>More features customised for you</span> <br /> <br />

            <span id='CheckoutMainRight-text-4'>$23.99 <sub id='CheckoutMainRight-text-4-sub'>/month</sub></span> <br /> <br />

            <span id='CheckoutMainRight-text-5'>Eveything in Lite +</span> <br /> <br />

          </p>

          

          <CheckoutMainRightComp text='Templates library' id='CheckoutMainRightComp-main' />

          <CheckoutMainRightComp text='Create custom template' id='CheckoutMainRightComp-main' />

          <CheckoutMainRightComp text='Generate 500 certificates per month' id='CheckoutMainRightComp-main' />

          <CheckoutMainRightComp text='Send to specified mails in CSV' id='CheckoutMainRightComp-main' />

          <CheckoutMainRightComp text='Access to dashboard interface' id='CheckoutMainRightComp-main' />

          <CheckoutMainRightComp text='Basic integrations' id='CheckoutMainRightComp-main-last' />

        </div>
        
    </div>
  )
}

export default CheckoutMainRight
