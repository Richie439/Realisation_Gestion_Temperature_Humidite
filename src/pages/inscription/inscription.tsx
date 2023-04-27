import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import baseUrl from '../../baseUrl';

function Inscription() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      window.location.pathname ="login"
    }
    
  }, [])

  // initialisation des variables à vides
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // control de saisie
  const [isCheckPass, setisCheckPass] = useState(false)
  const [isCheckNom, setisCheckNom] = useState(false)
  const [isCheckPrenom, setisCheckPrenom] = useState(false)
  const [isCheckEmail, setisCheckEmail] = useState(false)
  const [isHasWhiteSpace, setisHasWhiteSpace] = useState(false)
  const [errorStatus, seterrorStatus] = useState(false);
  const [successStatus, setsuccessStatus] = useState(false);
  const [msgerror, setmsgerror] = useState("" as any);
  
  // const [isConfirm, setisConfirm] = useState(false)

  // const [isCheckRole, setisCheckRole] = useState(false)


  let msgError = "Les mots de passe sont differents"
  let msgErrorstring = "veillez remplir le champ"
  let msgVide = "format incorrect"
  // let msgConfirm = "Inscription Réussie !!"

  const temp_date = new Date().toISOString().split('T');
  // const date = `${temp_date[0]} ${temp_date[1]}`;

 
  const handleClick = (e: any) => {
    e.preventDefault()

  
    const user =
    {
      nom, 
      prenom,
      email,
      role,
      password
    }
 



    const token = localStorage.getItem('token')

    const config = { headers: { Authorization: token } }
    const data = user

    baseUrl.post("/post", data, config).then((res:any) => {
      console.log(res.data);
      
      if(res.data =="Utilisateur ajouté"){
        setsuccessStatus(true);
        // setNom('');setPrenom('');setEmail('');setPassword('');setPassword2('');setRole('')
        setTimeout(() => {
        setsuccessStatus(false);
        window.location.reload();  
        }, 2000);
        // vérification si l'email existe déjà
      }else if(res.data.code =="auth/email-already-in-use"){
        seterrorStatus(true);
        setmsgerror("Email existe déjà")
        setTimeout(() => {
          seterrorStatus(false);  
        }, 3000);
      }
      // vérification du format email
      else if(res.data.code =="auth/invalid-email"){
        seterrorStatus(true);
        setmsgerror("Email invalide")
        setTimeout(() => {
          seterrorStatus(false);  
        }, 3000);
      }
    }).catch((error:any) =>{
        console.log(error);
        
        seterrorStatus(true);
        setTimeout(() => {
          seterrorStatus(false);  
        }, 2000);
    })


  };

  // function qui permet de gerer les espacements des champs
  function hasWhiteSpace(s: any) {
    var reWhiteSpace = new RegExp("\\s+");

    // Check for white space
    if (reWhiteSpace.test(s)) {
      return true;
    }
    return false;
  }

  const checkPass = () => {
    if (password !== password2) {
      setisCheckPass(true);
      setTimeout(() => {
        setPassword2("")
        setisCheckPass(false)
      }, 3000);
    } else {
      setisCheckPass(false)

    }
  }

  const checkNom = (nom: any) => {
    // console.log(nom)
    if (nom === '' || hasWhiteSpace(nom)) {
      setisCheckNom(true);
      setTimeout(() => {
        setNom("")
        setisCheckNom(false)
      }, 3000);
    } else {
      setisCheckNom(false)


    }
  }

  const checkPrenom = (prenom: any) => {
    // console.log(nom)
    if (prenom === '' || hasWhiteSpace(prenom)) {
      setisCheckPrenom(true);
      setTimeout(() => {
        setPrenom("")
        setisCheckPrenom(false)
      }, 3000);
    } else {
      setisCheckPrenom(false)


    }
  }

  const checkEmail = (Email: any) => {
    // console.log(nom)
    // if (email === '' || hasWhiteSpace(email)) {
    //   setisCheckEmail(true);
    //   setTimeout(() => {
    //     setEmail("")
    //     setisCheckEmail(false)
    //   }, 3000);
    // } else {
    //   setisCheckEmail(false)
    // }


    let test = String(Email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-5]{1,3}\.[0-5]{1,3}\.[0-5]{1,3}\.[0-5]{1,3}\])|(([a-zA-Z\-0-5]+\.)+[a-zA-Z]{2,}))$/,
      )
    if (test == null) {
      setisCheckEmail(true);
      setTimeout(() => {
        setEmail("")
        setisCheckEmail(false)
      }, 3000);
    } else {
      setisCheckEmail(false)
    }
  }



  return (

    <>
      <Grid container spacing={3} rowSpacing={6} >

        <Grid item md={8} sx={{ m: "0 auto", boxShadow: 20, display: "block", backgroundColor: "#ffffff", height: 'auto', p: 2 }}>

          <Grid item>

            <Typography variant="h4" component="h2" sx={{ display: "flex", justifyContent: "center", mt: 5, color: "red" }}>
              Formulaire d'inscription
              {/* <p> {password1}</p> */}
            </Typography>
          </Grid>

          {successStatus &&
           <Stack sx={{ width: '20%', m:'0 auto' }} spacing={2}><Alert variant="filled" severity="success">Validé</Alert></Stack>
          }
           {errorStatus &&
           <Stack sx={{ width: '20%', m:'0 auto' }} spacing={2}><Alert variant="filled" severity="error">{msgerror}</Alert></Stack>
          }
          


          <Box
            component="form"
            sx={{
              p: 2,
              '& .MuiTextField-root': { m: 2, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField

                id="nom"
                label="Nom"

                // on appele la var setNom pour mettre à jour le value
                // et grace à ecouteur et target on recupere input
                onChange={(e) => { setNom(e.target.value) }}
                onBlur={() => { checkNom(nom) }}
                helperText={
                  (isCheckNom && <Typography variant='subtitle2' color="red">{msgErrorstring}</Typography>) ||
                  (hasWhiteSpace(nom) && <Typography variant='subtitle2' color="red">{msgVide}</Typography>)
                }
              // helperText={hasWhiteSpace(nom) && <Typography variant='subtitle2' color="red">{msgErrorstring}</Typography>}

              />

              <TextField
                id="prenom"
                label="Prenom"
                helperText={
                  isCheckPrenom && <Typography variant='subtitle2' color="red">{msgErrorstring}</Typography> ||
                  (hasWhiteSpace(prenom) && <Typography variant='subtitle2' color="red">{msgVide}</Typography>)

                }
                onChange={(e) => setPrenom(e.target.value)}
                onBlur={() => checkPrenom(prenom)}


              />
            </div>
            <div>
              <TextField

                id="email"
                label="Email"
                helperText={
                  isCheckEmail && <Typography variant='subtitle2' color="red">{msgVide}</Typography> ||
                  (hasWhiteSpace(email) && <Typography variant='subtitle2' color="red">{msgVide}</Typography>)

                }

                onChange={(e) => { setEmail(e.target.value); }}
                // onBlur={() => checkEmail(email)}
              />
              <TextField
                id="role"
                select
                label="Select"
                // helperText={isCheckRole && <Typography variant='subtitle2' color="red">{msgErrorstring}</Typography>}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onBlur={() => {
                  // checkRole(role); console.log(role);
                }}

              >
                <MenuItem value="admin">Administrateur</MenuItem>
                <MenuItem value="user">Utilisateur</MenuItem>

              </TextField>
            </div>
            <div>
              <FormControl sx={{ m: 2, width: '35ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ m: 2, width: '35ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
                <OutlinedInput
                  id="password2"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  onBlur={() => checkPass()}
                />
                {isCheckPass && <Typography variant='subtitle2' color="red">{msgError}</Typography>}
              </FormControl>


            </div>

            <Button variant="contained" size='small' disabled={!password2 || !password || !nom || !prenom} onClick={(e: any) => { handleClick(e) }} sx={{ mt: 3 }} >
              Inscription
            </Button>



          </Box>

        </Grid>

      </Grid>

      {/*  ; handleSuccessToast() */}

    </>
  )

}



export default Inscription