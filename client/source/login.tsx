import { Box, Button, Container, IconButton, TextField, Typography, Link, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Restaurant } from '@mui/icons-material';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import loginBg from './assets/login-bg.png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Helmet>
        <title>Login | RecipeApp</title>
        <meta name="description" content="Login to RecipeApp to manage your favorite recipes and meal plans." />
      </Helmet>

      <Box
        sx={{
          backgroundImage: `url(${loginBg})`,
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

            <Link href="#" underline="hover" variant="body2" display="block" textAlign="right" mb={2}>
              Forgot password?
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#000', color: '#fff', py: 1.5, mb: 2, '&:hover': { backgroundColor: '#333' } }}
            >
              Login
            </Button>

            <Typography variant="body2">
              Don&apos;t have an account?{' '}
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
