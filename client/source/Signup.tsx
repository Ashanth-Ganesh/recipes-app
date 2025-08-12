import { Box, Button, Container, IconButton, TextField, Typography, Link, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Restaurant } from '@mui/icons-material';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";

// Invalid input feedback declarations
interface Feedbacks {
	usernameFeedback: string;
	emailFeedback: string;
	passwordFeedback: string;
	confirmationPasswordFeedback: string;
}

/** 
Function to send user account data to backend api for validation and database updates.

@param username - input username
@param email - input email
@param password - input password
@param confirmationPassword - input confirmation password
*/
async function handleSignupRequest(username: string, email: string, password: string, confirmationPassword: string): Promise<Feedbacks> {
	// http request initialization
  const request = {
    username,
    email,
    password,
		confirmationPassword
  };
	//Feedback declaration
	let backendFeedbacks: Feedbacks = {
		usernameFeedback: "",
		emailFeedback: "",
		passwordFeedback: "",
		confirmationPasswordFeedback: ""
	};
	// Development backend url
	const signupApi = 'http://localhost:8000/signup';

  try {
    const response = await fetch(signupApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      console.error('Signup failed:', errorData);
      alert(errorData.detail || 'Signup failed');
    }
		else {
			// Upon successful connection
			const data = await response.json();
			// Checking completed_signup to check for validity
			if (data.completed_signup == true) {
				console.log('Signup success:', data);
				window.location.href = '/login';
			}
			else {
				// Parse backend feedback
				backendFeedbacks.usernameFeedback = data.usernameFeedback;
				backendFeedbacks.emailFeedback = data.emailFeedback;
				backendFeedbacks.passwordFeedback = data.passwordFeedback;
				backendFeedbacks.confirmationPasswordFeedback = data.confirmationPasswordFeedback;
			}
		}

  } catch (error) {
    console.error('Network error:', error);
    alert('Could not connect to the server. Please try again later.');
  }
	// Return feedback if user input was invalid
	return backendFeedbacks;
};

/** 
Function to validate user inputs and send valid inputs to server.

@param username - input username
@param email - input email
@param password - input password
@param confirmationPassword - input confirmation password
*/
async function handleSignup(username: string, email: string, password: string, confirmationPassword: string): Promise<Feedbacks> {
	//Feedback declaration
	let userFeedbacks: Feedbacks = {
		usernameFeedback: "",
		emailFeedback: "",
		passwordFeedback: "",
		confirmationPasswordFeedback: ""
	};
	let validInput = true;
	// Username validation
  /* Username validation rules:
  Length must be between 8 and 24 characters long
  Usernames must only contain - letters, digits, hyphens, underscores and periods
  */
  const usernamePattern: RegExp = /^[a-zA-Z0-9._-]+$/;
  if (username.length < 8) {
    userFeedbacks.usernameFeedback = "Username must be atleast 8 characters long";
		validInput = false;
  }
  else if (username.length > 24) {
    userFeedbacks.usernameFeedback = "Username cannot be longer longer than 24 characters";
		validInput = false;
  }
  else if (usernamePattern.test(username) == false) {
    userFeedbacks.usernameFeedback = "Only letters, digits, hyphens, underscores or periods are allowed";
		validInput = false;
  }

  // Email validation
  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email) == false) {
    userFeedbacks.emailFeedback = "Please enter a valid e-mail address";
		validInput = false;
  }

  // Password validation
  /* Password validation rules:
  - be between 8 and 32 characters long
  - have atleast 1 digit
  - have atleast 1 lowercase letter
  - have atleast 1 uppercase letter
  - have atleast 1 special character from hyphens, underscores or periods 
  */
 const passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_.]).{8,32}$/;
 if (passwordPattern.test(password) == false) {
	userFeedbacks.passwordFeedback = "Please enter a valid password";
	validInput = false;
 }

 // Confirmation password validation
 // Confirmation password must match original password.
 if (confirmationPassword != password) {
	userFeedbacks.confirmationPasswordFeedback = "Passwords must match";
	validInput = false;
 }

 // Implement code for if all inputs are valid
 if (validInput == true) {
	userFeedbacks = await handleSignupRequest(username, email, password, confirmationPassword);
 }

	return userFeedbacks;
}



