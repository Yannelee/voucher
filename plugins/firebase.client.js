import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

export default defineNuxtPlugin(()=>{

  const firebaseConfig = {
    apiKey: "AIzaSyDFK1myrQmzhNmbFBeqPviZD9uEQP14zDA",
    authDomain: "voucher-portfolio.firebaseapp.com",
    projectId: "voucher-portfolio",
    storageBucket: "voucher-portfolio.firebasestorage.app",
    messagingSenderId: "809474393947",
    appId: "1:809474393947:web:2505906556644804d97c7e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  return{
    provide:{
      firebaseApp: app,
      db
    }
  }
})
