import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useAppDispatch } from '../hooks/reduxHooks';
import { login, register } from '../store/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getErrorMessage } from '../utils/errorMessage';

const PRIMARY_COLOR = '#2C3E50';
const ACCENT_COLOR = '#FF6B6B';

const SigninSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Determine if we're on the register page
  const isRegister = location.pathname === '/register';

  // Optional: get redirect param for login
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const actionResult = await dispatch(login({ email, password }));
      const user = unwrapResult(actionResult);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(redirectPath || '/');
    } catch (err: any) {
      setError(getErrorMessage(err, 'Login failed. Please check your email and password.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!userName.trim()) {
      setError('Please enter a username.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const actionResult = await dispatch(register({ email, userName, password }));
      unwrapResult(actionResult);
      navigate(redirectPath || '/');
    } catch (err: any) {
      setError(getErrorMessage(err, 'Registration failed. Please check the details and try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 4
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: PRIMARY_COLOR, fontWeight: 700 }}>
          {isRegister ? 'Sign Up' : 'Sign In'}
        </Typography>
        <Box component="form" onSubmit={isRegister ? handleRegister : handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& label': {
                color: '#FF6B6B',
              },
              '& label.Mui-focused': {
                color: '#FF6B6B',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#FF6B6B',
                },
                '&:hover fieldset': {
                  borderColor: '#FF6B6B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B6B',
                },
              }
            }}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& label': {
                color: '#FF6B6B',
              },
              '& label.Mui-focused': {
                color: '#FF6B6B',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#FF6B6B',
                },
                '&:hover fieldset': {
                  borderColor: '#FF6B6B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B6B',
                },
              }
            }}
          />
          {isRegister && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{
                '& label': {
                  color: '#FF6B6B',
                },
                '& label.Mui-focused': {
                  color: '#FF6B6B',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FF6B6B',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF6B6B',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B6B',
                  },
                }
              }}
            />
          )}
          {isRegister && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& label': {
                  color: '#FF6B6B',
                },
                '& label.Mui-focused': {
                  color: '#FF6B6B',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FF6B6B',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF6B6B',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B6B',
                  },
                }
              }}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundColor: PRIMARY_COLOR,
              '&:hover': {
                backgroundColor: '#1A252F'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : isRegister ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container>
            <Box>
              {isRegister ? (
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: ACCENT_COLOR, '&:hover': { textDecoration: 'underline' } }}>
                    {'Already have an account? Sign In'}
                  </Typography>
                </Link>
              ) : (
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: ACCENT_COLOR, '&:hover': { textDecoration: 'underline' } }}>
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              )}
            </Box>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SigninSignup;
