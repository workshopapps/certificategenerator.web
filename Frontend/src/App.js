import "./Style/App.scss";

import { Route, Routes } from "react-router-dom";
import {
  AboutUs,
  BulkPreview,
  BulkStep,
  ComingSoon,
  ContactUs,
  Career,
  Dashboard,
  EditBulk,
  Error,
  FAQ,
  SinglePreview,
  Team,
  Templates,
  Terms,
  Home,
  Pricing
} from "./pages";

import  Layout  from "../src/Component/Layout";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Layout>
        <main className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="/team" element={<Team />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/career" element={<Career />} />
            <Route path="/single_preview" element={<SinglePreview />} />
            <Route path="/bulk_preview" element={<BulkPreview />} />
            <Route path="/edit_bulk" element={<EditBulk />} />
            <Route path="/bulkstep" element={<BulkStep />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
}

export default App;
