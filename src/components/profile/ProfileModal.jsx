import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useFormik} from "formik";
import {Avatar, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
	const [uploading, setUploading] = React.useState(false);

	const handleSubmit = (values) => {
		console.log("Submit edit profile", values);
	}

	const handleImageChange = (event) => {
		setUploading(true);
		const {name} = event.target;
		const file = event.target.files[0];
		formik.setFieldValue(name, file);
		setUploading(false);
	}

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			address: "",
			phoneNumber: "",
			birth: "",
			blog: "",
			gender: "",
			avatar: "",
			coverImage: ""
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
									id="address"
									name="address"
									label="Address"
									value={formik.values.address}
									onChange={formik.handleChange}
									error={formik.touched.address && Boolean(formik.errors.address)}
									helperText={formik.touched.address && formik.errors.address}
								/>
								<div className='my-3'>
									<p className='text-lg'>Birth date . Edit</p>
									<p className='text-2xl'>October 26, 1999</p>
								</div>
								<p className='py-3 text-lg'>Edit professional profile</p>
							</div>
						</div>
					</form>
				</Box>
			</Modal>
		</div>
	);
}