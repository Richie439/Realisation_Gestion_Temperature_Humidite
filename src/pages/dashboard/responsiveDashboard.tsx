import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RealtimeCard from '../../components/cards/realTimeCard';
import VentilloCard from '../../components/cards/ventilloCard';
import CardHistorique from '../../components/cards/cardHistorique';
import CardUser from '../../components/cards/cardUser';
import CardDashboard from '../../components/cards/card';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function ResponsiveDashboard({...donneeTempsReeel}) {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          {/* <Grid item>
            <Avatar>W</Avatar>
          </Grid> */}
          <Grid item xs zeroMinWidth>
            <RealtimeCard sx={{ border: "1px solid" }} />
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          {/* <Grid item>
            <Avatar>W</Avatar>
          </Grid> */}
          <Grid item xs>
          {/* {RechartTemp()} */}
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          {/* <Grid item>
            <Avatar>W</Avatar>
          </Grid> */}
          <Grid item xs>
          <VentilloCard />
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
          maxWidth:'50%'
        }}
      >
        <Grid container wrap="nowrap" spacing={2} sx={{display:'flex',}}>
        
          {/* <Grid item xs={10} sx={{m:'0 auto'}}>
            <CardHistorique />
          </Grid>
          <Grid item xs={10} sx={{m:'0 auto'}}>
            <CardDashboard />
          </Grid>
          <Grid item xs={10} sx={{m:'0 auto'}}>
            <CardUser />
          </Grid> */}
            <div style={{display:'block', margin:'0 auto'}}>
              <span style={{padding:'17px'}}><CardHistorique /></span>
              <span style={{padding:'17px'}}><CardDashboard /></span>
              <span style={{padding:'17px'}}><CardUser /></span>
            </div>
        </Grid>
      </StyledPaper>
    </Box>
  );
}
