import React from 'react';
import Logo from "../src/Logo";
import {navigationMenu} from "./NavigationMenu";
import {useNavigate} from "react-router-dom";
import {Avatar, Button} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navigation = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();
	const handleLogout = () => {
		console.log("Logout");
		handleClose();

	}
	return (
		<div className='h-screen sticky top-0'>
			<div>
				{/*Logo*/}
				<div className='py-5'>
					<Logo/>
				</div>

				{/*List navigation*/}
				<div className='space-y-6'>
					{navigationMenu.map((item) => <div className='cursor-pointer flex space-x-3 items-center'
					                                   onClick={() => item.title === "Profile" ? navigate(`/profile/${5}`) : navigate(item.path)}>
						{item.icon}
						<p className='text-xl'>{item.title}</p>
					</div>)}
				</div>

				{/*Button*/}
				<div className='py-10'>
					<Button
						sx={{width: "100%", borderRadius: "29px", py: "15px"}}
						variant='contained'
					>
						Tweet
					</Button>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-3'>
					<Avatar
						alt="username"
						src="../../logo.svg"
					/>
					<div>
						<span>Name</span>
						<span className='opacity-70'>@Username</span>
					</div>
					<Button
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<MoreHorizIcon/>
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
