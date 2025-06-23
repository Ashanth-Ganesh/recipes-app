import { Box, Button, Container, IconButton, TextField, Typography, Link, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Restaurant } from '@mui/icons-material';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";

// Invalid input feedback declarations
interface loginFeedbacks {
	emailFeedback: string;
	passwordFeedback: string;
}

/** 
Function to send user account data to backend api for validation and database updates.

@param email - input email
@param password - input password
*/
async function handleLoginRequest(email: string, password: string): Promise<loginFeedbacks> {
	// http request initialization
  const request = {
    email,
    password
  };
	//Feedback declaration
	let backendFeedbacks: loginFeedbacks = {
    emailFeedback: "",
    passwordFeedback: ""
	};
	// Development backend url
	const loginApi = 'http://localhost:8000/login';

  try {
    const response = await fetch(loginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      alert(errorData.detail || 'Login failed');
    }
		else {
			// Upon successful connection
			const data = await response.json();
			// Checking completed_login to check for validity
			if (data.completed_login == true) {
				console.log('Signup success:', data);
				window.location.href = '/home';
			}
			else {
				// Parse backend feedback
				backendFeedbacks.emailFeedback = data.emailFeedback;
				backendFeedbacks.passwordFeedback = data.passwordFeedback;
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

@param email - input email
@param password - input password
*/
async function handleLogin(email: string, password: string): Promise<loginFeedbacks> {
  // Declare feedbacks for potential invalid inputs
  let userFeedbacks: loginFeedbacks = {
    emailFeedback: "",
    passwordFeedback: ""
	};
  let validInputs = true;
  // Email validation
  const emailPattern: RegExp = /^\s*[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (emailPattern.test(email) == false) {
    userFeedbacks.emailFeedback = "Please enter a valid e-mail";
    validInputs = false;
  }
  
  // Password validation
  if (password.trim().length == 0) {
    userFeedbacks.passwordFeedback = "Please enter a valid password";
    validInputs = false;
  }

  if (validInputs == true) {
    userFeedbacks = await handleLoginRequest(email, password);
  }

  return userFeedbacks;
}

const LoginPage = () => {
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((show) => !show);
  // State management for controlled textfield components
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  // Validity feedbacks
  const [userFeedbacks, setUserFeedbacks] = useState<loginFeedbacks>({
    emailFeedback: "",
    passwordFeedback: ""
  });
  return (
    <>
      <Helmet>
        <title>Login | RecipeApp</title>
        <meta name="description" content="Login to RecipeApp to manage your favorite recipes and meal plans." />    
      </Helmet>
      
      <Box
        sx={{
          backgroundImage: `url(/assets/login-bg.png)`,
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
          <Restaurant sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Box component="form" noValidate sx={{ mt: 2 }}>
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

            <Link href="/forgot-password" underline="hover" variant="body2" display="block" textAlign="right" mb={2}>
              Forgot password?
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                setUserFeedbacks(await handleLogin(email, password));
              }}
              sx={{ backgroundColor: '#000', color: '#fff', py: 1.5, mb: 2, '&:hover': { backgroundColor: '#333' } }}
            >
              Login
            </Button>

            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/signup" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
