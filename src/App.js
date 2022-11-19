import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Component/Dashboard";
import Layout from "./Component/Layout";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
