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
	const {auth} = useSelector(store => store)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		console.log("User", auth.user)
		if (jwt) {
			dispatch(getUserProfile())
			navigate("/home")
		}
	}, [auth.jwt]);

	return (
		<div className="">

			<Routes>
				{/*<Route path="/home" element={<HomePage/>}/>*/}
				<Route path="/*" element={<HomePage/>}/>
				<Route path="/signin" element={<Authentication/>}/>
				<Route path="/signup" element={jwt ? <Navigate to={"/"}/> : <SignUp/>}/>
				{/*<Route path="/profile/:id" element={true?<Profile/>:<Authentication/>}/>*/}
			</Routes>
		</div>
	);
}

export default App;