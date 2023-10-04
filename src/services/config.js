import {initializeApp} from "firebase/app" //inicia conexion con firebase
import {getFirestore} from "firebase/firestore" //obtenes instancia del servicio de firestore

//Info Cuenta, key personal acceso.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:import.meta.env.VITE_AUTH_DOMAIN,
    projectId:import.meta.env.VITE_PROJECT_ID,
    storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId:import.meta.env.VITE_APP_ID,
    measurementId:import.meta.env.VITE_MEASUREMENT_ID
  };

console.log(import.meta.env)
  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//export referencia, para usar en toda la app