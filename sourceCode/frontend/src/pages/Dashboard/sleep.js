
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import './upcomingWorkouts.css';
import Card from 'react-bootstrap/Card';
import ok from '../SleepandMentalHealth/images/ok.png';
import happy from '../SleepandMentalHealth/images/happy.png';
import unhappy from '../SleepandMentalHealth/images/unhappy.png';
import Figure from 'react-bootstrap/Figure';

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

class UpcomingWorkouts extends React.Component {
    state = {
        sleep_list: []
    }

    componentDidMount() {
        Axios.get(
            '/getSleep',
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
                    sleep_list: [...res.data.list]
                    }
                );
            }
        );
    };

    render () {
        let card;
        if(this.state.sleep_list.length == 0) {
            card = <p>No Sleep Logs</p>
        } else if(this.state.sleep_list.length == 1) {
            console.log('hshsshshs');
            const date = this.state.sleep_list[0]['date']
            const time = this.state.sleep_list[0]['time']
            const feeling = this.state.sleep_list[0]['feeling'];
            //const calories = this.state.sleep_list[0]['calories_burnt']
            let figure;
            if(feeling === 'happy') {
                figure = happy;
            } else if(feeling === 'ok') {
                figure = ok;
            } else if(feeling === 'unhappy') {
                figure = unhappy;
            }

            card = <Card className="inner_card">
                        <Card.Body>
                            <Card.Title>Sleep Log</Card.Title>
                            <Card.Text>
                                Date: {date}
                                <br />
                                Time Asleep: {time}
                                <br />
                                Feeling:
                                <Figure.Image
                                    width={40}
                                    height={40}
                                    src={figure}
                                />
                            </Card.Text>
                        </Card.Body>
                    </Card>
        } else {
            const date1 = this.state.sleep_list[0]['date']
            const time1 = this.state.sleep_list[0]['time']
            const feeling1 = this.state.sleep_list[0]['feeling']
            const date2 = this.state.sleep_list[1]['date']
            const time2 = this.state.sleep_list[1]['time']
            const feeling2 = this.state.sleep_list[1]['feeling']

            let figure1;
            let figure2;
            if(feeling1 === 'happy') {
                figure1 = happy;
            } else if(feeling1 === 'ok') {
                figure1 = ok;
            } else if(feeling1 === 'unhappy') {
                figure1 = unhappy;
            }
            if(feeling2 === 'happy') {
                figure2 = happy;
            } else if(feeling2 === 'ok') {
                figure2 = ok;
            } else if(feeling2 === 'unhappy') {
                figure2 = unhappy;
            }
            card =  <>
                        <Card className="inner_card">
                            <Card.Body>
                                <Card.Title>Sleep Log</Card.Title>
                                <Card.Text>
                                    Date: {date1}
                                    <br />
                                    Time Asleep: {time1}
                                    <br />
                                    Feeling:
                                    <Figure.Image
                                        width={40}
                                        height={40}
                                        src={figure1}
                                    />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="inner_card">
                            <Card.Body>
                                <Card.Title>Sleep Log</Card.Title>
                                <Card.Text>
                                    Date: {date2}
                                    <br />
                                    Time Asleep: {time2}
                                    <br />
                                    Feeling:
                                    <Figure.Image
                                        width={40}
                                        height={40}
                                        src={figure2}
                                    />
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

export default UpcomingWorkouts;