import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import Error from "./Component/Error";
// import Navbar from './Component/Navbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/genetrate" element={<Generate />} /> */}
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
