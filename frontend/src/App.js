import * as Sentry from "@sentry/react";
import { useParams } from "react-router-dom";
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
  UploadCSV
} from "./pages";
import "./Style/App.scss";
import {
  ChangePassword,
  ForgotPassword,
  PasswordLinkSent,
  ResetPassword,
  PasswordChangeSuccessfully
} from "./pages/ResetPassword";
import Generate from "./pages/Dashboard/Generate";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { Privacy } from "./pages/PrivacyPolicy";
import Login from "./Component/Signup-Login/assets/Login";
import Signup from "./Component/Signup-Login/assets/Sginup";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./Component/RequireAuth";

function App() {
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
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/upload" element={<UploadCSV />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ResetPassword */}
            <Route path="/fff5" element={<PasswordChangeSuccessfully />} />
            <Route
              path="/changepassword/:userId/:token"
              element={<ResetPassword />}
            />
            <Route path="/fff3" element={<ChangePassword />} />
            <Route path="/fff2" element={<PasswordLinkSent />} />
            <Route path="/fff1" element={<ForgotPassword />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default Sentry.withProfiler(App);
