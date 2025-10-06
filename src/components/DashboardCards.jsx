import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Loading from './Loading';
import { getUsers } from '../services/user';
import { getAnnouncements } from '../services/announcement';
import { getQuestions } from '../services/assessment';

const DashboardCards = () => {
    // Mock data
    const [userCount, setUserCount] = useState();
    const [activeAnnouncements, setActiveAnnouncements] = useState();
    const [totalQuestions, setTotalQuestions] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsersCount();
        fetchAnnouncementsCount();
        fetchTotalQuestions();
    }, []);

    const fetchUsersCount = async () => {
        setLoading(true);
        try {
            const response = await getUsers();
            setUserCount(response.length);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally { setLoading(false); }
    }

    const fetchAnnouncementsCount = async () => {
        setLoading(true);
        try {
            const response = await getAnnouncements();
            setActiveAnnouncements(response.length);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally { setLoading(false); }
    };

    const fetchTotalQuestions = async () => {
        setLoading(true);
        try {
            const response = await getQuestions();
            setTotalQuestions(response.length);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally { setLoading(false); }
    };


    return (
        <div className="container my-4">
            <div className="d-flex mb-3">
                <span className="fs-5 fw-bold">Dashboard</span>
            </div>

            {loading && <Loading />}

            {
                !loading &&
                <Row className="mb-4">
                    {/* Total Users Card */}
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Total Users</Card.Title>
                                <Card.Text className="display-4">{userCount}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Active Announcements Card */}
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Active Announcements</Card.Title>
                                <Card.Text className="display-4">{activeAnnouncements}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Total Questions Card */}
                    <Col md={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Total Questions</Card.Title>
                                <Card.Text className="display-4">{totalQuestions}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            }
        </div>

    );
};

export default DashboardCards;
