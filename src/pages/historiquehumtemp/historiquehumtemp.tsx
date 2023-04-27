import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Grid, Typography } from '@mui/material'
import { dbRealtime } from '../../firebaseConfig'
import { onValue, ref } from 'firebase/database'

export default function Historique() {
  const [historique, sethistorique] = React.useState('' as any)


  React.useEffect(() => {
    getRealtimeData()
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.pathname = 'login'
    }
  }, [])
  const getRealtimeData = () => {
    const starCountRef = ref(dbRealtime, 'historique/')
    onValue(starCountRef, (snapshot) => {
      const data: any = snapshot.val()
      sethistorique(data)
      console.log(data)
    })
  }
  function createData(
    heure: string,
    lundi: number,
    mardi: number,
    mercredi: number,
    jeudi: number,
    vendredi: number,
    samedi: number,
    dimanche: number,
  ) {
    return { heure, lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche }
  }
  const rowsTemp = [
    createData(
      '8h',
      historique.lundi?.matin?.temp,
      historique.mardi?.matin?.temp,
      historique.mercredi?.matin?.temp,
      historique.jeudi?.matin?.temp,
      historique.vendredi?.matin?.temp,
      historique.samedi?.matin?.temp,
      historique.dimanche?.matin?.temp,
    ),
    createData(
      '12h',
      historique.lundi?.midi?.temp,
      historique.mardi?.midi?.temp,
      historique.mercredi?.midi?.temp,
      historique.jeudi?.midi?.temp,
      historique.vendredi?.midi?.temp,
      historique.samedi?.midi?.temp,
      historique.dimanche?.midi?.temp,
    ),
    createData(
      '19h',
      historique.lundi?.soir?.temp,
      historique.mardi?.soir?.temp,
      historique.mercredi?.soir?.temp,
      historique.jeudi?.soir?.temp,
      historique.vendredi?.soir?.temp,
      historique.samedi?.soir?.temp,
      historique.dimanche?.soir?.temp,
    ),
  ]
  console.log(historique)

  const rowsHum = [
    createData(
      '8h',
      historique.lundi?.matin?.hum,
      historique.mardi?.matin?.hum,
      historique.mercredi?.matin?.hum,
      historique.jeudi?.matin?.hum,
      historique.vendredi?.matin?.hum,
      historique.samedi?.matin?.hum,
      historique.dimanche?.matin?.hum,
    ),
    createData(
      '12h',
      historique.lundi?.midi?.hum,
      historique.mardi?.midi?.hum,
      historique.mercredi?.midi?.hum,
      historique.jeudi?.midi?.hum,
      historique.vendredi?.midi?.hum,
      historique.samedi?.midi?.hum,
      historique.dimanche?.midi?.hum,
    ),
    createData(
      '19h',
      historique.lundi?.soir?.hum,
      historique.mardi?.soir?.hum,
      historique.mercredi?.soir?.hum,
      historique.jeudi?.soir?.hum,
      historique.vendredi?.soir?.hum,
      historique.samedi?.soir?.hum,
      historique.dimanche?.soir?.hum,
    ),
  ]

  return (
    <>
      <Box
        sx={{
          m: '10px auto',

          maxWidth: '70%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item sx={{ m: '0 auto' }}>
            <Typography
              sx={{
                backgroundColor: 'white',
                width: '347px',
                // marginBottom: '25px',
                // marginLeft: '60vh',
                m: '0 auto',
                padding: '15px',
                border: '2px solid white ',
                borderRadius: ' 50px 26px ',
                fontSize: '15px',
                fontFamily: 'Segoe UI Local',
              }}
              component="h1"
            >
              <b> Historique de la température (°C) de la semaine</b>
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 5, m: '8px auto' }}
            >
              <Table sx={{ minWidth: 750 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>Jour/Heure</TableCell>
                    <TableCell align="right">Lundi</TableCell>
                    <TableCell align="right">Mardi</TableCell>

                    <TableCell align="right">Mercredi</TableCell>
                    <TableCell align="right">Jeudi</TableCell>
                    <TableCell align="right">Vendredi</TableCell>
                    <TableCell align="right">Samedi</TableCell>
                    <TableCell align="right">Dimanche</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsTemp.map((row) => (
                    <TableRow
                      key={row.heure}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.heure}
                      </TableCell>
                      <TableCell align="right">{row.lundi}</TableCell>
                      <TableCell align="right">{row.mardi}</TableCell>
                      <TableCell align="right">{row.mercredi}</TableCell>
                      <TableCell align="right">{row.jeudi}</TableCell>
                      <TableCell align="right">{row.vendredi}</TableCell>
                      <TableCell align="right">{row.samedi}</TableCell>
                      <TableCell align="right">{row.dimanche}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>

      {/*  */}
      <Box
        sx={{
          m: '50px auto',

          maxWidth: '70%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item sx={{ m: '0 auto' }}>
            <Typography
              sx={{
                backgroundColor: 'white',
                width: '347px',
                // marginBottom: '25px',
                // marginLeft: '60vh',
                m: '0 auto',
                padding: '15px',
                border: '2px solid white ',
                borderRadius: ' 50px 26px ',
                fontSize: '15px',
                fontFamily: 'Segoe UI Local',
              }}
              component="h1"
            >
              <b> Historiqe de l'humidité (%) de la semaine</b>
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 5, m: '8px auto' }}
            >
              <Table sx={{ minWidth: 750 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>Jour/Heure</TableCell>
                    <TableCell align="right">Lundi</TableCell>
                    <TableCell align="right">Mardi</TableCell>

                    <TableCell align="right">Mercredi</TableCell>
                    <TableCell align="right">Jeudi</TableCell>
                    <TableCell align="right">Vendredi</TableCell>
                    <TableCell align="right">Samedi</TableCell>
                    <TableCell align="right">Dimanche</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsHum.map((row) => (
                    <TableRow
                      key={row.heure}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.heure}
                      </TableCell>
                      <TableCell align="right">{row.lundi}</TableCell>
                      <TableCell align="right">{row.mardi}</TableCell>
                      <TableCell align="right">{row.mercredi}</TableCell>
                      <TableCell align="right">{row.jeudi}</TableCell>
                      <TableCell align="right">{row.vendredi}</TableCell>
                      <TableCell align="right">{row.samedi}</TableCell>
                      <TableCell align="right">{row.dimanche}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
