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
import { register, clearError } from '../../store/authSlice';
import { RootState } from '../../store';
import { AppDispatch } from '../../store';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
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
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;
    
    if (!username) {
      errors.username = 'ユーザー名を入力してください';
      isValid = false;
    } else if (username.length < 3) {
      errors.username = 'ユーザー名は3文字以上で入力してください';
      isValid = false;
    }
    
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
    } else if (password.length < 6) {
      errors.password = 'パスワードは6文字以上で入力してください';
      isValid = false;
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'パスワード（確認）を入力してください';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'パスワードが一致しません';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(register({ username, email, password }));
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
            新規アカウント登録
          </Typography>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            OpenHands EC2マネージャーで新しいアカウントを作成してください
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
              id="username"
              label="ユーザー名"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!formErrors.username}
              helperText={formErrors.username}
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
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
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
              name="confirmPassword"
              label="パスワード（確認）"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              disabled={isLoading}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <input 
                type="checkbox" 
                id="terms" 
                style={{ marginRight: '8px' }}
              />
              <Typography variant="body2" color="text.secondary">
                <Link 
                  component={RouterLink} 
                  to="/terms" 
                  sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  利用規約
                </Link>
                と
                <Link 
                  component={RouterLink} 
                  to="/privacy" 
                  sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  プライバシーポリシー
                </Link>
                に同意します
              </Typography>
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
              {isLoading ? <CircularProgress size={24} /> : 'アカウント作成'}
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
                既にアカウントをお持ちですか？ 
              </Typography>
              <Link 
                component={RouterLink} 
                to="/login" 
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
                ログイン
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;