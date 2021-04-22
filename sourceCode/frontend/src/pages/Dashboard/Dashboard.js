import React from 'react';
import Video from '../../components/Video/Video';
import Navbar from '../../components/Navbar/Navbar';
import Cookies from "universal-cookie";
import {Link, Redirect} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import UpcomingWorkouts from './upcomingWorkouts';
import PreviousWorkouts from './previousWorkouts';
import Sleep from './sleep';
import Axios from 'axios';

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");


class Dashboard extends React.Component {

    componentDidMount() {
        Axios.get(
            '/loggedIn',
            {
                method: 'get'
            }
        ).then(
            res => {
                if(! res.data.loggedin) {
                    this.props.history.push("/");
                }
            }
        );
    }

    render() {
        return(
            <div>
                <Navbar />
                <Video />
                {/* <Cards /> */}
                <CardColumns>
                    <Card className="card">
                        <Card.Body>
                        <Card.Title>Upcoming Workouts</Card.Title>
            
                        <UpcomingWorkouts />

                        <Link to='/allnewworkouts'><Button>Show All</Button></Link>
                        <br />
                        <br />
                        <Link to='/planworkout'><Button>Plan New Workout</Button></Link>
                        </Card.Body>
                    </Card>
                    <Card className="card">
                        <Card.Body>
                        <Card.Title>Previous Workouts</Card.Title>
                        
                        <PreviousWorkouts />


                        <Link to='/alloldworkouts'><Button>Show All</Button></Link>
                        <br />
                        <br />
                        <Link to='/logworkout'><Button>Log Workout</Button></Link>
                        </Card.Body>
                    </Card>
                    <Card className="card">
                        <Card.Body>
                        <Card.Title>Sleep and Mental Health</Card.Title>
                        
                        <Sleep />

                        <Link to='/viewsleep'><Button>Show All</Button></Link>
                        <br />
                        <br />
                        <Link to='/logsleep'><Button>Log Sleep and Mental Health</Button></Link>
                        </Card.Body>
                    </Card>
                </CardColumns>
            </div>
        );
    }
}

export default Dashboard;
