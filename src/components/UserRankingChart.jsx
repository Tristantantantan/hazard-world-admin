import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getTotalScoresAndNamesForAllUsers } from '../services/dashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserRankingChart = () => {
    const [userAssessments, setUserAssessments] = useState([]);

    useEffect(() => {
        fetchUserScores();
    }, []);

    const fetchUserScores = async () => {
        try {
            const response = await getTotalScoresAndNamesForAllUsers();
            setUserAssessments(response);
        } catch (error) {
            console.error('Error fetching user scores:', error);
        }
    };

    const sortedUsers = [...userAssessments].sort((a, b) => b.totalScore - a.totalScore);
    const userNames = sortedUsers.map(user => user.name);
    const userScores = sortedUsers.map(user => user.totalScore);

    const data = {
        labels: userNames,
        datasets: [
            {
                label: 'Total Score',
                data: userScores,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'User Ranking by Total Score',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 10,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default UserRankingChart;
