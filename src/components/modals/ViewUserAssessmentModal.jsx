import { useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { getUserAssessmentsByEmail } from "../../services/assessment";
import Loading from "../Loading";

const ViewUserAssessmentModal = ({ user, show, handleClose }) => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUserAssessments(user.email);
        }
    }, [user]);

    const fetchUserAssessments = async (email) => {
        try {
            setLoading(true);
            const response = await getUserAssessmentsByEmail(email);
            const sortedAssessments = response.map((assessment) => {
                const sortedChapters = Object.entries(assessment)
                    .filter(([key]) => key.startsWith("Chapter"))
                    .map(([chapterName, chapter]) => {
                        const sortedLevels = Object.entries(chapter)
                            .sort(([levelA], [levelB]) => {
                                const levelNumA = parseInt(levelA.split(" ")[1], 10);
                                const levelNumB = parseInt(levelB.split(" ")[1], 10);
                                return levelNumA - levelNumB;
                            })
                            .reduce((acc, [levelName, levelData]) => {
                                acc[levelName] = levelData;
                                return acc;
                            }, {});

                        return [chapterName, sortedLevels];
                    })
                    .reduce((acc, [chapterName, sortedLevels]) => {
                        acc[chapterName] = sortedLevels;
                        return acc;
                    }, {});

                return {
                    ...assessment,
                    ...sortedChapters,
                };
            });

            setAssessments(sortedAssessments);
        } catch (error) {
            console.error('Error fetching user assessments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setAssessments([]);
        handleClose();
    };

    return (
        <div>
            {user && (
                <Modal show={show} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details: {user.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                <span className="d-block fw-bold mb-2">Basic Information</span>
                                <span className="d-block">{user.name}</span>
                                <span className="text-muted">
                                    {user.email} | {user.studentNumber} | {user.department}
                                </span>
                                <span className="d-block">Level {user.currentLevel} ({user.progress}%)</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span className="d-block fw-bold mb-2">Assessment Results</span>
                                {loading ? (
                                    <Loading />
                                ) : assessments.length > 0 ? (
                                    assessments.map((assessment, idx) => (
                                        <div key={idx}>
                                            {Object.entries(assessment)
                                                .filter(([key]) => key.startsWith("Chapter"))
                                                .map(([chapterName, chapter], chapterIdx) => (
                                                    <div key={chapterIdx}>
                                                        <span className="fw-bold d-block mb-2">
                                                            {chapterName}
                                                        </span>
                                                        {Object.entries(chapter).map(([levelName, level], levelIdx) => (
                                                            <ListGroup.Item key={levelIdx} className="mb-2">
                                                                <span className="d-block">{levelName}</span>
                                                                <span className="text-muted">
                                                                    Score: {level.score}/10 (
                                                                    {(level.score / 10) * 100}%) | Progress: {level.progress}%
                                                                </span>
                                                                <span className="d-block">
                                                                    Answers: {level.answers.join(", ")}
                                                                </span>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </div>
                                                ))}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-muted">No assessments available.</span>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default ViewUserAssessmentModal;
