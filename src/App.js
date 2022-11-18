import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import Pricing from "./Component/Pricing";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/pricing" element={<Pricing />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
