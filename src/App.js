import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./components/homegape/HomePage";
import Authentication from "./components/authentication/Authentication";
import SignUp from "./components/authentication/SignUp";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "./store/auth/Action";

function App() {
	const jwt = localStorage.getItem("jwt")
	const user =  JSON.parse(localStorage.getItem("user"));
	const {auth} = useSelector(store => store)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [profileLoaded, setProfileLoaded] = useState(false);
	useEffect(() => {
		if (jwt && !user) {
			dispatch(getUserProfile()).then(() => setProfileLoaded(true));
		}
	}, [jwt, user]);

	return (
		<div className="">

			<Routes>
				{/*<Route path="/home" element={<HomePage/>}/>*/}
				<Route path="/*" element={jwt ? <HomePage/> : <Navigate to={"/signin"}/>}/>
				<Route path="/signin" element={<Authentication/>}/>
				<Route path="/signup" element={jwt ? <Navigate to={"/"}/> : <SignUp/>}/>
				{/*<Route path="/profile/:id" element={true?<Profile/>:<Authentication/>}/>*/}
			</Routes>
		</div>
	);
}

export default App;