import { Route, Routes } from "react-router-dom";
// import "./App.css";
import { FAQ } from "./Component/FAQ";
import Layout from "./Component/Layout";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}
				</Route>
				<Route path='/FAQ' element={<FAQ />} />
			</Routes>
		</div>
	);
}

export default App;
