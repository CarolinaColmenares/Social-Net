import { showTemplates } from './../lib/router.js';
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  provider,
  db,
  doc,
  setDoc,
  signInWithRedirect,
  signInWithPopup
} from "./init.js";
import { getUserData } from './users.js';


// Iniciar Sesión
const login = async (email, password) => {
  try {
    // SOLAMENTE RETORNA LA INFORMACION DE LA AUTENTIACION -> email, password, accesstoken, uid, ......
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    /* 
      {
        loginfo: {....},
        user: {
          email,
          uid: kdfjkasfoiuqjiu3981yhfkqwju329814ukasjjkfdpau9832147lkfjadsfh3h12
        }
      }
    
    kdfjkasfoiuqjiu3981yhfkqwju329814ukasjjkfdpau9832147lkfjadsfh3h12
    */
    const userData = await getUserData(userCredential.user.uid) //para tener la inf extra del usuario en base al uid (birt, nombre, type)
    /* 
      {
        username: '',
        userType: '',
        birthday: ''
      }
    */
    localStorage.setItem('userData', JSON.stringify({...userData, id: userCredential.user.uid}))
    alert('Sesión iniciada correctamente')
    window.location.href = '#/home' 

    // ESTE RETURN HASTA EL MOMENTO NO HACE NADA YA QUE ESTA FUNCION UNICAMENTE SE ENCARGA DE EJECTUAR EL INICIO DE SESION
    return userCredential;
  } catch (error) {
    if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
      alert ('Correo invalido')
    } else if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
      alert ('Contraseña invalida')
    }
    throw error.message;
  }
};

const signup = async (data) => {
  /* 
    const data  = {
      username: 'username1', undefined,
      email: 'username@emailg.com',
      password: 'contraseña',
      birthday: 2001/05/25,
      userType: 'baker',
      ---photoUrl: ',,,'
    }
  */
  try {
    const response = await createUserWithEmailAndPassword(auth, data?.email, data?.password);

    const userFirestoreRegister = await setDoc(
      doc(db, "users", response.user.uid), 
      { 
        username: data?.username,
        birthday: data?.birthday,
        userType: data?.userType
      }
    )

    window.location.href = '#/home' 
    return response;
  } catch (error) {
    if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
      alert('Correo invalido Ej: 1234@micorreo.com')
    } else if (error == 'FirebaseError: Password should be at least 6 characters (auth/weak-password).'){
      alert ('La contraseña debe tener 6 o mas caracteres')
    } else if (error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).')
      alert ('Este correo ya tiene una cuenta asociada')
    throw error.message;
  } 
};


const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const userData = {
      id: response.user.uid,
      username: response.user.displayName,
      userType: 'eater'
    }

    const userFirestoreRegister = await setDoc(
      doc(db, "users", response.user.uid), userData
    )

    localStorage.setItem('userData', JSON.stringify(userData))

    console.log(response.user)

    window.location.href = '#/home' 
    return response.user;
  } catch (error) {
    console.log(error.message)
    throw error.message;
  }
};




// Cerrar sesion
const logout = async () => {
  try {
    const response = await signOut(auth);
    localStorage.removeItem('userData')
    window.location = '#/'
    showTemplates('#/')
    alert('La sesión se cerró exitosamente')
    return response;
  } catch (error) {
    throw error.message;
  }
};

export { login, logout, signup, googleLogin, auth, onAuthStateChanged };

//Iniciar sesion con google


// ************************************************
// import { showTemplates } from './../lib/router.js';
// import {
//   auth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   setDoc,
//   db,
//   doc,
//   signOut,
//   provider,
//   signInWithPopup
// } from "./init.js";
// //import { async } from 'regenerator-runtime';


// // Iniciar Sesión
// const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log(userCredential)
//     showTemplates('#/home')
//     return userCredential;
//   } catch (error) {
//     console.log(error.message)
//     throw error.message;
//   }
// };
// const signup = async (data) => {
//   /*const data  = {username: 'username1', undefined, email: 'username@emailg.com',password: 'contraseña',birthday: 2001/05/25,userType: 'baker',---photoUrl: ',,,'}
//   */
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//     const userFirestoreRegister = await setDoc(
//       doc(db, "users", userCredential.user.uid), 
//       { 
//         username: data?.username,
//         birthday: data?.birthday,
//         userType: data?.userType
//       }
//     )
//     showTemplates('#/home')
//     return userCredential;
//   } catch (error) {
//     if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
//       alert('Invalido')
//     }
//     throw error.message;
//   }
// };
// const googleLogin = async () => {
//   try {
//     const response = await signInWithPopup(auth, provider);
//     showTemplates('#/home')
//     console.log(response);
//     return response.user;
//   } catch (error) {
//     console.log(error.message)
//     throw error.message;
//   }
// };
// // Cerrar sesion
// const logout = async () => {
//   try {
//     const response = await signOut(auth);
//     showTemplates('#/')
//     alert('La sesión se cerró exitosamente')
//     return response;
//   } catch (error) {
//     throw error.message;
//   }
// };

// export { login, logout, signup, googleLogin, auth, onAuthStateChanged}; /* */

// //Iniciar sesion con google


