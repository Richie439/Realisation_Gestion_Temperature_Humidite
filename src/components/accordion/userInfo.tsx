import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserInfo({...user}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <Item>
              NOM 
              <Typography color='blue' noWrap>{user.data?.nom}</Typography> 
            </Item>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Item>
              PRENOM 
              <Typography color='blue' noWrap>{user.data?.prenom}</Typography> 
            </Item>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Item>
              EMAIL 
              <Typography color='blue' noWrap>{user.data?.email}</Typography> 
            </Item>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Item>
              ROLE 
              <Typography color='blue' noWrap>{user.data?.role}</Typography> 
            </Item>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
