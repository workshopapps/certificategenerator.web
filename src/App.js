import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";
import Pricing from "./pages/Pricing";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<>
			<Layout>
				<main className="App">
					<Routes>
						{/* <Route path="/" element={<Layout />}>
							
						</Route> */}
						<Route path="/pricing" element={<Pricing />} />
					</Routes>
				</main>
			</Layout>
		</>
	);
}

export default App;
