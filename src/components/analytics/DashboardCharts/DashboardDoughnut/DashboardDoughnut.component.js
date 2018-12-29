/*
Core Libs
*/
import React, { Component } from 'react';

/*
Chart.js
*/
import { Doughnut } from 'react-chartjs-2';

/*
Material UI
*/
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';


const DashboardDoughnutSingleton = ({ data }) => (
    <Doughnut data={data}
        height={300}
        options={{
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                position: 'bottom'
            }
        }} />
)

class DashboardDoughnut extends Component {

    chooseDoughnutDataset() {
        // TODO(ahuszagh): fix, shouldn't be hard-coded.
        return {
            labels: [
                'Contract Uno',
                'Contract Dos',
                'Contract Tres',
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    'rgba(38,40,191, 1.0)',
                    'rgba(255,170,0, 1.0)',
                    'rgba(100,46,165, 1.0)'
                ],
                hoverBackgroundColor: [
                    'rgba(38,40,191, 0.9)',
                    'rgba(255,170,0, 0.9)',
                    'rgba(100,46,165, 0.9)',
                ]
            }]
        };
    }

    render() {
        return <Card className='dashboard-charts-card doughnut-card'>
            <h2 className='chart-title'> Highest Grossing Contracts </h2>
            <Divider style={{ width: '75%' }} />
            <CardText>
                <div className='highest-gross-card-left'>
                    <DashboardDoughnutSingleton data={this.chooseDoughnutDataset()} />
                </div>
                <div className='highest-gross-card-right'>
                    {/* Build this info dynamically after we are pulling real data*/}
                    The <a>Contract Uno</a> is the best deal you've done!
                        <span className='quick-maf'> 66.6</span>% of your total grossing are generated here!
                    </div>
            </CardText>
        </Card>
    }
}


export default DashboardDoughnut;