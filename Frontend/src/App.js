import "./Style/App.scss";
import Navbar from "./Component/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./Component/Signup-Login/assets/Signup";
import Login from "./Component/Signup-Login/assets/Login";
import {
  AboutUs,
  BulkPreview,
  BulkStep,
  Career,
  Choice,
  ComingSoon,
  ContactUs,
  Dashboard,
  EditBulk,
  Error,
  FAQ,
  Layout,
  Pricing,
  SinglePreview,
  Team,
  Templates,
  Terms,
  UploadCSV,
  Profile,
} from "./pages";
// import Footer from './Component/Footer';

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { Privacy } from "./pages/PrivacyPolicy";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/career" element={<Career />} />
            <Route path="choice" element={<Choice />} />
            <Route path="/team" element={<Team />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/single_preview" element={<SinglePreview />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/bulk_preview" element={<BulkPreview />} />
            <Route path="/bulk_step" element={<BulkStep />} />
            <Route path="/edit_bulk" element={<EditBulk />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadCSV />} />

            <Route path="/privacy" element={<Privacy />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
