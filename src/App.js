import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import Hero from "./Component/Hero";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}
					<Route path="/" element={<Hero />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
