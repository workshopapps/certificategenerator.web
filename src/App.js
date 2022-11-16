import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route path='/genetrate' element={<Generate/>}/> */}
				</Route>
			</Routes>
		</div>
	);
}

export default App;
