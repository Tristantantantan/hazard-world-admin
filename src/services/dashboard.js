import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const getTotalScoresAndNamesForAllUsers = async () => {
    try {
        const assessmentsRef = collection(db, 'userAssessments');
        const assessmentsDocs = await getDocs(assessmentsRef);

        const usersRef = collection(db, 'users');
        const usersDocs = await getDocs(usersRef);

        const usersMap = {};
        usersDocs.docs.forEach(doc => {
            const { email, name } = doc.data();
            usersMap[email] = name;
        });

        const totalScores = {};

        assessmentsDocs.docs.forEach(doc => {
            const { email, ...chapters } = doc.data();

            if (!totalScores[email]) {
                totalScores[email] = {
                    name: usersMap[email] || 'Unknown User',
                    totalScore: 0,
                };
            }

            Object.values(chapters).forEach(chapter => {
                if (typeof chapter === 'object') {
                    Object.values(chapter).forEach(level => {
                        if (level && typeof level.score === 'number') {
                            totalScores[email].totalScore += level.score;
                        }
                    });
                }
            });
        });

        const result = Object.keys(totalScores).map(email => ({
            email,
            name: totalScores[email].name,
            totalScore: totalScores[email].totalScore,
        }));

        return result;
    } catch (error) {
        console.error('Error fetching total scores and names for all users:', error);
        throw error;
    }
};

export const getUserAssessments = async () => {
    try {
        const assessmentsRef = collection(db, 'userAssessments');
        const assessmentsDocs = await getDocs(assessmentsRef);

        const userAssessments = assessmentsDocs.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return userAssessments;
    } catch (error) {
        console.error('Error fetching user assessments:', error);
        throw error;
    }
};
