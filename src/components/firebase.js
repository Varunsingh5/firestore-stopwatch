import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvvRjKXu1JQtFta5XQbwS57Gm-Exz_kUQ",
  authDomain: "auth-development-4b760.firebaseapp.com",
  databaseURL: "https://auth-development-4b760-default-rtdb.firebaseio.com",
  projectId: "auth-development-4b760",
  storageBucket: "auth-development-4b760.appspot.com",
  messagingSenderId: "61638249314",
  appId: "1:61638249314:web:5c8a7c832ae0d7a5c87a3b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(e => {
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('user', JSON.stringify(e?.user))
      navigate('/dashboard')
    }).catch(err => alert(err.message))
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password, navigate) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password).then(async (e) => {
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('user', JSON.stringify(e?.user))
      const user = e?.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        onlineState: ""
      });
      navigate('/dashboard')
    }).catch(err => alert(err.message))
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email, navigate) => {
  try {
    await sendPasswordResetEmail(auth, email).then(e => {
      alert("Password reset link sent!");
      navigate('/login')
    }).catch(err => console.log("rest error", err))

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  return signOut(auth).then(e => {
    localStorage.clear()
  }).catch(err => console.log("signout error", err))

};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};