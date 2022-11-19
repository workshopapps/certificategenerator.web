import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout";

import SinglePreview from "./Component/SinglePreview";
import BulkPreview from "./Component/BulkPreview";
import EditBulk from "./Component/EditBulk";
// import Navbar from './Component/Navbar';

function App() {
	return (
		<div className="App">
			
		
		
			<Routes>
				<Route exact path="/" element={<Layout />}>

				</Route>
				
				<Route path="/single_preview" element={<SinglePreview />} />
				<Route path="/bulk_preview" element={<BulkPreview />} />

				
				<Route path="/edit_bulk" element={<EditBulk />} />

				
			</Routes>
		</div>
	);
}

export default App;
