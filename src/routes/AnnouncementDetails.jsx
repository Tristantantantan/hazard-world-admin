import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnnouncements } from '../services/announcementService';
import { Container, Card } from 'react-bootstrap';

const AnnouncementDetails = () => {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const data = await getAnnouncements();
                const foundAnnouncement = data.find(announcement => announcement.id === id);
                setAnnouncement(foundAnnouncement);
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncement();
    }, [id]);

    if (!announcement) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>{announcement.title}</Card.Title>
                    <Card.Text>{announcement.body}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AnnouncementDetails;
