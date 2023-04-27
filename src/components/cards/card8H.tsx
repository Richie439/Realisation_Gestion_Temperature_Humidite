import * as React from 'react'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid, useMediaQuery } from '@mui/material'
/* import Box from '@mui/material/Box'; */
import Paper from '@mui/material/Paper'
import { dbRealtime } from '../../firebaseConfig'
import { onValue, ref } from 'firebase/database'

export default function Card8H(): JSX.Element {
  //
  const matches = useMediaQuery('(min-width:1247px)')

  const [humidite, setHumidite] = React.useState('' as any)
  const [temperature, setTemperature] = React.useState('' as any)

  //Recuperation de la temperature
  const getRealtimeTemp = () => {
    const starCountRef = ref(dbRealtime, '/temperature')
    onValue(starCountRef, (snapshot) => {
      const data: any = snapshot.val()
      setTemperature(data)

      console.log(data)
    })
  }

  /******************************************************* */

  // Recuperation de l'humidité

  const getRealtimeHum = () => {
    const starCountRef = ref(dbRealtime, '/humidite')
    onValue(starCountRef, (snapshot) => {
      const data: any = snapshot.val()
      setHumidite(data)

      console.log(data)
    })
  }



  React.useEffect(() => {
    getRealtimeTemp()
    getRealtimeHum()
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.pathname = 'login'
    }
  }, [])
  /********************************************* */
  /////*******Creation des box pour les differentes heures */

  console.log(temperature?.matin);
  
  function createBox(
    heure: string,
    temperature: string,
    humidite: string,
    hum: number,
    temp: number,
  ) {
    return { heure, temperature, humidite, hum, temp }
  }

  const boxs = [
    createBox(
      '8H',
      'Temperature',
      'Humidite',
      temperature?.matin,
      humidite?.matin,
    ),
    createBox(
      '13H',
      'Temperature',
      'Humidite',
      temperature?.midi,
      humidite?.midi,
    ),
    createBox(
      '19H',
      'Temperature',
      'Humidite',
      temperature?.soir,
      humidite?.soir,
    ),
  ]

  return (
    <>
      {matches ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 9, md: 10 }}
            columns={{ xs: 10, sm: 8, md: 12 }}
          >
            {/* map fountion pour rendre un ele */}
            {boxs.map((box, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Paper
                  sx={{
                    // height: 250,
                    width: 199,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#D9D9D9',
                    position: 'relative',
                    marginTop: '-5px',
                  }}
                >
                  <Button
                    sx={{
                      color: 'black',
                      backgroundColor: '#FE4C24',
                      size: 'sm',
                      position: 'relative',
                      marginBottom: '-1px',
                    }}
                  >
                    {box.heure}
                  </Button>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {box.temperature}
                    </Typography>

                    <Typography variant="h6" sx={{ margindLeft: '-1px' }}>
                      {box.temp}°C
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {box.humidite}
                    </Typography>

                    <Typography variant="h6" sx={{ margindLeft: '-1px' }}>
                      {box.hum}%
                    </Typography>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <p>doit etre aligné</p>
      )}
    </>
  )
}
