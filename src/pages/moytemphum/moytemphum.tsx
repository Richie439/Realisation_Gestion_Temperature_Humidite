import * as React from 'react'

import { Box, Grid, useMediaQuery } from '@mui/material'

import Card from '@mui/joy/Card'
import { CardCover } from '@mui/joy'
import Typography from '@mui/joy/Typography'
import CardContent from '@mui/joy/CardContent'
import Card8H from '../../components/cards/card8H'
import CloudIcon from '@mui/icons-material/Cloud'

import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'
import { onValue, ref } from 'firebase/database'
import { dbRealtime } from '../../firebaseConfig'
//import SpacingGrid from '../../components/cards/cards8H2'
//import InstagramPost from '../../components/cards/card8H'

//import Textarea from '@mui/joy/Textarea';

export default function MoyTempHum() {
  const matches = useMediaQuery('(min-width:970px)')
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
   // console.log( humidite?.matin + humidite?.midi + humidite?.soir / 3);
    
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
 
  React.useEffect(() => {
    
  
    
  }, [])
  

  const getTemperature = () => {
    const starCountRef = ref(dbRealtime, 'temperature/');
    onValue(starCountRef, (snapshot) => {
      const data:any = snapshot.val();
      setTemperature(data)
      console.log(data);
      
    });
  }

  const getHumidite= () => {
    const starCountRef = ref(dbRealtime, 'humidite/');
    onValue(starCountRef, (snapshot) => {
      const data:any = snapshot.val();
      setHumidite(data)
      console.log(data);
      
    });
  }
  
  return (
    <>
      {matches ? (
        <Grid container spacing={4} columns={16} sx={{ flexGrow: 9 }}>
          <Grid item xs={12} sx={{ m: '0 auto' }}>

            <Typography
              sx={{
                backgroundColor: 'white',
                width: '547px',
                m:'0 auto',
                padding:"15px",
                border: '2px solid white ',
                borderRadius: ' 50px 26px ',
                fontSize: '15px',
                fontFamily: 'Segoe UI Local',
              }}
              component="h1"
            >
              <b>Moyenne Température et Humidité collecté de la journée</b>
            </Typography>
              &nbsp;
            <Box
              component="ul"
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                // paddingTop: 3,
                marginLeft: 10,
              }}
            >

              <Card sx={{ minHeight: '280px', width: 510 }}>
                <CardCover>
                  <img
                    src="https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2t5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    srcSet="https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2t5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    // loading="lazy"
                    alt=""
                  />
                </CardCover>
               
                <CardContent>
                  <Typography
                    sx={{ fontSize: '45px', position: 'absolute' }}
                    bgcolor="text.secondary"
                  >
                    Température
                  </Typography>
                  <Typography gutterBottom component="div">
                    <CloudIcon
                      sx={{
                        fontSize: '145px',
                        position: 'absolute',
                        right: '70%',
                        top: '25%',
                        bottom: '79.53%',
                      }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '45px',
                      position: 'absolute',
                      paddingLeft: ' 310px',

                      top: '95px',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: ' 700',
                     
                      textAlign: ' center',
                    }}
                    bgcolor="text.secondary"
                  >
                    { Math.round(temperature.matin +  temperature.midi+  temperature.soir / 3)} °C
                  </Typography>
                </CardContent>
              </Card>

              {/*  */}

              <Card sx={{ minHeight: '280px', width: 510 }}>
                <CardCover>
                  <img
                    src="https://images.pexels.com/photos/7002970/pexels-photo-7002970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    srcSet="https://images.pexels.com/photos/7002970/pexels-photo-7002970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    // loading="lazy"
                    alt=""
                  />
                </CardCover>

                <CardContent>
                  <Typography
                    sx={{ fontSize: '45px', position: 'absolute' }}
                    bgcolor="text.secondary"
                  >
                    Humidité
                  </Typography>
                  <Typography gutterBottom component="div">
                    <ThunderstormOutlinedIcon
                      sx={{
                        fontSize: '145px',
                        position: 'absolute',
                        right: '70%',
                        top: '25%',
                        bottom: '79.53%',
                      }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '45px',
                      position: 'absolute',
                      paddingLeft: ' 310px',

                      top: '95px',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: ' 700',
                  
                      textAlign: ' center',
                    }}
                    bgcolor="text.secondary"
                  >
                        {  Math.round( humidite?.matin + humidite?.midi + humidite?.soir / 3)}%
                  </Typography>
                </CardContent>
              </Card>


            </Box>
            &nbsp;
            <Typography
              sx={{
                backgroundColor: 'white',
                width: '347px',
                m:'0 auto',
                padding:"15px",
                border: '2px solid white ',
                borderRadius: ' 50px 26px ',
                fontSize: '15px',
                fontFamily: 'Segoe UI Local',
              }}
              component="h1"
            >
              <b>Température et Humidité collecté de la journée</b>
            </Typography>
            &nbsp;
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                //border: '0.2px solid',
                p: 1,
                borderRadius: 5,
                //background: "#DABDA9",
                // boxShadow: 4,
                //width:"789",
                // maxHeight: 480,
                /* ml: 'auto', */
                margin: '0 auto',
              }}
              item
            >
              <Grid xs={12} item>
                <Card8H />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p>
          <MoyTempHum />
        </p>
      )}
    </>
  )
}
