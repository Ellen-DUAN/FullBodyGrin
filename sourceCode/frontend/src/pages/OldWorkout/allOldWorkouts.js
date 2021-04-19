import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from 'react-bootstrap/Button';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import './allOldWorkouts.css';
import {Link} from "react-router-dom";

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

class allOldWorkouts extends React.Component {

    state = {
        workout_list: [],
        start_date: undefined,
        end_date: undefined,
        workout_type: 'All',
        sort_calories_burnt: '-'
    };

    columns = [
        {
            dataField: 'date',
            text: 'Date'
        }, 
        {
            dataField: 'workout_type',
            text: 'Workout Type'
        },
        {
            dataField: 'distance',
            text: 'Distance (km)'
        },
        {
            dataField: 'calories_burnt',
            text: 'Calories burnt'
        },
        {
            dataField: 'time_spent',
            text: 'Time Spent (Minutes)'
        },
        {
            dataField: 'pace',
            text: 'Pace (km/h)'
        }
    ];

    options = {
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        sizePerPageList: [
            {
                text: 'show 5', value: 5
            }
        ]
    }

    rowEvents = {
        onDoubleClick: (e, row, rowIndex) => {
            console.log(e);
            console.log(row);
            console.log(rowIndex);

            let path = '/oldworkout/id=' + row['id']
            this.props.history.push({
                pathname: path,
                workoutjson: row,
            });
        }
    }

    handleFilter = () => {
        //let tmplist = [...this.state.workout_list];
        let result = [...this.state.workout_list];
        console.log(this.state.start_date);
        if(this.state.start_date !== undefined || this.state.start_date !== null) {
            result = this.state.workout_list.filter(workout => new Date(workout['completion_date']) > this.state.start_date);
        }
        if(this.state.end_date !== undefined || this.state.end_date !== null) {
            result = this.state.workout_list.filter(workout => new Date(workout['completion_date']) < this.state.end_date);
        }
        if(this.state.workout_type !== 'All') {
            result = this.state.workout_list.filter(workout => workout['workout_type'] == this.state.workout_type);
        }
        if(this.state.sort_calories_burnt === 'Low to High') {
            selectionSort(result,(a,b)=>{
                if (a['calories_burnt'] < b['calories_burnt']) { return -1; } else { return 1; };
            })
        } else if(this.state.sort_calories_burnt === 'High to Low') {
            selectionSort(result,(a,b)=>{
                if (a['calories_burnt'] < b['calories_burnt']) { return 1; } else { return -1; };
            })
        }

        selectionSort(result,(a,b)=>{
            let adate = new Date(a['date']);
            let bdate = new Date(b['date']);
            if (adate < bdate) { return -1; } else { return 1; };
        });

        this.setState({
            workout_list: result
        })
    }

    handleClear = () => {
        this.setState({ start_date: undefined });
        this.setState({ end_date: undefined });
        this.setState({ workout_type: 'All' });
        this.setState({ sort_calories_burnt: '-' });

        Axios.get(
            '/getOldWorkouts',
            {
              method: 'get'
            }
          ).then(
            res => {

                selectionSort(res.data.list,(a,b)=>{
                    let adate = new Date(a['date']);
                    let bdate = new Date(b['date']);
                    if (adate < bdate) { return -1; } else { return 1; };
                });
                this.setState(
                    {
                    workout_list: [...res.data.list]
                    }
                );
            }
        );
    }

    handleRecommendations = () => {
        this.props.history.push("/goalsandrecommendations");
    };

    handleGoal = () => {
        this.props.history.push("/creategoal");
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
                    if (adate < bdate) { return -1; } else { return 1; };
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
        return (
            <>
            <h1>Old Workouts</h1>
            <Link to='/home'><Button className='Btn'>Back</Button></Link>
            <Button className='Btn' onClick={this.handleRecommendations}>View Recommendations</Button>
            <Button className='Btn' onClick={this.handleGoal}>Create Goal</Button>
            <div className='flex'>
                <div className='item'>
                    <p>Start Date</p>
                    <DatePicker
                        onChange={e => this.setState({ start_date: e })}
                        value={this.state.start_date}
                    />
                </div>
                <div className='item'>
                    <p>End Date</p>
                    <DatePicker
                        onChange={e => this.setState({ end_date: e })}
                        value={this.state.end_date}
                    />
                </div>
                <div className='item'>
                    <p>Workout Type</p>
                    <select value={this.state.workout_type} onChange={e => this.setState({ workout_type: e.target.value })}>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                        <option value="All">All</option>
                    </select>
                </div>
                <div className='item'>
                    <p>Sort By Calories Burnt</p>
                    <select value={this.state.sort_calories_burnt} onChange={e => this.setState({ sort_calories_burnt: e.target.value })}>
                        <option value="Low to High">Low to High</option>
                        <option value="High to Low">High to Low</option>
                        <option value="-">-</option>
                    </select>
                </div>
                <Button onClick={ this.handleFilter } className='item'>Apply</Button>
                <Button onClick={ this.handleClear } className='item'>Clear</Button>
            </div>
            <BootstrapTable 
                id='table'
                keyField='id' 
                data={ this.state.workout_list } 
                columns={ this.columns } 
                pagination={ paginationFactory(this.options)}
                rowEvents={ this.rowEvents }
            />
            </>
        );
    }
}

export default allOldWorkouts;