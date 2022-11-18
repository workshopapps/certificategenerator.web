import { Route, Routes } from "react-router-dom";
import "./App.css";
//import Layout from "./Component/Layout";
import Signup from "./Component/Signup-Login/Signup";
import Login from "./Component/Signup-Login/Login";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/signup" element={<Signup />}>
					{/* <Route path="/genetrate" element={<Generate />} /> */}	
				</Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</div>
	);
}

export default App;
