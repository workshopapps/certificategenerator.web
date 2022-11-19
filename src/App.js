import { Route, Routes } from "react-router-dom";

import Layout from "./Component/Layout";
import { ContactUs } from "./pages";


function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
				
					{/* <Route path="/genetrate" element={<Generate />} /> */}
				</Route>
				<Route path="/contact" element={<ContactUs />}/>
			</Routes>
		</div>
	);
}

export default App;
