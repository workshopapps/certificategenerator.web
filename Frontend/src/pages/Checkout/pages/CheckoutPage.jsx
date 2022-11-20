import 'bootstrap/dist/css/bootstrap.min.css'
import '../pagescss/CheckoutPage.css'
import '../pagesresponsivecss/CheckoutPageResponsive.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CheckoutMain from '../components/CheckoutMain'

function CheckoutPage() {
  return (
    <div className="container-fluid" id='CheckoutPage-main-container'>

        <Header />

        <CheckoutMain />

        <Footer />

    </div>
  )
}

export default CheckoutPage
