import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import Terms from "./Component/Terms";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}
				</Route>
				<Route path="/terms" element={<Terms />} />
			</Routes>
		</div>
	);
}

export default App;
