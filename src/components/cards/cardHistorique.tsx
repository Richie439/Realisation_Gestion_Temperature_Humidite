import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <IconButton sx={{background:'#934ae8', color:"white"}}>
        <HistoryOutlinedIcon />k
    </IconButton>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    
  </React.Fragment>
);

export default function CardHistorique() {
  return (
    // <Box sx={{ minWidth: 275 }}>
    <Card sx={{ maxWidth: 200, borderRadius:5, maxHeight:170 }}>
    <IconButton sx={{background:'#FE4C24', color:"black"}} onClick={()=> window.location.pathname ='historique'}>
      <Tooltip title="Historique témperature" placement="top" sx={{color:"#536dfe"}}>
        <HistoryOutlinedIcon sx={{color:'white'}} />
      </Tooltip>
    </IconButton>
    <CardContent>
       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Historique 

      </Typography>
    <Typography variant="h6" component="div" noWrap>
        Historique Température
      </Typography>
      
    </CardContent>
  </Card>
    // </Box>
  );
}
