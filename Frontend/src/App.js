import "./Style/App.scss";
import Navbar from "./Component/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./Component/Signup-Login/assets/Sginup";
import Login from "./Component/Signup-Login/assets/Login";
import {
  AboutUs,
  BulkPreview,
  BulkStep,
  Career,
  Choice,
  ComingSoon,
  Dashboard,
  EditBulk,
  Error,
  FAQ,
  Layout,
  Modify,
  Pricing,
  SinglePreview,
  Team,
  Templates,
  Terms,
} from "./pages";
// import Footer from './Component/Footer';

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

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
            <Route path="modify" element={<Modify />} />
            <Route path="/team" element={<Team />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/single_preview" element={<SinglePreview />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/bulk_preview" element={<BulkPreview />} />
            <Route path="/bulk_step" element={<BulkStep />} />
            <Route path="/edit_bulk" element={<EditBulk />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment" element={<Checkout />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
