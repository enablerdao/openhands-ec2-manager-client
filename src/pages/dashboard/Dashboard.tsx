import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { getInstances } from '../../services/instanceService';
import { Instance } from '../../types';

const Dashboard: React.FC = () => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchInstances();
  }, []);
  
  const fetchInstances = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getInstances();
      setInstances(data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'インスタンス一覧の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusColor = (state: string) => {
    switch (state) {
      case 'running':
        return 'success.main';
      case 'stopped':
        return 'error.main';
      case 'pending':
      case 'stopping':
        return 'warning.main';
      default:
        return 'text.secondary';
    }
  };
  
  const getStatusText = (state: string) => {
    switch (state) {
      case 'running':
        return '実行中';
      case 'stopped':
        return '停止中';
      case 'pending':
        return '起動中';
      case 'stopping':
        return '停止中';
      case 'terminated':
        return '終了済み';
      default:
        return state;
    }
  };
  
  const countInstancesByState = (state: string) => {
    return instances.filter(instance => instance.state === state).length;
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ダッシュボード
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchInstances}
            sx={{ mr: 2 }}
            disabled={isLoading}
          >
            更新
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/instances/new')}
          >
            新規インスタンス
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'success.light',
                color: 'white'
              }}
            >
              <ComputerIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" component="div">
                {countInstancesByState('running')}
              </Typography>
              <Typography variant="body1">実行中のインスタンス</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'error.light',
                color: 'white'
              }}
            >
              <StorageIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" component="div">
                {countInstancesByState('stopped')}
              </Typography>
              <Typography variant="body1">停止中のインスタンス</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'warning.light',
                color: 'white'
              }}
            >
              <SecurityIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" component="div">
                {instances.length}
              </Typography>
              <Typography variant="body1">合計インスタンス</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'primary.light',
                color: 'white'
              }}
            >
              <VpnKeyIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" component="div">
                -
              </Typography>
              <Typography variant="body1">キーペア</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      <Typography variant="h5" component="h2" gutterBottom>
        最近のインスタンス
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper sx={{ p: 2, bgcolor: 'error.light', color: 'white' }}>
          <Typography>{error}</Typography>
        </Paper>
      ) : instances.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            インスタンスがありません
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/instances/new')}
            sx={{ mt: 2 }}
          >
            新規インスタンスを作成
          </Button>
        </Paper>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {instances.slice(0, 4).map((instance) => (
              <Grid item xs={12} sm={6} md={3} key={instance.instanceId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div" noWrap>
                      {instance.name || instance.instanceId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {instance.instanceId}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: getStatusColor(instance.state),
                          mr: 1
                        }}
                      />
                      <Typography variant="body2">{getStatusText(instance.state)}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      タイプ: {instance.instanceType}
                    </Typography>
                    {instance.publicIp && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        IP: {instance.publicIp}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(`/instances/${instance.instanceId}`)}>
                      詳細
                    </Button>
                    {instance.publicIp && instance.state === 'running' && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(`http://${instance.publicIp}:3000`, '_blank')}
                      >
                        OpenHandsを開く
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      {instances.length > 4 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="outlined" onClick={() => navigate('/instances')}>
            すべてのインスタンスを表示
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;