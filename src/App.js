import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Component/Dashboard";
import Team from "./Component/Team";
import Error from "./Component/Error";
import Terms from "./Component/Terms";
import Layout from "./Component/Layout";
import SinglePreview from "./Component/SinglePreview";
import BulkPreview from "./Component/BulkPreview";
import EditBulk from "./Component/EditBulk";
import { FAQ } from "./Component/FAQ/index";
import Navbar from "./Component/Navbar";
import Templates from "./Component/Templates";
import AboutUs from "./Component/AboutUs";
import Comingsoon from "./Component/Coming/Comingsoon";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/team" element={<Team />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/single_preview" element={<SinglePreview />} />
        <Route path="/bulk_preview" element={<BulkPreview />} />
        <Route path="/edit_bulk" element={<EditBulk />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Comingsoon />}></Route>
      </Routes>
    </div>
  );
}

export default App;
