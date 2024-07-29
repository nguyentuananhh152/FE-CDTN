import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {Button} from "@mui/material";

const RightPart = () => {
	const handleChangeTheme = () => {
		console.log("Change theme")
	}
	return (
		<div className='py-5 sticky top'>
			<div className='relative flex items-center'>
				<input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12'/>
				<div className='absolute top-0 left-0 pl-3 pt-3'>
					<SearchIcon className='text-gray-500'/>
					{/*<input type="text" name='content' placeholder='What is happening'/>*/}
				</div>
				<Brightness4Icon className='ml-3 cursor-pointer' onClick={handleChangeTheme}/>
			</div>
			<section className='my-5'>
				<Button variant='contained' sx={{padding: "10px", paddingX: "20px", borderRadius: "25px",}}>
					Logout
				</Button>
			</section>
		</div>
	);
};

export default RightPart;
