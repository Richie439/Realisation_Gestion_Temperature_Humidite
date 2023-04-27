import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';



export default function CardUser() {

  let role = localStorage.getItem('role');
  return (
    // <Box sx={{ minWidth: 275 }}>
    <Card sx={{ maxWidth: 200, borderRadius:5, maxHeight:170 }}>
      <Tooltip title="Gestion utilisateurs" placement="top" sx={{color:"#536dfe"}}>
       {
        role =="admin" ?
          <IconButton sx={{background:'#FE4C24', color:"black"}} onClick={()=> window.location.pathname ='user'}>
              <GroupOutlinedIcon sx={{color:"white"}} />
          </IconButton>
        :
          <IconButton sx={{background:'#FE4C24', color:"black"}} onClick={()=> window.location.pathname ='usersimple'}>
            <GroupOutlinedIcon sx={{color:"white"}}/>
          </IconButton>
       }
      </Tooltip>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Liste User
      </Typography>
      <Typography variant="h6" component="div" noWrap>
        Liste des Utilisateurs
      </Typography>
      
    </CardContent>
  </Card>
    // </Box>
  );
}
