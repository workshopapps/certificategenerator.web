import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import AboutUs from "./Component/AboutUs";


function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>

					{/* <Route path='/genetrate' element={<Generate/>}/> */}
				</Route>
				<Route path="/aboutUs" element={<AboutUs />}>

					{/* <Route path='/genetrate' element={<Generate/>}/> */}
				</Route>

			</Routes>
		</div>
	);
}

export default App;
