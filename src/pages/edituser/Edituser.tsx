
import { Alert, Box, Button, Grid,  Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import baseUrl from '../../baseUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Edituser(){

  const [msg, setmsg] = useState('' as any)

  const [openDialog, setOpen] = useState(false);

  const notify = (msg:any) => toast(msg);

  const handleClickOpen = (id:any) => {
    setOpen(true);

    if (msg == "Voulez-vous changer de role pour cet utilisateur") {
      // changeRole(id)
    }else if(msg == "Voulez-vous archiver cet utilisateur"){

    }else{

    }
    
    };

    const handleClose = () => {
      setOpen(false);
    };

    
    

    //  initialisation des variables à vides
    const [nom, setNom] = useState(localStorage.getItem("nomEdit"));
    const [prenom, SetPrenom] = useState(localStorage.getItem("prenomEdit"));
    

  // control de saisie
  
  const [isCheckNom, setisCheckNom] = useState(false)
  const [isCheckPrenom, setisCheckPrenom] = useState(false)
  const [isHasWhiteSpace, setisHasWhiteSpace] = useState(false)
  const [errorStatus, seterrorStatus] = useState(false);
  const [successStatus, setsuccessStatus] = useState(false);
  const [msgerror, setmsgerror] = useState("" as any);
  const [nomedit, setNomedit] = useState("" as any);
  const [prenomedit, setprenomedit] = useState("" as any);
  const [idedit, setidedit] = useState("" as any)
  // const [isConfirm, setisConfirm] = useState(false)

  // const [isCheckRole, setisCheckRole] = useState(false)


  
  let msgErrorstring = "veillez remplir le champ"
  let msgVide = "format incorrect"
  

  const temp_date = new Date().toISOString().split('T');
  const date = `${temp_date[0]} ${temp_date[1]}`;

 

  const handleClick = (e: any) => {
    e.preventDefault()

    const user =
    {
      nom,
      prenom
     
    }
 



    const token = localStorage.getItem('token');
    const idedit = localStorage.getItem('idEdit')?.split(' ').join('')

    console.log(idedit == "GuET1RQRrAXAEv8tCxvENtPKcRd2");

    const config = { headers: { Authorization: token } }
    const data = user

    // permet de modifier un user avec l'idedit
    baseUrl.patch(`/update/${idedit}`, data, config).then((res:any) => {
      console.log(res);

      if(res.data =="Utilisateur modifié"){
        localStorage.removeItem('idEdit');
        setOpen(false);
        notify('Utilisateur modifié');
        setTimeout(() => {
          // c'est une propriété qui renvoie le chemin d'accès de la page en cours.
          window.location.pathname ='user'
        }, 2000);
      }

      // permet de rediriger vers datatable
      // window.location.pathname ="datatable"
     
    }).catch((error:any) =>{
        console.log(error);
        
        seterrorStatus(true);
        setTimeout(() => {
          seterrorStatus(false);  
        }, 2000);
    })


  };
  // pour la redirection
  const navigate = useNavigate();

  


//   permet de stocké les données depuis l'interface
  React.useEffect(() => {
   setidedit(localStorage.getItem('idEdit'));
   setNomedit(localStorage.getItem('nomEdit'));
   setprenomedit(localStorage.getItem('prenomEdit'))

   

  }, [])
  



  // function qui permet de gerer les espacements des champs
  function hasWhiteSpace(s: any) {
    var reWhiteSpace = new RegExp("\\s+");

    // Check for white space
    if (reWhiteSpace.test(s)) {
      return true;
    }
    return false;
  }

  const checkNom = (nom: any) => {
    // console.log(nom)
    if (nom === '' || hasWhiteSpace(nom)) {
      setisCheckNom(true);
      setTimeout(() => {
        setNom("")
        setisCheckNom(false)
      }, 1000);
    } else {
      setisCheckNom(false)


    }
  }

  const checkPrenom = (prenom: any) => {
    // console.log(nom)
    if (prenom === '' || hasWhiteSpace(prenom)) {
      setisCheckPrenom(true);
      setTimeout(() => {
        SetPrenom("")
        setisCheckPrenom(false)
      }, 1000);
    } else {
      setisCheckPrenom(false)


    }
  }



  return (

    <>
      <Grid container spacing={3} rowSpacing={6} >

        <Grid item md={8} sx={{ m: "0 auto", boxShadow: 20, display: "block", backgroundColor: "#ffffff", height: 'auto', p: 2 }}>

          <Grid item>

            <Typography variant="h4" component="h2" sx={{ display: "flex", justifyContent: "center", mt: 5, color: "red" }}>
              Modification
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
                value={nom}
                // on appele la var setTitle pour mettre à jour le value
                // et grace à ecouteur et target on recupere input
                onChange={(e) => { setNom(e.target.value); checkNom(e.target.value) }}
                onBlur={() => { checkNom(nom) }}
                helperText={
                  (isCheckNom && <Typography variant='subtitle2' color="red">{msgErrorstring}</Typography>) ||
                  (hasWhiteSpace(nom) && <Typography variant='subtitle2' color="red">{msgVide}</Typography>)
                }
              />

              <TextField
                id="prenom"
                label="Prenom"
                value={prenom}
                helperText={
                  isCheckPrenom && <Typography variant='subtitle2' color="red">{msgErrorstring}</Typography> ||
                  (hasWhiteSpace(prenom) && <Typography variant='subtitle2' color="red">{msgVide}</Typography>)

                }
                onChange={(e) => {SetPrenom(e.target.value); checkPrenom(e.target.value) }}
                onBlur={() => {checkPrenom(prenom)}}


              />
            </div>
          

            <Button variant="contained"  size='small' disabled={ !nom || !prenom || nom === " " || prenom === " "} onClick={(e: any) => { handleClick(e) }} sx={{ mt: 3,backgroundColor:'red' }} >
              Modifier
            </Button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained"  onClick={() => navigate("/user")} sx={{ mt: 3 }} >
              Retour
            </Button>

          </Box>

        </Grid>

      </Grid>

      {/*  ; handleSuccessToast() */}
      <ToastContainer />
    </>
  )

}
export default Edituser;