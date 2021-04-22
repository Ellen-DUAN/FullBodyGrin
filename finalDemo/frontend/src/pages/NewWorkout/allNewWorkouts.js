import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from 'react-bootstrap/Button';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-date-picker';
import Axios from 'axios';
import './allNewWorkouts.css';
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

class allNewWorkouts extends React.Component {

    state = {
        workout_list: [],
        start_date: undefined,
        end_date: undefined,
        workout_type: 'All'
    };

    columns = [
        {
            dataField: 'completion_date',
            text: 'Completion Date'
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
            dataField: 'time_taken',
            text: 'Time Taken (Minutes)'
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

            let path = '/newworkout/id=' + row['id']
            this.props.history.push({
                pathname: path,
                workoutjson: row,
            });
            /*
            let path = '/newworkout/id=' + row['id']
            const url = '/getWorkoutDetails/id=' + row['id']
            Axios.get(
                url,
                {
                    method: 'get'
                }
            ).then(
                res => {
                    console.log(res.data.workout);
                    const workout = res.data.workout;
                    this.props.history.push({
                        pathname: path,
                        workoutjson: workout,
                        mapjson: workout['mapjson']
                    });

                }
            );
            */

        }
    }

    handleFilter = () => {
        //let tmplist = [...this.state.workout_list];
        let result = [...this.state.workout_list];
        if(this.state.start_date !== undefined) {
            
            console.log(new Date(result[0]['completion_date']));
            console.log(this.state.start_date);
            console.log(new Date(this.state.start_date));
            result = this.state.workout_list.filter(workout => new Date(workout['completion_date']) > this.state.start_date);
        }
        if(this.state.end_date !== undefined) {
            result = this.state.workout_list.filter(workout => new Date(workout['completion_date']) < this.state.end_date);
        }
        if(this.state.workout_type !== 'All') {
            result = this.state.workout_list.filter(workout => workout['workout_type'] == this.state.workout_type);
        }

        selectionSort(result,(a,b)=>{
            let adate = new Date(a['completion_date']);
            let bdate = new Date(b['completion_date']);
            if (adate < bdate) { return -1; } else { return 1; };
        })
        this.setState({
            workout_list: result
        })
    }

    handleClear = () => {
        this.setState({ start_date: undefined });
        this.setState({ end_date: undefined });
        this.setState({ workout_type: 'All' });
        Axios.get(
            '/getNewWorkouts',
            {
              method: 'get'
            }
          ).then(
            res => {

                selectionSort(res.data.list,(a,b)=>{
                    let adate = new Date(a['completion_date']);
                    let bdate = new Date(b['completion_date']);
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
            '/getNewWorkouts',
            {
              method: 'get'
            }
          ).then(
            res => {
                console.log('Refreshing...');
                console.log(res.data.list)
                selectionSort(res.data.list,(a,b)=>{
                    let adate = new Date(a['completion_date']);
                    let bdate = new Date(b['completion_date']);
                    //console.log(adate);
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
            <h1>Upcoming Workouts</h1>
            <Link to='/home'><Button id='backBtn'>Back</Button></Link>
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

export default allNewWorkouts;