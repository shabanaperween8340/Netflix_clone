
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
       getAuth,
       signInWithEmailAndPassword,
      signOut} from "firebase/auth";
import {addDoc, 
        collection, 
        getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBXGJ1DesAEE_TYzKEM1D9SFf3N92W8DCE",
  authDomain: "netflix-clone-c9c8d.firebaseapp.com",
  projectId: "netflix-clone-c9c8d",
  storageBucket: "netflix-clone-c9c8d.appspot.com",
  messagingSenderId: "482217285488",
  appId: "1:482217285488:web:28dbbf10a0e99282f521b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app) ;
const db = getFirestore(app);

// signup function

const signup = async (name,email,password) => {
    try {
      const res=  await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await addDoc(collection(db,"users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      });
    } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
    
};
const login = async (email,password) => {
    try {
         await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
};

// loguot function
const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};