const SignupPage = () => {
	// Password visibility state
	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => setShowPassword((show) => !show);
	// Confirmation password visibility
	const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
	const handleToggleConfirmationPassword = () => setShowConfirmationPassword((show) => !show);
	// live state management for all input fields
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmationPassword, setConfirmationPassword] = useState('');
	const [email, setEmail] = useState('');
	// Validity feedbacks
	const [userFeedbacks, setUserFeedbacks] = useState<Feedbacks>({
		usernameFeedback: "",
		emailFeedback: "",
		passwordFeedback: "",
		confirmationPasswordFeedback: ""
	});
	return (
		<>
			<Helmet>
				<title>Signup | RecipeApp</title>
				<meta name="description" content="Signup to create your own account to save and schedule your favorite recipes and manage your kitchen inventory." />
			</Helmet>

			<Box
				sx={{
				backgroundImage: `url(/assets/signup-bg.png)`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				p: 0
				}}
			>
				<Container
					maxWidth="xs"
					sx={{
					backgroundColor: 'rgba(255, 255, 255, 0.95)',
					borderRadius: 3,
					boxShadow: 3,
					p: 4,
					textAlign: 'center'
					}}
				>
					<Restaurant sx={{ fontSize: 48}} />
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						Register
					</Typography>

					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							label="Username"
							type="text"
							value={username}
							helperText={userFeedbacks.usernameFeedback}
							error={Boolean(userFeedbacks.usernameFeedback)}
							onChange={(e) => setUsername(e.target.value)}
							variant='outlined'
							fullWidth
							required
							margin='normal'
						/>
						<TextField
							label="Email Address"
							type="email"
							value={email}
							helperText={userFeedbacks.emailFeedback}
							error={Boolean(userFeedbacks.emailFeedback)}
							onChange={(e) => setEmail(e.target.value)}
							variant="outlined"
							fullWidth
							required
							margin="normal"
						/>
						<TextField
							label="Password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							helperText={userFeedbacks.passwordFeedback}
							error={Boolean(userFeedbacks.passwordFeedback)}
							onChange={(e) => setPassword(e.target.value)}
							variant="outlined"
							fullWidth
							required
							margin="normal"
							slotProps={{
								input: {
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleTogglePassword}>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>

						<TextField
							label="Confirm Password"
							type={showConfirmationPassword ? 'text' : 'password'}
							value={confirmationPassword}
							helperText={userFeedbacks.confirmationPasswordFeedback}
							error={Boolean(userFeedbacks.confirmationPasswordFeedback)}
							onChange={(e) => setConfirmationPassword(e.target.value)}
							variant="outlined"
							fullWidth
							required
							margin="normal"
							slotProps={{
								input: {
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleToggleConfirmationPassword}>
												{showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>

						<Typography variant="body2" textAlign={'left'} sx={{whiteSpace: 'pre-line'}} color='textDisabled'>
							Password must:
						</Typography>
						<Box textAlign={'left'}>
							<Typography variant="body2" color={(password.length >= 8 && password.length <= 32) ? 'green' : 'red'}>
								• Be between 8 and 32 characters long
							</Typography>
							<Typography variant="body2" color={/\d/.test(password) ? 'green' : 'red'}>
								• Have at least 1 digit
							</Typography>
							<Typography variant="body2" color={/^(?=.*[A-Z])(?=.*[a-z])/.test(password) ? 'green' : 'red'}>
								• Have at least 1 uppercase and lowercase letter
							</Typography>
							<Typography variant="body2" color={/[-_.]/.test(password) ? 'green' : 'red'}>
								• Have at least 1 special character (-_.)
							</Typography>
						</Box>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
								event.preventDefault();
								setUserFeedbacks(await handleSignup(username, email, password, confirmationPassword));
								console.log(userFeedbacks.usernameFeedback);
								console.log(userFeedbacks.emailFeedback);
								console.log(userFeedbacks.passwordFeedback);
								console.log(userFeedbacks.confirmationPasswordFeedback);
							}}
							sx={{ backgroundColor: '#000', color: '#fff', py: 1.5, mb: 2, mt: 1, '&:hover': { backgroundColor: '#333' } }}
						>
							Signup
						</Button>

						<Typography variant="body2">
							Already have an account?{' '}
							<Link href="/" underline="hover">
								Sign in
							</Link>
						</Typography>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default SignupPage;
