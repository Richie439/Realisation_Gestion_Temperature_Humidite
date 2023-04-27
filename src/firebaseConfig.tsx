import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";


/* const firebaseConfig = {
    apiKey: "AIzaSyDSGptLcEZDHLPejy86N2G-Jo52sEkVJe8",
  authDomain: "tutorials-61fa1.firebaseapp.com",
  databaseURL: "https://simplon-gestion-temp-humidite-default-rtdb.firebaseio.com/",
  projectId: "tutorials-61fa1",
  storageBucket: "tutorials-61fa1.appspot.com",
  messagingSenderId: "414305230612",
  appId: "1:414305230612:web:2fb773e30310c52588ac01"
}; */
const firebaseConfig = {
  apiKey: "AIzaSyDSGptLcEZDHLPejy86N2G-Jo52sEkVJe8",
  authDomain: "tutorials-61fa1.firebaseapp.com",
  databaseURL:  "https://tutorials-61fa1-default-rtdb.firebaseio.com",//"https://simplon-gestion-temp-humidite-default-rtdb.firebaseio.com/",
  projectId: "tutorials-61fa1",
  storageBucket: "tutorials-61fa1.appspot.com",
  messagingSenderId: "414305230612",
  appId: "1:414305230612:web:2fb773e30310c52588ac01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const dbRealtime = getDatabase(app);

export const reference = ref(dbRealtime)









