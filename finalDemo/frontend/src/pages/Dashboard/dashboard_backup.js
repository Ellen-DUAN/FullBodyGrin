import React from 'react';
import Video from '../../components/Video/Video';
import Navbar from '../../components/Navbar/Navbar';
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import upcomingWorkouts from './upcomingWorkouts';

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");


function Dashboard() {
    return(
        <div>
            <Navbar />
            <Video />
            {/* <Cards /> */}
            <CardColumns>
            <Card className="card">
                <Card.Body>
                <Card.Title>Upcoming Workouts</Card.Title>
    
                <Card className="inner_card">
                    <Card.Body>
                    <Card.Title>Upcoming Workouts</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="inner_card">
                    <Card.Body>
                    <Card.Title>Upcoming Workouts</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                </Card>

                <Link to='/allnewworkouts'><Button>Show All</Button></Link>
                <br />
                <br />
                <Link to='/planworkout'><Button>Plan New Workout</Button></Link>
                </Card.Body>
                </Card>
                <Card className="card">
                    <Card.Body>
                    <Card.Title>Previous Workouts</Card.Title>
                    
                    <Card className="inner_card">
                        <Card.Body>
                        <Card.Title>Upcoming Workouts</Card.Title>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="inner_card">
                        <Card.Body>
                        <Card.Title>Upcoming Workouts</Card.Title>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                    </Card>


                    <Link to='/alloldworkouts'><Button>Show All</Button></Link>
                    <br />
                    <br />
                    <Link to='/logworkout'><Button>Log Workout</Button></Link>
                    </Card.Body>
                </Card>
                <Card className="card">
                    <Card.Body>
                    <Card.Title>Sleep and Mental Health</Card.Title>
                    
                    <Card className="inner_card">
                        <Card.Body>
                        <Card.Title>Upcoming Workouts</Card.Title>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="inner_card">
                        <Card.Body>
                        <Card.Title>Upcoming Workouts</Card.Title>
                        <Card.Text>
                            This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                    </Card>

                    <Link to='/'><Button>Show All</Button></Link>
                    <br />
                    <br />
                    <Link to='/'><Button>Log Sleep and Mental Health</Button></Link>
                    </Card.Body>
                </Card>
            </CardColumns>
        </div>
    );
}

export default Dashboard;
