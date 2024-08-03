import React from 'react';
import {Grid} from "@mui/material";
import Navigation from "../navigation/Navigation";
import HomeSection from "../homeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import {Route, Routes} from "react-router-dom";
import Profile from "../profile/Profile";
import PostDetail from "../Post/PostDetail";
import {ToastContainer} from "react-toastify";

const HomePage = () => {
	return (
		<Grid container xs={12} className='px-5 lg:px-20 justify-between'>
			<ToastContainer/>
			<Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative'>
				<Navigation/>
			</Grid>
			{/*xs={12}: Khi trên các thiết bị nhỏ (extra-small) (xs), phần tử sẽ chiếm toàn bộ chiều rộng (12 cột).*/}
			{/*lg={6}: Khi trên các thiết bị lớn (large) (lg), phần tử sẽ chiếm 6 cột trong tổng số 12 cột (tức là chiếm một nửa chiều rộng).*/}
			<Grid item xs={12}
			      lg={7}
			      className='px-5 lg:px-9 hidden lg:block w-full relative shadow bg-gray-100'
			      sx={{
				      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
			      }}>
				<Routes>
					<Route path="/" element={<HomeSection/>}></Route>
					<Route path="/home" element={<HomeSection/>}></Route>
					<Route path="/profile/:id" element={<Profile/>}></Route>
					<Route path="/post/:id" element={<PostDetail/>}></Route>
				</Routes>

			</Grid>
			<Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative'>
				<RightPart/>
			</Grid>
		</Grid>
	);
};

export default HomePage;
