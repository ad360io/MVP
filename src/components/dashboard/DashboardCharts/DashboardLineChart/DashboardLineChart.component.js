/*
Core Libs
*/
import React, { Component } from 'react';

/*
Chart.js Components
*/
import { Line } from 'react-chartjs-2';


/**
 * Line Chart singleton
 * Requires a props of data (Number array) to be graphed
 */
class DashboardLineChart extends Component {

    constructor(props) {
        super(props);
        this.prepareDatasetToLineChart = this.prepareDatasetToLineChart.bind(this);
    }

    /**
     * Based on the dataset that needs to be graphed, return the X-axis labels
     * Labels are capped at 30, which is a month in this case
     * @param {*} dataset Array of numbers that represent historical data by days.
     */
    prepareLineChartXaxisLabels(dataset) {
        let daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let today = new Date().getDay();
        let labelSize = (dataset.length > 30 ? 30 : dataset.length);
        let labelsArray = new Array(labelSize);
        for (let i = 0; i < labelSize; i++) {
            labelsArray[labelSize - i - 1] = daysLabel[this.mod((today - i), 7)];
        }
        return labelsArray;
    }

    /**
     * Helper method to calculate modulo operation, including negative numbers;
     * @param { number } n operand
     * @param { number } m operand base
     */
    mod(n, m) {
        return ((n % m) + m) % m;
    }

    /**
     * This Method initialize the data object that is required for Chart.js component
     */
    prepareDatasetToLineChart() {
        const data = (canvas) => {
            const ctx = canvas.getContext('2d')
            const gradient = ctx.createLinearGradient(500, 0, 100, 0);
            gradient.addColorStop(0, 'rgba(83 , 69, 165, 0.3)');
            gradient.addColorStop(1, 'rgba(145, 53, 161, 0.3)');
            return {
                labels: this.prepareLineChartXaxisLabels(this.props.dataset),
                datasets: [
                    {
                        label: this.props.contractTitle,
                        fill: true,
                        lineTension: 0.2,
                        backgroundColor: gradient,
                        borderColor: 'purple',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'purple',
                        pointBackgroundColor: 'purple',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'purple',
                        pointHoverBorderColor: 'purple',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 1,
                        /* only get the first 30 element if the dataset is more than 30 elements*/
                        data: this.props.dataset.slice(0, (this.props.dataset.length > 30
                            ? 30
                            : this.props.dataset.length))
                    }
                ]
            };
        }
        return data;
    }

    render() {
        return <DashboardLineChartRenderer data={this.prepareDatasetToLineChart()} />
    }
}

const DashboardLineChartRenderer = ({ data }) => (
    <div className='dashboard-line-chart-container'>
        <Line data={data}
            height={180}
            width={400}
            options={{
                maintainAspectRatio: false,
                responsive: false,
                animation: false,
                legend: {
                    labels: {
                        boxWidth: 0,
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: 'bold',
                            beginAtZero: true,
                            maxTicksLimit: 3,
                            padding: 20
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }}
        />
    </div>
)


export default DashboardLineChart;
