import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/login');
  };
  
  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          OpenHands EC2マネージャー
        </Typography>
        
        {isAuthenticated ? (
          <Box>
            <Button color="inherit" component={Link} to="/dashboard">
              ダッシュボード
            </Button>
            <Button color="inherit" component={Link} to="/instances">
              インスタンス
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>プロフィール</MenuItem>
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              ログイン
            </Button>
            <Button color="inherit" component={Link} to="/register">
              登録
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;