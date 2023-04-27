import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Route, Routes, useNavigate, useLocation  } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/dashboard';
import Profile from '../../pages/profile/profile';
import User from '../../pages/tableau/datatable';
import DataTable from '../../pages/tableau/listarchiv';
import MoyTempHum from '../../pages/moytemphum/moytemphum';
import Login from '../../pages/login/login';
import BadgeAvatars from '../accordion/accordionProfile';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { DeviceThermostatOutlined, HomeOutlined } from '@mui/icons-material';
import Groups2Outlined from '@mui/icons-material/Groups2Outlined';
import { Menu, MenuItem } from '@mui/material';
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined';
import Inscription from '../../pages/inscription/inscription';
import baseUrl from '../../baseUrl';
import Historique from '../../pages/historiquehumtemp/historiquehumtemp';

import Edituser from '../../pages/edituser/Edituser';
import UserSimple from '../../pages/tableau/simpleUser';
import ArchiveSimple from '../../pages/tableau/archivesimple';
import NotFound from '../../pages/notFound/notFound';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [currentRole, setcurrentRole] = React.useState("" as any);


 
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let tokenState = localStorage.getItem('token');
    let setshowSidebar= true;
    if(pathname.split('/').join('') ==="" || pathname.split('/').join('') ==="login" || !tokenState){
      setshowSidebar = false;
    }else{
      setshowSidebar = true;
    }
 
  
  let displayName = localStorage.getItem('displayName');
  let matricule = localStorage.getItem('matricule');
  let uid = localStorage.getItem('uid');
  let token = localStorage.getItem('token');
  let role = localStorage.getItem('role');


   baseUrl.get(`/getById/${uid}`, {headers:{Authorization: token}}).then((res:any)=>{
   
    setcurrentRole(res.data?.role)
    token &&  localStorage.setItem('role', res.data?.role)
    token &&  localStorage.setItem('matricule', res.data?.matricule)

    
  })


  const logOut =()=>{
    localStorage.clear();
    setTimeout(() => {
      window.location.pathname = "login";
    }, 1000);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const opens = Boolean(anchorEl);

  const handleListItemClick = (event:any, index:any) => {
    event.preventDefault()
    setSelectedIndex(index);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    
      {setshowSidebar && <Drawer variant="permanent" open={open}>
        
        <DrawerHeader >
            { 
            open && <IconButton onClick={()=>navigate("/profile")}>
                <BadgeAvatars/>
            </IconButton>
            }
          {
            open ?

            <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
            :
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 0
            }}
          >
            <MenuIcon />
          </IconButton>


          }
          </DrawerHeader>
          {
            open && <Typography variant= 'h6' noWrap>
            {displayName}
            <Typography>
              {matricule}
            </Typography>
            </Typography>
          }
        <Divider />
       
        <List sx={{mt:'50px'}}>
          {/* <Divider /> */}
          <ListItemButton  
            selected={selectedIndex === 1}
            onClick={(event) => {handleListItemClick(event, 1); navigate("/dashboard")}}
            sx={{ height:70}}
          >
            
            <ListItemIcon>                 
              <HomeOutlined />
            </ListItemIcon>
                Dashboard
            <ListItemText  />
          </ListItemButton>
          
          <Divider />

          <ListItemButton  
            selected={selectedIndex === 2}
            onClick={(event) => {handleListItemClick(event, 2); navigate("/historique")}}
            sx={{ height:70}}
          >
            <ListItemIcon>                 
              <HistoryOutlinedIcon />
            </ListItemIcon>
                Historique
            <ListItemText  />
          </ListItemButton>

          <Divider />
          
          <ListItemButton  
            selected={selectedIndex === 3}
            onClick={(event) => {handleListItemClick(event, 3);navigate("/moyentemp")}}
            sx={{ height:70}}
          >
            <ListItemIcon>                 
              <DeviceThermostatOutlined />
            </ListItemIcon>
                Témperature/humidité
            <ListItemText  />
          </ListItemButton>

          <Divider />
          
          {
            role ==="admin" &&
            <span  style={{display:"flex"}}>
              <ListItemButton  
                selected={selectedIndex === 4}
                onClick={(event) => {handleListItemClick(event, 4)}}
                sx={{ height:70}}
                onClickCapture={handleClick}
              >
              
                  <ListItemIcon
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    
                  >                 
                      <Groups2Outlined fontSize='large' color='action' />
                  </ListItemIcon>
                  Gestion utilisateurs
                
                <ListItemText  />

                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={opens}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: drawerWidth * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                
                  <MenuItem onClick={(e)=>{navigate("/inscription");handleClose()}}>AJOUTER</MenuItem>
                  <MenuItem onClick={(e)=>{navigate("/user");handleClose()}}>AFFICHER</MenuItem>

                </Menu>
              </ListItemButton>
            </span>   
          }

          {
            role ==="user" &&
            <span  style={{display:"flex"}}>
              <ListItemButton  
                selected={selectedIndex === 4}
                onClick={(event) => {handleListItemClick(event, 4)}}
                sx={{ height:70}}
                onClickCapture={handleClick}
              >
              
                  <ListItemIcon
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    
                  >                 
                      <Groups2Outlined fontSize='large' color='action' />
                  </ListItemIcon>
                  Gestion utilisateurs
                
                <ListItemText  />

                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={opens}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: drawerWidth * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                
                  {/* <MenuItem onClick={(e)=>{navigate("/inscription");handleClose()}}>AJOUTER</MenuItem> */}
                  <MenuItem onClick={(e)=>{navigate("/usersimple");handleClose()}}>AFFICHER</MenuItem>

                </Menu>
              </ListItemButton>
            </span>
          }
                
        </List>
        <List sx={{mt:'auto'}}>
          <Divider />
              <ListItemButton  
                  selected={selectedIndex === 4}
                  onClick={(event) => {handleListItemClick(event, 6);logOut()}}
                  sx={{mt:'auto'}}
                >
                  <ListItemIcon >                 
                    < ExitToAppOutlined fontSize='large' color='action' />
                  </ListItemIcon>
                    Déconnexion
                  <ListItemText  />
              </ListItemButton>
          </List>
        </Drawer>}

      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        
        <Routes>
            <Route  path='/dashboard' element={<Dashboard />}/>
            <Route  path='/profile' element={<Profile />}/>
            <Route  path='/user' element={<User />}/>
            <Route  path='/usersimple' element={<UserSimple  />}/>
            <Route  path='/historique' element={<Historique/>}/>
            <Route  path='/archive' element={<DataTable />}/>
            <Route  path='/archivesimple' element={<ArchiveSimple />}/>
            <Route  path='/moyentemp' element={<MoyTempHum />}/>
            <Route  path='/inscription' element={<Inscription />}/>
            <Route  path='/login' element={<Login />}/>
            <Route  path='/' element={<Login />}/>
            <Route  path='/edituser' element={<Edituser />}/>
            <Route  path='*' element={<NotFound />}/>
           
            

        </Routes>

      </Box>
    </Box>
  );
}
