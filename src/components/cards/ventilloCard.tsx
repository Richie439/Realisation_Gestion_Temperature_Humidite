import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined'
//import {io}from 'socket.io-client';

import { CardActions } from '@mui/material'

import {
  StopCircleSharp,
} from '@mui/icons-material'
import { dbRealtime } from '../../firebaseConfig'
import { ref, set } from 'firebase/database'

export default function VentilloCard({ ...donneeTempsReeel }) {
  const [status, setStatus] = React.useState(false)

  //   const socket = io();
  // const socket = io("ws://localhost:8000");

  React.useEffect(() => {
    if (donneeTempsReeel.temp > 30) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [donneeTempsReeel.temp > 35])

  const isOn = () => {
    if (status) {
      setStatus(false)
      set(ref(dbRealtime, 'ventilo'), {
        isAuth: 0,
      })
      // socket.emit("hello", 5);
    } else {
      setStatus(true)
      set(ref(dbRealtime, 'ventilo'), {
        isAuth: 1,
      })
    }
  }

  return status ? (
    <Card sx={{ maxWidth: 345, display: 'flex' }}>
      {status ? (
        <CardMedia
          component="img"
          sx={{ width: 151, maxHeight: 180 }}
          image="https://acegif.com/wp-content/uploads/2022/fzk5d/fan-gif-27-blue-ventilator.gif"
          alt="Ventilateur"
        />
      ) : (
        <CardMedia
          component="img"
          sx={{ width: 151, maxHeight: 180 }}
          image="data:image/png;base64,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"
          alt="Ventilateur"
        />
      )}

      <CardActions>
        <IconButton
          aria-label="previous"
          disabled={status}
          onClick={() => isOn()}
        >
          {
            <PowerSettingsNewOutlinedIcon
              sx={{ height: 38, width: 38 }}
              color="success"
            />
          }
        </IconButton>
        <IconButton
          aria-label="play/pause"
          disabled={!status}
          onClick={() => isOn()}
        >
          <StopCircleSharp sx={{ height: 38, width: 38 }} color="error" />
        </IconButton>
      </CardActions>
    </Card>
  ) : (
    <Card sx={{ maxWidth: 345, display: 'flex' }}>
      {status ? (
        <CardMedia
          component="img"
          sx={{ width: 151, minHeight: 180 }}
          image="https://acegif.com/wp-content/uploads/2022/fzk5d/fan-gif-27-blue-ventilator.gif"
          alt="Ventilateur"
        />
      ) : (
        <CardMedia
          component="img"
          sx={{ width: 151, maxHeight: 150 }}
          image="data:image/png;base64,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"
          alt="Ventilateur"
        />
      )}
    
      <IconButton
        aria-label="previous"
        disabled={status}
        onClick={() => isOn()}
      >
        {
          <PowerSettingsNewOutlinedIcon
            sx={{ height: 38, width: 38 }}
            color="success"
          />
        }
      </IconButton>
      
      <IconButton
        aria-label="play/pause"
        disabled={!status}
        onClick={() => isOn()}
      >
        <StopCircleSharp sx={{ height: 38, width: 38 }} color="error" />
      </IconButton>
      
    </Card>
  )
}
