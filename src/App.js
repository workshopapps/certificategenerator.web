import { Route, Routes } from "react-router-dom";

import "./App.css";
import Team from "./Component/Team";
import Layout from "./Component/Layout";
import Error from "./Component/Error";
import Terms from "./Component/Terms";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/team" element={<Team />} />
        </Route>
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
