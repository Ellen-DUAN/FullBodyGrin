import React from 'react';
import {VictoryChart, VictoryBar, Bar, VictoryAxis} from 'victory';
import './try.css';
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

class C extends React.Component {
    constructor() {
      super();
      this.state = {
        sleep_list: [],
        clicked: false,
        style: {
          data: { fill: "tomato" }
        }
      };
    }

    componentDidMount() {
        Axios.get(
            '/getSleep',
            {
              method: 'get'
            }
          ).then(
            res => {
                //console.log('Refreshing...');
                //console.log(res.data.list)
                selectionSort(res.data.list,(a,b)=>{
                    let adate = new Date(a['date']);
                    let bdate = new Date(b['date']);
                    if (adate < bdate) { return 1; } else { return -1; };
                });
                this.setState(
                    {
                    sleep_list: [...res.data.list]
                    }
                );
            }
        );
    }
  
    render() {
      const handleMouseOver = () => {
        const fillColor = this.state.clicked ? "blue" : "tomato";
        const clicked = !this.state.clicked;
        this.setState({
          clicked,
          style: {
            data: { fill: fillColor }
          }
        });
      };
    
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        const today_full = yourDate.toISOString()
        const today = yourDate.toISOString().split('T')[0]
        //console.log(today);
        //console.log(new Date());

        let d1 = new Date();
        d1.setDate(d1.getDate() - 1);
        d1 = new Date(d1.getTime() - (offset*60*1000))
        d1 = d1.toISOString().split('T')[0]
        //console.log(d1);

        let d2 = new Date();
        d2.setDate(d2.getDate() - 2);
        d2 = new Date(d2.getTime() - (offset*60*1000))
        d2 = d2.toISOString().split('T')[0]

        let d3 = new Date();
        d3.setDate(d3.getDate() - 3);
        d3 = new Date(d3.getTime() - (offset*60*1000))
        d3 = d3.toISOString().split('T')[0]

        let d4 = new Date();
        d4.setDate(d4.getDate() - 4);
        d4 = new Date(d4.getTime() - (offset*60*1000))
        d4 = d4.toISOString().split('T')[0]
        
        let y_data = {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0
        };

        for (let s of this.state.sleep_list) {
            if(s['date'] === today) {
                y_data['0'] = s['time']
            } else if(s['date'] === d1) {
                y_data['1'] = s['time']
            } else if(s['date'] === d2) {
                y_data['2'] = s['time']
            } else if(s['date'] === d3) {
                y_data['3'] = s['time']
            } else if(s['date'] === d4) {
                y_data['4'] = s['time']
            }
        }
  
        
      return (
        <div>
          <VictoryChart height={100} width={200}
           padding={{ top: 20, bottom: 30, left: 30, right: 20 }}
            domainPadding={{x: 20}}
            scale={{ x: "time" }}
          >
            <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 3
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="left"
            style={{ tickLabels: { fontSize: 3 } }}
          />
            <VictoryBar
                barWidth={3}
              dataComponent={
                <Bar events={{ onMouseOver: handleMouseOver }}/>
              }

              style={this.state.style}
              data={[
                { x: d4, y: y_data['4'] },
                { x: d3, y: y_data['3'] },
                { x: d2, y: y_data['2'] },
                { x: d1, y: y_data['1'] },
                { x: today, y: y_data['0']}
              ]}
            />
          </VictoryChart>
        </div>
      );
    }
   }

export default C;