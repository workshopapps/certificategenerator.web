import { Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import {
  AboutUs,
  BulkStep,
  BulkPreview,
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
  Preview,
  Team,
  Templates,
  Terms,
  ProfilePage,
  UploadCSV,
  ChangePassword,
  ForgotPassword,
  PasswordLinkSent,
  ResetPassword,
  PasswordChangeSuccessfully,
  Home,
  Privacy,
  Checkout,
  Generate
} from "./pages";

import Login from "./Component/Signup-Login/assets/Login";
import Signup from "./Component/Signup-Login/assets/Signup";
import ProtectedRoutes from "./Component/ProtectedRoutes";

import "./Style/App.scss";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(2.99);
  const [per, setPer] = useState("month");
  const [header, setHeader] = useState("More features customised for you");
  const [type, setType] = useState("Standard");
  const [text, setText] = useState("Everything in Basic +");
  const [subText, setSubText] = useState([]);

  function amountHandler(type, price, per, header, text, subText) {
    setType(type);
    setAmount(price);
    setPer(per);
    setHeader(header);
    setText(text);
    setSubText(subText);
  }
  return (
    <>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="/generate/:generateId" element={<Generate />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/career" element={<Career />} />
            <Route path="choice" element={<Choice />} />
            <Route path="/team" element={<Team />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/bulk_step" element={<BulkStep />} />
            <Route path="/edit_bulk" element={<EditBulk />} />
            <Route path="/bulk_preview" element={<BulkPreview />} />
            <Route
              path="/pricing"
              element={<Pricing amountHandler={amountHandler} />}
            />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/payment"
              element={
                <Checkout
                  type={type}
                  amount={amount}
                  per={per}
                  header={header}
                  text={text}
                  subText={subText}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
            <Route path="/upload" element={<UploadCSV />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ResetPassword */}
            <Route path="/fff5" element={<PasswordChangeSuccessfully />} />
            <Route
              path="/changepassword/:userId/:token"
              element={<ResetPassword />}
            />
            <Route path="/fff3" element={<ChangePassword />} />
            <Route
              path="/fff2
            "
              element={<PasswordLinkSent />}
            />
            <Route path="/fff1" element={<ForgotPassword />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default Sentry.withProfiler(App);
