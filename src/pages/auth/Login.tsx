import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { login, clearError } from '../../store/authSlice';
import { RootState } from '../../store';
import { AppDispatch } from '../../store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // 認証済みの場合はダッシュボードにリダイレクト
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // コンポーネントのアンマウント時にエラーをクリア
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);
  
  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;
    
    if (!email) {
      errors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'パスワードを入力してください';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(login({ email, password }));
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)'
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}
          >
            ログイン
          </Typography>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            OpenHands EC2マネージャーにログインしてください
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={isLoading}
              sx={{ mb: 1 }}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="checkbox" 
                  id="remember-me" 
                  style={{ marginRight: '8px' }}
                />
                <Typography variant="body2" color="text.secondary">
                  ログイン状態を保持
                </Typography>
              </Box>
              <Link 
                component={RouterLink} 
                to="/forgot-password" 
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                パスワードをお忘れですか？
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 1, 
                mb: 3, 
                py: 1.5,
                borderRadius: 1,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'ログイン'}
            </Button>
            
            <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
              <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid', borderColor: 'divider' }}></Box>
              <Typography variant="body2" sx={{ position: 'relative', display: 'inline-block', px: 2, backgroundColor: 'background.paper', color: 'text.secondary' }}>
                または
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ 
                  py: 1.5, 
                  borderRadius: 1,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    borderColor: 'divider',
                  }
                }}
              >
                <i className="fab fa-google text-red-500 mr-2"></i>
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ 
                  py: 1.5, 
                  borderRadius: 1,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    borderColor: 'divider',
                  }
                }}
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </Button>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" display="inline">
                アカウントをお持ちでないですか？ 
              </Typography>
              <Link 
                component={RouterLink} 
                to="/register" 
                variant="body2"
                sx={{ 
                  ml: 0.5, 
                  color: 'primary.main', 
                  fontWeight: 600,
                  textDecoration: 'none', 
                  '&:hover': { 
                    textDecoration: 'underline' 
                  } 
                }}
              >
                新規登録
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;