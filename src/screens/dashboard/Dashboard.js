import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import "./Dashboard.css";
import { db } from "../../components/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import StopWatch from './StopWatch';
import Dashboard1 from '../dashboard1/Dashboard1';
import { Avatar } from "@material-ui/core";
import { FaStopwatch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getStatusColor } from "../../utils/helper";

function Dashboard() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState("");
  const [onlinevalue, setOnlinevalue] = useState("");
  const [status, setStatus] = useState("Available");
  const fetchUserName = async (user) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      return ({ user })
    } catch (err) {
      console.error(err);
    }
  };
  const setInputValue = (value) => {
    setOnlinevalue(value)
  }

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

  useEffect(() => {
    const curentStatusLocal = localStorage.getItem('curentStatus');
    console.log("asfsfsdfsd", curentStatusLocal);
    curentStatusLocal && setStatus(curentStatusLocal);
    const selected = document.querySelector('.status');
    selected.addEventListener('change', (e) => {
      console.log(",dsbhjfbdsg", e.target.value);
      setStatus(e.target.value)
      localStorage.setItem('curentStatus', e.target.value)
    })
    return () => {
      selected.removeEventListener('change', (e) => {
        console.log(",dsbhjfbdsg", e.target.value);
        setStatus(e.target.value)
      })
    }
  }, []);

  return (
    <div className="dash-board" style={{ flexDirection: "row", display: "flex" }}>
      <div className="side-bar" >
        <div className="side-bar1" >
          <Avatar>{name.substring(0, 1).toUpperCase()}</Avatar>

          <div className="name">
            {name}
            <div>

              <select name="status" className="status" value={status}>
                <option value="Available" > Available</option>
                <option value="Away" > Away</option>
                <option value="Busy" > Busy</option>
              </select>

              <Link to="/Cardss" >
                <FaStopwatch className="iconss" />
              </Link>

            </div>
          </div>

          <div className="statuss" style={{
            height: 10, width: 10, borderRadius: 10,
            background: getStatusColor(status),
            position: "absolute", left: 60, top: 80
          }} />
        </div>

        {user && <StopWatch user={user} setInputValue={(e) => setInputValue(e)} status={status} />}

        {/* <div className="dashboard__container" style={{ marginTop: '40px' }}>
          Logged in as
          <div style={{ marginTop: '15px' }}>{name}</div>
          <div >{user?.email}</div>
        </div> */}
      </div>
      <div className="Dashboard1"  >

        <Dashboard1 onlinevalue={onlinevalue} />
      </div>
    </div>
  );
}
export default Dashboard;




