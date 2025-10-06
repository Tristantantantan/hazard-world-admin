import { Container, Row, Col } from 'react-bootstrap';
import hazardBg from '../assets/hazard-bg.png';
import Navbar from '../components/Navbar';


const About = () => {
    return (
        <div>
            <Navbar />
            <div className="full-screen-bg">
                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h1 className="text-white mb-4">About Hazard World</h1>
                            <p className="text-white">
                                <strong>Hazard World</strong> is an educational game designed for all freshman students to explore their knowledge of how to survive in upcoming disasters through an interactive journey. Players dive into a dynamic learning adventure to understand natural hazards, gaining awareness, knowledge, and practical skills to tackle environmental challenges.
                            </p>
                            <p className="text-white">
                                The game immerses students in a 3D environment where they encounter realistic scenarios involving typhoons, earthquakes, tsunamis, landslides, and volcanic eruptions. Guided by non-playable characters, players learn about these natural disasters while developing problem-solving skills and hazard preparedness.
                            </p>
                            <p className="text-white">
                                To reinforce learning, &quot;Hazard World&quot; integrates quizzes after each chapter, encouraging critical thinking and solidifying the understanding of the relationship between human activities and environmental practices.
                            </p>
                        </Col>
                        <Col md={6}>
                            <img src={hazardBg} alt="Hazard World Screenshot" className="img-fluid rounded ms-4" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default About;
