import React from 'react';
import Logo from "../src/Logo";
import {navigationMenu} from "./NavigationMenu";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Divider} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/auth/Action";
import defaultAvatar from '../src/default-avatar.png';
const Navigation = () => {
	const dispatch = useDispatch();
	const {auth} = useSelector(store => store)
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
		dispatch(logout())
		window.location.replace("/signin")
		handleClose();
	}

	const home = () => {
		window.location.replace('/')
	}

	return (
		<div className='h-screen sticky top-0'>
			<div>
				{/*Logo*/}
				<div className='py-5' onClick={home}>
					<Logo/>
				</div>

				{/*List navigation*/}
				<div className='space-y-6'>
					{navigationMenu.map((item) => <div className='cursor-pointer flex space-x-3 items-center'
					                                   onClick={() => item.title === "Profile" ? navigate(`/profile/my-profile`) : navigate(item.path)}>
						{item.icon}
						<p className='text-xl'>{item.title}</p>
					</div>)}
				</div>

				{/*Button*/}
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-3'>
					<Avatar
						src={auth.user?.avatar || defaultAvatar}
					/>
					<div>
						<span>{auth.user?.firstName || "User"}</span>
						<br/>
						<span className='opacity-70'>@{auth.user?.lastName || "User"}</span>
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
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
