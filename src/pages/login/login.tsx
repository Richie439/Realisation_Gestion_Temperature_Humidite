import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './login.css'
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import baseUrl from '../../baseUrl'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


const theme = createTheme();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function   Login() {

  const [email, setEmail] = useState('' as any);
  const [password, setPassword] = useState('' as any);
  const [loader, setloader] = useState(false);
  const [resetloader, setresetloader] = useState(false);
  
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notify = (msg:any) => toast.error(msg);
  const notifyReset = (msg:any) => toast.success(msg);

 
  const login =async(e:any)=>{
    e.preventDefault();
    Connexion(email,password)
  }


  const Connexion = async (email:any, password:any) => {
     
      
//Recuperation de la route
      baseUrl.post('login',{
        email:email,
        password:password
      } ).then(function (response: { data: any; }) {
       
        let userReponse = response.data;
        
        if (userReponse?.uid) {
          localStorage.setItem("token", userReponse.stsTokenManager?.accessToken)
          localStorage.setItem("email", userReponse.providerData[0]?.email)
          localStorage.setItem("lastLogin", userReponse?.lastLoginAt)
          localStorage.setItem("createdAt", userReponse?.createdAt)
          localStorage.setItem("uid", userReponse?.uid)
          localStorage.setItem("displayName", userReponse?.providerData[0].displayName)
          
          setTimeout(() => window.location.pathname ="dashboard", 1000);
        }else{
          console.log(userReponse);
          
          if(userReponse.slice(17,36) == "auth/wrong-password")
          {
            notify("Mot de passe incorrect")
            return;
          }else if(userReponse.slice(17,36)== "auth/user-not-found")
          {
            notify("Email n'existe pas")
            return;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          }else(userReponse.slice(17,36)=== "auth/user-disabled")
          // eslint-disable-next-line no-lone-blocks
          {
            notify("Utilisateur Archivé")
            return;
          }    
        }
      })
      .catch((error)=> {
       notify(error);
      });
      
  }

  const resetPass=()=>{
    baseUrl.post('user/editPassword', {email}).then((res: any)=>{
      console.log(res);
      if(res?.data.slice(17,36)== "auth/user-not-found") {return notify("Email introuvable")}
      notifyReset(res?.data);
    }).catch((error: any) => console.log(error)
    )
  }


  return (
    <>
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: 'auto',}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className ="img"
          sx={{
            backgroundRepeat: 'no-repeat',
          /*   backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], */
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundColor:"white"
          }}
         
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{  backgroundColor:"#DABDA9",paddingTop:"150px", boxShadow:5 }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
          
           
            {/* <Typography component="h1" variant="h5">
              Connexion
            </Typography> */}

            <Box component="form" noValidate   sx={{maxWidth:"70%", boxShadow:5, p:4, background:"#fff"}}>
              
              
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
                sx={{backgroundColor:'white', p:0.2}}
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password" 
                autoComplete="current-password"
                sx={{backgroundColor:'white',  p:0.2}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             
             &nbsp;
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={e=> {
                  login(e); setloader(true); 
                  setTimeout(() => {
                    setloader(false)
                }, 2000);}}
                // sx={{ mt: 3, mb: 2,width:'274px',height:'74px' ,}}
                sx={{maxHeight:'50px', maxWidth:'250px', mt:2}}
                disabled={!email || !password}
              >
                {
                  !loader ?
                    "Se Connecter"
                  :
                    // <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="success" size={25}/>
                    // </Stack>

                }
              </Button>

              <Grid container>
                <Grid item xs p={2}>
                
                  <Link href="#" variant="body2" onClick={handleOpen}>
                  <Typography>Mot de passe oublié?</Typography>
                  </Link>
              
                  
                </Grid>
               
              </Grid>
             {/*  <Copyright sx={{ mt: 5 }} /> */}
             
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        
      
      
    </ThemeProvider>

    <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography  variant="h4" component="h2">
                Reinitialiser le mot de passe
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
                  sx={{backgroundColor:'white', p:0.2}}
                  variant="outlined"
                />
              </Typography>
              <div style={{display:'flex', justifyContent:'center'}}>
                <Button 
                
                variant="contained" 
                color="success"  
                onClick={e=> {
                  setresetloader(true); 
                  resetPass();
                  setTimeout(() => {
                    setresetloader(false);
                    handleClose();
                }, 2000);}}
                disabled= {!email}
                >
                  {
                  !resetloader ?
                    "Envoyer"
                  :
                    // <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="inherit" size={30}/>
                    // </Stack>

                }
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>

    </>
    
  );
}