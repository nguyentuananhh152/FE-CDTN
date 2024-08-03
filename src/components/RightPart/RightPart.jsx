import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {Button, Divider} from "@mui/material";
import {logout} from "../../store/auth/Action";
import {useDispatch} from "react-redux";

const RightPart = () => {
	const dispatch = useDispatch();
	const handleChangeTheme = () => {
		console.log("Change theme")
	}

	const handleSearch = () => {

	}

	const handleLogout = () => {
		dispatch(logout())
		window.location.replace("/signin")
	}
	return (
		// sticky-0
		<div className='py-5 sticky top m-5'>
			<div className='flex items-center justify-center'>
				<div className='relative flex items-center border border-gray-500 rounded-full'>
					<input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12' placeholder='Seach...'/>
					<div className='absolute top-0 left-0 pl-3 pt-3'>
						<SearchIcon className='text-gray-500'/>
					</div>
				</div>
				<Brightness4Icon className='ml-3 cursor-pointer' onClick={handleChangeTheme}/>
			</div>
			<section className='my-5'>
				<Button variant='contained' sx={{padding: "10px", paddingX: "20px", borderRadius: "25px",}}
				onClick={handleLogout}>
					Logout
				</Button>
			</section>
		</div>
	);
};

export default RightPart;
