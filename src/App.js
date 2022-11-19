import { Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./Component/Dashboard";
import Team from "./Component/Team";
import Layout from "./Component/Layout";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/team" element={<Team />} /> 
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
