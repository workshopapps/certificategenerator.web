<<<<<<< HEAD
import "./App.css";
import Dashboard from "./Component/Dashboard";
import Team from "./Component/Team";
import Error from "./Component/Error";
import Terms from "./Component/Terms";
import Layout from "./Component/Layout";
import SinglePreview from "./Component/SinglePreview";
import BulkPreview from "./Component/BulkPreview";
import EditBulk from "./Component/EditBulk";
import { FAQ } from "./Component/FAQ/index";
import Navbar from "./Component/Navbar";
import Templates from "./Component/Templates";
import AboutUs from "./Component/AboutUs";
import Comingsoon from "./Component/Coming/Comingsoon";
import Choice from "./Component/Choice(single or bulk)";

import Modify from "./Component/Modify";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<Navbar />
			<div className="App">
				<Routes>
					<Route path="/" element={<Layout />} />
					<Route path="/comingsoon" element={<Comingsoon />} />
					<Route path="/team" element={<Team />} />
					<Route path="choice" element={<Choice />}></Route>
					<Route path="modify" element={<Modify />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/templates" element={<Templates />} />
					<Route path="/FAQ" element={<FAQ />} />
					<Route path="/aboutUs" element={<AboutUs />} />
					<Route path="/single_preview" element={<SinglePreview />} />
					<Route path="/bulk_preview" element={<BulkPreview />} />
					<Route path="/edit_bulk" element={<EditBulk />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</>
	);
=======
import './Style/App.css';
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import { AboutUs, BulkPreview, BulkStep, ComingSoon, Dashboard, EditBulk, Error, FAQ, Layout, SinglePreview, Team, Templates, Terms } from './pages';
import Footer from './component/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Layout />} />
          <Route path='/comingsoon' element={<ComingSoon />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/templates' element={<Templates />} />
          <Route path='/team' element={<Team />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/single_preview' element={<SinglePreview />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/FAQ' element={<FAQ />} />
          <Route path='/bulk_preview' element={<BulkPreview />} />
          <Route path='/bulk_step' element={<BulkStep />} />
          <Route path='/edit_bulk' element={<EditBulk />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
>>>>>>> dev
}

export default App;
