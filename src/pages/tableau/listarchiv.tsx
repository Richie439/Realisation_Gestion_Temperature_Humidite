import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, IconButton,  Typography } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'
//Impor Icons
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'

import { useNavigate } from 'react-router-dom';
import baseUrl from '../../baseUrl'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

export default function DataTable() {

  const navigation = useNavigate();
  const notify = (msg:any) => toast(msg);

  //Stocker les données de l'api dans le state

  const [dataUser, setDataUser] = useState('' as any)
  const [data, setData] = useState('' as any)

  

  // Chercher les doonées de l'api avec la methode Get
  const enableUser = (uid:any) => {
    let token = localStorage.getItem('token')
    baseUrl.post(`/user/enable/${uid}`,{headers: {Authorization : token}}).then(res => {
      setData([...res.data])
      notify("Utilisateur desarchivé")
    }).catch(error=> console.log(error))

  }

  useEffect(() => {
    let token = localStorage.getItem('token');
    let role =  localStorage.getItem('role');
    if(!token || role === "user"){
      window.location.pathname ="login";
      localStorage.clear();
      return;
    }
    baseUrl.get('/getDisabled',{headers: {Authorization : token}}).then((res:any) => {
      if (res.data === "Token is invalid") {
        window.location.pathname ="login";
        return;
      }
      setDataUser([...res.data])
      
    })
  }, [data])
 

  let tab: { id: any; nom: any }[] = []
  //map permet la localisation des clés
  dataUser &&
    // eslint-disable-next-line array-callback-return
  dataUser.map((e: any) => {
   
    let obj = {
      id: e.id,
      matricule: e.data?.matricule,
      nom: e.data?.nom,
      prenom: e.data?.prenom,
      email: e.data?.email,
      role: e.data?.role,
      date_modif: moment(e.data?.date_modif).format('llll')
    }
    tab.push(obj)
  })

  const columns: GridColDef[] = [
    { field: 'matricule', headerName: 'Matricule', width: 120, align:'center', flex:10, headerAlign:'center' },
    { field: 'nom', headerName: 'Nom', width: 110,align:'center', flex:10, headerAlign:'center' },
    { field: 'prenom', headerName: 'Prénom', width: 200,align:'center', flex:10, headerAlign:'center' },
    { field: 'email', headerName: 'Email', width: 230, flex:10, headerAlign:'center' },
    { field: 'role', headerName: 'Role', width: 150,align:'center', flex:10, headerAlign:'center' },
    { field: 'date_modif', headerName: 'Date D`archivage', width: 190 },

    {
      field: 'action',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <div>      
          <IconButton onClick={()=> enableUser(params.id)}>
            <UnarchiveOutlinedIcon sx={{ color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
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
          <b>Listes des Utilisateurs Archivés</b>
        </Typography>
      </div>
      <IconButton
        sx={{ marginLeft: '95vh', marginBottom: '5px', color: 'black' }}
        onClick={() => navigation("/user")}
      >
        <ListAltOutlinedIcon sx={{ fontSize: '55px' }}  />
      </IconButton>

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
                height: 405,
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
                getRowId={(tab: any) => tab.id}

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


