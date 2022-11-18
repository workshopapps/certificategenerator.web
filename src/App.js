import { Route, Routes } from "react-router-dom";
import "./App.css";
import Choice from "./Component/Choice(single or bulk)";
import Layout from "./Component/Layout";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}
					<Route path="/choice" element={<Choice />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
