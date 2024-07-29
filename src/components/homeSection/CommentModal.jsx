import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Avatar, Button, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import {useFormik} from "formik";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from "@mui/icons-material/Close";

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
	outline: 'none',
	borderRadius: 4
};

export default function CommentModal({handleClose, open}) {
	const [uploadingImage, setUploadingImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (values) => {
		console.log("Comment ", values);
	}
	const handleSelectImage = (event) => {
		setUploadingImage(true);
		const imgUrl = event.target.files[0];
		formik.setFieldValue("image", imgUrl);
		setSelectedImage(imgUrl)
		setUploadingImage(false);
	}
	const formik = useFormik({
		initialValues: {
			content: "",
			postId: "",
			image: ""
		},
		onSubmit: handleSubmit
	})

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<IconButton onClick={handleClose} aria-label="delete">
								<CloseIcon/>
							</IconButton>
							<p className='font-bold'>Comment</p>
						</div>
					</div>
					<section className='pb-10'>
						<div className='flex space-x-5'>
							<Avatar alt="username" src=""/>
							<div className='w-full'>
								<form onSubmit={formik.handleSubmit}>
									<div>
										<input type="text" name='content' placeholder='What is happening'
										       className='border-none outline-none text-xl bg-transparent'
										       {...formik.getFieldProps("content")}/>
										{formik.errors.content && formik.touched.content && (
											<span className='text-red-500'>{formik.errors.content}</span>
										)}
									</div>
									<div>
										<img src="" alt=""/>
									</div>
									<div className='flex justify-between items-center mt-5'>
										<div className='flex space-x-5 items-center'>
											<label
												className='flex items-center space-x-2 rounded-md cursor-pointer'>
												<ImageIcon className='text-[#1d9bf0]'/>
												<input type="file" name="imageFile" className='hidden'
												       onChange={handleSelectImage}/>
											</label>
											<TagFacesIcon className='text-[#1d9bf0]'/>
										</div>
										<div>

										</div>
										<div>
											<Button
												sx={{
													width: "100%",
													borderRadius: "20px",
													paddingY: "8px",
													paddingX: "20px",
													backgroundColor: "#fff",
													// color: "#1d9bf0",    // icon color
												}}
												variant='contained'
												type="submit"
											>
												<SendIcon className='text-[#1d9bf0]'/>
											</Button>

										</div>

									</div>
								</form>

							</div>
						</div>
					</section>
				</Box>
			</Modal>
		</div>
	);
}
