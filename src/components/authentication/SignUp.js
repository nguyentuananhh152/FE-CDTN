import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Logo from "../src/Logo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/auth/Action";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {formatDate} from "../../config/config"
const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required"),
	birth: Yup.date().nullable().required('Birth is required'),
})

export default function SignUp() {
	const dispatch = useDispatch();
	// Format date to form: yyyy-dd-MM


	// Submit form
	const handleSubmit = (values) => {
		const formattedValues = {
			...values,  // tạo một bản sao của đối tượng values và đặt tên cho nó là formattedValues
			birth: formatDate(values.birth),    // định nghĩa lại thuộc tính birth của đối tượng formattedValues
		};
		dispatch(registerUser(formattedValues))
		console.log("Sign up: ", formattedValues);
	}

	// Define object formik
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			address: "",
			birth: new Date(),
		},
		validationSchema,
		onSubmit: handleSubmit
	})

	// Used to notificate
	const [notification, setNoti] = useState('')

	// Function go to tab login
	const login = () => {
		window.location.replace('/signin')
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Logo/>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form noValidate onSubmit={formik.handleSubmit} style={{marginTop: 24}}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									value={formik.values.firstName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.firstName && Boolean(formik.errors.firstName)}
									helperText={formik.touched.firstName && formik.errors.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.lastName && Boolean(formik.errors.lastName)}
									helperText={formik.touched.lastName && formik.errors.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="address"
									label="Address"
									name="address"
									value={formik.values.address}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.address && Boolean(formik.errors.address)}
									helperText={formik.touched.address && formik.errors.address}
								/>
							</Grid>
							<Grid className='space-x-9' container direction="row" item xs={12}>
								<Grid>
									Birth
								</Grid>
								<Grid>
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
								</Grid>
							</Grid>
						</Grid>
						<p style={{color: "red"}}>{notification}</p>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{mt: 3, mb: 2}}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2" onClick={login}>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Container>
			<ToastContainer/>
		</ThemeProvider>
	);
}