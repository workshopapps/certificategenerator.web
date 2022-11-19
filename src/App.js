import { Route, Routes } from "react-router-dom";

import "./App.css";
import Team from "./Component/Team";
import Terms from "./Component/Terms";
import Layout from "./Component/Layout";
import Navbar from "./Component/Navbar";
import Templates from "./Component/Templates"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/team" element={<Team />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
