import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import {
  Grid,
  Paper,
  CssBaseline,
  Typography,
  Container,
  Avatar,
  styled,
  Skeleton,
  Chip,
} from '@mui/material'
import ProfileTabs from '../../components/accordion/tabProfile'
import SimpleAccordion from '../../components/accordion/accordionInfoUser'
import axios from 'axios'
import baseUrl from '../../baseUrl'
import moment from 'moment'

const Profile = () => {
  const matches = useMediaQuery('(min-width:900px)')
  const [user, setuser] = useState('' as any)

  useEffect(() => {
    const uid = localStorage.getItem('uid')?.split(' ').join('')
    const token = localStorage.getItem('token')

    if (!token) {
      window.location.pathname = 'login'
      return
    }
    baseUrl
      .get(`getById/${uid}`, { headers: { Authorization: token } })
      .then((res: any) => {
        if (res.data == 'Token is revoked' || res.data == 'Token is invalid') {
          window.location.pathname = 'login'
          return
        }
        setuser(res)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const validToken = () => {
    return localStorage.getItem('token')
  }

  const getUid = () => {
    return localStorage.getItem('uid')
  }

  let config = {
    headers: {
      Authorization: 'Bearer ' + validToken(),
    },
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  const ListInfo1 = () => {
    let timestampAdd = localStorage.getItem('createdAt') as any
    let timestampLast = localStorage.getItem('lastLogin') as any

    return (
      <List
        sx={{ boxShadow: 4, background: 'background.paper', m: 2 }}
        component="li"
        aria-label="mailbox folders"
      >
        <ListItem>
          <ListItemText>
            <Typography component="span" sx={{ display: 'flex' }}>
              <Typography
                align="left"
                variant="caption"
                component="li"
                color="primary"
              >
                {' '}
                AJOUTÉ LE{' '}
              </Typography>
              <Typography
                align="right"
                variant="caption"
                component="li"
                sx={{ ml: 'auto' }}
                noWrap
              >
                <Chip
                  sx={{ maxHeight: 25 }}
                  label={moment.unix(timestampAdd).format('MMMM Do | HH:MM:SS')}
                />
              </Typography>
            </Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText>
            <Typography component="span" sx={{ display: 'flex' }}>
              <Typography
                align="left"
                variant="caption"
                component="li"
                color="primary"
              >
                {' '}
                LAST_LOGIN{' '}
              </Typography>
              <Typography
                align="right"
                variant="caption"
                component="li"
                sx={{ ml: 'auto' }}
                noWrap
              >
                <Chip
                  sx={{ maxHeight: 25 }}
                  label={moment
                    .unix(timestampLast)
                    .format('MMMM Do | HH:MM:SS')}
                />
              </Typography>
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography
              align="center"
              sx={{ textDecoration: 'underline' }}
              variant="caption"
              component="li"
              color="ActiveCaption"
            >
          {/*     {' '}
              CREATED BY ABDOURAHMANE DIALLO{' '} */}
            </Typography>
          </ListItemText>
        </ListItem>
        <Divider light />
      </List>
    )
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        {/* <Title /> */}
        {matches ? (
          <Grid container sx={{ m: ' auto' }} spacing={2} md={8}>
            {/* <Box sx={{ flexGrow: 1 , m:0.4}}> */}
            <Grid container spacing={1} mt={1.5} mb="auto">
              <Grid item md={12} alignItems="center">
                <Item
                  sx={{ borderBottom: '#c8d8c8 1px solid', background: '#fff' }}
                >
                  <Typography variant="h6"> PROFILE </Typography>
                </Item>
              </Grid>

              <Grid item md={4} mt={0} alignItems="center">
                <Grid sx={{ background: '#fff' }} md={12}>
                  {true ? (
                    <>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        alignItems="center"
                        sx={{ boxShadow: 5, m: '0 auto', maxWidth: 170 }}
                        align="center"
                      >
                        <ProfileTabs />
                      </Typography>

                      {ListInfo1()}
                    </>
                  ) : (
                    <Skeleton
                      variant="circular"
                      sx={{
                        width: 150,
                        height: 150,
                        boxShadow: 5,
                        border: '1px solid red',
                        margin: '0px auto',
                      }}
                    />
                  )}

                  <Divider variant="inset" flexItem />
                </Grid>
              </Grid>

              <Grid item md={8} mt={0} alignItems="center">
                <SimpleAccordion {...user} />
              </Grid>
            </Grid>
            {/* </Box> */}
          </Grid>
        ) : (
          <Grid
            container
            style={{ width: 'initial' }}
            direction="column"
            maxWidth="xl"
          >
            <div>
              <Grid item md={4} mt={1} alignItems="center">
                <Grid sx={{ background: '#fff' }} md={12}>
                  {true ? (
                    <>
                      <Typography
                        variant="subtitle1"
                        alignItems="center"
                        sx={{ p: 2, width: 200, m: '0 auto' }}
                        align="center"
                      >
                        <ProfileTabs />
                      </Typography>

                      {ListInfo1()}
                    </>
                  ) : (
                    <Skeleton
                      variant="circular"
                      sx={{
                        width: 150,
                        height: 150,
                        boxShadow: 5,
                        margin: '0px auto',
                      }}
                    />
                  )}

                  <Divider variant="inset" flexItem />
                </Grid>
              </Grid>

              <Grid item md={8} mt={0} alignItems="center">
                <SimpleAccordion {...user} />
              </Grid>
              {/* </InfiniteScroll>           */}
            </div>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default Profile
