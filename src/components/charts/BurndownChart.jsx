import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import PropTypes from "prop-types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function BurndownChart({burndownChartData} ) {
    const data = {
        labels: burndownChartData.labels,
        datasets: [
            {
                label: 'Effort Remaining',
                data: burndownChartData?.effortPointsRemaining,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            },
            {
                label: 'Ideal Effort Remaining',
                data: burndownChartData?.idealEffortPointsRemaining,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderDash: [5, 5]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: burndownChartData?.title
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Effort Point"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Week"
                }
            }
        }
    };

    return (
        <Line data={data} options={options} />
    );
}

BurndownChart.propTypes = {
    burndownChartData: PropTypes.object.isRequired,
}

export default BurndownChart;
