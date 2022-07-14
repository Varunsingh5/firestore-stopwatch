import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { db } from "../../components/firebase";
import { doc, getDoc } from "firebase/firestore";
// import { useAuthState } from 'react-firebase-hooks/auth';
import DatePicker from 'react-multi-date-picker';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { getStatusColor } from '../../utils/helper';
import "./Cardss.css";

const Cardss = (props) => {
    const [, setUser] = useState(null)
    const [time, setTime] = useState([])
    const today = new Date();
    const [values, setValues] = useState(today)
    const [totalHours, setTotalHours] = useState(null)
    const [availableHours, setAvailableHours] = useState(null)
    const [awayHours, setAwayHours] = useState(null)
    const [busyHours, setBusyHours] = useState(null)


    function convertHMS(e) {
        var h = Math.floor(e / 3600).toString().padStart(2, '0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(e % 60).toString().padStart(2, '0');

        return h + ':' + m + ':' + s;
    }

    const addTimes = async (timesArray) => {
        let duration = 0;
        timesArray.forEach(time => {
            duration = duration + moment(time?.endTime?.seconds * 1000).diff(moment(time?.startTime?.seconds * 1000), 'seconds')
        });
        const convertTime = convertHMS(duration)
        return convertTime;
    }
    const getDocFromFirebase = async (user) => {
        const docRef = doc(db, "data", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const newdata = docSnap.data();

            const filterData = newdata?.timeLogs?.filter((i, x) => moment(i?.startTime?.seconds * 1000).format('YYYY/MM/DD') == moment(values).startOf('day').format('YYYY/MM/DD'))
            const totalTime = await addTimes(filterData)

            // for available time
            const availableFilterData = filterData?.filter((i, x) => i?.status == "Available")
            const availbleTime = await addTimes(availableFilterData)

            //for busy time
            const busyFilterData = filterData?.filter((i, x) => i?.status == "Busy")
            const busyTime = await addTimes(busyFilterData)

            //for away time 
            const awayFilterData = filterData?.filter((i, x) => i?.status == "Away")
            const awayTime = await addTimes(awayFilterData)

            //state state
            setTime(filterData)
            setTotalHours(totalTime)
            setAvailableHours(availbleTime)
            setBusyHours(busyTime)
            setAwayHours(awayTime)
        }
    }
    const setUserDeatils = async () => {
        const usr = await localStorage.getItem('user');
        console.log("asfsfis", usr);
        setUser(JSON.parse(usr));
        await getDocFromFirebase(JSON.parse(usr))
    }
    useEffect(() => {
        console.log("sjjhsdsdjhfsdjhfvsdgvg==========");
        setUserDeatils()
        return () => null

    }, [values])

    const onchangedate = (selectedDate) => {
        const dateFormatted = moment(selectedDate?.unix * 1000);
        setValues(new Date(dateFormatted))
    }

    const renderStatusDot = (color) => {
        return (
            <div style={{ background: color, height: "10px", width: "10px", borderRadius: "5px", marginTop: '5px' }} />
        )
    }

    return (

        <div className='card'>

            <div className="card1" >
                <Link to="/Dashboard" >
                    <button className='btn-back'> Back</button>
                </Link>

                <div className="date" >
                    <DatePicker
                        multiple={false}
                        value={values}
                        maxDate={new Date()}
                        onChange={onchangedate}
                        //   onChange={(e)=>console.log("nkjjhvjhc",e)}
                        style={{ textAlign: "center" }} />
                </div>
            </div>

            <div className='cards' >
                <Card className='cards1'  >
                    <CardContent  style={{backgrounColor: 'blanchedalmond'}} >

                        <Typography color="textSecondary" gutterBottom style={{ color: 'black' }}>
                            Online Hours
                        </Typography>

                        <Typography color="textSecondary" gutterBottom style={{ color: 'black', marginLeft: "11px" }}>
                            {totalHours}
                        </Typography>

                    </CardContent>
                </Card>

                <Card style={{ marginLeft: '3%', backgroundColor: 'blanchedalmond' }}  >

                    <CardContent  >

                        <Typography color="textSecondary" gutterBottom style={{ display: "flex", color: 'black' }}>
                            {renderStatusDot("green")} <span style={{ marginLeft: "4px" }}> Available </span>
                        </Typography>

                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: "10px", color: 'black' }}>
                            {availableHours}
                        </Typography>

                    </CardContent>

                </Card>

                <Card style={{ marginLeft: '5%', backgroundColor: 'blanchedalmond' }}  >
                    <CardContent   >

                        <Typography color="textSecondary" gutterBottom style={{ display: "flex", color: 'black', }}>
                            {renderStatusDot("pink")}  <span style={{ marginLeft: "4px" }}> Busy </span>
                        </Typography>

                        <Typography color="textSecondary" gutterBottom style={{ color: 'black', marginLeft: "10px" }}>
                            {busyHours}
                        </Typography>

                    </CardContent>
                </Card>

                <Card style={{ marginLeft: '5%', backgroundColor: 'blanchedalmond' }}  >

                    <CardContent>

                        <Typography color="textSecondary" gutterBottom style={{ color: 'black', display: "flex" }}>
                            {renderStatusDot("Yellow")}   <span style={{ marginLeft: "4px" }}> Away </span>
                        </Typography>

                        <Typography color="textSecondary" gutterBottom style={{ color: 'black' }}>
                            {awayHours}
                        </Typography>

                    </CardContent>
                </Card>
            </div>

            <div className='cardss' style={{ width: '55%', marginTop: '30px', marginLeft: '20%' }}>
                <Card >

                    <CardContent style={{ display: 'flex', backgroundColor: "darkkhaki" }}>

                        <Grid item xs={4}>
                            <Typography color="textSecondary" gutterBottom style={{ marginLeft: '30%', color: 'black' }}>
                                Time
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography color="textSecondary" gutterBottom style={{ marginLeft: '45%', color: 'black' }}>
                                Status
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography color="textSecondary" gutterBottom style={{ marginLeft: '8%', color: 'black' }}>
                                Duration
                            </Typography>
                        </Grid>
                    </CardContent>

                    {time?.length > 0 &&
                        time?.map((i, x) => {
                            return (
                                <CardContent style={{ display: 'flex', backgroundColor: "beige" }}>

                                    <Grid item xs={4}>
                                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '5%', color: 'black', }}>
                                            {moment(i?.startTime?.seconds * 1000).local().format("hh:mm A") + " - " + moment(i?.endTime?.seconds * 1000).format("hh:mm A")}
                                            {/* {new Date(i?.startTime?.seconds * 1000).toLocaleString()}-{new Date(i?.endTime?.seconds * 1000).toUTCString()} */}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '38%', display: "flex", color: 'black' }}>
                                            {renderStatusDot(getStatusColor(i?.status))}   &nbsp;  {i?.status}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '10%', color: 'black' }}>
                                            {convertHMS(moment(i?.endTime?.seconds * 1000).diff(moment(i?.startTime?.seconds * 1000), 'seconds'))}
                                        </Typography>
                                    </Grid>

                                </CardContent>
                            )
                        })
                    }
                    <CardContent style={{ backgroundColor: "beige", display: "flex" }}>
                        <Grid item xs={4}>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography color="textSecondary" gutterBottom style={{ color: "black", marginLeft: "50%" }}>
                                Total Hours
                            </Typography>
                        </Grid>

                        <Grid item xs={4} style={{ marginLeft: "10%" }}>
                            {totalHours}
                        </Grid>

                    </CardContent>
                </Card>
            </div>
        </div>

    )
}
export default Cardss;