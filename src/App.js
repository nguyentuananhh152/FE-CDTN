import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/homegape/HomePage";
import Authentication from "./components/authentication/Authentication";
import Profile from "./components/profile/Profile";
import SignUp from "./components/authentication/SignUp";

function App() {
	return (
		<div className="">

			<Routes>
				<Route path="/*" element={true?<HomePage/>:<Authentication/>}/>
				<Route path="/signup" element={<SignUp/>}/>
				{/*<Route path="/profile/:id" element={true?<Profile/>:<Authentication/>}/>*/}
			</Routes>
		</div>
	);
}

export default App;
