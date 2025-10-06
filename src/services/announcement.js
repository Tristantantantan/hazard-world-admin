import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const getAnnouncements = async () => {
    const response = await getDocs(collection(db, 'announcements'));
    const announcements = response.docs.map(
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    );
    return announcements;
}

export const createAnnouncement = async (announcement) => {
    try {
        announcement.createdDate = new Date();
        const announcementRef = collection(db, 'announcements');
        const docRef = await addDoc(announcementRef, announcement);
        return docRef.id;
    } catch (error) {
        console.error('Error creating announcement:', error);
        throw error;
    }
};

export const editAnnouncement = async (announcementId, updatedData) => {
    try {
        updatedData.updatedDate = new Date();
        const annoncementRef = doc(db, 'announcements', announcementId);
        await updateDoc(annoncementRef, updatedData);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteAnnouncement = async (announcementId) => {
    try {
        const annoncementRef = doc(db, 'announcements', announcementId);
        await deleteDoc(annoncementRef);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};