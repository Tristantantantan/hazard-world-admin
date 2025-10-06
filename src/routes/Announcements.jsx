import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { getAnnouncements } from '../services/announcement';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleViewAnnouncement = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAnnouncement(null);
    };

    return (
        <div>
            <Navbar />
            <div className="full-screen-bg">
                <Container className="py-5">
                    <h1 className="announcements-title">Announcements</h1>
                    <Row className="">
                        {announcements.map(({ id, title, body }) => (
                            <Col key={id} xs={12} sm={6} md={4} className="mb-4">
                                <Card className="announcement-card h-100">
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Text className="flex-grow-1">
                                            {body.length > 100 ? `${body.substring(0, 100)}...` : body}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleViewAnnouncement({ id, title, body })}
                                            className="mt-auto"
                                        >
                                            View More
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>


                    {/* Modal for displaying announcement details */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedAnnouncement?.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{selectedAnnouncement?.body}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    );
};

export default Announcements;
