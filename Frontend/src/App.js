
import './Style/App.scss';
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import { AboutUs, BulkPreview, BulkStep, Career,  Choice, ComingSoon, Contact, Dashboard, EditBulk, Error, FAQ, Layout, Modify, Pricing, PrivacyPolicy, SinglePreview, Team, Templates, Terms } from './pages';
import Home from './pages/Home'
import Checkout from "./pages/Checkout";
import Signup from "./component/Signup-Login/assets/Sginup";
import Login from "./component/Signup-Login/assets/Login";

function App() {
  return (
    <>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/templates' element={<Templates />} />
            <Route path='/career' element={<Career />} />
            <Route path="choice" element={<Choice />}/>
					  <Route path="modify" element={<Modify />} />
            <Route path='/team' element={<Team />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/single_preview' element={<SinglePreview />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/bulk_preview' element={<BulkPreview />} />
            <Route path='/bulk_step' element={<BulkStep />} />
            <Route path='/edit_bulk' element={<EditBulk />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path='/contact-us' element={<Contact />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
          </Route>            
          
            <Route path='/comingsoon' element={<ComingSoon />} />
            <Route path='*' element={<Error />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );

}

export default App;
