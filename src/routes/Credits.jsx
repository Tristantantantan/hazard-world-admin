import { Card, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const contributors = [
    {
        name: 'John Doe',
        role: 'Game Developer',
        description: 'Led the development of 3D assets and interactive game mechanics using Blender and Unity.'
    },
    {
        name: 'Jane Smith',
        role: 'Graphic Designer',
        description: 'Designed game interfaces and visual elements using Adobe Photoshop and Illustrator.',
    },
    {
        name: 'Alice Johnson',
        role: 'Content Specialist',
        description: 'Created educational content and scenarios focusing on natural hazards and problem-solving skills.',
    },
    {
        name: 'Michael Brown',
        role: 'Project Manager',
        description: 'Coordinated project tasks and ensured alignment with the educational goals of Hazard World.',
    },
];

const Credits = () => {
    return (
        <div>
            <Navbar />
            <div className="full-screen-bg">
                <Container className="py-5">
                    <h1 className="text-white mb-4">Credits</h1>
                    <Row className="justify-content-center">
                        {contributors.map((contributor, index) => (
                            <Col md={6} key={index} className="mb-4">
                                <Card className="d-flex flex-row p-3">
                                    <img
                                        src='https://placehold.co/80'
                                        alt={contributor.name}
                                        className="img-fluid rounded me-3"
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                    <div>
                                        <Card.Title>{contributor.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{contributor.role}</Card.Subtitle>
                                        <Card.Text>{contributor.description}</Card.Text>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Credits;
