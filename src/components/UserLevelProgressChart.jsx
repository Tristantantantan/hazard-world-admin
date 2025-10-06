import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { getUserAssessments } from '../services/dashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserLevelProgressChart = () => {
    const [userAssessments, setUserAssessments] = useState([]);

    useEffect(() => {
        fetchUserAssessments();
    }, []);

    const fetchUserAssessments = async () => {
        try {
            const response = await getUserAssessments();
            setUserAssessments(response);
        } catch (error) {
            console.error('Error fetching user assessments:', error);
        }
    };

    const levelProgressData = {};

    userAssessments.forEach(assessment => {
        Object.entries(assessment)
            .filter(([key]) => key.startsWith('Chapter'))
            .forEach(([, chapter]) => {
                Object.entries(chapter).forEach(([levelName, level]) => {
                    if (!levelProgressData[levelName]) {
                        levelProgressData[levelName] = {
                            totalProgress: 0,
                            count: 0,
                        };
                    }
                    levelProgressData[levelName].totalProgress += level.progress || 0;
                    levelProgressData[levelName].count += 1;
                });
            });
    });

    const levels = Object.keys(levelProgressData).sort((a, b) => {
        const levelNumberA = parseInt(a.replace('Level ', ''), 10);
        const levelNumberB = parseInt(b.replace('Level ', ''), 10);
        return levelNumberA - levelNumberB;
    });
    const averageProgressByLevel = levels.map(level => {
        const { totalProgress, count } = levelProgressData[level];
        return totalProgress / count;
    });

    const data = {
        labels: levels.map(level => `${level}`),
        datasets: [
            {
                label: 'Average Progress (%)',
                data: averageProgressByLevel,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
                text: 'User Level vs. Average Progress',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    );
};

export default UserLevelProgressChart;
