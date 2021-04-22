import React from 'react';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './viewGoalandRecommendation.css';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Axios from 'axios';

const selectionSort = (a,compare)=>{
    if(a.length <= 1){
        return;
    }
    let i = 0;
    while(i<a.length){
        let li = i;
        let j = i;
        while(j < a.length){
            if(compare(a[j], a[li])<0){
                li = j;
             }
             j = j + 1;
        }
        let tmp =a[i]
        a[i]=a[li];
        a[li]=tmp;
        i=i+1;
    }
}

class viewGoalandRecommendation extends React.Component {

    state = {
        goals: [],
        recommendations: []
    }

    handleDelete = (e) => {
        console.log(e.target.parentNode.getElementsByTagName('p')[0].getAttribute('id'));
        const goal_id = e.target.parentNode.getElementsByTagName('p')[0].getAttribute('id');
        
        Axios.post(
            '/deleteGoal',
            {
                method: 'post',
                id: goal_id
            }
        ).then(
            res => {
                if(res.data.deleted) {
                    console.log('The goal has been deleted!');
                }
            }
        );
        
    };

    handleUse = (e) => {
        console.log(e.target.parentNode);
        let json;
        //console.log(e.target.parentNode.getElementsByTagName('p')[0].getAttribute('id'));
        const recommendation_id = e.target.parentNode.getElementsByTagName('p')[0].getAttribute('id');
        for (let recommendation of this.state.recommendations) {
            if(recommendation['id'] === parseInt(recommendation_id)) {
                json = recommendation
            }
        }
        
        let path = '/userecommendation/id=' + recommendation_id
        this.props.history.push({
            pathname: path,
            recommendationjson: json,
        });
        /*
        Axios.post(
            '/useRecommendation',
            {
                method: 'post',
                id: recommendation_id
            }
        ).then(
            res => {
                if(res.data.used) {
                    console.log('Recommendation has been used!');
                }
            }
        );
        */
    }

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
        Axios.get(
            '/getGoalRecommendation',
            {
              method: 'get'
            }
          ).then(
            res => {
                
                selectionSort(res.data.goals,(a,b)=>{
                    let adate = new Date(a['completion_date']);
                    let bdate = new Date(b['completion_date']);
                    //console.log(adate);
                    if (adate < bdate) { return -1; } else { return 1; };
                });
                this.setState({ goals: res.data.goals });
                this.setState({ recommendations: res.data.recommendations })
                console.log(res.data.recommendations);
            }
        );
    };

    render() {
        return (
            <div>
                <video src='running.mp4' autoPlay loop muted/>
                <h1>Goals and Recommendations</h1>
                <Link to='/alloldworkouts'><Button id='backBtn'>Back</Button></Link>
                <CardColumns>
                    <Card className="card_item">
                        <Card.Body>
                        <Card.Title>Goals</Card.Title>
                        <div className='status'><div id='completedColor'></div>Completed</div>
                        <div className='status'><div id='uncompletedColor'></div>Uncompleted</div>
                        <div className='status'><div id='inProgressColor'></div>In Progress</div>
                        {this.state.goals.map(goal => (
                            <Card className={'inner_card ' + goal['status']} key={goal['id']}>
                                <Card.Body>
                                <Card.Title>Goal</Card.Title>
                                <Card.Text id={goal['id']}>
                                    Completion Date:
                                    {' ' + goal['completion_date'].slice(0,10)}
                                    <br />
                                    Workout Type:
                                    
                                    {' ' + goal['workout_type']}
                                    <br />
                                    Total Distance Travelled: 
                                    
                                    {' ' + goal['total_distance'] + ' km'}
                                    <br />
                                    Total Calories Burnt:
                                    
                                    {' ' + goal['total_calories']}
                                    <br />
                                    Total Time Spent:
                                    
                                    {' ' + goal['total_time']}
                                    <br />
                                </Card.Text>
                                <Button onClick={this.handleDelete}>Delete</Button>
                                </Card.Body>
                            </Card>
                        ))}                        
                        </Card.Body>
                    </Card>

                    <Card className="card_item">
                        <Card.Body>
                        <Card.Title>Recommendations</Card.Title>
                        
                        {this.state.recommendations.map(recommendation => (
                            <Card className="inner_card" key={recommendation['id']}>
                                <Card.Body>
                                <Card.Title>Recommendation</Card.Title>
                                <Card.Text id={recommendation['id']}>
                                    Workout Type:
                                    {' ' + recommendation['workout_type']}
                                    <br />
                                    Distance Travelled: 
                                    
                                    {' ' + recommendation['distance'] + ' km'}
                                    <br />
                                    Time Spent:
                                    
                                    {' ' + recommendation['time']}
                                    <br />
                                </Card.Text>
                                <Button onClick={this.handleUse}>Use</Button>
                                </Card.Body>
                            </Card>
                        ))}    

                        </Card.Body>
                    </Card>
                </CardColumns>
            </div>
        );
    }
}

export default viewGoalandRecommendation;