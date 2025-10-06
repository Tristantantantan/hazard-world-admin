
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { createQuestion, editQuestion, getAssessments, getChapters, getLevels } from '../services/assessment';
import Loading from './Loading';
import CreateEditQuestionModal from './modals/CreateEditQuestionModal';
import ViewAssessmentModal from './modals/ViewAssessmentModal';

const AssessmentCards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showAssessmentModal, setShowAssessmentModal] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [questionData, setQuestionData] = useState({});

    const [chapters, setChapters] = useState([]);
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        fetchAssessments();
        fetchChaptersAndLevels();
    }, []);

    const fetchAssessments = async () => {
        setLoading(true);
        setQuestionData(null);
        try {
            const response = await getAssessments();
            setData(response);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        } finally { setLoading(false); }
    };

    const fetchChaptersAndLevels = async () => {
        const chaptersData = await getChapters();
        const levelsData = await getLevels();
        setChapters(chaptersData);
        setLevels(levelsData);
    };

    const handleCreate = async () => {
        setShowAddQuestionModal(true);
    }

    const handleCloseModal = () => {
        setShowAddQuestionModal(false);
        setShowAssessmentModal(false);
    };

    const addQuestion = async (question) => {
        try {
            if (question.question) {
                if (question.id) {
                    await editQuestion(question.id, question);
                } else {
                    await createQuestion(question);
                }
            }

            handleCloseModal();
            fetchAssessments();
        } catch (error) {
            console.error('Error creating question:', error);
        }
    }

    const handleViewAssessment = (assessment) => {
        setSelectedAssessment(assessment);
        setShowAssessmentModal(true);
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-end py-2">
                {/* <Button variant="primary" size="sm" className="me-2" onClick={() => handleCreate()}>
                    <i className="bi bi-plus text-white me-2"></i>
                    Add Chapter/Level
                </Button> */}
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleCreate()}>
                    <i className="bi bi-plus text-white me-2"></i>
                    Add Question
                </Button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-5 fw-bold">Assessments</span>
            </div>

            {loading && <Loading />}

            {data.map(chapter => (
                <div key={chapter.id}>
                    <div className="py-2">
                        <span className="fs-6 fw-bold">{chapter.chapterName}</span>
                    </div>
                    <Row xs={1} md={2} className="g-4">
                        {chapter.levels.map(level => (
                            <Col key={level.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Level {level.level}</Card.Title>
                                        <Card.Subtitle className="py-2">{level.levelName}</Card.Subtitle>
                                        <Card.Text>No. of Questions: {level.questions.length}</Card.Text>
                                        <div className="d-flex justify-content-end">
                                            {/* <Button variant="warning" size="sm" className="me-2"
                                                onClick={() => handleViewAssessment(level)}>
                                                <i className="bi bi-eye text-white"></i>
                                            </Button> */}
                                            <Button variant="warning" size="sm"
                                                onClick={() => handleViewAssessment(level)}>
                                                <i className="bi bi-box-arrow-up-right text-white"></i>
                                            </Button>
                                            {/* <Button variant="primary" size="sm">
                                                <i className="bi bi-pencil text-white"></i>
                                            </Button> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}

            <CreateEditQuestionModal
                show={showAddQuestionModal}
                handleClose={handleCloseModal}
                questionData={questionData}
                onSave={addQuestion}
                chapters={chapters}
                levels={levels}
            />

            <ViewAssessmentModal
                assessment={selectedAssessment}
                show={showAssessmentModal}
                handleClose={handleCloseModal}
                onSave={addQuestion}
                chapters={chapters}
                levels={levels} />
        </div>
    )
}

export default AssessmentCards
