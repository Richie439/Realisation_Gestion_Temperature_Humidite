import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,  TextField,  Tooltip,  Typography } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'
//Impor Icons
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

import { useNavigate } from 'react-router-dom';
import baseUrl from '../../baseUrl'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function UserSimple() {

  const navigation = useNavigate();


  //Stocker les données de l'api dans le state

  const [dataUser, setDataUser] = useState('' as any)
  const [data, setData] = useState('' as any)
  const [msg, setmsg] = useState('' as any)

  const [openDialog, setOpen] = useState(false);

  const notify = (msg:any) => toast(msg);




 
  useEffect(() => {

    const token = localStorage.getItem('token')
    if(!token){
      window.location.pathname ="login";
      return;
     }
    baseUrl.get('/getActif',{headers: {Authorization : token}}).then(res => {
      if(res.data =="Token is revoked" || res.data =="Token is invalid"){
        window.location.pathname ="login";
        return;
       }
      setDataUser([...res.data])
    }).catch(error=> console.log(error))
  }, [data])
  // affichage dans l'interface user

  

  const alertDialog = (id:any) => {
    setOpen(true);
    const uid = id.split(' ').join('');
    localStorage.setItem("idSwitch", uid);
  }

  const changeRoleUser = ()=>{
    let token = localStorage.getItem('token');
    let idSwitch = localStorage.getItem('idSwitch');

  
    baseUrl.patch(`/switch/${idSwitch}`, { headers: { Authorization: token } }).then((res:any)=>{
      console.log(res);
      
      if(res.data =="Role modifié"){
        localStorage.removeItem('idSwitch');
        setOpen(false);
        notify('Role modifié');
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
      
      

    }).catch((e:any)=> console.log(e))
  }

  let tab: { id: any; nom: any }[] = []
  //map permet la localisation des clés
  dataUser &&
    // eslint-disable-next-line array-callback-return
  dataUser.map((e: any) => {
    // console.log(e)
    let obj = {
      id: e.id,
      matricule: e.data?.matricule,
      nom: e.data?.nom,
      prenom: e.data?.prenom,
      email: e.data?.email,
      role: e.data?.role,
      date_inscrit: moment(e.data?.date_inscrit).format('llll')
    }
    tab.push(obj)
  })

  const columns: GridColDef[] = [
    { field: 'matricule', headerName: 'Matricule', width: 120, align:'center', flex:10, headerAlign:'center' },
    { field: 'nom', headerName: 'Nom', width: 110,align:'center', flex:10, headerAlign:'center' },
    { field: 'prenom', headerName: 'Prénom', width: 200,align:'center', flex:10, headerAlign:'center' },
    { field: 'email', headerName: 'Email', width: 230, flex:10, headerAlign:'center' },
    { field: 'role', headerName: 'Role', width: 150,align:'center', flex:10, headerAlign:'center' },
    { field: 'date_inscrit', headerName: 'Date Inscription', width: 190 },

  ]

  


  return (
    <>
      <div>
        <Typography
          sx={{
            backgroundColor: 'white',
            width: '247px',
            m:'0 auto',
            padding:"15px",
            border: '2px solid ',
            borderRadius: ' 50px 20px',
          }}
          component="h6"
        >
          <b>Listes des Utilisateurs </b>
        </Typography>
      </div>
      <Tooltip title="Utilisateurs archivés" placement="top" sx={{display:"flex", justifyContent:"center"}}> 
        <IconButton
          sx={{ marginLeft: '95vh', marginBottom: '5px', color: 'black' }}
          onClick={() => navigation("/archivesimple")}
        >
          <UnarchiveOutlinedIcon sx={{ fontSize: '55px' }}  />
        </IconButton>
      </Tooltip>  

      <Box
        sx={{
          height: 400,
          width: 'auto'
        }}
      >
        <Grid
          sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          spacing={3}
          container
        >
          <Grid xs={8} md={8}>
            <div
              style={{
                padding: '15px',
                height: 410,
                width: '100%',
                backgroundColor: 'white',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <DataGrid
               //component={Paper}
                rows={tab}
                columns={columns}
                pageSize={5}
                getRowId={(tab: any) => tab?.id}

                rowsPerPageOptions={[5]}
                //checkboxSelection
              />
            </div>
     
          </Grid>
        </Grid>
      </Box>


    

      <ToastContainer />
    </>
  )
}


