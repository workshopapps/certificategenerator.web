import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import Comingsoon from "./Component/Coming/Comingsoon";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Comingsoon />}></Route>
				<Route path="/Layout" element={<Layout />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}
				</Route>
			</Routes>
		</div>
	);
}

export default App;
