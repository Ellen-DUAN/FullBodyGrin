import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import './previousWorkouts.css';
import Card from 'react-bootstrap/Card';

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

class PreviousWorkouts extends React.Component {
    state = {
        workouts_list: []
    }

    componentDidMount() {
        Axios.get(
            '/getOldWorkouts',
            {
              method: 'get'
            }
          ).then(
            res => {
                console.log('Refreshing...');
                console.log(res.data.list)
                selectionSort(res.data.list,(a,b)=>{
                    let adate = new Date(a['date']);
                    let bdate = new Date(b['date']);
                    //console.log(adate);
                    if (adate < bdate) { return 1; } else { return -1; };
                });
                this.setState(
                    {
                    workout_list: [...res.data.list]
                    }
                );
            }
        );
    };

    render () {
        let card;
        if(this.state.workouts_list.length == 0) {
            card = <p>No Previous Workouts</p>
        } else if(this.state.workouts_list.length == 1) {
            const date = this.state.workouts_list[0]['date']
            const distance = this.state.workouts_list[0]['distance']
            const calories = this.state.workouts_list[0]['calories_burnt']

            card = <Card className="inner_card">
                        <Card.Body>
                            <Card.Title>Workout</Card.Title>
                            <Card.Text>
                                Completion Date: {date}
                                <br />
                                Distance: {distance}
                                <br />
                                Calories Burnt: {calories}
                            </Card.Text>
                        </Card.Body>
                    </Card>
        } else {
            const date1 = this.state.workouts_list[0]['date']
            const distance1 = this.state.workouts_list[0]['distance']
            const calories1 = this.state.workouts_list[0]['calories_burnt']
            const date2 = this.state.workouts_list[1]['date']
            const distance2 = this.state.workouts_list[1]['distance']
            const calories2 = this.state.workouts_list[1]['calories_burnt']

            card =  <>
                        <Card className="inner_card">
                            <Card.Body>
                                <Card.Title>Workout</Card.Title>
                                <Card.Text>
                                    Completion Date: {date1}
                                    <br />
                                    Distance: {distance1}
                                    <br />
                                    Calories Burnt: {calories1}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="inner_card">
                            <Card.Body>
                                <Card.Title>Workout</Card.Title>
                                <Card.Text>
                                    Completion Date: {date2}
                                    <br />
                                    Distance: {distance2}
                                    <br />
                                    Calories Burnt: {calories2}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </>
        }

        return (
            <>
            {card}
            </>
        );
    }
}

export default PreviousWorkouts;