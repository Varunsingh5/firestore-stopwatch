import React, { useState, useEffect } from 'react';
import { logout } from "../../components/firebase";
import { Avatar } from "@material-ui/core";
import "./Dashboard1.css";
// import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../components/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Dashboard1(props) {
  const { onlinevalue } = props;
  const [name, setName] = useState("");
  const [onlineState, setOnlineState] = useState("");
  const [, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserName = async (user) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setOnlineState(data?.onlineState);
      return ({ user })

    } catch (err) {
      console.error(err);
    }
  };
  const setUserDeatils = async () => {
    const usr = await localStorage.getItem('user');
    console.log("asfsfis", usr);
    setUser(JSON.parse(usr));
    await fetchUserName(JSON.parse(usr))
  }
  useEffect(() => {
    setUserDeatils();
    return () => null
  }, []);
  const logoutButton = () => {
    logout().then(e => {
      window.location.href = '/login';
    }).catch(err => console.log("error on logout click"))
  }

  return (
    <div className='dash2' >
      <button className="dashboard__btn" onClick={logoutButton}  >
        Logout
      </button>
      <div className="dashboard1">
        <h2 className="Desk" > Desk Area</h2>
        <Avatar className="avatar"  >{name.substring(0, 1).toUpperCase()}</Avatar>
        <div className="online1" >
          <div className='val'>
            <p> {onlinevalue || onlineState}</p>  {/* {onlinevalue}  */}
          </div>
        </div>
      </div>
    </div>
  );
}