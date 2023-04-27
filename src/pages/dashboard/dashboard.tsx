import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { RechartTemp } from "./rechart";
import CardDashboard from "../../components/cards/card";
import RealtimeCard from "../../components/cards/realTimeCard";
import VentilloCard from "../../components/cards/ventilloCard";
import { dbRealtime } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";
import CardHistorique from "../../components/cards/cardHistorique";
import CardUser from "../../components/cards/cardUser";
import { useMediaQuery } from "@mui/material";
import ResponsiveDashboard from "./responsiveDashboard";

export default function Dashboard(this: any) {
  const [donneeTempsReeel, setdonneeTempsReeel] = useState("" as any);

  const matchesScreen = useMediaQuery("(min-width:970px)");

  useEffect(() => {
    getRealtimeData();

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.pathname = "login";
    }
  }, []);

  const getRealtimeData = () => {
    const starCountRef = ref(dbRealtime, "realTime/");
    onValue(starCountRef, (snapshot) => {
      const data: String[] = snapshot.val();
      setdonneeTempsReeel(data);
    });
  };

  return (
    <>
      {matchesScreen ? (
        <Grid
          container
          spacing={4}
          md={9}
          sx={{ m: "0 auto", boxShadow: 5, p: 2, background: "#fff" }}
        >
          <Grid xs={4} sx={{ boxShadow: 5, maxHeight: 300, maxWidth: 350 }}>
            <RealtimeCard {...donneeTempsReeel} />
          </Grid>
          <Grid xs={8}>{<RechartTemp />}</Grid>

          <Grid xs={4} sx={{ boxShadow: 5, maxHeight: 300, maxWidth: 350 }}>
            <VentilloCard {...donneeTempsReeel} />
          </Grid>

          <Grid
            xs={8}
            sx={{
              border: "1px solid",
              margin: "0 auto",
              boxShadow: 5,
              background: "#DABDA9",
              borderRadius: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <CardHistorique />
              <CardDashboard />
              <CardUser />
            </div>
          </Grid>
        </Grid>
      ) : (
        <ResponsiveDashboard {...donneeTempsReeel} />
      )}
    </>
  );
}
