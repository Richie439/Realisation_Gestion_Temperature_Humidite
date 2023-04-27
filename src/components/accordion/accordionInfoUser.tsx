import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import UserInfo from './userInfo';
import { VisibilityOff, Visibility, PhotoCamera } from '@mui/icons-material';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import baseUrl from '../../baseUrl';

export default function AccordionListInfo({...user}) {

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setemail] = React.useState("" as any);
  const [password, setpassword] = React.useState("" as any);
  const [newEmail, setnewEmail] = React.useState("" as any)
  const [response, setresponse] = React.useState("" as any);
  const [showResponse, setshowResponse] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const resetPass=()=>{
    baseUrl.post('user/password', {email}).then((res: any)=>{
      console.log(res);
      setresponse(res);
      setshowResponse(true)
    }).catch((error: any) => console.log(error)
    )
  }

  const editEmail=()=>{
    baseUrl.post('user/updateEmail', {email,password,newEmail}).then((res: any)=>{
      // console.log(res);
      setresponse(res);
      setshowResponse(true)
    }).catch((error: any) => console.log(error)
    )
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{boxShadow:4, height:70, m:2, p:2}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <IconButton>
              <InfoOutlinedIcon color='primary'/>
              </IconButton>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <UserInfo {...user}/>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{boxShadow:4, height:70, m:2}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <IconButton>
              <PasswordOutlinedIcon color='primary'/>
              </IconButton>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Modifier password</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m:'0 auto',
            '& .MuiTextField-root': { width: '45ch' },
            // border:'1px solid',
            p:2,
            boxShadow:5
          }}
        >
         
         {/* <TextField
          id="outlined-password-input"
          type="password"
          sx={{m:'0 auto',pb:2}}
          label={'actuel'} 
        /> */}

        <FormControl sx={{ m:'0 auto', width: 'auto', pb:2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            onChange={e=>setemail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <AlternateEmailOutlinedIcon />
              </InputAdornment>
            }
            label="actuel...."
          />
        </FormControl>

      {
       showResponse && <Chip sx={{maxHeight:25}} label={response && response.data} />
      }


                   
        </Box>
        </AccordionDetails>
        <AccordionDetails>
        <Button variant="contained" color="success" onClick={()=> resetPass()}>
          Modifier
        </Button>
        </AccordionDetails>
        
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{boxShadow:4, height:70, m:2}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <IconButton>
              <AttachEmailOutlinedIcon color='primary'/>
              </IconButton>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Modifier email</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m:'0 auto',
            '& .MuiTextField-root': { width: '45ch' },
            // border:'1px solid',
            p:2,
            boxShadow:5
          }}
        >
         
     

         <FormControl sx={{ m:'0 auto', width: 'auto', pb:2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Actual Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            onChange={e=>setemail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <AlternateEmailOutlinedIcon />
              </InputAdornment>
            }
            label="actuel...."
          />
        </FormControl>

        <FormControl sx={{ m:'0 auto', width: 'auto', pb:2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            onChange={e=>setpassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <PasswordOutlinedIcon />
              </InputAdornment>
            }
            label="actuel...."
          />
        </FormControl>

        <FormControl sx={{ m:'0 auto', width: 'auto', pb:2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Nouveau Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            onChange={e=>setnewEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <AlternateEmailOutlinedIcon />
              </InputAdornment>
            }
            label="actuel...."
          />
        </FormControl>

      {
       showResponse && <Chip sx={{maxHeight:25}} label={response && response.data} />
      }


                   
        </Box>
        </AccordionDetails>
        <AccordionDetails>
        <Button variant="contained" color="success" onClick={()=> editEmail()}>
          Modifier
        </Button>
        </AccordionDetails>
        
      </Accordion>

      {/* <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{boxShadow:4, height:70, m:2}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <IconButton>
              <AddAPhotoOutlinedIcon color='primary'/>
              </IconButton>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Modifier photo</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m:'0 auto',
            '& .MuiTextField-root': { width: 'auto' },
      
            p:2
          }}
        >
         
         
         <TextField
          id="outlined-password-input"
          label="Password"
          type="file"
          autoComplete="ajouter photo"
          helperText="Ajouter une photo"
        />
         
        </Box>
        </AccordionDetails>

        <AccordionDetails>
            <IconButton color="primary" aria-label="upload picture" component="label">
              
              <PhotoCamera />
            </IconButton>
        </AccordionDetails>
        
      </Accordion> */}
      
    </>
  );
}