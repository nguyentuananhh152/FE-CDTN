import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useFormik} from "formik";
import {Avatar, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from "react-datepicker";
import {formatDate} from "../../config/config";
import {editProfile, getUserProfile, registerUser} from "../../store/auth/Action";
import {useDispatch} from "react-redux";
import axios from "axios";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: 'none',
	boxShadow: 24,
	p: 4,
	outline: "none",
	borderRadius: 4
};

export default function ProfileModal({open, handleClose}) {
	// const [open, setOpen] = React.useState(false);
	const user =  JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const [uploading, setUploading] = React.useState(false);

	const handleSubmit = (values) => {
		const formattedValues = {
			...values,
			birth: formatDate(values.birth),
		};
		dispatch(editProfile(formattedValues));
		window.location.reload();
		localStorage.removeItem("user")
		console.log("Submit edit profile", formattedValues);
	}

	const handleImageChange = async (event) => {
		setUploading(true);
		const {name} = event.target;
		const file = event.target.files[0];
		formik.setFieldValue(name, file);
		setUploading(false);

		// Data to upload
		const formData = new FormData();
		formData.append('file', file);
		// Upload avatar
		try {
			// Gửi tệp ảnh lên server
			const response = await axios.post('/api/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// Lưu URL hoặc đường dẫn ảnh từ phản hồi server
			formik.setFieldValue(name, response.data.fileUrl); // hoặc response.data.path tùy thuộc vào phản hồi server
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setUploading(false);
		}
	}

	const formik = useFormik({
		initialValues: {
			firstName: user?.firstName || "",
			lastName: user?.lastName || "",
			address: user?.address || "",
			phoneNumber: user?.phoneNumber || "",
			birth: user?.birth ? new Date(user.birth) : new Date(),
			blog: user?.blog || "",
			gender: user?.gender || "",
			avatar: user?.avatar || "",
			coverImage: user?.coverImage || "",
		},
		onSubmit: handleSubmit
	});

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form onSubmit={formik.handleSubmit}>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<IconButton onClick={handleClose} aria-label="delete">
									<CloseIcon/>
								</IconButton>
								<p className=''>Edit profile</p>
							</div>
							<Button type="submit">Save</Button>
						</div>
						{/**/}
						<div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
							{/*Change image*/}
							<React.Fragment>
								{/*Cover image*/}
								<div className='w-full'>
									<div className='relative'>
										<img
											className='w-full h-[12rem] object-cover object-center'
											src="https://drive.google.com/file/d/1taJksKywXo7E73mCAEK28nPrRmOburl5/view"
											alt=""/>
										<input
											type="file"
											className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
											onChange={handleImageChange}
											name="coverImage"/>
									</div>
								</div>
								{/*Avatar image*/}
								<div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
									<div className='relative'>
										<Avatar src="../src/logo.svg"
										        sx={{width: "10rem", height: "10rem", border: "4px solid white"}}/>
										<input
											type="file"
											className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
											onChange={handleImageChange}
											name="avatar"
										/>
									</div>
								</div>
							</React.Fragment>
							{/*Change info*/}
							<div className='space-y-3'>
								<TextField
									fullWidth
									id="firstName"
									name="firstName"
									label="First Name"
									value={formik.values.firstName}
									onChange={formik.handleChange}
									error={formik.touched.firstName && Boolean(formik.errors.firstName)}
									helperText={formik.touched.firstName && formik.errors.firstName}
								/>
								<TextField
									fullWidth
									id="lastName"
									name="lastName"
									label="Last Name"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									error={formik.touched.lastName && Boolean(formik.errors.lastName)}
									helperText={formik.touched.lastName && formik.errors.lastName}
								/>
								<TextField
									fullWidth
									id="blog"
									name="blog"
									label="Blog"
									value={formik.values.blog}
									onChange={formik.handleChange}
									error={formik.touched.blog && Boolean(formik.errors.blog)}
									helperText={formik.touched.blog && formik.errors.blog}
								/>
								<TextField
									fullWidth
									id="gender"
									name="gender"
									label="Gender"
									value={formik.values.gender}
									onChange={formik.handleChange}
									error={formik.touched.gender && Boolean(formik.errors.gender)}
									helperText={formik.touched.gender && formik.errors.gender}
								/>
								<TextField
									fullWidth
									id="phoneNumber"
									name="phoneNumber"
									label="Phone Number"
									value={formik.values.phoneNumber}
									onChange={formik.handleChange}
									error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
									helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
								/>
								<TextField
									fullWidth
									id="address"
									name="address"
									label="Address"
									value={formik.values.address}
									onChange={formik.handleChange}
									error={formik.touched.address && Boolean(formik.errors.address)}
									helperText={formik.touched.address && formik.errors.address}
								/>
								<div className=' flex my-3 space-x-5 border border-gray-500 p-3 rounded-md'>
									<p>Birth</p>
									<DatePicker
										variant="outlined"
										label="Select Date"
										selected={formik.values.birth}
										onChange={(date) => formik.setFieldValue('birth', date)}
										renderInput={(params) => <TextField
											{...params}
											label="Birth"
											name="birth"
											error={formik.touched.birth && Boolean(formik.errors.birth)}
											helperText={formik.touched.birth && formik.errors.birth}
											fullWidth

										/>}
									/>
								</div>
							</div>
						</div>
					</form>
				</Box>
			</Modal>
		</div>
	);
}