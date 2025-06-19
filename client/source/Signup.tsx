import { Box, Button, Container, IconButton, TextField, Typography, Link, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Restaurant } from '@mui/icons-material';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((show) => !show);

  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const handleToggleConfirmationPassword = () => setShowConfirmationPassword((show) => !show);

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
				variant='outlined'
				fullWidth
				required
				margin='normal'
			/>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
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
              {`Password must:
              - be atleast 8 characters long
              - have atleast 1 digit
              - have atleast 1 lowercase letter
              - have atleast 1 uppercase letter
              - have atleast 1 special character`}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
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
