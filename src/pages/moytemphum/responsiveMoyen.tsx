
import { Box, Grid } from '@mui/material'

import Card from '@mui/joy/Card'
import { CardCover } from '@mui/joy'
import Typography from '@mui/joy/Typography'
import CardContent from '@mui/joy/CardContent'
import Card8H from '../../components/cards/card8H'
import CloudIcon from '@mui/icons-material/Cloud'

import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'
//import SpacingGrid from '../../components/cards/cards8H2'
//import InstagramPost from '../../components/cards/card8H'

//import Textarea from '@mui/joy/Textarea';

export default function MoyTempHum() {
  
  return (
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ flexGrow: 1}}

    >
      <Grid xs={12} sx={{ m: '0 auto' , display: 'block' }}>
        <Typography
          sx={{
            backgroundColor: 'white',
            width: '347px',
            // marginBottom: '25px',
            //  marginLeft: '50vh',
            padding: '15px',
            border: '2px solid white ',
            borderRadius: ' 50px 26px ',
            fontSize: '15px',
            fontFamily: 'Segoe UI Local',
          }}
          component="h1"
        >
          <b>Moyenne Température et Humidité collecté de la journée</b>
        </Typography>
        <Box
          component="ul"
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            paddingTop: 3,
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
            {/*  <CardCover
               sx={{
                background:
                  'linear-gradient( rgba(0,0,0,15%)',
              }} 
            /> */}
            {/*  <CardContent sx={{ justifyContent: 'flex-top' }}>
              <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                <b>Yosemite National Park</b>
              </Typography>
              <Typography
                // eslint-disable-next-line react/jsx-no-undef
                // startDecorator={<LocationOnRoundedIcon />}
                textColor="neutral.300"
              >
                             <CloudIcon />
              </Typography>
            </CardContent> */}
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
                  paddingLeft: ' 410px',

                  top: '95px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: ' 700',
                  //fontSize:" 64px",
                  //lineHeight: "77px",
                  textAlign: ' center',
                }}
                bgcolor="text.secondary"
              >
                20°C
              </Typography>
            </CardContent>
          </Card>

          {/*  */}

          <Card sx={{ minHeight: '280px', width: 510,sm:"45px" }}>
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
                  position: 'relative',
                  paddingLeft: ' 410px',

                  top: '95px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: ' 700',
                  //fontSize:" 64px",
                  //lineHeight: "77px",
                  textAlign: ' center',
                }}
                bgcolor="text.secondary"
              >
                20%
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Typography
         
          component="h1"
        >
          <b>Températua journée</b>
        </Typography>
        <Grid
          xs={12}
          sm={4}
          md={7}
          sx={{
            display: 'block',
            justifyContent: 'center',
            //border: '0.2px solid',
           
            p: 1,
            borderRadius: 5,
            //background: "#DABDA9",
            // boxShadow: 4,
            //width:"789",
            maxHeight: 480,
            ml: 'auto',
            margin: '0 auto',
          }}
        >
          <Grid xs={12}>
            <Card8H />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
