import { Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dbRealtime } from '../../firebaseConfig';



export function RechartTemp({...donnee}) {
  // static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';
  // render() {
    // const tepmMatin = donnee?
    const [tempVeille, settempVeille] = useState("" as any)
    const [tempHum, settempHum] = useState("" as any)
    const [tempMatin, settempMatin] = useState("" as any);
    const [tempSoir, settempSoir] = useState("" as any)
    const [tempMidi, settempMidi] = useState("" as any)
    const [humMatin, sethumMatin] = useState("" as any)
    const [humMidi, sethumMidi] = useState("" as any)
    const [humSoir, sethumSoir] = useState("" as any)
    


    useEffect(() => {
      getHistorique();
      // getDaily();
    }, [])
    
    

    const getHistorique = () => {
      const starCountRef = ref(dbRealtime, 'historique/');
      onValue(starCountRef, (snapshot) => {
        const data: any = snapshot.val();
        settempVeille(data)
        console.log(data);
        
        let d = new Date()
        switch (d.getDay()) {
          case 1:
  
            settempMatin(data?.dimanche?.matin?.temp)
            settempMidi(data?.dimanche?.midi?.temp)
            settempSoir(data?.dimanche?.soir?.temp)
  
            sethumMatin(data?.dimanche?.matin?.hum)
            sethumMidi(data?.dimanche?.midi?.hum)
            sethumSoir(data?.dimanche?.soir?.hum)
  
            break;
          case 2:
            settempMatin(data?.lundi?.matin?.temp)
            settempMidi(data?.lundi?.midi?.temp)
            settempSoir(data?.lundi?.soir?.temp)
  
            sethumMatin(data?.lundi?.matin?.hum)
            sethumMidi(data?.lundi?.midi?.hum)
            sethumSoir(data?.lundi?.soir?.hum)
            break;
          case 3:
            settempMatin(data?.mardi?.matin?.temp)
            settempMidi(data?.mardi?.midi?.temp)
            settempSoir(data?.mardi?.soir?.temp)
  
            sethumMatin(data?.mardi?.matin?.hum)
            sethumMidi(data?.mardi?.midi?.hum)
            sethumSoir(data?.mardi?.soir?.hum)
            break;
          case 4:
            settempMatin(data?.mercredi?.matin?.temp)
            settempMidi(data?.mercredi?.midi?.temp)
            settempSoir(data?.mercredi?.soir?.temp)
  
            sethumMatin(data?.mercredi?.matin?.hum)
            sethumMidi(data?.mercredi?.midi?.hum)
            sethumSoir(data?.mercredi?.soir?.hum)
            break;
          case 5:
            settempMatin(data?.jeudi?.matin?.temp)
            settempMidi(data?.jeudi?.midi?.temp)
            settempSoir(data?.jeudi?.soir?.temp)
  
            sethumMatin(data?.jeudi?.matin?.hum)
            sethumMidi(data?.jeudi?.midi?.hum)
            sethumSoir(data?.jeudi?.soir?.hum)
            break;
          case 6:
            settempMatin(data?.vendredi?.matin?.temp)
            settempMidi(data?.vendredi?.midi?.temp)
            settempSoir(data?.vendredi?.soir?.temp)
  
            sethumMatin(data?.vendredi?.matin?.hum)
            sethumMidi(data?.vendredi?.midi?.hum)
            sethumSoir(data?.vendredi?.soir?.hum)
            break;
          default:
            settempMatin(data?.samedi?.matin?.temp)
            settempMidi(data?.samedi?.midi?.temp)
            settempSoir(data?.samedi?.soir?.temp)
  
            sethumMatin(data?.samedi?.matin?.hum)
            sethumMidi(data?.samedi?.midi?.hum)
            sethumSoir(data?.samedi?.soir?.hum)
            break;
        }

      });
    }



    
    

    const data = [
      {
        name: 'MATIN',
        temperature: tempMatin ,
        humidite: humMatin,
        degre: 50,
        // amt: 2400,
      },
      {
        name: 'MIDI',
        temperature: tempMidi,
        humidite: 28,
        degre: 50,
        // amt: 2210,
      },
      {
        name: 'SOIR',
        temperature: tempSoir,
        humidite: 20,
        degre: 50,
        // amt: 2290,
      }
    ];
      
  return (
    <>
      <Typography>
        Historique d'hier
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={800}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 0,
          }}

          style={{
            minHeight: 300
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="degre" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="temperature" stroke="#934ae8" />
          <Line type="monotone" dataKey="humidite" stroke="#82ca9d" />


        </LineChart>
      </ResponsiveContainer>
    </>
  );
  // }
}