import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';


export const getAssessments = async () => {
    try {
        const chaptersSnapshot = await getDocs(collection(db, 'chapters'));
        const levelsSnapshot = await getDocs(collection(db, 'levels'));
        const questionsSnapshot = await getDocs(collection(db, 'questions'));

        const chapters = chaptersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const levels = levelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const questions = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const sortedChapters = chapters.sort((a, b) => a.chapter - b.chapter);

        sortedChapters.forEach(chapter => {
            const chapterLevels = levels.filter(level => level.chapter.toString() === chapter.chapter.toString());
            const sortedLevels = chapterLevels.sort((a, b) => a.level - b.level);
            chapter.levels = sortedLevels.map(level => {
                const levelQuestions = questions.filter(
                    question => question.level.toString() === level.level.toString()
                );

                return {
                    ...level,
                    questions: levelQuestions
                };
            });
        });
        return sortedChapters;
    } catch (error) {
        console.error('Error fetching assessments:', error);
        throw error;
    }
};

export const getQuestions = async () => {
    try {
        const response = await getDocs(collection(db, 'questions'));
        const questions = response.docs.map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        );

        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

export const getChapters = async () => {
    const response = await getDocs(collection(db, 'chapters'));
    const chapters = response.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    );

    chapters.sort((a, b) => a.chapter - b.chapter);
    return chapters;
}

export const getLevels = async () => {
    const response = await getDocs(collection(db, 'levels'));
    const levels = response.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    );

    levels.sort((a, b) => a.level - b.level);
    return levels;
}

export const createQuestion = async (question) => {
    try {
        question.createdDate = new Date();
        const questionRef = collection(db, 'questions');
        const docRef = await addDoc(questionRef, question);
        return docRef.id;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

export const editQuestion = async (questionId, updatedData) => {
    try {
        updatedData.updatedDate = new Date();
        const questionRef = doc(db, 'questions', questionId);
        await updateDoc(questionRef, updatedData);
        return questionId;
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const questionRef = doc(db, 'questions', questionId);
        await deleteDoc(questionRef);
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};

export const getUserAssessmentsByEmail = async (email) => {
    try {
        const assessmentsRef = collection(db, 'userAssessments');
        const q = query(assessmentsRef, where('email', '==', email));

        const assessmentsDocs = await getDocs(q);

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
