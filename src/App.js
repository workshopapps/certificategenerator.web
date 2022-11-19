import { Route, Routes } from "react-router-dom";

import "./App.css";
import Team from "./Component/Team";
import Layout from "./Component/Layout";
import { FAQ } from "./Component/FAQ/index";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/team' element={<Team />} />
				</Route>
				<Route path='/FAQ' element={<FAQ />} />
			</Routes>
		</div>
	);
}

export default App;
